// Bookmarklet bootstrap — `attachAll()` orchestrates the per-feature
// `attachX()` modules in the right order, then `init()` resolves the
// workspace and opens the last-viewed page. Most behaviour lives in
// the small modules referenced below; this file only owns the boot
// sequence.

import { S } from '../state';
import { g } from './dom';
import { setLoad, toast } from './ui-helpers';
import { renderTree } from './tree';
import { showView, doSelect } from './views';
import { doNewDbRow, closeApp, teardown } from './actions';
import { flushPendingSave } from './save-control';
import { onKey } from './keymap';
import { attachEmojiPickerOutsideClick } from './emoji-picker';
import { attachCreateMenu } from './create-menu';
import { attachColumnModal } from './column-modal';
import { attachDbToolbar } from './db-toolbar';
import { attachSidebarWiring } from './sidebar-wiring';
import { attachLibrary } from './library';
import { attachEditorToolbar } from './editor-toolbar';
import { attachIconButtons } from './icon-buttons';
import { attachQuickSearch } from './quick-search-wiring';
import { attachTitleWiring } from './title-wiring';
import { openTodayDailyNote, showDailyPicker } from './daily-note-actions';
import { attachPageMenuWiring } from './page-menu-wiring';
import { attachSettingsModal } from './settings-modal';
import { attachAiChatWiring } from './ai-chat-wiring';
import { attachXChat } from './xchat';
import { attachCommandPalette } from './command-palette-wiring';
import { attachSidePanels } from './side-panels-wiring';
import { attachPubTag } from './pub-tag';
import { attachScopeTag } from './scope-tag';
import { attachDraftsSidebar, refreshDraftsBadge } from './drafts-modal';
import { attachInbox } from './inbox-ui';
import { attachPresence } from './presence-ui';
import { attachStaleBannerSuppressionReset, attachCrossTabSync } from './sync-watch';
import { attachTabRefocusRefresh, attachPeriodicTreeSync } from './tab-refocus-refresh';
import { attachSaverBridge } from '../lib/saver-bridge';
import { attachAutosaveScheduler } from '../lib/autosave';
import { attachConflictModal } from './conflict-modal';
import { attachMergeModal } from './merge-modal';
import {
  applyFocusMode, toggleFocusMode, applyViewportAutoCollapse,
} from './focus-mode';
import { apiGetPages } from '../api/pages';
import { apiCreateDb } from '../api/db';
import { addPage } from '../lib/page-store';

async function doNewDb(parentId: string): Promise<void> {
  try {
    setLoad(true, 'DBを作成中...');
    const p = await apiCreateDb('無題DB', parentId || '');
    addPage({ Id: p.Id, Title: p.Title, ParentId: p.ParentId, Type: 'database' });
    renderTree();
    await doSelect(p.Id);
  } catch (e) { toast('DB作成に失敗: ' + (e as Error).message, 'err'); }
  finally { setLoad(false); }
}

/** Reload the page list (tree) + the currently-displayed page/DB/row from
 *  SharePoint. Flushes any pending edits first so a re-fetch can't clobber
 *  unsaved work. Wired to the top-bar 🔄 button. */
async function doReload(): Promise<void> {
  try {
    setLoad(true, '再読み込み中...');
    const row = S.currentRow;
    if (S.currentType !== 'database') await flushPendingSave();
    await apiGetPages();
    renderTree();
    const id = S.currentId;
    const page = id ? S.pages.find((p) => p.Id === id) : null;
    if (row) {
      // Row detail page — refetch the row and re-open it.
      const { getListItemById } = await import('../api/sp-list');
      const item = await getListItemById(row.listTitle, row.itemId);
      if (item) { const { openRowAsPage } = await import('./row-page'); await openRowAsPage(row.dbId, item); }
    } else if (page && id) {
      if (page.Type === 'database') { const { doSelectDb } = await import('./views'); await doSelectDb(id, page); }
      else await doSelect(id);
    }
    toast('再読み込みしました');
  } catch (e) { toast('再読み込み失敗: ' + (e as Error).message, 'err'); }
  finally { setLoad(false); }
}

export function attachAll(): void {
  // Top bar
  g('x').addEventListener('click', closeApp);
  g('reload-btn').addEventListener('click', () => void doReload());

  // Sidebar / nav-history / daily-notes / empty-state CTAs
  attachSidebarWiring({ openTodayDailyNote, showDailyPicker, doNewDb });

  // 「📚 ライブラリ」 sidebar entry — full-page all-pages list
  attachLibrary();

  // Quick-add (＋ 新規) popover
  attachCreateMenu(doNewDb);

  // Add DB row button
  g('dadd').addEventListener('click', doNewDbRow);

  // Editor toolbar (#tb / #ftb)
  attachEditorToolbar();

  // First-run setup modal — single helper button that bootstraps
  // memola-pages by triggering apiGetPages. Tiny enough to inline.
  g('mc').addEventListener('click', () => { g('md').classList.remove('on'); });
  g('mk').addEventListener('click', async () => {
    g('md').classList.remove('on');
    setLoad(true, 'リストを準備中...');
    try {
      await apiGetPages();
      renderTree();
      toast('memola-pages リストを初期化しました');
    } catch (e) { toast('初期化に失敗: ' + (e as Error).message, 'err'); }
    finally { setLoad(false); }
  });

  // Column-add modal (DB grid)
  attachColumnModal();

  // Title bar (page textarea + DB contenteditable)
  attachTitleWiring();

  // DB grid toolbar (view-switcher / CSV / filter / new-row)
  attachDbToolbar();

  // Page / DB icon buttons + emoji-remove
  attachIconButtons();

  // Command palette (Cmd+K)
  attachCommandPalette({ doNewDb });

  // Quick-search popover
  attachQuickSearch();

  // Editor body — the controlled-rendering editor2 mounts itself
  // lazily inside `views.ts:doSelect` (per-page mount). Nothing to
  // attach at app boot.

  // Emoji outside-click closer
  attachEmojiPickerOutsideClick();

  // Top-bar tags (publish status, scope label) + sync banners
  attachPubTag();
  attachScopeTag();
  attachStaleBannerSuppressionReset();
  attachTabRefocusRefresh();
  attachPeriodicTreeSync();
  attachCrossTabSync();

  // Saver state machine — single source of truth for save lifecycle.
  // The bridge keeps legacy S.dirty / S.saving / S.sync.* in sync.
  // The autosave scheduler arms a timer when the Saver is 'dirty'.
  // The conflict / merge modals subscribe and render based on state.
  attachSaverBridge();
  attachAutosaveScheduler();
  attachConflictModal();
  attachMergeModal();

  // Drafts sidebar entry (visible only when draft count > 0)
  attachDraftsSidebar();
  attachInbox();
  refreshDraftsBadge();

  // Presence indicator (top bar avatars)
  attachPresence();

  // Page menu (top-right "...")
  attachPageMenuWiring({ toggleFocusMode });

  // Persisted focus mode + viewport-based auto collapse
  applyFocusMode();
  applyViewportAutoCollapse();
  window.addEventListener('resize', applyViewportAutoCollapse);
  _viewportAutoCollapseAttached = true;

  // Side panels (outline / properties / trash / workspace switcher)
  attachSidePanels();

  // Settings modal (AI provider / theme / save-sync prefs / reset)
  attachSettingsModal();

  // AI chat panel
  attachAiChatWiring();

  // 横断チャット (cross-document RAG chat)
  attachXChat();

  // Global keydown
  document.addEventListener('keydown', onKey);
}

// Tracked so `detachViewportAutoCollapse` (called from teardown) only
// removes the listener if attachAll() actually attached it. Without
// this, repeated bookmarklet presses leaked a fresh resize listener
// per cycle.
let _viewportAutoCollapseAttached = false;

/** Drop the resize listener attached in `attachAll`. Called from
 *  `teardown` so re-pressing the bookmarklet doesn't pile up handlers. */
export function detachViewportAutoCollapse(): void {
  if (!_viewportAutoCollapseAttached) return;
  window.removeEventListener('resize', applyViewportAutoCollapse);
  _viewportAutoCollapseAttached = false;
}

// ── INIT ─────────────────────────────────────────────
/** Tear down everything that lives outside the DOM (intervals, listeners,
 *  presence row). Called when the user re-presses the bookmarklet to
 *  "close" the app — without this, the OLD instance's sync poller keeps
 *  running invisibly. Stored on the overlay element so the new IIFE can
 *  reach it across closure boundaries. */
function memolaShutdown(): void {
  void teardown({ flushSave: true, removeOverlay: false });
}

export async function init(): Promise<void> {
  const ov = document.getElementById('memola-overlay') as (HTMLElement & {
    __memolaShutdown?: () => void;
  }) | null;
  if (ov) ov.__memolaShutdown = memolaShutdown;

  setLoad(true);
  try {
    // Resolve workspace selection before touching SP — drops a stale
    // current-workspace name if it's been deleted from the list, etc.
    const { ensureWorkspaceSelected } = await import('./workspaces');
    await ensureWorkspaceSelected();
    // memola-pages list is auto-created by apiGetPages on first call
    await apiGetPages();
    renderTree();
    showView('empty');
    // Boot-time page selection priority:
    //   1. Last-opened page from previous session (per workspace)
    //   2. First non-draft page (fallback)
    const { loadLastOpenedPage } = await import('./views');
    const lastId = loadLastOpenedPage();
    const lastPage = lastId
      ? S.pages.find((p) => p.Id === lastId && !p.IsDraft)
      : null;
    const target = lastPage || S.pages.find((p) => !p.IsDraft) || null;
    if (target) await doSelect(target.Id);
  } catch (e) {
    g('em').innerHTML = '<div style="font-size:48px">⚠️</div><h2>エラー</h2><p>' + (e as Error).message + '</p>';
    g('em').style.display = 'flex';
    console.error(e);
  } finally { setLoad(false); }
}
