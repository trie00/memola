// Page / database view switching + page-load orchestration.
//
// DB-view rendering (table, kanban) lives in views-table.ts and
// views-kanban.ts; this file re-exports them so existing import sites
// can keep `from './views'` and stay decoupled from the split.

import { S, type ListItem, type Page } from '../state';
import { SITE } from '../config';
import { g, getEd } from './dom';
import { setLoad, setSavedAt, toast, autoR } from './ui-helpers';
import { renderTree, ancs, renderBc } from './tree';
import { apiLoadContentMeta } from '../api/pages';
import { escapeHtml } from '../lib/html-escape';
import { startWatching, stopWatching } from './sync-watch';
import { saver } from '../lib/saver';
import { applyOutlineState } from './outline';
import { applyPropertiesState } from './properties-panel';
import { syncPubTag } from './pub-tag';
import { pushHistory, refreshButtons as refreshNavButtons } from './nav-history';
import { syncPresenceForCurrent } from './presence-ui';
import { getListFields, getListItems } from '../api/sp-list';
import { prefLastOpenedPages } from '../lib/prefs';
import { renderDbTable, setSelectionAnchor } from './views-table';

// doSave is imported lazily to avoid circular load issues.
import { flushPendingSave } from './save-control';
import { metaById } from '../lib/page-store';

// ── Re-exports so call sites can keep `from './views'` ──────────────
export {
  getDbFields,
  getSortedFilteredItems,
  isManualRowOrderActive,
  reorderRows,
  setSelectionAnchor,
  renderDbTable,
  mkOpenRowBtn,
  mkDbRow,
} from './views-table';
export {
  renderKanban,
  showCardDropLine,
  hideCardDropLine,
  attachCardSelectionHandlers,
  attachCardDragHandlers,
} from './views-kanban';

export function showView(mode: 'page' | 'db' | 'empty' | 'library'): void {
  // 'library' is a standalone full-width view (the all-pages list); it
  // hides the editor area, DB view, and empty-state alike.
  g('ea').style.display = (mode === 'page' || mode === 'empty') ? 'flex' : 'none';
  g('em').style.display = mode === 'empty' ? 'flex'  : 'none';
  g('ct').style.display = mode === 'page'  ? 'block' : 'none';
  g('tb').style.display = mode === 'page'  ? 'flex'  : 'none';
  g('dv').style.display = mode === 'db'    ? 'flex'  : 'none';
  g('lib').style.display = mode === 'library' ? 'block' : 'none';
  // Leaving the library hides its multi-select bulk bar so it doesn't
  // linger over a page/DB view.
  if (mode !== 'library') {
    const lb = document.getElementById('memola-lib-bulkbar');
    if (lb) lb.classList.remove('on');
  }
  // Refresh the publish tag for the new context — hides for DB / empty /
  // library, reflects current state for page.
  syncPubTag();
  // Clear the per-page save-time label when there's no page open
  if (mode === 'empty' || mode === 'library') setSavedAt(null);
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
  const metaPage = metaById(id);
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
      const { pruneEmptyTodosEditor2 } = await import('./editor2/editor2-bridge');
      const n = pruneEmptyTodosEditor2();
      if (n > 0) {
        // Persist the prune by pushing the new content to the Saver
        // (transitions 'idle' → 'dirty'); flushPendingSave below picks
        // it up. Earlier code set `S.dirty = true` directly, which is
        // no longer the source of truth.
        const { schedSave: nudgeSaver } = await import('./save-control');
        nudgeSaver();
      }
    } catch { /* ignore */ }
  }
  // Flush any pending / in-flight save to disk before we replace the
  // editor DOM. This is the fix for "navigating away loses my last edits"
  // — `flushPendingSave` waits for an in-flight save (autosave) to finish
  // and then performs another save if the user typed during that flight.
  // Critical: must run BEFORE we clear `S.currentRow`; the row-page save
  // path inside flushPendingSave keys off that flag.
  if (S.currentType !== 'database') await flushPendingSave();
  // ページ遷移時は横断検索パネル(検索タブ表示)を隠す。
  void import('./xchat').then((m) => m.hideSearchTab());
  // Page change — Saver ownership transfer happens automatically via
  // saver.unload() (called from stopWatching paths) and saver.loadPage()
  // (called after content load). No explicit "conflict-pending" flag
  // is needed: the Saver's state IS the source of truth.
  S.currentRow = null;          // 別のページ/DB 選択時は行ページモードを解除
  S.currentId = id;
  // Capture the navigation generation: a slow `apiLoadContentMeta`
  // resolving after a newer doSelect started must NOT mount its editor /
  // overwrite watchers / call saver.loadPage on stale data. Each await
  // below re-checks `S.currentId === id` and bails if it changed.
  const navId = id;
  const page = S.pages.find((p) => p.Id === id);
  if (!page) return;
  // Tear down the previous page's comment markers/popover before switching.
  void import('./comments-ui').then((m) => m.clearComments());
  // Clear any live-merge "incoming" block highlight (leaving + returning
  // resets it, per spec).
  void import('./merge-highlight').then((m) => m.clearMergeHighlight());
  // Push into the back/forward history stack — pushHistory() ignores the
  // call when we're navigating *through* history (skip flag).
  pushHistory(id);
  ancs(id).forEach((p) => { S.expanded.add(p.Id); });
  renderTree(); renderBc(id);
  if (page.Type === 'database') {
    await doSelectDb(id, page);
    // Databases can also be link targets — show their リンク元 panel
    // (renders into the DB-view container; the scan is target-agnostic).
    void import('./backlinks').then((m) => m.renderBacklinks());
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
      if (S.currentId !== navId) return;     // navigated away during fetch
      // Phase 2c-5: editor2 (controlled rendering) is the only path.
      // Mount the editor with the block-tree from storage; the inline
      // contenteditable=false islands (table / linkdb / ai) bind their
      // own handlers via editor-render's per-block dispatch.
      const { mountEditor2, loadBlocksFromJson } =
        await import('./editor2/editor2-bridge');
      if (S.currentId !== navId) return;     // and during dynamic import
      mountEditor2(getEd());
      loadBlocksFromJson(meta?.body || '');
      // Mark page-link chips whose target page is missing (broken-link
      // visual) — runs against the editor2-rendered DOM.
      void import('./page-picker').then((m) => m.markBrokenPageLinks(getEd()));
      // Track file meta so we can detect remote updates and conflicts on save.
      // The modified/etag we hand to startWatching are guaranteed to belong
      // to the same SP version as the Body we just rendered.
      if (meta) {
        startWatching(id, meta.modified, meta.etag);
        // Establish the Saver's baseline. All save / conflict / merge
        // logic now keys off this snapshot; legacy `S.sync.baseBody`
        // and `S.sync.loadedEtag` are kept in sync by saver-bridge.
        const titleEl = g('ttl') as HTMLTextAreaElement | null;
        const titleText = (titleEl?.value || page.Title || '無題').trim() || '無題';
        saver.loadPage({
          pageId: id,
          body: meta.body,
          title: titleText,
          etag: meta.etag,
          modified: meta.modified,
        });
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
        saver.unload();
        setSavedAt(null);
      }
      applyOutlineState();
      applyPropertiesState();
    } catch (e) {
      getEd().innerHTML = '';
      toast('読み込み失敗: ' + (e as Error).message, 'err');
      stopWatching();
      saver.unload();
      setSavedAt(null);
    } finally { setLoad(false); }
    // S.dirty is owned by the Saver — saver.loadPage() above transitioned
    // to 'idle', and saver-bridge mirrored that out. Nothing to do here.
    syncPubTag();
    refreshNavButtons();
    syncDraftBanner();
    syncTemplateBanner('page');
    syncPresenceForCurrent();
    // Backlinks panel — render lazily after the editor itself is ready.
    void import('./backlinks').then((m) => m.renderBacklinks());
    // Comments — load + render gutter markers for this page.
    void import('./comments-ui').then((m) => {
      const target = m.currentCommentTarget();
      if (target && S.currentId === navId) void m.loadCommentsFor(target.pageId, target.scope);
    });
  }
  // Remember the last-opened page so the next app session reopens it.
  // Keyed by SITE so each workspace gets its own "last page" memory.
  rememberLastOpenedPage(id);
  // タブ: アクティブタブの中身をこのページに差し替える(= 同一タブ内遷移)。
  void import('./tabs').then((m) => m.openInActiveTab(id, (page.Title || '無題')));
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
/** Show a prominent banner when the open page/DB is a TEMPLATE, so the
 *  user knows they're editing the template itself (not a normal page).
 *  `which` picks the page-view banner or the DB-view banner. */
function syncTemplateBanner(which: 'page' | 'db'): void {
  const pageBn = document.getElementById('memola-template-banner');
  const dbBn = document.getElementById('memola-template-banner-db');
  // Hide both first so switching views never leaves a stale banner.
  if (pageBn) { pageBn.style.display = 'none'; pageBn.innerHTML = ''; }
  if (dbBn) { dbBn.style.display = 'none'; dbBn.innerHTML = ''; }
  const meta = S.currentId ? metaById(S.currentId) : null;
  if (!meta?.isTemplate) return;
  const bn = which === 'db' ? dbBn : pageBn;
  if (!bn) return;
  const kind = meta.type === 'database' ? 'DB' : 'ページ';
  bn.style.display = '';
  bn.innerHTML =
    '<span class="memola-template-banner-icon">🧩</span>' +
    '<span class="memola-template-banner-msg">これは<b>テンプレート</b>の編集画面です。'
    + 'ここでの変更は、今後このテンプレートから作成する' + kind + 'に反映されます。</span>';
}

function syncDraftBanner(): void {
  const bn = document.getElementById('memola-draft-banner');
  if (!bn) return;
  const meta = S.currentId ? metaById(S.currentId) : null;
  if (!meta?.originPageId) {
    bn.style.display = 'none';
    bn.innerHTML = '';
    return;
  }
  const origin = metaById(meta.originPageId);
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
      : '<span class="memola-draft-banner-broken">原本が削除されています</span>' +
        '<button class="memola-draft-banner-promote" type="button">新規ページとして保存</button>'
    );
  // Click on origin link → navigate to origin
  bn.querySelector<HTMLElement>('.memola-draft-banner-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    const id = (e.target as HTMLElement).dataset.originId;
    if (id) void doSelect(id);
  });
  // Apply button → copy draft body to origin
  bn.querySelector<HTMLElement>('.memola-draft-banner-apply')?.addEventListener('click', async () => {
    // Flush any pending edits via the Saver before the structural op
    const m = await import('./save-control');
    await m.flushPendingSave();
    if (!confirm(
      '下書きの内容を原本「' + originTitle + '」に適用します。\n\n' +
      '・原本が下書き作成後に変更されていれば自動で3-wayマージします\n' +
      '・原本の現在の本文は SP のバージョン履歴に残ります\n' +
      '・この下書きページは削除されます\n' +
      '・原本へのリンク ([[' + meta.originPageId + ']]) は壊れません\n\n' +
      '続行しますか？',
    )) return;
    try {
      setLoad(true, '原本に適用中…');
      const draftId = S.currentId;
      if (!draftId) return;
      const { applyDraftToOriginInteractive } = await import('./drafts-modal');
      await applyDraftToOriginInteractive(draftId);
    } catch (e) {
      toast('適用失敗: ' + (e as Error).message, 'err');
    } finally { setLoad(false); }
  });
  // Promote button (origin gone) → turn the draft into a standalone page
  bn.querySelector<HTMLElement>('.memola-draft-banner-promote')?.addEventListener('click', async () => {
    const m = await import('./save-control');
    await m.flushPendingSave();
    if (!confirm('原本が削除されているため、この下書きを新規ページとして保存します。続行しますか？')) return;
    try {
      setLoad(true, '保存中…');
      const draftId = S.currentId;
      if (!draftId) return;
      const { apiPromoteDraftToPage, apiGetPages } = await import('../api/pages');
      const newId = await apiPromoteDraftToPage(draftId);
      await apiGetPages();
      const { renderTree } = await import('./tree');
      renderTree();
      void import('./drafts-modal').then((m2) => m2.refreshDraftsBadge?.());
      await doSelect(newId);
      toast('新規ページとして保存しました');
    } catch (e) {
      toast('保存失敗: ' + (e as Error).message, 'err');
    } finally { setLoad(false); }
  });
}

export async function doSelectDb(id: string, page: Page): Promise<void> {
  S.currentType = 'database';
  void import('./comments-ui').then((m) => m.clearComments());
  stopWatching();
  saver.unload();
  syncPubTag();
  syncPresenceForCurrent();           // DB views have no presence tracking
  setSavedAt(null);                   // DB views have no per-row save time
  applyOutlineState();
  applyPropertiesState();
  // Attach the floating row-drag handle (idempotent — only wires global listeners once)
  void import('./db-row-drag').then((m) => m.attachDbRowDrag());
  const meta = metaById(id);
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
    S.dbSelected.clear();
    setSelectionAnchor(null);
    // 数式列(共有設定)を先に読み込む → テーブル描画時に反映される。
    await import('./db-formulas').then((m) => m.loadFormulas(S.dbList)).catch(() => undefined);
    // ビュー(リスト単位で複数)を初期化 → active ビューの filters/sort/type を反映。
    const bar = await import('./db-views-bar');
    const { getActiveViewId } = await import('./db-views-model');
    S.dbViewId = getActiveViewId(meta.list);
    bar.renderViewBar();
    bar.applyActiveView();
    syncTemplateBanner('db');
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
