// Daily Notes — date-keyed, "today" CTA, prev/next [[daily:YYYY-MM-DD]] links,
// and convert-to-page (with restore) flow.
//
// Storage model:
//   - One reserved SP custom list `n365-daily` holds all rows.
//   - Each row's body markdown is stored in n365-pages (PageType='row',
//     ListTitle='n365-daily', DbRowId=<row id>) — the same scheme used by
//     ordinary DB row-pages. This means the user can write Notion-style
//     long-form content per day and the editor / row-props panel just work.
//   - The DB itself is registered in n365-pages as PageType='database',
//     ListTitle='n365-daily', Title='デイリーノート', Icon='📅', Pinned=1.

import { S, type Page } from '../state';
import {
  createList, addListField, getListItems, deleteListItem, updateListItem,
} from './sp-list';
import { spListUrl, spGetD } from './sp-rest';
import {
  apiCreateDbPageRow, apiCreatePage, apiSavePageMd, apiLoadRawBody,
  setRowBody, getRowBody, deleteRowEntry, PAGES_LIST,
} from './pages';
import { apiAddDbRow } from './db';
import { todayYMD, addDaysYMD, formatDailyTitle, isDailyTitleFormat } from '../lib/date-utils';

export const DAILY_LIST_TITLE = 'n365-daily';
export const DAILY_DATE_FIELD = '日付';
export const DAILY_TAG_FIELD = 'タグ';

interface DailyDb {
  dbPageId: string;          // n365-pages id of the database page
  listTitle: string;         // 'n365-daily'
}

let _ensurePromise: Promise<DailyDb> | null = null;

/** True if the given list title is the daily-notes list. Used elsewhere
 *  (e.g. row-page title-rename detection) to gate daily-specific behavior. */
export function isDailyList(listTitle: string | null | undefined): boolean {
  return listTitle === DAILY_LIST_TITLE;
}

/** Idempotently create the daily DB list + its n365-pages registration row.
 *  Returns the resolved (dbPageId, listTitle) pair. */
export async function ensureDailyDb(): Promise<DailyDb> {
  if (_ensurePromise) return _ensurePromise;
  _ensurePromise = (async (): Promise<DailyDb> => {
    // 1. Look in the local meta first (fast path; loaded from n365-pages on app start)
    const cachedMeta = S.meta.pages.find(
      (p) => p.type === 'database' && p.list === DAILY_LIST_TITLE && !p.trashed,
    );
    if (cachedMeta) {
      // Verify the SP list still exists. If not, fall through to create.
      const listExists = (await spGetD<unknown>(spListUrl(DAILY_LIST_TITLE))) != null;
      if (listExists) {
        return { dbPageId: cachedMeta.id, listTitle: DAILY_LIST_TITLE };
      }
    }

    // 2. Make sure the SP list exists with the expected schema.
    const listExists = (await spGetD<unknown>(spListUrl(DAILY_LIST_TITLE))) != null;
    if (!listExists) {
      await createList(DAILY_LIST_TITLE);
    }
    // Idempotent column adds — failures are tolerated (column may already exist
    // or have been renamed; we just want to ensure the canonical names).
    try { await addListField(DAILY_LIST_TITLE, DAILY_DATE_FIELD, 4); } catch { /* ignore */ }
    try {
      await addListField(DAILY_LIST_TITLE, DAILY_TAG_FIELD, 6,
        ['仕事', '個人', '会議', '家族', 'その他']);
    } catch { /* ignore */ }

    // 3. Make sure n365-pages has a row pointing at this list. Reuse cached
    //    meta if present, else create + pin.
    if (cachedMeta) {
      return { dbPageId: cachedMeta.id, listTitle: DAILY_LIST_TITLE };
    }
    const created = await apiCreateDbPageRow('デイリーノート', '', DAILY_LIST_TITLE);
    const itemId = parseInt(created.Id, 10);
    if (itemId) {
      await updateListItem(PAGES_LIST, itemId, { Icon: '📅', Pinned: 1 }).catch(() => undefined);
    }
    // Mirror to in-memory meta so the sidebar updates without a full reload.
    const m = S.meta.pages.find((p) => p.id === created.Id);
    if (m) { m.icon = '📅'; m.pinned = true; }
    S.pages.push(created);
    return { dbPageId: created.Id, listTitle: DAILY_LIST_TITLE };
  })().catch((e) => {
    // Allow a failed bootstrap to be retried on the next call.
    _ensurePromise = null;
    throw e;
  });
  return _ensurePromise;
}

interface DailyRowRef { rowId: number; title: string; body: string }

/** Find a daily-note row for the given YYYY-MM-DD, or null if it doesn't exist. */
export async function findNoteForDate(date: string): Promise<DailyRowRef | null> {
  await ensureDailyDb();
  // Filter on the Date column. SP DateTime fields accept ISO comparisons.
  // We fetch a small page since at most one row should match on a given date.
  const filter = DAILY_DATE_FIELD + " eq datetime'" + date + "T00:00:00'";
  const url = spListUrl(DAILY_LIST_TITLE,
    '/items?$filter=' + encodeURIComponent(filter) + '&$top=1');
  const d = await spGetD<{ results: Array<{ Id: number; Title?: string }> }>(url).catch(() => null);
  const hit = d?.results?.[0];
  if (!hit) return null;
  const body = await getRowBody(DAILY_LIST_TITLE, hit.Id).catch(() => '');
  return { rowId: hit.Id, title: hit.Title || '', body };
}

/** Default body inserted into a freshly-created daily note. */
function buildDefaultDailyBody(date: string): string {
  const prev = addDaysYMD(date, -1);
  const next = addDaysYMD(date, 1);
  return [
    '## タスク',
    '- [ ] ',
    '',
    '## メモ',
    '',
    '',
    '---',
    '昨日: [[daily:' + prev + ']] / 明日: [[daily:' + next + ']]',
    '',
  ].join('\n');
}

/** Get the daily row for `date`, creating it (with default body) if absent.
 *  The returned ref lets the UI directly call openRowAsPage on it. */
export async function getOrCreateNoteForDate(date: string): Promise<DailyRowRef & { dbPageId: string }> {
  const db = await ensureDailyDb();
  const existing = await findNoteForDate(date);
  if (existing) return { ...existing, dbPageId: db.dbPageId };

  const title = formatDailyTitle(date);
  const created = await apiAddDbRow(DAILY_LIST_TITLE, {
    Title: title,
    [DAILY_DATE_FIELD]: date,
  });
  const body = buildDefaultDailyBody(date);
  await setRowBody(DAILY_LIST_TITLE, created.Id, db.dbPageId, title, body);
  return { rowId: created.Id, title, body, dbPageId: db.dbPageId };
}

/** Convert a daily-note row into a standalone n365-pages entry. The original
 *  body is preserved verbatim; the SP DB row is then deleted. The new page
 *  carries `OriginDailyDate` so the user can later restore it via the
 *  「デイリーノートに戻す」 menu action. */
export async function convertDailyToPage(
  rowId: number,
  newTitle: string,
  originDate: string,
  parentId = '',
): Promise<string> {
  // 1. Pull the body before destroying the row (so the operation is recoverable
  //    via undo even if a later step fails).
  const body = await getRowBody(DAILY_LIST_TITLE, rowId).catch(() => '');
  // 2. Create the standalone page first — if SP rejects the create, we don't
  //    want to have already deleted the daily row.
  const newPage = await apiCreatePage(newTitle, parentId);
  await apiSavePageMd(newPage.Id, newTitle, body).catch(() => undefined);
  const itemId = parseInt(newPage.Id, 10);
  if (itemId) {
    await updateListItem(PAGES_LIST, itemId, { OriginDailyDate: originDate }).catch(() => undefined);
  }
  const meta = S.meta.pages.find((p) => p.id === newPage.Id);
  if (meta) meta.originDailyDate = originDate;
  // 3. Drop the daily row + its row-as-page entry.
  await deleteRowEntry(DAILY_LIST_TITLE, rowId).catch(() => undefined);
  await deleteListItem(DAILY_LIST_TITLE, rowId).catch(() => undefined);
  return newPage.Id;
}

/** Reverse of `convertDailyToPage`. Recreates a daily-note row for the page's
 *  origin date, copies the current body in, then deletes the standalone page. */
export async function restoreToDaily(pageId: string): Promise<{ rowId: number; date: string }> {
  const meta = S.meta.pages.find((p) => p.id === pageId);
  if (!meta?.originDailyDate) throw new Error('このページはデイリーノート由来ではありません');
  const date = meta.originDailyDate;
  const body = await apiLoadRawBody(pageId);
  // Use upsert semantics — if the user has since written a new note for that
  // same date, the existing row wins and we just refresh its body.
  const db = await ensureDailyDb();
  const existing = await findNoteForDate(date);
  let rowId: number;
  let title: string;
  if (existing) {
    rowId = existing.rowId;
    title = existing.title || formatDailyTitle(date);
  } else {
    title = formatDailyTitle(date);
    const created = await apiAddDbRow(DAILY_LIST_TITLE, {
      Title: title,
      [DAILY_DATE_FIELD]: date,
    });
    rowId = created.Id;
  }
  await setRowBody(DAILY_LIST_TITLE, rowId, db.dbPageId, title, body);
  // Delete the standalone page now that the daily row holds the content.
  const { apiDeletePage } = await import('./pages');
  await apiDeletePage(pageId).catch(() => undefined);
  return { rowId, date };
}

/** Hydrate the in-memory cache (S.dbItems / S.dbFields) for the daily list
 *  if it's currently the active DB. Used after AI / bulk operations.
 *  Re-exported for convenience. */
export async function refreshDailyCacheIfActive(): Promise<void> {
  if (S.dbList !== DAILY_LIST_TITLE) return;
  S.dbItems = await getListItems(DAILY_LIST_TITLE);
}

// Convenience re-exports so callers can use this single module
export { isDailyTitleFormat, todayYMD };
export type { Page };
