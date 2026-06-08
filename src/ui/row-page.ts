// Open a DB row as a full page.
//   - 行も「Body_blocks を持つリストの行」= 通常ページと同じ構造。
//   - 読込/保存は通常ページと同じ Saver 経路に統一(専用の saveCurrentRow は廃止)。
//     行 pageId = mintPageId(listTitle, itemId) を Saver/監視の対象にし、
//     apiSavePageBlocks がその行の Title + Body_blocks を書く。
//   - サイドバー選択は親DBのままにしたいので S.currentId は dbId を維持し、
//     行であることは S.currentRow が表す(プロパティ/パンくず/コメントが参照)。

import { S, type ListItem } from '../state';
import { g, getEd } from './dom';
import { setSavedAt, toast, autoR, setLoad } from './ui-helpers';
import { getListItems, getListFields } from '../api/sp-list';
import { stripInternalDbFields } from '../api/db';
import { metaById } from '../lib/page-store';
import { apiLoadContentMeta, mintPageId, registerPageSourceList } from '../api/pages';
import { saver } from '../lib/saver';
import { startWatching, stopWatching } from './sync-watch';
import { showView, renderBcCustom } from './views';
import { renderRowProperties } from './row-props';
import { isDailyList, isDailyTitleFormat, convertDailyToPage, DAILY_DATE_FIELD } from '../api/daily';
import { formatDateJST } from '../lib/date-utils';

/** Set of (daily-DB) row IDs that we've already shown a "convert?" prompt for
 *  in this session. We only ask once per row to avoid pestering the user. */
const _convertPromptedRows = new Set<number>();

/** Open a DB row as a full page editor. dbId = parent db page id, item = the row */
export async function openRowAsPage(dbId: string, item: ListItem): Promise<void> {
  // 行が属するリストは dbId のメタから導く(S.dbList に依存しない=自己完結)。
  // これにより、呼び出し側は事前に doSelectDb する必要がなく、DB一覧タブを
  // 作らず・DB一覧を一瞬表示せずに行ページへ直接入れる(デイリーノートで余計な
  // DBタブが生成され「いつの間にかDBタブに切替」と見えていた問題の解消)。
  const listTitle = metaById(dbId)?.list || S.dbList;
  if (!listTitle || !item) return;

  // 直前のページ/行の保留保存を確定してから対象を切り替える(取りこぼし防止)。
  try { const { flushPendingSave } = await import('./save-control'); await flushPendingSave(); } catch { /* ignore */ }

  // S.dbList/S.dbFields をこの行のリストに合わせる(プロパティ欄の描画に必要)。
  // 別DBから来た/未ロードの時だけ列定義を取り直す(同一DBの表からのオープンは再取得しない)。
  const needFields = S.dbList !== listTitle || !S.dbFields || S.dbFields.length === 0;
  S.dbList = listTitle;
  if (needFields) {
    try { S.dbFields = stripInternalDbFields(await getListFields(listTitle)); } catch { /* keep */ }
    S.dbItems = [item];   // 別DBの行は持ち越さない(この行だけ即参照可能にする)
  }

  // 行 pageId を採番し、そのDBリストへのルーティングを登録(通常ページと同じ
  // apiLoadContentMeta / apiSavePageBlocks がこの行を読み書きできるように)。
  const rowPageId = mintPageId(listTitle, item.Id);
  registerPageSourceList(rowPageId, listTitle);

  // Switch state — currentId = parent DB so sidebar stays selected;
  // S.currentRow marks row-page mode (props / breadcrumb / comments use it).
  // Saver/監視の対象は rowPageId(下で saver.loadPage)なので currentId とは別。
  S.currentId = dbId;
  S.currentRow = { listTitle, itemId: item.Id, dbId };
  S.currentType = 'page';

  // Push the row open as its own history entry so back returns to the DB list.
  void import('./nav-history').then((m) => m.pushHistory(dbId, { rowList: listTitle, rowId: item.Id }));

  showView('page');

  // Title
  const titleEl = g('ttl') as HTMLTextAreaElement;
  titleEl.value = (item.Title as string) || '';
  autoR(titleEl);

  // Body + Saver baseline — 通常ページと同一手順。行の Body_blocks/Modified/etag を
  // 取得 → editor2 をマウント → saver.loadPage で保存対象をこの行に確立。
  const ed = getEd();
  setLoad(true, 'ページを読み込み中...');
  try {
    const meta = await apiLoadContentMeta(rowPageId);
    if (S.currentRow?.itemId !== item.Id || S.currentRow?.listTitle !== listTitle) return; // 切替で離脱
    const { mountEditor2, loadBlocksFromJson } = await import('./editor2/editor2-bridge');
    if (S.currentRow?.itemId !== item.Id) return;
    mountEditor2(ed);
    loadBlocksFromJson(meta?.body || '');
    void import('./page-picker').then((m) => m.markBrokenPageLinks(ed));
    if (meta) {
      startWatching(rowPageId, meta.modified, meta.etag);
      saver.loadPage({
        pageId: rowPageId,
        body: meta.body,
        title: (titleEl.value || '無題').trim() || '無題',
        etag: meta.etag,
        modified: meta.modified,
      });
      setSavedAt(meta.modified);
    } else {
      stopWatching();
      saver.unload();
      setSavedAt(null);
    }
  } catch (e) {
    toast('読み込み失敗: ' + (e as Error).message, 'err');
    stopWatching(); saver.unload(); setSavedAt(null);
  } finally { setLoad(false); }

  // Properties (Notion-style: Title 以外の各列を編集可能なリストで表示)
  const propsEl = document.getElementById('memola-row-props');
  if (propsEl) renderRowProperties(propsEl, S.dbFields, item, listTitle);

  // Hide page-icon section (DB rows don't have icons in this MVP)
  const pgIcon = g('pg-icon');
  const addIcon = document.getElementById('memola-add-icon');
  if (pgIcon) pgIcon.style.display = 'none';
  if (addIcon) addIcon.style.display = '';

  // Breadcrumb: DB title → row title (デイリーは「📅 デイリーノート」と明示)
  const dbPage = S.pages.find((p) => p.Id === dbId);
  const dbTitle = isDailyList(listTitle) ? '📅 デイリーノート' : (dbPage?.Title || '無題DB');
  renderBcCustom([
    { label: dbTitle, onClick: () => { void backToDb(dbId); } },
    { label: (item.Title as string) || '無題' },
  ]);

  // Backlinks panel — renderBacklinks() respects S.currentRow (hides for rows).
  void import('./backlinks').then((m) => m.renderBacklinks());
  // Comments — DB row detail pages get comments too (keyed by row:list:id).
  void import('./comments-ui').then((m) => {
    const target = m.currentCommentTarget();
    if (target) void m.loadCommentsFor(target.pageId, target.scope);
  });
  // タブ: アクティブタブの中身をこの行に差し替える。
  void import('./tabs').then((m) => m.openRowInActiveTab(dbId, item.Id, (item.Title as string) || '無題'));
}

/** デイリーノートのタイトルが日付形式から外れたら、通常ページへの変換を提案する。
 *  Saver 保存後にタイトル確定の文脈(title-wiring の blur)から呼ばれる。 */
export async function maybePromptDailyConvert(
  rowId: number, newTitle: string, listTitle: string,
): Promise<void> {
  if (_convertPromptedRows.has(rowId)) return;
  if (!isDailyList(listTitle)) return;
  if (isDailyTitleFormat(newTitle)) return;
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
    const { apiGetPages } = await import('../api/pages');
    await apiGetPages();
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
  const dbPage = S.pages.find((p) => p.Id === dbId);
  if (!dbPage) return;
  const { doSelect } = await import('./views');
  await doSelect(dbId);
  // Refresh items so the row's just-saved Title/body show up immediately.
  try {
    if (S.dbList) S.dbItems = await getListItems(S.dbList);
    const { renderDbTable } = await import('./views');
    renderDbTable();
  } catch { /* ignore */ }
}
