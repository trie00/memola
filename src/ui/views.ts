// Page / database view switching, table & kanban rendering.

import { S, type ListField, type ListItem, type Page } from '../state';
import { SITE } from '../config';
import { g, getEd } from './dom';
import { setLoad, setSave, setSavedAt, toast, autoR } from './ui-helpers';
import { renderTree, ancs, renderBc } from './tree';
import { apiLoadContentMeta } from '../api/pages';
import { escapeHtml } from '../lib/html-escape';
import { startWatching, stopWatching } from './sync-watch';
import { applyOutlineState } from './outline';
import { applyPropertiesState } from './properties-panel';
import { syncPubTag } from './pub-tag';
import { pushHistory, refreshButtons as refreshNavButtons } from './nav-history';
import { syncPresenceForCurrent } from './presence-ui';
import { apiUpdateDbRow } from '../api/db';
import { getListFields, getListItems } from '../api/sp-list';
import { formatDateJST, parseFlexibleDate } from '../lib/date-utils';
import {
  applyColOrder, saveColOrder, loadColOrder,
  applyRowOrder, saveRowOrder, loadRowOrder,
  moveItem,
} from '../lib/db-order';
import { prefLastOpenedPages } from '../lib/prefs';
import { recordDbCommand, recordCellChange, recordRowOrderChange, recordColOrderChange, deleteRowWithUndo } from './db-history';
import { renderBulkBar } from './db-bulk';

// doSave is imported lazily to avoid circular load issues.
import { doSave, flushPendingSave } from './actions';

export function showView(mode: 'page' | 'db' | 'empty'): void {
  g('ea').style.display = mode !== 'db'    ? 'flex'  : 'none';
  g('em').style.display = mode === 'empty' ? 'flex'  : 'none';
  g('ct').style.display = mode === 'page'  ? 'block' : 'none';
  g('tb').style.display = mode === 'page'  ? 'flex'  : 'none';
  g('dv').style.display = mode === 'db'    ? 'flex'  : 'none';
  // Refresh the publish tag for the new context — hides for DB / empty,
  // reflects current state for page.
  syncPubTag();
  // Clear the per-page save-time label when there's no page open
  if (mode === 'empty') setSavedAt(null);
}

/** Render the breadcrumb from a custom list of {label, onClick?} segments. */
export function renderBcCustom(segments: { label: string; onClick?: () => void }[]): void {
  const bc = g('bc');
  bc.innerHTML = '';
  segments.forEach((seg, i) => {
    const s = document.createElement('span');
    s.className = 'memola-bi';
    s.textContent = seg.label;
    if (seg.onClick) s.addEventListener('click', seg.onClick);
    else s.style.cursor = 'default';
    bc.appendChild(s);
    if (i < segments.length - 1) {
      const sep = document.createElement('span');
      sep.textContent = '/';
      sep.style.color = '#e9e9e7';
      sep.style.margin = '0 4px';
      bc.appendChild(sep);
    }
  });
}

export function renderPageIcon(id: string): void {
  const metaPage = S.meta.pages.find((p) => p.id === id);
  const icon = metaPage ? (metaPage.icon || '') : '';
  const pgIcon = g('pg-icon');
  const addIcon = g('add-icon');
  const hd = document.getElementById('memola-pg-hd');
  if (icon) {
    pgIcon.textContent = icon;
    pgIcon.style.display = 'inline-block';
    addIcon.style.display = 'none';                  // hard-hide when an icon is set
    hd?.classList.remove('no-icon');                  // collapse reserved slot
  } else {
    pgIcon.style.display = 'none';
    addIcon.style.display = '';                      // clear inline → CSS hover-reveal kicks in
    hd?.classList.add('no-icon');                    // reserve slot above title
  }
}

export async function doSelect(id: string): Promise<void> {
  // Strip empty todo blocks BEFORE the autosave fires — these are
  // checkboxes the user inserted via /todo but never typed into. Pruning
  // here keeps stale empty boxes from accumulating across sessions.
  if (S.currentType === 'page' && !S.currentRow) {
    try {
      const { pruneEmptyTodos } = await import('./editor');
      const n = pruneEmptyTodos();
      if (n > 0) S.dirty = true;     // ensure the prune is persisted
    } catch { /* ignore */ }
  }
  // Flush any pending / in-flight save to disk before we replace the
  // editor DOM. This is the fix for "navigating away loses my last edits"
  // — `flushPendingSave` waits for an in-flight save (autosave) to finish
  // and then performs another save if the user typed during that flight.
  if (S.currentType !== 'database') await flushPendingSave();
  S.currentRow = null;          // 別のページ/DB 選択時は行ページモードを解除
  S.currentId = id;
  const page = S.pages.find((p) => p.Id === id);
  if (!page) return;
  // Push into the back/forward history stack — pushHistory() ignores the
  // call when we're navigating *through* history (skip flag).
  pushHistory(id);
  ancs(id).forEach((p) => { S.expanded.add(p.Id); });
  renderTree(); renderBc(id);
  if (page.Type === 'database') {
    await doSelectDb(id, page);
  } else {
    S.currentType = 'page';
    void import('./db-bulk').then((m) => m.hideBulkBar());
    showView('page');
    const te = g('ttl') as HTMLTextAreaElement;
    te.value = page.Title || '';
    autoR(te);
    renderPageIcon(id);
    // Hide row-props panel (only shown for DB row pages)
    const propsEl = document.getElementById('memola-row-props');
    if (propsEl) propsEl.innerHTML = '';
    // Clear the previous page's saved-time label so it doesn't linger while
    // the new page's content is still being fetched.
    setSavedAt(null);
    setLoad(true, 'ページを読み込み中...');
    try {
      // Atomic Body + Modified + ETag in one SP GET. If we did two separate
      // fetches, another user's write between them would leave us with
      // stale-Body / fresh-ETag, and our next save would silently overwrite
      // their edit (SP sees no conflict because our If-Match matches).
      const meta = await apiLoadContentMeta(id);
      getEd().innerHTML = meta ? meta.html : '';
      // Re-bind inline-table cell handlers (Tab nav, hover buttons) after load
      void import('./inline-table').then((m) => m.reattachInlineTables(getEd()));
      // Mark page-link chips whose target page is missing (broken-link visual)
      void import('./page-picker').then((m) => m.markBrokenPageLinks(getEd()));
      // Populate any inline linked-DB embeds with live data from SP
      void import('./linked-db').then((m) => m.renderAllLinkedDbs(getEd()));
      // Track file meta so we can detect remote updates and conflicts on save.
      // The modified/etag we hand to startWatching are guaranteed to belong
      // to the same SP version as the Body we just rendered.
      if (meta) {
        startWatching(id, meta.modified, meta.etag);
        // Show the page's actual last-saved time, not the wall clock.
        setSavedAt(meta.modified);
        // Compare the just-loaded etag against the one the user last saw
        // for THIS page. If they differ, someone (a tab / another user)
        // edited the page while it was closed — the user is now silently
        // looking at new content. Surface a passive "前回の表示以降に
        // 更新されました" banner so the change isn't invisible.
        void import('./since-last-view-banner').then(
          (m) => m.maybeShowSinceLastView(id, meta.modified, meta.etag),
        );
      } else {
        stopWatching();
        setSavedAt(null);
      }
      applyOutlineState();
      applyPropertiesState();
    } catch (e) {
      getEd().innerHTML = '';
      toast('読み込み失敗: ' + (e as Error).message, 'err');
      stopWatching();
      setSavedAt(null);
    } finally { setLoad(false); }
    S.dirty = false;
    syncPubTag();
    refreshNavButtons();
    syncDraftBanner();
    syncPresenceForCurrent();
    // Backlinks panel — render lazily after the editor itself is ready.
    void import('./backlinks').then((m) => m.renderBacklinks());
  }
  // Remember the last-opened page so the next app session reopens it.
  // Keyed by SITE so each workspace gets its own "last page" memory.
  rememberLastOpenedPage(id);
}

function rememberLastOpenedPage(pageId: string): void {
  const map = prefLastOpenedPages.get();
  // Key by SITE so different workspaces don't clobber each other.
  map[SITE] = pageId;
  prefLastOpenedPages.set(map);
}

/** Read the last-opened page id for the current workspace, if any.
 *  Returns null when there's no record or storage is unavailable. */
export function loadLastOpenedPage(): string | null {
  const map = prefLastOpenedPages.get();
  return map[SITE] || null;
}

/** Show the 「下書き」 banner above the title when this page is a draft
 *  duplicate (originPageId set). The banner offers an "原本に適用" button
 *  that copies the body back to the origin and deletes the draft. */
function syncDraftBanner(): void {
  const bn = document.getElementById('memola-draft-banner');
  if (!bn) return;
  const meta = S.currentId ? S.meta.pages.find((p) => p.id === S.currentId) : null;
  if (!meta?.originPageId) {
    bn.style.display = 'none';
    bn.innerHTML = '';
    return;
  }
  const origin = S.meta.pages.find((p) => p.id === meta.originPageId);
  const originTitle = origin?.title || '(原本ページが見つかりません)';
  const exists = !!origin && !origin.trashed;
  bn.style.display = '';
  bn.innerHTML =
    '<span class="memola-draft-banner-icon">✏️</span>' +
    '<span class="memola-draft-banner-msg">' +
    '原本: <a class="memola-draft-banner-link" data-origin-id="' + (meta.originPageId || '') + '">' +
    escapeHtml(originTitle) + '</a> の<b>下書き</b>です' +
    '</span>' +
    (exists
      ? '<button class="memola-draft-banner-apply" type="button">原本に適用</button>'
      : '<span class="memola-draft-banner-broken">原本が削除されています</span>'
    );
  // Click on origin link → navigate to origin
  bn.querySelector<HTMLElement>('.memola-draft-banner-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    const id = (e.target as HTMLElement).dataset.originId;
    if (id) void doSelect(id);
  });
  // Apply button → copy draft body to origin
  bn.querySelector<HTMLElement>('.memola-draft-banner-apply')?.addEventListener('click', async () => {
    if (S.dirty) {
      const m = await import('./actions');
      await m.doSave();
    }
    if (!confirm(
      '下書きの内容で原本「' + originTitle + '」を上書きします。\n\n' +
      '・原本の現在の本文は SP のバージョン履歴に残ります\n' +
      '・この下書きページは削除されます\n' +
      '・原本へのリンク ([[' + meta.originPageId + ']]) は壊れません\n\n' +
      '続行しますか？',
    )) return;
    try {
      setLoad(true, '原本に適用中…');
      const { apiApplyDraftToOrigin, apiGetPages } = await import('../api/pages');
      const draftId = S.currentId;
      if (!draftId) return;
      const originId = await apiApplyDraftToOrigin(draftId);
      // Reload page tree (draft removed)
      S.pages = await apiGetPages();
      const { renderTree } = await import('./tree');
      renderTree();
      void import('./drafts-modal').then((m) => m.refreshDraftsBadge?.());
      await doSelect(originId);
      toast('原本に適用しました');
    } catch (e) {
      toast('適用失敗: ' + (e as Error).message, 'err');
    } finally { setLoad(false); }
  });
}

export async function doSelectDb(id: string, page: Page): Promise<void> {
  S.currentType = 'database';
  stopWatching();
  syncPubTag();
  syncPresenceForCurrent();           // DB views have no presence tracking
  setSavedAt(null);                   // DB views have no per-row save time
  applyOutlineState();
  applyPropertiesState();
  // Attach the floating row-drag handle (idempotent — only wires global listeners once)
  void import('./db-row-drag').then((m) => m.attachDbRowDrag());
  const meta = S.meta.pages.find((p) => p.id === id);
  if (!meta || !meta.list) { toast('DBメタ情報が見つかりません', 'err'); return; }
  showView('db');
  g('dv-ttl').textContent = page.Title || '無題';

  const dvIcon = g('dv-pg-icon');
  const dvAddIcon = g('dv-add-icon');
  const dvHd = document.getElementById('memola-dv-hd');
  if (meta.icon) {
    dvIcon.textContent = meta.icon;
    dvIcon.style.display = 'inline-block';
    dvAddIcon.style.display = 'none';
    dvHd?.classList.remove('no-icon');
  } else {
    dvIcon.style.display = 'none';
    dvAddIcon.style.display = '';                    // clear inline → CSS hover-reveal kicks in
    dvHd?.classList.add('no-icon');
  }

  setLoad(true, 'データを読み込み中...');
  try {
    // Bodies live in memola-pages; nothing to provision on the DB list itself.
    const results = await Promise.all([getListFields(meta.list), getListItems(meta.list)]);
    // Drop infrastructure columns (Trashed/TrashedBy) so they don't leak
    // into the table view, row-props panel, filter picker, or column-add UI.
    const { stripInternalDbFields } = await import('../api/db');
    S.dbFields = stripInternalDbFields(results[0]);
    // Filter out soft-deleted rows. Pre-Trashed-column DBs simply
    // return rows without that field — `i.Trashed` is undefined → falsy
    // → not filtered, so the legacy data path stays correct.
    const allItems = results[1] as ListItem[];
    const trashed: ListItem[] = [];
    const active: ListItem[] = [];
    for (const it of allItems) {
      const t = it.Trashed;
      if (typeof t === 'number' && t > 0) trashed.push(it);
      else active.push(it);
    }
    S.dbItems  = active;
    S.dbList   = meta.list;
    S.dbFilters = [];
    S.dbSelected.clear();
    setSelectionAnchor(null);
    S.dbSort   = { field: null, asc: true };
    void import('./filter-ui').then((m) => m.renderFilterChips());
    renderDbTable();
    // Self-heal: if any rows were trashed in memola-pages but missed the
    // DB-row write (= process kill mid-soft-delete), the Trashed flag is
    // now visible only via memola-pages. Reconcile by re-applying the
    // trash to the DB row. Fire-and-forget — failure is non-fatal.
    void import('../api/db').then((m) => m.reconcileTrashedRows(meta.list!, allItems))
      .catch(() => undefined);
    void trashed;            // currently unused locally; reconcile path uses SP-side query
  } catch (e) { toast('DB読み込み失敗: ' + (e as Error).message, 'err'); }
  finally { setLoad(false); }
}

export function getDbFields(): ListField[] {
  // 2=text, 3=multiline, 4=date, 6=choice, 8=bool, 9=number
  const filtered = S.dbFields.filter((f) => [2, 3, 4, 6, 8, 9].indexOf(f.FieldTypeKind) >= 0);
  // Honour the user's saved column order (drag-reorder); new fields appended.
  return applyColOrder(filtered, S.dbList);
}

export function getSortedFilteredItems(): ListItem[] {
  let items = S.dbItems.slice();
  // Notion 風の複数フィールド AND フィルター
  if (S.dbFilters.length > 0) {
    // 動的import回避のため inline 評価（filter-ui.ts と同等ロジック）
    items = items.filter((item) => {
      for (const flt of S.dbFilters) {
        if (!flt.value && flt.op !== 'empty' && flt.op !== 'not_empty') continue;
        const raw = item[flt.field];
        const s = raw == null ? '' : String(raw);
        if (flt.op === 'equals') {
          if (s !== flt.value) return false;
        } else if (flt.op === 'not_empty') {
          if (!s) return false;
        } else if (flt.op === 'empty') {
          if (s) return false;
        } else {
          if (!s.toLowerCase().includes(flt.value.toLowerCase())) return false;
        }
      }
      return true;
    });
  }
  if (S.dbSort.field) {
    const field = S.dbSort.field;
    const asc = S.dbSort.asc;
    items.sort((a, b) => {
      const av = a[field] != null ? String(a[field]) : '';
      const bv = b[field] != null ? String(b[field]) : '';
      if (av < bv) return asc ? -1 : 1;
      if (av > bv) return asc ? 1 : -1;
      return 0;
    });
  } else {
    // No sort active → respect user's manual drag-reorder order
    items = applyRowOrder(items, S.dbList);
  }
  return items;
}

// True when manual row-drag is allowed (no sort applied).
export function isManualRowOrderActive(): boolean {
  return S.dbSort.field == null;
}

/** Move one or more rows to before/after `targetId` and persist the order.
 *  Accepts either a single id or an array; multi-row drags from selection. */
export function reorderRows(
  fromIds: number | number[],
  targetId: number,
  dropAfter: boolean,
): void {
  const ids = (Array.isArray(fromIds) ? fromIds : [fromIds]).filter((x) => x !== targetId);
  if (ids.length === 0) return;
  const prevOrder = loadRowOrder(S.dbList) || [];
  const visual = applyRowOrder(S.dbItems.slice(), S.dbList).map((i) => i.Id);
  // Preserve the source rows' visual order — sort ids by their current index
  const sortedIds = ids.slice().sort((a, b) => visual.indexOf(a) - visual.indexOf(b));
  // Remove all dragged ids
  for (const id of sortedIds) {
    const idx = visual.indexOf(id);
    if (idx >= 0) visual.splice(idx, 1);
  }
  let targetIdx = visual.indexOf(targetId);
  if (targetIdx < 0) targetIdx = visual.length;
  if (dropAfter) targetIdx += 1;
  // Insert in original order at the target position
  visual.splice(targetIdx, 0, ...sortedIds);
  saveRowOrder(S.dbList, visual);
  recordRowOrderChange(S.dbList, prevOrder, visual);
  renderDbTable();
  void import('./db-views-extra').then((m) => {
    if (g('list-view').classList.contains('on')) m.renderListView();
    if (g('gallery-view').classList.contains('on')) m.renderGalleryView();
    if (g('calendar-view').classList.contains('on')) m.renderCalendarView();
    if (g('gantt-view').classList.contains('on')) m.renderGanttView();
  });
}

// Anchor for shift-click range selection. Reset on DB switch / clear-all.
let _lastClickedId: number | null = null;
export function setSelectionAnchor(id: number | null): void { _lastClickedId = id; }

export function renderDbTable(): void {
  const thead = g('dth-row');
  const tbody = g('dtb');
  thead.innerHTML = ''; tbody.innerHTML = '';
  const fields = getDbFields();

  // Reflect "any-selected" mode on the table so CSS can switch to always-show
  const dt = g('dt');
  dt.classList.toggle('memola-has-sel', S.dbSelected.size > 0);
  renderBulkBar();

  // Leading checkbox column (header) — selects/clears all visible rows
  const thCb = document.createElement('th');
  thCb.className = 'memola-th-cb';
  const headCb = document.createElement('input');
  headCb.type = 'checkbox';
  headCb.className = 'memola-cb';
  const visibleItems = getSortedFilteredItems();
  const visIds = visibleItems.map((it) => it.Id);
  const selVisCount = visIds.filter((id) => S.dbSelected.has(id)).length;
  if (selVisCount === 0) headCb.checked = false;
  else if (selVisCount === visIds.length) headCb.checked = true;
  else { headCb.indeterminate = true; }
  headCb.addEventListener('change', () => {
    if (headCb.checked) {
      visIds.forEach((id) => S.dbSelected.add(id));
    } else {
      visIds.forEach((id) => S.dbSelected.delete(id));
    }
    renderDbTable();
  });
  thCb.appendChild(headCb);
  thead.appendChild(thCb);

  fields.forEach((f, idx) => {
    const th = document.createElement('th');
    const isSorted = S.dbSort.field === f.InternalName;
    const headerSpan = document.createElement('span');
    headerSpan.className = 'memola-th-label';
    headerSpan.innerHTML = f.Title + (isSorted ? '<span class="sort-arrow">' + (S.dbSort.asc ? '▲' : '▼') + '</span>' : '');
    th.appendChild(headerSpan);
    th.dataset.field = f.InternalName;
    th.dataset.colIdx = String(idx);
    th.draggable = true;            // ← columns are drag-reorderable
    const savedW = S.dbColumnWidths[f.InternalName];
    if (savedW) th.style.width = savedW + 'px';
    headerSpan.addEventListener('click', () => {
      if (S.dbSort.field === f.InternalName) {
        S.dbSort.asc = !S.dbSort.asc;
      } else {
        S.dbSort.field = f.InternalName;
        S.dbSort.asc = true;
      }
      renderDbTable();
    });
    // ── Column drag-reorder ─────────────────────────────
    th.addEventListener('dragstart', (e) => {
      if (!e.dataTransfer) return;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/memola-col', String(idx));
      th.classList.add('memola-th-dragging');
    });
    th.addEventListener('dragend', () => th.classList.remove('memola-th-dragging'));
    th.addEventListener('dragover', (e) => {
      const dt = e.dataTransfer;
      if (!dt) return;
      // Accept only column drags
      if (Array.from(dt.types).indexOf('text/memola-col') < 0) return;
      e.preventDefault();
      dt.dropEffect = 'move';
      const rect = th.getBoundingClientRect();
      const after = e.clientX > rect.left + rect.width / 2;
      th.classList.toggle('memola-th-drop-before', !after);
      th.classList.toggle('memola-th-drop-after', after);
    });
    th.addEventListener('dragleave', () => {
      th.classList.remove('memola-th-drop-before', 'memola-th-drop-after');
    });
    th.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (!dt) return;
      const fromStr = dt.getData('text/memola-col');
      if (!fromStr) return;
      e.preventDefault();
      const from = parseInt(fromStr, 10);
      const rect = th.getBoundingClientRect();
      const after = e.clientX > rect.left + rect.width / 2;
      const to = after ? idx + 1 : idx;
      th.classList.remove('memola-th-drop-before', 'memola-th-drop-after');
      const prevOrder = loadColOrder(S.dbList) || [];
      const newFields = moveItem(fields, from, to);
      const newOrder = newFields.map((x) => x.InternalName);
      saveColOrder(S.dbList, newOrder);
      recordColOrderChange(S.dbList, prevOrder, newOrder);
      renderDbTable();
    });
    // Resize handle
    const handle = document.createElement('div');
    handle.className = 'memola-col-resize';
    handle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const startX = e.clientX;
      const startW = th.offsetWidth;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      function onMove(ev: MouseEvent): void {
        const newW = Math.max(60, startW + ev.clientX - startX);
        th.style.width = newW + 'px';
        S.dbColumnWidths[f.InternalName] = newW;
      }
      function onUp(): void {
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
    th.appendChild(handle);
    thead.appendChild(th);
  });

  // Delete column header (icon column)
  const thDel = document.createElement('th'); thDel.className = 'memola-th-del'; thead.appendChild(thDel);
  // "+" column right after the data columns
  const thAdd = document.createElement('th'); thAdd.className = 'memola-th-add';
  thAdd.textContent = '+'; thAdd.title = '列を追加';
  thAdd.addEventListener('click', () => {
    (g('col-name') as HTMLInputElement).value = '';
    // Reset grid type selection by clicking the first tile (syncs _colTypeKind in wiring.ts)
    const tiles = document.querySelectorAll<HTMLDivElement>('#memola-col-type-grid .memola-col-type');
    if (tiles[0]) tiles[0].click();
    // Reset choices & SP map fields
    const choicesEl = document.getElementById('memola-col-choices') as HTMLTextAreaElement | null;
    if (choicesEl) choicesEl.value = '';
    g('col-choices-row').classList.remove('on');
    const spmap = document.getElementById('memola-col-spmap') as HTMLInputElement | null;
    if (spmap) spmap.value = '';
    g('col-md').classList.add('on');
    (g('col-name') as HTMLInputElement).focus();
  });
  thead.appendChild(thAdd);
  // Spacer column to absorb remaining horizontal space (so + stays adjacent to last data column)
  const thSpacer = document.createElement('th');
  thSpacer.className = 'memola-th-spacer';
  thead.appendChild(thSpacer);

  getSortedFilteredItems().forEach((item) => { tbody.appendChild(mkDbRow(item, fields)); });
}

// Date helpers moved to src/lib/date-utils.ts. Imports added at the top of file.

/** Build the small "↗" link button that opens a DB row as a full page.
 *  Reusable across all DB view renderers (table / board / list / etc.). */
export function mkOpenRowBtn(item: ListItem): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = 'memola-row-open';
  btn.title = '行を開く（ページ表示）';
  btn.textContent = '↗';
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    void import('./row-page').then((m) => m.openRowAsPage(S.currentId || '', item));
  });
  return btn;
}

export function mkDbRow(item: ListItem, fields: ListField[]): HTMLTableRowElement {
  const tr = document.createElement('tr');
  tr.dataset.id = String(item.Id);
  // Drag is initiated via the floating handle (db-row-drag.ts), not the row
  // itself. The row only carries dataset.id so the centralized handler can
  // identify it.

  // Shift+click anywhere on the row (except the checkbox / open / delete
  // buttons) → toggle the row's checkbox and prevent cell editing.
  // Capture phase so we run before the cell's own focus / contenteditable.
  tr.addEventListener('mousedown', (e) => {
    if (!e.shiftKey) return;
    const t = e.target as HTMLElement;
    if (!t) return;
    if (t.closest('.memola-cb')) return;            // shift-range on checkbox itself
    if (t.closest('.memola-row-open')) return;
    if (t.closest('.memola-del-btn')) return;
    e.preventDefault();
    e.stopPropagation();
    const cb = tr.querySelector<HTMLInputElement>('.memola-cb');
    if (!cb) return;
    cb.checked = !cb.checked;
    cb.dispatchEvent(new Event('change'));
  }, true);

  // Leading checkbox cell — visibility controlled via CSS (hover or any-selected)
  const cbTd = document.createElement('td');
  cbTd.className = 'memola-td-cb';
  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.className = 'memola-cb';
  cb.checked = S.dbSelected.has(item.Id);
  if (cb.checked) tr.classList.add('memola-tr-sel');
  cb.addEventListener('click', (e) => {
    const me = e as MouseEvent;
    e.stopPropagation();
    // Shift+click: select the range from the last anchor to this row, inclusive.
    if (me.shiftKey && _lastClickedId !== null && _lastClickedId !== item.Id) {
      e.preventDefault();
      const visible = getSortedFilteredItems().map((it) => it.Id);
      const a = visible.indexOf(_lastClickedId);
      const b = visible.indexOf(item.Id);
      if (a >= 0 && b >= 0) {
        const [from, to] = a < b ? [a, b] : [b, a];
        // The newly clicked row's intended state determines whether we add or remove.
        // Use opposite of *current* value (since browser default would also flip).
        const turnOn = !cb.checked;
        for (let i = from; i <= to; i++) {
          if (turnOn) S.dbSelected.add(visible[i]);
          else S.dbSelected.delete(visible[i]);
        }
        _lastClickedId = item.Id;
        renderDbTable();
      }
    }
  });
  cb.addEventListener('change', () => {
    if (cb.checked) S.dbSelected.add(item.Id);
    else S.dbSelected.delete(item.Id);
    _lastClickedId = item.Id;
    tr.classList.toggle('memola-tr-sel', cb.checked);
    g('dt').classList.toggle('memola-has-sel', S.dbSelected.size > 0);
    renderBulkBar();
    // Update header checkbox state without full re-render
    const head = document.querySelector<HTMLInputElement>('.memola-th-cb .memola-cb');
    if (head) {
      const visible = getSortedFilteredItems().map((it) => it.Id);
      const selCount = visible.filter((id) => S.dbSelected.has(id)).length;
      head.indeterminate = selCount > 0 && selCount < visible.length;
      head.checked = selCount > 0 && selCount === visible.length;
    }
  });
  cbTd.appendChild(cb);
  tr.appendChild(cbTd);
  fields.forEach((f) => {
    const td = document.createElement('td');

    if (f.FieldTypeKind === 4) {
      // ── Date cell (JST display, JST 0時 → UTC ISO で保存) ──
      const wrapper = document.createElement('div');
      wrapper.className = 'memola-dc-date';
      let raw = (item[f.InternalName] as string) || '';
      function renderText(): void {
        const txt = formatDateJST(raw);
        wrapper.innerHTML = '';
        const span = document.createElement('span');
        span.textContent = txt || '—';
        if (!txt) span.style.color = 'var(--ink-4)';
        wrapper.appendChild(span);
      }
      function showInput(): void {
        wrapper.innerHTML = '';
        const wrap = document.createElement('span');
        wrap.className = 'memola-dc-date-wrap';
        const inp = document.createElement('input');
        inp.type = 'text';
        inp.className = 'memola-dc-date-inp';
        inp.placeholder = 'YYYY-MM-DD';
        inp.value = formatDateJST(raw);
        const pick = document.createElement('input');
        pick.type = 'date';
        pick.className = 'memola-dc-date-pick';
        pick.value = formatDateJST(raw);
        pick.tabIndex = -1;
        pick.title = 'カレンダーから選択';
        wrap.append(inp, pick);
        wrapper.appendChild(wrap);
        inp.focus();
        inp.select();

        let committing = false;
        function applyEmpty(): void {
          if (!raw) { renderText(); return; }
          committing = true;
          const oldRaw = raw;
          raw = '';
          item[f.InternalName] = '';
          setSave('保存中...');
          apiUpdateDbRow(S.dbList, item.Id, { [f.InternalName]: '' })
            .then(() => {
              setSave(''); renderText();
              recordCellChange(S.dbList, item.Id, f.InternalName, f.Title, oldRaw, '');
            })
            .catch((e: Error) => {
              toast(e.message, 'err');
              raw = oldRaw; item[f.InternalName] = oldRaw; renderText();
            });
        }
        function applyValue(norm: string): void {
          if (norm === raw) { renderText(); return; }
          committing = true;
          const oldRaw = raw;
          raw = norm;
          item[f.InternalName] = norm;
          setSave('保存中...');
          apiUpdateDbRow(S.dbList, item.Id, { [f.InternalName]: norm })
            .then(() => {
              setSave(''); renderText();
              recordCellChange(S.dbList, item.Id, f.InternalName, f.Title, oldRaw, norm);
            })
            .catch((e: Error) => {
              toast(e.message, 'err');
              raw = oldRaw; item[f.InternalName] = oldRaw; renderText();
            });
        }
        function commitText(val: string): void {
          if (committing) return;
          const trimmed = val.trim();
          if (!trimmed) { applyEmpty(); return; }
          const norm = parseFlexibleDate(trimmed);
          if (!norm) {
            toast('日付形式が無効です: ' + trimmed, 'err');
            inp.focus();
            return;
          }
          applyValue(norm);
        }
        inp.addEventListener('blur', (e) => {
          // Don't commit if focus moved to the calendar picker — wait for its change
          const next = (e as FocusEvent).relatedTarget as Element | null;
          if (next === pick) return;
          commitText(inp.value);
        });
        inp.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') { e.preventDefault(); commitText(inp.value); }
          if (e.key === 'Escape') { renderText(); }
        });
        pick.addEventListener('change', () => {
          if (pick.value) applyValue(pick.value);
          else applyEmpty();
        });
      }
      wrapper.addEventListener('click', () => {
        if (!wrapper.querySelector('input')) showInput();
      });
      renderText();
      td.appendChild(wrapper);
    } else if (f.FieldTypeKind === 6 && f.Choices) {
      const wrapper = document.createElement('div');
      wrapper.style.padding = '4px 12px';
      const sel = document.createElement('select');
      sel.style.cssText = 'border:none;background:transparent;font-size:14px;font-family:inherit;outline:none;cursor:pointer;max-width:140px;';
      const emptyOpt = document.createElement('option');
      emptyOpt.value = ''; emptyOpt.textContent = '—';
      sel.appendChild(emptyOpt);
      f.Choices.forEach((choice) => {
        const opt = document.createElement('option');
        opt.value = choice; opt.textContent = choice;
        if (item[f.InternalName] === choice) opt.selected = true;
        sel.appendChild(opt);
      });

      const choices = f.Choices;
      function renderChip(val: string): void {
        wrapper.innerHTML = '';
        if (val) {
          const idx = choices.indexOf(val) % 6;
          const chip = document.createElement('span');
          chip.className = 'memola-select-chip memola-sc-' + idx;
          chip.textContent = val;
          chip.style.cursor = 'pointer';
          chip.addEventListener('click', () => {
            wrapper.innerHTML = '';
            wrapper.appendChild(sel);
            sel.focus();
          });
          wrapper.appendChild(chip);
        } else {
          wrapper.appendChild(sel);
        }
      }

      sel.addEventListener('change', () => {
        const nv = sel.value;
        const oldVal = (item[f.InternalName] as string) || '';
        if (nv === oldVal) return;
        // Send by Display Title — InternalName for Japanese choice columns is
        // the encoded `_x30b9_…` form which validateUpdateListItem may reject.
        const data: Record<string, unknown> = {};
        data[f.Title || f.InternalName] = nv;
        item[f.InternalName] = nv;
        apiUpdateDbRow(S.dbList, item.Id, data)
          .then(() => {
            renderChip(nv);
            recordCellChange(S.dbList, item.Id, f.InternalName, f.Title, oldVal, nv);
          })
          .catch((e: Error) => { toast(e.message, 'err'); });
      });
      sel.addEventListener('blur', () => { renderChip(sel.value); });

      renderChip((item[f.InternalName] as string) || '');
      td.appendChild(wrapper);
    } else {
      const isMulti = f.FieldTypeKind === 3;
      const span = document.createElement('span');
      span.className = 'memola-dc' + (isMulti ? ' multi' : '');
      span.contentEditable = 'true';
      span.textContent = item[f.InternalName] != null ? String(item[f.InternalName]) : '';
      span.dataset.field = f.InternalName;
      let orig = span.textContent || '';
      span.addEventListener('focus', () => { orig = span.textContent || ''; });
      span.addEventListener('keydown', (e) => {
        const ke = e as KeyboardEvent;
        if (ke.isComposing || ke.keyCode === 229) return;
        if (ke.key === 'Escape') { span.textContent = orig; span.blur(); return; }
        if (ke.key === 'Enter') {
          if (isMulti) {
            // 複数行: Cmd/Ctrl+Enter で確定。普通の Enter は改行 (default)
            if (ke.metaKey || ke.ctrlKey) { e.preventDefault(); span.blur(); }
          } else {
            // 単行: Enter で確定、Shift+Enter で改行（テキスト型なので保存時に \n は trim 推奨）
            if (!ke.shiftKey) { e.preventDefault(); span.blur(); }
          }
        }
      });
      span.addEventListener('blur', () => {
        const nv = (span.textContent || '').trim();
        const oldVal = orig.trim();
        if (nv === oldVal) return;
        const data: Record<string, unknown> = {};
        data[f.InternalName] = nv;
        item[f.InternalName] = nv;
        orig = nv;
        setSave('保存中...');
        apiUpdateDbRow(S.dbList, item.Id, data)
          .then(() => {
            setSave('');
            recordCellChange(S.dbList, item.Id, f.InternalName, f.Title, oldVal, nv);
          })
          .catch((e: Error) => { toast(e.message, 'err'); span.textContent = orig; });
      });
      td.appendChild(span);
      // タイトル列にホバー時「↗」を表示し、行をページとして開く
      if (f.InternalName === 'Title') {
        td.style.position = 'relative';
        span.style.fontWeight = '500';
        td.appendChild(mkOpenRowBtn(item));
      }
    }
    tr.appendChild(td);
  });

  const delTd = document.createElement('td');
  delTd.className = 'memola-td-del';
  const delBtn = document.createElement('button');
  delBtn.className = 'memola-del-btn';
  delBtn.title = '行を削除';
  delBtn.textContent = '🗑';
  delBtn.addEventListener('click', () => {
    if (!confirm('この行を削除しますか？')) return;
    setLoad(true, '削除中...');
    const listTitle = S.dbList;
    deleteRowWithUndo(listTitle, item.Id)
      .then(() => {
        tr.remove();
        toast('削除しました（⌘Z で復元可能）');
      })
      .catch((e: Error) => { toast('削除失敗: ' + e.message, 'err'); })
      .finally(() => { setLoad(false); });
  });
  delTd.appendChild(delBtn);
  tr.appendChild(delTd);
  // Add empty cells for "+" column and spacer column to keep alignment
  tr.appendChild(document.createElement('td'));
  const spacerTd = document.createElement('td');
  spacerTd.className = 'memola-td-spacer';
  tr.appendChild(spacerTd);
  return tr;
}

export function renderKanban(): void {
  const kb = g('kb');
  kb.innerHTML = '';

  const choiceField = S.dbFields.find((f) => f.FieldTypeKind === 6 && f.Choices);
  if (!choiceField || !choiceField.Choices) {
    const msg = document.createElement('div');
    msg.style.cssText = 'padding:40px;color:#9b9a97;font-size:14px;';
    msg.textContent = '選択肢列を追加してください';
    kb.appendChild(msg);
    return;
  }

  const choices = choiceField.Choices.concat(['未設定']);
  choices.forEach((choice) => {
    const col = document.createElement('div');
    col.className = 'memola-kb-col';
    col.dataset.choice = choice;
    const hd = document.createElement('div');
    hd.className = 'memola-kb-col-hd';
    hd.textContent = choice;
    col.appendChild(hd);

    const colItems = getSortedFilteredItems().filter((item) => {
      const val = (item[choiceField.InternalName] as string) || '';
      return choice === '未設定' ? !val : val === choice;
    });

    colItems.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'memola-kb-card';
      if (S.dbSelected.has(item.Id)) card.classList.add('memola-card-sel');
      card.draggable = true;
      card.dataset.id = String(item.Id);
      const titleSpan = document.createElement('span');
      titleSpan.className = 'memola-kb-card-title';
      titleSpan.textContent = item.Title || '(無題)';
      card.appendChild(titleSpan);
      card.appendChild(mkOpenRowBtn(item));
      attachCardSelectionHandlers(card, item.Id);
      attachCardDragHandlers(card, item.Id);
      col.appendChild(card);
    });

    // Column accepts kanban-card drops → change row's choice value
    col.addEventListener('dragover', (e) => {
      const dt = e.dataTransfer;
      if (!dt || Array.from(dt.types).indexOf('text/memola-kb') < 0) return;
      e.preventDefault();
      dt.dropEffect = 'move';
      // Show line indicator: between cards (insert position) within this column
      showCardDropLine(col, e.clientY);
    });
    col.addEventListener('dragleave', (e) => {
      const rt = (e as DragEvent).relatedTarget as Node | null;
      if (!rt || !col.contains(rt)) hideCardDropLine();
    });
    col.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (!dt) return;
      const idStr = dt.getData('text/memola-kb');
      if (!idStr) return;
      e.preventDefault();
      hideCardDropLine();
      const rowId = parseInt(idStr, 10);
      const item = S.dbItems.find((i) => i.Id === rowId);
      if (!item) return;
      // If multi-selection includes the dragged row, move all selected rows.
      // Otherwise just the one being dragged.
      const draggedIds = S.dbSelected.has(rowId) ? Array.from(S.dbSelected) : [rowId];
      const newVal = choice === '未設定' ? '' : choice;
      // Move every dragged row whose current value differs from the target column.
      const updates: Promise<unknown>[] = [];
      const reverts: Array<() => void> = [];
      for (const id of draggedIds) {
        const it = S.dbItems.find((i) => i.Id === id);
        if (!it) continue;
        const oldVal = (it[choiceField.InternalName] as string) || '';
        if (newVal === oldVal) continue;
        it[choiceField.InternalName] = newVal;
        reverts.push(() => { it[choiceField.InternalName] = oldVal; });
        updates.push(
          apiUpdateDbRow(S.dbList, id, { [choiceField.InternalName]: newVal })
            .then(() => recordCellChange(S.dbList, id, choiceField.InternalName, choiceField.Title, oldVal, newVal)),
        );
      }
      if (updates.length === 0) return;
      // Defer the re-render so the browser's drag cleanup completes first;
      // calling renderKanban() synchronously inside the drop handler can
      // destroy the source card before `dragend` fires, leaving a stale
      // dragging state that breaks the next drag-from-the-same-column.
      Promise.all(updates)
        .then(() => requestAnimationFrame(() => renderKanban()))
        .catch((err: Error) => {
          reverts.forEach((r) => r());
          toast('変更失敗: ' + err.message, 'err');
          requestAnimationFrame(() => renderKanban());
        });
    });

    kb.appendChild(col);
  });
}

// ── Card drag / selection helpers (shared by kanban + gallery) ─────────

let _cardDropLine: HTMLElement | null = null;
function ensureCardDropLine(): HTMLElement {
  const overlay = document.getElementById('memola-overlay') || document.body;
  if (_cardDropLine && overlay.contains(_cardDropLine)) return _cardDropLine;
  const el = document.createElement('div');
  el.className = 'memola-card-drop-line';
  overlay.appendChild(el);
  _cardDropLine = el;
  return el;
}

/** Place a horizontal line indicator at the nearest card-gap to clientY
 *  inside `container`. Used by kanban columns. */
export function showCardDropLine(container: HTMLElement, clientY: number): void {
  const cards = Array.from(container.querySelectorAll<HTMLElement>('.memola-kb-card, .memola-gv-card'));
  if (cards.length === 0) {
    // Empty column → place line just under the column header
    const r = container.getBoundingClientRect();
    const line = ensureCardDropLine();
    line.style.top = (r.top + 36) + 'px';
    line.style.left = (r.left + 8) + 'px';
    line.style.width = (r.width - 16) + 'px';
    line.classList.add('on');
    return;
  }
  let target: HTMLElement = cards[0];
  let placeAfter = false;
  for (const c of cards) {
    const cr = c.getBoundingClientRect();
    if (clientY < cr.top + cr.height / 2) { target = c; placeAfter = false; break; }
    target = c; placeAfter = true;
  }
  const tr = target.getBoundingClientRect();
  const line = ensureCardDropLine();
  line.style.top = ((placeAfter ? tr.bottom : tr.top) - 1) + 'px';
  line.style.left = tr.left + 'px';
  line.style.width = tr.width + 'px';
  line.classList.add('on');
}

export function hideCardDropLine(): void {
  if (_cardDropLine) _cardDropLine.classList.remove('on');
  // Defensive: gallery view creates its own drop-line element (different
  // module-local ref); clear every line in the DOM so a stray one doesn't
  // linger after a kanban → gallery transition.
  document.querySelectorAll<HTMLElement>('.memola-card-drop-line').forEach((el) => {
    el.classList.remove('on');
  });
}

/** Click + Shift+click handlers for card selection. Mirrors table checkbox
 *  selection (uses the same S.dbSelected set so the bulk toolbar appears). */
export function attachCardSelectionHandlers(card: HTMLElement, itemId: number): void {
  card.addEventListener('click', (e) => {
    // Ignore clicks on the open-row (↗) button
    if ((e.target as HTMLElement).closest('.memola-row-open')) return;
    const me = e as MouseEvent;
    if (me.shiftKey) {
      if (S.dbSelected.has(itemId)) S.dbSelected.delete(itemId);
      else S.dbSelected.add(itemId);
      card.classList.toggle('memola-card-sel', S.dbSelected.has(itemId));
      void import('./db-bulk').then((m) => m.renderBulkBar());
    }
  });
}

/** Standard drag handlers for kanban / gallery cards. */
export function attachCardDragHandlers(card: HTMLElement, itemId: number): void {
  card.addEventListener('dragstart', (e) => {
    if (!e.dataTransfer) return;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/memola-kb', String(itemId));
    // Fade every selected card if this drag is part of a multi-selection
    const ids = S.dbSelected.has(itemId) ? Array.from(S.dbSelected) : [itemId];
    document.querySelectorAll<HTMLElement>('.memola-kb-card[data-id], .memola-gv-card[data-id]').forEach((n) => {
      const id = parseInt(n.dataset.id || '0', 10);
      if (ids.indexOf(id) >= 0) n.classList.add('memola-kb-card-dragging');
    });
  });
  card.addEventListener('dragend', () => {
    document.querySelectorAll('.memola-kb-card-dragging').forEach((n) =>
      n.classList.remove('memola-kb-card-dragging'));
    hideCardDropLine();
  });
}
