// Open a DB row as a full page.
//   - Loads body markdown from n365-pages (PageType='row', keyed by DbRowId)
//   - Renders title + body in the standard editor view
//   - Saves Title back to the DB row, body back to n365-pages

import { S, type ListItem } from '../state';
import { g, getEd } from './dom';
import { setSave, setSavedAt, toast, autoR } from './ui-helpers';
import { apiUpdateDbRow } from '../api/db';
import { getListItems } from '../api/sp-list';
import { getRowBody, setRowBody } from '../api/pages';
import { mdToHtml, htmlToMd } from '../lib/markdown';
import { showView, renderBcCustom } from './views';
import { reattachInlineTables } from './inline-table';
import { renderRowProperties } from './row-props';
import { isDailyList, isDailyTitleFormat, convertDailyToPage, DAILY_DATE_FIELD } from '../api/daily';
import { formatDateJST } from '../lib/date-utils';

/** Set of (daily-DB) row IDs that we've already shown a "convert?" prompt for
 *  in this session. We only ask once per row to avoid pestering the user
 *  after they explicitly decline. */
const _convertPromptedRows = new Set<number>();

/** Open a DB row as a full page editor. dbId = parent db page id, item = the row */
export async function openRowAsPage(dbId: string, item: ListItem): Promise<void> {
  const listTitle = S.dbList;
  if (!listTitle || !item) return;

  // Switch state — keep currentId pointing to the parent DB so sidebar stays
  // selected, but flip into row-page mode.
  S.currentRow = { listTitle, itemId: item.Id, dbId };
  S.currentType = 'page';

  // Show editor area, hide DB view
  showView('page');

  // Title
  const titleEl = g('ttl') as HTMLTextAreaElement;
  titleEl.value = (item.Title as string) || '';
  autoR(titleEl);

  // Body — pulled from n365-pages (single source of truth for documents).
  const bodyMd = await getRowBody(listTitle, item.Id);
  const html = bodyMd ? mdToHtml(bodyMd) : '';
  const ed = getEd();
  ed.innerHTML = html;
  reattachInlineTables(ed);

  // Properties (Notion-style: Title 以外の各列を編集可能なリストで表示)
  const propsEl = document.getElementById('n365-row-props');
  if (propsEl) renderRowProperties(propsEl, S.dbFields, item, listTitle);

  // Hide page-icon section (DB rows don't have icons in this MVP)
  const pgIcon = g('pg-icon');
  const addIcon = document.getElementById('n365-add-icon');
  if (pgIcon) pgIcon.style.display = 'none';
  if (addIcon) addIcon.style.display = '';

  // Breadcrumb: DB title → row title (with click to return)
  const dbPage = S.pages.find((p) => p.Id === dbId);
  const dbTitle = dbPage?.Title || '無題DB';
  renderBcCustom([
    { label: dbTitle, onClick: () => { void backToDb(dbId); } },
    { label: (item.Title as string) || '無題' },
  ]);

  // Show this row's actual last-modified time (if SP returned it on the
  // listItem), not a wall-clock fallback.
  const rowMod = (item.Modified as string | undefined) || null;
  setSavedAt(rowMod);
  S.dirty = false;
}

/** Save the row's title (DB list) + body (n365-pages). */
export async function saveCurrentRow(): Promise<void> {
  if (!S.currentRow) return;
  const ed = getEd();
  const titleEl = g('ttl') as HTMLTextAreaElement;
  const newTitle = (titleEl.value || '').trim() || '無題';
  const newBody = htmlToMd(ed.innerHTML || '');
  setSave('保存中...');
  const rowRef = S.currentRow;
  try {
    // Title goes on the DB row itself (canonical source for title).
    await apiUpdateDbRow(rowRef.listTitle, rowRef.itemId, { Title: newTitle });
    // Body goes into n365-pages, keyed by (listTitle, itemId).
    await setRowBody(rowRef.listTitle, rowRef.itemId, rowRef.dbId, newTitle, newBody);
    // Mirror updated values into local cache
    const it = S.dbItems.find((i) => i.Id === rowRef.itemId);
    if (it) { it.Title = newTitle; }
    S.dirty = false;
    setSave('');
    // If this is a daily-note row and the title no longer matches the
    // YYYY-MM-DD format, offer to convert it to a standalone page. Runs
    // after save so the body is already persisted before any migration.
    void maybePromptDailyConvert(rowRef.itemId, newTitle, rowRef.listTitle);
  } catch (e) {
    toast('行の保存に失敗: ' + (e as Error).message, 'err');
    setSave('未保存');
  }
}

/** When a daily-note row's title is changed away from the date format, ask
 *  the user whether to convert it to a regular page. We only prompt once
 *  per row per session to avoid pestering on every autosave that follows. */
async function maybePromptDailyConvert(
  rowId: number, newTitle: string, listTitle: string,
): Promise<void> {
  if (_convertPromptedRows.has(rowId)) return;
  if (!isDailyList(listTitle)) return;
  if (isDailyTitleFormat(newTitle)) return;
  // Read the row's `日付` column to know which date the daily note belonged to
  const it = S.dbItems.find((i) => i.Id === rowId);
  const dateRaw = (it?.[DAILY_DATE_FIELD] as string | undefined) || '';
  const date = formatDateJST(dateRaw) || '';
  if (!date) return;
  _convertPromptedRows.add(rowId);
  const ok = window.confirm(
    '「' + newTitle + '」を通常ページに変換しますか？\n\n' +
    'デイリーノート (' + date + ') からは外れます。\n' +
    'あとでメニューから「デイリーノートに戻す」で復元できます。',
  );
  if (!ok) return;
  try {
    const newPageId = await convertDailyToPage(rowId, newTitle, date);
    // Reload page tree so the new standalone page shows in the sidebar.
    const { apiGetPages } = await import('../api/pages');
    S.pages = await apiGetPages();
    const { renderTree } = await import('./tree');
    renderTree();
    const v = await import('./views');
    await v.doSelect(newPageId);
    toast('通常ページに変換しました');
  } catch (e) {
    toast('変換失敗: ' + (e as Error).message, 'err');
  }
}

/** Return to the DB view (parent of the current row). */
export async function backToDb(dbId: string): Promise<void> {
  S.currentRow = null;
  // Re-load the DB so the row's updated Title/body show up immediately
  const dbPage = S.pages.find((p) => p.Id === dbId);
  if (!dbPage) return;
  const { doSelect } = await import('./views');
  await doSelect(dbId);
  // Refresh items in case body just got saved
  try {
    if (S.dbList) S.dbItems = await getListItems(S.dbList);
    const { renderDbTable } = await import('./views');
    renderDbTable();
  } catch { /* ignore */ }
}
