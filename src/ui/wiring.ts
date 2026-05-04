// Event-listener registration & app bootstrap.

import { S } from '../state';
import { g, getEd } from './dom';
import { setLoad, setSave, toast, autoR } from './ui-helpers';
import { renderTree } from './tree';
import { showView, doSelect, renderPageIcon, renderDbTable, renderKanban } from './views';
import { execCmd, attachEditor } from './editor';
import {
  doNew, doDel, doSave, schedSave, doNewDbRow, closeApp, onKey, clearSaveTimer, teardown,
  showEmojiPicker, attachEmojiPickerOutsideClick,
  exportMd, exportHtml, duplicateCurrent, copyPageLink, printCurrent, showPageInfo,
  togglePageMenu, hidePageMenu, attachPageMenuOutsideClick,
} from './actions';
import { openSearch, closeSearch, renderQs, qsMove, qsConfirm, resetQsSel, setCommandActions } from './search-ui';
import {
  closeAiPanel, toggleAiPanel, sendAiMessage, clearAiHistory,
  getQuickPrompts, loadAiSession, newAiSession, renderHistoryDropdown,
  applyAiPanelState,
} from './ai-chat';
import { toggleOutline, applyOutlineState, attachOutlineWatcher } from './outline';
import { getApiKey, setApiKey } from '../api/anthropic';
import { togglePropertiesPanel, applyPropertiesState } from './properties-panel';
import { attachPubTag, syncPubTag } from './pub-tag';
import { attachScopeTag, syncScopeTag, toggleCurrentPageScope } from './scope-tag';
import { attachDraftsSidebar, refreshDraftsBadge, openDraftsModal } from './drafts-modal';
import { attachPresence, shutdownPresence } from './presence-ui';
import { stopWatching, attachStaleBannerSuppressionReset } from './sync-watch';
import { showWorkspaceMenu, getCurrentWorkspaceName } from './workspaces';
import { openTrash, closeTrash } from './trash';
import { exportCsv, importCsv } from './csv-io';
import {
  prefFocusMode, prefSidebarState, prefDensity, prefTheme,
  prefSaveDelayMs, prefSyncPollMs, prefPresenceEnabled,
} from '../lib/prefs';
import { openShortcutsModal } from './shortcuts-modal';

function applyFocusMode(): void {
  const ov = document.getElementById('memola-overlay');
  if (!ov) return;
  const isFocus = prefFocusMode.get() === '1';
  if (isFocus) {
    ov.classList.add('focus-mode');
    // Focus mode auto-hides the sidebar (don't persist this state)
    document.getElementById('memola-sb')?.classList.add('collapsed');
  } else {
    ov.classList.remove('focus-mode');
    // Restore persisted visibility on exit
    const saved = prefSidebarState.get();
    const sb = document.getElementById('memola-sb');
    if (sb) {
      sb.classList.remove('collapsed');
      if (saved === 'collapsed') sb.classList.add('collapsed');
    }
  }
}
function toggleFocusMode(): void {
  const cur = prefFocusMode.get() === '1';
  if (cur) prefFocusMode.clear();
  else prefFocusMode.set('1');
  applyFocusMode();
}

// ビューポート < 900px で自動折畳（明示状態を上書きしない）
function applyViewportAutoCollapse(): void {
  const sb = document.getElementById('memola-sb');
  if (!sb) return;
  if (window.innerWidth < 900) {
    if (!sb.classList.contains('collapsed')) {
      sb.dataset.autoCollapsed = '1';
      sb.classList.add('collapsed');
    }
  } else if (sb.dataset.autoCollapsed === '1') {
    delete sb.dataset.autoCollapsed;
    sb.classList.remove('collapsed');
  }
}
import { apiGetPages, apiSetIcon, apiSetTitle } from '../api/pages';
import { apiCreateDb } from '../api/db';
import { addListField, getListFields, getListItems } from '../api/sp-list';

async function doNewDb(parentId: string): Promise<void> {
  try {
    setLoad(true, 'DBを作成中...');
    const p = await apiCreateDb('無題DB', parentId || '');
    S.pages.push({ Id: p.Id, Title: p.Title, ParentId: p.ParentId, Type: 'database' });
    renderTree();
    await doSelect(p.Id);
  } catch (e) { toast('DB作成に失敗: ' + (e as Error).message, 'err'); }
  finally { setLoad(false); }
}

export function attachAll(): void {
  // Close button
  g('x').addEventListener('click', closeApp);

  // Sidebar visibility — 2 states: visible / collapsed (no more rail).
  // Topbar toggle and the in-sidebar × button both hide; topbar shows when hidden.
  function persistSidebarState(): void {
    const sb = g('sb');
    const state = sb.classList.contains('collapsed') ? 'collapsed' : 'expanded';
    prefSidebarState.set(state);
  }
  g('sb-toggle').addEventListener('click', () => {
    g('sb').classList.toggle('collapsed');
    persistSidebarState();
  });

  // Browser-style back/forward navigation through page-open history
  document.getElementById('memola-nav-back')?.addEventListener('click', () => {
    void import('./nav-history').then((m) => m.goBack());
  });
  document.getElementById('memola-nav-fwd')?.addEventListener('click', () => {
    void import('./nav-history').then((m) => m.goForward());
  });
  // Sidebar daily-notes section (between 「+ 新規」 and 「下書き / ゴミ箱」).
  // 「今日のノート」 = one-click open / create today's note.
  // 「日付を選んで開く」 = popover date picker for any day.
  document.getElementById('memola-sb-daily-today')?.addEventListener('click', () => {
    void openTodayDailyNote();
  });
  document.getElementById('memola-sb-daily-pick')?.addEventListener('click', (e) => {
    // Anchor the date-picker popover to the clicked sidebar entry so it
    // appears next to the user's mouse rather than at the top-bar default.
    showDailyPicker(e.currentTarget as HTMLElement);
  });
  document.getElementById('memola-sb-collapse')?.addEventListener('click', () => {
    g('sb').classList.add('collapsed');
    persistSidebarState();
  });
  if (prefSidebarState.get() === 'collapsed') g('sb').classList.add('collapsed');

  // New page buttons (empty-state CTA)
  g('ne').addEventListener('click', () => { doNew(''); });

  // DB create (empty-state CTA)
  g('ne-db').addEventListener('click', () => { doNewDb(''); });

  // Empty-state template chips & "テンプレ" button
  document.getElementById('memola-ne-tpl')?.addEventListener('click', () => {
    document.getElementById('memola-quick-add')?.click();
  });
  document.querySelectorAll<HTMLElement>('.memola-em-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const tpl = chip.dataset.tpl;
      if (tpl === 'tasks') void doNewDb('');
      else void doNew('');
    });
  });

  // Quick-add (＋ 新規) primary button → CreateMenu popup
  const quickAddBtn = document.getElementById('memola-quick-add');
  const createMenu = document.getElementById('memola-create-menu');
  if (quickAddBtn && createMenu) {
    quickAddBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = quickAddBtn.getBoundingClientRect();
      createMenu.style.left = rect.left + 'px';
      createMenu.style.top = (rect.bottom + 4) + 'px';
      createMenu.classList.toggle('on');
    });
    createMenu.addEventListener('click', (e) => {
      const item = (e.target as HTMLElement).closest<HTMLElement>('.memola-cm-item');
      if (!item) return;
      createMenu.classList.remove('on');
      switch (item.dataset.cm) {
        case 'new-page':
        case 'tpl-weekly':
        case 'tpl-minutes':
          void doNew('');
          break;
        case 'new-db':
        case 'tpl-tasks':
          void doNewDb('');
          break;
      }
    });
    document.addEventListener('click', (e) => {
      if (!createMenu.classList.contains('on')) return;
      if (createMenu.contains(e.target as Node) || quickAddBtn.contains(e.target as Node)) return;
      createMenu.classList.remove('on');
    });
  }

  // Add DB row
  g('dadd').addEventListener('click', doNewDbRow);

  // Toolbar buttons – preventDefault on mousedown preserves editor selection
  g('tb').addEventListener('mousedown', (e) => {
    if ((e.target as HTMLElement).closest('.memola-b')) e.preventDefault();
  });
  g('tb').addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('.memola-b');
    if (b && b.dataset.cmd) execCmd(b.dataset.cmd);
  });

  // Floating toolbar buttons
  g('ftb').addEventListener('mousedown', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('.memola-fb');
    if (b && b.dataset.cmd) { e.preventDefault(); execCmd(b.dataset.cmd); }
  });

  // Setup modal
  g('mc').addEventListener('click', () => { g('md').classList.remove('on'); });
  g('mk').addEventListener('click', async () => {
    g('md').classList.remove('on');
    setLoad(true, 'リストを準備中...');
    try {
      // apiGetPages auto-creates the memola-pages list and its columns on first call
      S.pages = await apiGetPages();
      renderTree();
      toast('memola-pages リストを初期化しました');
    } catch (e) { toast('初期化に失敗: ' + (e as Error).message, 'err'); }
    finally { setLoad(false); }
  });

  // Column modal — grid type picker
  let _colTypeKind = 2;
  const colGrid = document.getElementById('memola-col-type-grid');
  if (colGrid) {
    const tiles = Array.from(colGrid.querySelectorAll<HTMLDivElement>('.memola-col-type'));
    // Default selection
    tiles[0]?.classList.add('on');
    tiles.forEach((tile) => {
      tile.addEventListener('click', () => {
        tiles.forEach((t) => t.classList.remove('on'));
        tile.classList.add('on');
        _colTypeKind = parseInt(tile.dataset.tk || '2');
        g('col-choices-row').classList.toggle('on', _colTypeKind === 6 || _colTypeKind === 15);
      });
    });
  }
  g('col-cancel').addEventListener('click', () => { g('col-md').classList.remove('on'); });
  g('col-ok').addEventListener('click', async () => {
    const name = (g('col-name') as HTMLInputElement).value.trim();
    if (!name) { g('col-name').focus(); return; }
    const typeKind = _colTypeKind;
    let choices: string[] = [];
    if (typeKind === 6 || typeKind === 15) {
      const raw = (g('col-choices') as HTMLTextAreaElement).value.trim();
      choices = raw ? raw.split('\n').map((s) => s.trim()).filter(Boolean) : [];
    }
    g('col-md').classList.remove('on');
    setLoad(true, '列を追加中...');
    try {
      await addListField(S.dbList, name, typeKind, choices);
      const results = await Promise.all([getListFields(S.dbList), getListItems(S.dbList)]);
      const { stripInternalDbFields } = await import('../api/db');
      S.dbFields = stripInternalDbFields(results[0]);
      S.dbItems = results[1];
      renderDbTable();
      toast('列「' + name + '」を追加しました');
    } catch (e) { toast('列追加失敗: ' + (e as Error).message, 'err'); }
    finally { setLoad(false); }
  });
  g('col-name').addEventListener('keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.isComposing || ke.keyCode === 229) return;
    if (ke.key === 'Enter') (g('col-ok') as HTMLButtonElement).click();
    if (ke.key === 'Escape') g('col-md').classList.remove('on');
  });

  // Title textarea
  const te = g('ttl') as HTMLTextAreaElement;
  te.addEventListener('input', () => { autoR(te); S.dirty = true; setSave('未保存'); schedSave(); });
  te.addEventListener('keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.isComposing || ke.keyCode === 229) return;
    if (ke.key === 'Enter') { e.preventDefault(); getEd().focus(); }
  });

  // DB title editing
  g('dv-ttl').addEventListener('input', () => {
    const newTitle = (g('dv-ttl').textContent || '').trim() || '無題';
    if (S.currentId) {
      const p = S.pages.find((x) => x.Id === S.currentId);
      if (p) p.Title = newTitle;
      const mp = S.meta.pages.find((x) => x.id === S.currentId);
      if (mp) mp.title = newTitle;
      renderTree();
    }
  });
  g('dv-ttl').addEventListener('blur', () => {
    if (S.currentId) {
      const newTitle = (g('dv-ttl').textContent || '').trim() || '無題';
      apiSetTitle(S.currentId, newTitle).catch((e: Error) => {
        toast('タイトル保存失敗: ' + e.message, 'err');
      });
    }
  });

  // DB view switching (table / board / list / gallery / calendar / gantt)
  function setDbView(name: string): void {
    const buttons = ['dbv-table', 'dbv-board', 'dbv-list', 'dbv-gallery', 'dbv-calendar', 'dbv-gantt'];
    buttons.forEach((id) => g(id).classList.toggle('on', id === 'dbv-' + name));
    g('dt-wrap').style.display = name === 'table' ? '' : 'none';
    g('dadd').style.display = name === 'table' ? '' : 'none';
    g('kb').classList.toggle('on', name === 'board');
    ['list', 'gallery', 'calendar', 'gantt'].forEach((v) => {
      g(v + '-view').classList.toggle('on', name === v);
    });
    if (name === 'board') renderKanban();
    else if (['list', 'gallery', 'calendar', 'gantt'].includes(name)) {
      void import('./db-views-extra').then((m) => m.renderActiveView(name));
    }
  }
  g('db-csv-export').addEventListener('click', exportCsv);
  g('db-csv-import').addEventListener('click', importCsv);
  document.getElementById('memola-db-new-row')?.addEventListener('click', doNewDbRow);
  document.getElementById('memola-db-group-btn')?.addEventListener('click', () => {
    toast('グループ機能は今後実装予定');
  });
  g('dbv-table').addEventListener('click', () => setDbView('table'));
  g('dbv-board').addEventListener('click', () => setDbView('board'));
  g('dbv-list').addEventListener('click', () => setDbView('list'));
  g('dbv-gallery').addEventListener('click', () => setDbView('gallery'));
  g('dbv-calendar').addEventListener('click', () => setDbView('calendar'));
  g('dbv-gantt').addEventListener('click', () => setDbView('gantt'));

  // DB filter — Notion風のフィールド選択 popover を開く
  g('db-filter-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    void import('./filter-ui').then((m) => m.showFilterPopover());
  });
  void import('./filter-ui').then((m) => m.attachFilterPopoverOutsideClick());

  // Page icon buttons
  g('add-icon').addEventListener('click', () => {
    showEmojiPicker(g('add-icon'), (emoji) => {
      if (!S.currentId) return;
      const id = S.currentId;
      apiSetIcon(id, emoji).then(() => {
        renderPageIcon(id);
        renderTree();
      }).catch((e: Error) => { toast('アイコン保存失敗: ' + e.message, 'err'); });
    });
  });
  g('pg-icon').addEventListener('click', () => {
    showEmojiPicker(g('pg-icon'), (emoji) => {
      if (!S.currentId) return;
      const id = S.currentId;
      apiSetIcon(id, emoji).then(() => {
        renderPageIcon(id);
        renderTree();
      }).catch((e: Error) => { toast('アイコン保存失敗: ' + e.message, 'err'); });
    });
  });
  // DB icon buttons
  function setDbIcon(emoji: string): void {
    if (!S.currentId) return;
    const id = S.currentId;
    apiSetIcon(id, emoji).then(() => {
      const dvIcon = g('dv-pg-icon');
      const dvAdd = g('dv-add-icon');
      const dvHd = document.getElementById('memola-dv-hd');
      if (emoji) {
        dvIcon.textContent = emoji; dvIcon.style.display = 'inline-block'; dvAdd.style.display = 'none';
        dvHd?.classList.remove('no-icon');
      } else {
        dvIcon.style.display = 'none'; dvAdd.style.display = '';
        dvHd?.classList.add('no-icon');
      }
      renderTree();
    }).catch((e: Error) => { toast('アイコン保存失敗: ' + e.message, 'err'); });
  }
  g('dv-add-icon').addEventListener('click', () => {
    showEmojiPicker(g('dv-add-icon'), setDbIcon);
  });
  g('dv-pg-icon').addEventListener('click', () => {
    showEmojiPicker(g('dv-pg-icon'), setDbIcon);
  });
  g('emoji-rm').addEventListener('click', () => {
    g('emoji').classList.remove('on');
    if (!S.currentId) return;
    const id = S.currentId;
    apiSetIcon(id, '').then(() => {
      // Update whichever view (page or DB) is currently showing the icon.
      const meta = S.meta.pages.find((p) => p.id === id);
      if (meta?.type === 'database') {
        const dvIcon = g('dv-pg-icon');
        const dvAdd = g('dv-add-icon');
        const dvHd = document.getElementById('memola-dv-hd');
        dvIcon.style.display = 'none';
        dvAdd.style.display = '';
        dvHd?.classList.add('no-icon');
      } else {
        renderPageIcon(id);
      }
      renderTree();
    }).catch((e: Error) => { toast('アイコン削除失敗: ' + e.message, 'err'); });
  });

  // Command palette actions
  setCommandActions([
    { id: 'new-page', label: '新しいページ',     icon: '＋', key: '⌘N',  run: () => { void doNew(''); } },
    { id: 'new-db',   label: '新しいDB',         icon: '🗂', key: '⌘⇧N', run: () => { void doNewDb(''); } },
    { id: 'ai-ask',   label: 'AIに質問',          icon: '✦', key: '⌘⇧A', run: () => { toggleAiPanel(); } },
    { id: 'toc',      label: '目次パネルを切替',   icon: '☰', key: '⌘⇧L', run: () => { toggleOutline(); } },
    { id: 'props',    label: 'プロパティパネルを切替', icon: '▤', key: '⌘⇧R', run: () => { togglePropertiesPanel(); } },
    { id: 'focus',    label: '集中モード切替',    icon: '⛶',  key: '⌘⇧F', run: () => { toggleFocusMode(); } },
    { id: 'trash',    label: 'ゴミ箱を開く',       icon: '🗑', key: '',    run: () => { openTrash(); } },
    { id: 'settings', label: '設定',              icon: '⚙', key: '',    run: () => { document.getElementById('memola-settings-md')?.classList.add('on'); } },
  ]);

  // Quick search
  g('search-nav').addEventListener('click', openSearch);
  g('qs').addEventListener('click', (e) => {
    if (e.target === g('qs')) closeSearch();
  });
  g('qs-inp').addEventListener('input', () => {
    resetQsSel();
    renderQs((g('qs-inp') as HTMLInputElement).value);
  });
  g('qs-inp').addEventListener('keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.isComposing || ke.keyCode === 229) return;
    if (ke.key === 'ArrowDown') { e.preventDefault(); qsMove(1); }
    if (ke.key === 'ArrowUp')   { e.preventDefault(); qsMove(-1); }
    if (ke.key === 'Enter')     { e.preventDefault(); qsConfirm(); }
    if (ke.key === 'Escape')    { closeSearch(); }
  });

  // Editor wiring
  attachEditor();

  // Emoji outside-click closer
  attachEmojiPickerOutsideClick();

  // Publish-status tag in the top bar
  attachPubTag();
  attachScopeTag();
  attachStaleBannerSuppressionReset();

  // Drafts sidebar entry (visible only when draft count > 0)
  attachDraftsSidebar();
  refreshDraftsBadge();

  // Presence indicator (top bar avatars)
  attachPresence();

  // Page menu (top-right "...")
  g('pgm-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    syncPublishMenuItem();
    togglePageMenu(g('pgm-btn'));
  });
  g('pgm').addEventListener('click', async (e) => {
    const item = (e.target as HTMLElement).closest<HTMLElement>('.memola-pgm-item');
    if (!item || !item.dataset.action) return;
    const action = item.dataset.action;
    hidePageMenu();
    switch (action) {
      case 'export-md':   await exportMd(); break;
      case 'export-html': await exportHtml(); break;
      case 'duplicate':   await duplicateCurrent(); break;
      case 'duplicate-as-draft': await duplicateAsDraftCurrent(); break;
      case 'version-history': await openVersionHistoryForCurrent(); break;
      case 'copy-link':   await copyPageLink(); break;
      case 'toggle-scope': await toggleCurrentPageScope(); break;
      case 'publish':     await togglePublish(); break;
      case 'copy-pub-url': await copyPublishedUrl(); break;
      case 'restore-daily': await restoreToDailyNote(); break;
      case 'print':       printCurrent(); break;
      case 'info':        showPageInfo(); break;
      case 'focus':       toggleFocusMode(); break;
      case 'delete':
        // When viewing a DB row-as-page (incl. daily notes), `S.currentId`
        // is the DB PAGE — calling doDel on it would trash the entire DB.
        // Branch to row-deletion so the menu's 🗑 only removes the row.
        if (S.currentRow) {
          const row = S.currentRow;
          if (!confirm('この行を削除しますか？\n(⌘Z で復元可能)')) break;
          try {
            setLoad(true, '行を削除中...');
            const { deleteRowWithUndo } = await import('./db-history');
            await deleteRowWithUndo(row.listTitle, row.itemId);
            // Navigate back to the parent DB so the user isn't left on a
            // blank/stale row page.
            S.currentRow = null;
            const dbPage = S.pages.find((p) => p.Id === row.dbId);
            if (dbPage) {
              const v = await import('./views');
              await v.doSelectDb(row.dbId, dbPage);
            } else {
              showView('empty');
            }
            toast('行を削除しました（⌘Z で復元可能）');
          } catch (e) {
            toast('削除失敗: ' + (e as Error).message, 'err');
          } finally { setLoad(false); }
          break;
        }
        if (S.currentId) await doDel(S.currentId);
        break;
    }
  });
  attachPageMenuOutsideClick();
  // Refresh the publish/unpublish label every time the menu opens
  function syncPublishMenuItem(): void {
    const lbl = document.querySelector('.memola-pgm-publish-label');
    const copyItem = document.querySelector<HTMLElement>('[data-action="copy-pub-url"]');
    const publishItem = document.querySelector<HTMLElement>('[data-action="publish"]');
    const restoreItem = document.querySelector<HTMLElement>('[data-action="restore-daily"]');
    // Only real pages (not DB views, not row-as-page) can be published.
    const isRealPage = !!S.currentId && S.currentType === 'page' && !S.currentRow;
    // Restore-to-daily is only meaningful for pages that came from a
    // daily-note conversion (OriginDailyDate metadata is set).
    if (restoreItem) {
      const meta = isRealPage && S.currentId
        ? S.meta.pages.find((p) => p.id === S.currentId)
        : null;
      restoreItem.style.display = meta?.originDailyDate ? '' : 'none';
    }
    // Scope toggle: shown for both regular pages AND DBs (so the DB itself
    // can be classified as 個人 / 組織). Row-as-page, drafts, trashed,
    // and the daily DB are all hidden — the daily DB is locked to
    // personal scope by design.
    const scopeItem = document.querySelector<HTMLElement>('[data-action="toggle-scope"]');
    if (scopeItem) {
      const isScopeable = !!S.currentId
        && (S.currentType === 'page' || S.currentType === 'database')
        && !S.currentRow;
      const meta = isScopeable && S.currentId
        ? S.meta.pages.find((p) => p.id === S.currentId)
        : null;
      const isDailyDb = meta?.type === 'database' && meta.list === 'memola-daily';
      const showScope = !!meta && !meta.originPageId && !meta.trashed && !isDailyDb;
      scopeItem.style.display = showScope ? '' : 'none';
      // syncScopeTag already updates the label via its own DOM lookup,
      // but we trigger it here to make sure the menu reflects the current
      // page even if the user opens the menu before any other render hook.
      void import('./scope-tag').then((m) => m.syncScopeTag());
    }
    if (!isRealPage) {
      if (publishItem) publishItem.style.display = 'none';
      if (copyItem) copyItem.style.display = 'none';
      return;
    }
    if (publishItem) publishItem.style.display = '';
    void import('../api/publish').then((m) => {
      const pub = m.isPagePublished(S.currentId!);
      if (lbl) lbl.textContent = pub ? 'Web 公開を解除' : 'Web 公開';
      if (copyItem) copyItem.style.display = pub ? '' : 'none';
    });
  }
  async function togglePublish(): Promise<void> {
    const id = S.currentId;
    if (!id) return;
    const m = await import('../api/publish');
    if (m.isPagePublished(id)) {
      if (!confirm('Web 公開を解除します。SP 上の公開ページ（Site Page）も削除されます。よろしいですか？')) return;
      try {
        await m.unpublishPage(id);
        toast('公開を解除しました');
      } catch (e) { toast('解除失敗: ' + (e as Error).message, 'err'); }
      syncPubTag();
    } else {
      // Flush any pending in-editor changes to memola-pages first, so the
      // Site Page mirror can't diverge from the source row. Otherwise, if
      // the user clicks 公開 before the 2s autosave fires, the publish path
      // sends *new* text to SP while memola-pages keeps the *old* body — a
      // reload would drop the published changes silently.
      if (S.dirty) {
        const { doSave } = await import('./actions');
        await doSave();
      }
      const titleEl = g('ttl') as HTMLTextAreaElement | null;
      const ed = getEd();
      const title = (titleEl?.value || '').trim() || '無題';
      const { htmlToMd } = await import('../lib/markdown');
      const bodyMd = htmlToMd(ed.innerHTML || '');
      try {
        const url = await m.publishPage(id, title, bodyMd);
        try { await navigator.clipboard.writeText(url); } catch { /* ignore */ }
        toast('公開しました（URL をクリップボードにコピー）');
      } catch (e) { toast('公開失敗: ' + (e as Error).message, 'err'); }
      syncPubTag();
    }
  }
  async function copyPublishedUrl(): Promise<void> {
    const id = S.currentId;
    if (!id) return;
    const m = await import('../api/publish');
    const url = m.publishedUrlFor(id);
    try { await navigator.clipboard.writeText(url); toast('URL をコピーしました'); }
    catch { toast('コピー失敗', 'err'); }
  }

  /** Create a draft duplicate of the current page (preserves original's id
   *  so inbound page-links stay valid). User edits the draft, then hits
   *  "原本に適用" in the banner to write back. */
  async function duplicateAsDraftCurrent(): Promise<void> {
    const id = S.currentId;
    if (!id) return;
    if (S.currentType !== 'page' || S.currentRow) {
      toast('このページは下書き複製に対応していません', 'err');
      return;
    }
    if (S.dirty) {
      const { doSave } = await import('./actions');
      await doSave();
    }
    try {
      setLoad(true, '下書きを複製中…');
      const { apiDuplicateAsDraft, apiGetPages } = await import('../api/pages');
      const draft = await apiDuplicateAsDraft(id);
      S.pages = await apiGetPages();
      renderTree();
      refreshDraftsBadge();
      const { doSelect } = await import('./views');
      await doSelect(draft.Id);
      toast('下書きを作成しました。本ライブラリには表示されません — サイドバーの「📝 下書き」 から再度開けます');
    } catch (e) {
      toast('下書き複製失敗: ' + (e as Error).message, 'err');
    } finally { setLoad(false); }
  }

  async function openVersionHistoryForCurrent(): Promise<void> {
    const id = S.currentId;
    if (!id) return;
    const page = S.pages.find((p) => p.Id === id);
    if (!page) return;
    const { openVersionHistory } = await import('./version-history-modal');
    await openVersionHistory(id, page.Title || '無題');
  }

  /** Restore a converted-from-daily page back to a daily-note row. */
  async function restoreToDailyNote(): Promise<void> {
    const id = S.currentId;
    if (!id) return;
    const meta = S.meta.pages.find((p) => p.id === id);
    if (!meta?.originDailyDate) return;
    if (!confirm(`このページをデイリーノート (${meta.originDailyDate}) に戻しますか？\n\n通常ページとしての本ページは削除され、本文がデイリー側に統合されます。`)) return;
    try {
      setLoad(true, 'デイリーノートに復元しています...');
      const daily = await import('../api/daily');
      const { rowId, date } = await daily.restoreToDaily(id);
      // Refresh page tree (the converted page was deleted, daily DB row added)
      const { apiGetPages } = await import('../api/pages');
      S.pages = await apiGetPages();
      renderTree();
      // Open the daily note we just restored to
      const dailyDb = await daily.ensureDailyDb();
      const dbPage = S.pages.find((p) => p.Id === dailyDb.dbPageId);
      if (dbPage) {
        const v = await import('./views');
        await v.doSelectDb(dailyDb.dbPageId, dbPage);
        const item = S.dbItems.find((i) => i.Id === rowId);
        if (item) {
          const r = await import('./row-page');
          await r.openRowAsPage(dailyDb.dbPageId, item);
        }
      }
      toast('デイリーノート (' + date + ') に戻しました');
    } catch (e) {
      toast('復元失敗: ' + (e as Error).message, 'err');
    } finally { setLoad(false); }
  }

  /** Open (or first-time create) the daily note for today. Initializes the
   *  reserved daily DB on first invocation. Pinned to the sidebar so the
   *  user can also reach it via the page tree afterwards. */
  async function openTodayDailyNote(): Promise<void> {
    await openDailyNoteForDate(daily_todayYMD(), { confirmCreate: false });
  }

  /** Synchronous YYYY-MM-DD for "today" without async-importing daily.ts
   *  every time the UI needs to default the date picker. Mirrors
   *  date-utils.todayYMD(). */
  function daily_todayYMD(): string {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + day;
  }

  /** Open the daily note for an arbitrary YYYY-MM-DD. If it doesn't yet
   *  exist:
   *    - confirmCreate=false: create silently (used for "今日" — typing
   *      today's date and being prompted feels redundant).
   *    - confirmCreate=true:  ask first; cancel = no-op (used for the
   *      date picker — the user might just be browsing).
   */
  async function openDailyNoteForDate(
    date: string,
    opts: { confirmCreate: boolean },
  ): Promise<void> {
    try {
      setLoad(true, 'デイリーノートを開いています...');
      const daily = await import('../api/daily');
      // Fast path: already exists → just open it.
      const existing = await daily.findNoteForDate(date);
      if (!existing && opts.confirmCreate) {
        setLoad(false);
        if (!confirm(date + ' のデイリーノートはまだありません。新しく作成しますか？')) return;
        setLoad(true, 'デイリーノートを作成しています...');
      }
      const ref = existing
        ? { ...existing, dbPageId: (await daily.ensureDailyDb()).dbPageId }
        : await daily.getOrCreateNoteForDate(date);
      // Make sure the daily DB row shows up in the sidebar (S.pages may be
      // stale if this is the very first call in the session, or if the row
      // was just created).
      if (!S.pages.some((p) => p.Id === ref.dbPageId)) {
        const { apiGetPages } = await import('../api/pages');
        S.pages = await apiGetPages();
      }
      const dbPage = S.pages.find((p) => p.Id === ref.dbPageId);
      if (!dbPage) { toast('デイリー DB が見つかりません', 'err'); return; }
      const v = await import('./views');
      await v.doSelectDb(ref.dbPageId, dbPage);
      const item = S.dbItems.find((i) => i.Id === ref.rowId);
      if (item) {
        const r = await import('./row-page');
        await r.openRowAsPage(ref.dbPageId, item);
      }
      renderTree();
    } catch (e) {
      toast('デイリーノートを開けませんでした: ' + (e as Error).message, 'err');
    } finally { setLoad(false); }
  }

  /** Show a small popover with a date input + quick-jump buttons. Picking
   *  a date opens (creates with confirm) the daily note for that date. */
  function showDailyPicker(anchor: HTMLElement): void {
    // Tear down any existing popover so re-clicking the menu item just
    // re-anchors instead of stacking.
    const prev = document.getElementById('memola-daily-picker');
    if (prev) prev.remove();

    const today = daily_todayYMD();
    const pop = document.createElement('div');
    pop.id = 'memola-daily-picker';
    pop.innerHTML =
      '<div class="memola-dp-row">' +
        '<button class="memola-dp-nav" data-nav="-1" title="前日">‹</button>' +
        '<input type="date" id="memola-dp-input" value="' + today + '">' +
        '<button class="memola-dp-nav" data-nav="+1" title="翌日">›</button>' +
      '</div>' +
      '<div class="memola-dp-quick">' +
        '<button data-quick="-7">先週</button>' +
        '<button data-quick="-1">昨日</button>' +
        '<button data-quick="0">今日</button>' +
        '<button data-quick="+1">明日</button>' +
        '<button data-quick="+7">来週</button>' +
      '</div>' +
      '<div class="memola-dp-foot">' +
        '<button id="memola-dp-cancel">キャンセル</button>' +
        '<button id="memola-dp-open" class="memola-dp-primary">開く</button>' +
      '</div>';

    // Anchor near the create button (same screen position as create-menu).
    const r = anchor.getBoundingClientRect();
    pop.style.position = 'fixed';
    pop.style.left = r.left + 'px';
    pop.style.top = (r.bottom + 4) + 'px';

    (document.getElementById('memola-overlay') || document.body).appendChild(pop);

    const input = pop.querySelector<HTMLInputElement>('#memola-dp-input');
    if (!input) return;
    // Delay focus until after appendChild, otherwise some browsers
    // collapse the just-opened native picker UI.
    setTimeout(() => input.focus(), 0);

    function shiftDate(days: number, base?: string): string {
      const d = new Date(((base || input!.value) || today) + 'T00:00:00');
      d.setDate(d.getDate() + days);
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return d.getFullYear() + '-' + m + '-' + day;
    }

    pop.querySelectorAll<HTMLButtonElement>('.memola-dp-nav').forEach((btn) => {
      btn.addEventListener('click', () => {
        const delta = parseInt(btn.dataset.nav || '0', 10);
        input.value = shiftDate(delta);
      });
    });
    pop.querySelectorAll<HTMLButtonElement>('.memola-dp-quick button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const delta = parseInt(btn.dataset.quick || '0', 10);
        input.value = shiftDate(delta, today);
      });
    });

    function close(): void { pop.remove(); document.removeEventListener('click', outside); }
    function outside(e: MouseEvent): void {
      if (!pop.contains(e.target as Node) && !anchor.contains(e.target as Node)) close();
    }
    setTimeout(() => document.addEventListener('click', outside), 0);

    pop.querySelector('#memola-dp-cancel')?.addEventListener('click', close);
    const open = (): void => {
      const v = input.value;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) { toast('日付を選んでください', 'err'); return; }
      close();
      void openDailyNoteForDate(v, { confirmCreate: true });
    };
    pop.querySelector('#memola-dp-open')?.addEventListener('click', open);
    input.addEventListener('keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Enter') { e.preventDefault(); open(); }
      else if ((e as KeyboardEvent).key === 'Escape') { e.preventDefault(); close(); }
    });
  }

  // Apply persisted focus mode + viewport-based auto collapse
  applyFocusMode();
  applyViewportAutoCollapse();
  window.addEventListener('resize', applyViewportAutoCollapse);

  // Trash
  g('trash-btn').addEventListener('click', openTrash);
  g('trash-close').addEventListener('click', closeTrash);
  g('trash-md').addEventListener('click', (e) => { if (e.target === g('trash-md')) closeTrash(); });

  // Settings modal
  const setBtn = document.getElementById('memola-settings-btn');
  const setMd = document.getElementById('memola-settings-md');
  const setKey = document.getElementById('memola-set-aikey') as HTMLInputElement | null;
  const setProv = document.getElementById('memola-set-provider') as HTMLSelectElement | null;
  const setClaudeModel = document.getElementById('memola-set-claude-model') as HTMLSelectElement | null;
  const setCorpModel = document.getElementById('memola-set-corpai-model') as HTMLSelectElement | null;
  const setCorpKey = document.getElementById('memola-set-corpai-key') as HTMLInputElement | null;
  const setCorpBaseUrl = document.getElementById('memola-set-corpai-baseurl') as HTMLInputElement | null;
  const setCorpPrefix = document.getElementById('memola-set-corpai-prefix') as HTMLInputElement | null;
  const setCorpOverrides = document.getElementById('memola-set-corpai-overrides') as HTMLTextAreaElement | null;
  // Local AI fields
  const setLocalBaseUrl = document.getElementById('memola-set-localai-baseurl') as HTMLInputElement | null;
  const setLocalKey = document.getElementById('memola-set-localai-key') as HTMLInputElement | null;
  const setLocalModel = document.getElementById('memola-set-localai-model') as HTMLInputElement | null;
  const setLocalModels = document.getElementById('memola-set-localai-models') as HTMLTextAreaElement | null;
  const setLocalReasoning = document.getElementById('memola-set-localai-reasoning') as HTMLInputElement | null;
  const setDensity = document.getElementById('memola-set-density') as HTMLSelectElement | null;
  const setTheme = document.getElementById('memola-set-theme') as HTMLSelectElement | null;
  // Save / sync / presence prefs
  const setSaveDelay = document.getElementById('memola-set-savedelay') as HTMLSelectElement | null;
  const setSyncPoll = document.getElementById('memola-set-syncpoll') as HTMLSelectElement | null;
  const setPresence = document.getElementById('memola-set-presence') as HTMLSelectElement | null;
  // ⌨ Shortcut-list button (anywhere — click handler below is no-op if missing)
  document.getElementById('memola-set-shortcuts')?.addEventListener('click', () => openShortcutsModal());

  // Debug / reset buttons — each has its own pre-flight count + double
  // confirm so accidental clicks don't blow away data.
  async function runReset(
    mode: 'mine' | 'others' | 'all',
    label: string,
  ): Promise<void> {
    const reset = await import('../api/reset');
    setLoad(true, '対象を集計中...');
    let counts: { pages: number; dbs: number; dailyRows: number };
    try {
      counts = await reset.countResetTargets(mode);
    } catch (e) {
      setLoad(false);
      toast('集計失敗: ' + (e as Error).message, 'err');
      return;
    }
    setLoad(false);
    const total = counts.pages + counts.dbs + counts.dailyRows;
    const detail = mode === 'all'
      ? '全 memola-* SP リスト + 全 memola.* localStorage キー'
      : `ページ ${counts.pages} 件 + DB ${counts.dbs} 件` +
        (counts.dailyRows > 0 ? ` + デイリー ${counts.dailyRows} 件` : '');
    if (total === 0 && mode !== 'all') {
      toast('削除対象のデータがありません');
      return;
    }
    if (!confirm(
      '【' + label + '】\n\n' +
      '削除対象: ' + detail + '\n\n' +
      '⚠ 元に戻せません。SP のごみ箱からも復元できません。\n\n' +
      '本当に実行しますか?',
    )) return;
    if (!confirm('最終確認: 実行すると即座に SP からデータが削除されます。よろしいですか?')) return;
    setLoad(true, '削除中... (時間がかかる場合があります)');
    try {
      const sum = mode === 'mine' ? await reset.resetMyPrivateData()
                : mode === 'others' ? await reset.resetOthersData()
                : await reset.resetAll();
      const summary = mode === 'all'
        ? `SP リスト ${sum.spListsDeleted} 件 / 完全削除 ${sum.recycleBinPurged} 件`
        : `ページ ${sum.pagesDeleted} / DB ${sum.dbsDeleted} / 完全削除 ${sum.recycleBinPurged} 件`;
      // Inline the first error in the toast so the user can diagnose at a
      // glance, AND pop a follow-up alert with the full list — toasts
      // disappear after a few seconds, alerts stay until dismissed.
      let errSummary = '';
      if (sum.errors.length > 0) {
        const first = sum.errors[0].length > 80 ? sum.errors[0].slice(0, 80) + '…' : sum.errors[0];
        errSummary = sum.errors.length === 1
          ? ` (失敗 1 件: ${first})`
          : ` (失敗 ${sum.errors.length} 件、最初: ${first})`;
        console.warn('[Memola reset errors]', sum.errors);
        // Show the full list in a native alert after the toast settles.
        // Native confirm/alert blocks the loop — schedule asynchronously.
        setTimeout(() => {
          const detail = sum.errors.slice(0, 20).join('\n');
          const more = sum.errors.length > 20 ? `\n…他 ${sum.errors.length - 20} 件 (コンソール参照)` : '';
          alert(`【リセットの失敗詳細 — ${sum.errors.length} 件】\n\n${detail}${more}`);
        }, 800);
      }
      // Refresh UI for non-full resets; full reset asks user to reload.
      if (mode !== 'all') {
        const { renderTree } = await import('./tree');
        renderTree();
        // Reconcile the current view with the post-reset state:
        //   1. row-as-page → if the parent DB or row is gone, fall back
        //      to the DB view (which re-fetches items); else stay.
        //   2. DB view → re-call doSelectDb so the table reloads (rows
        //      removed by the reset disappear).
        //   3. regular page → if deleted, go to empty view.
        const v = await import('./views');
        if (S.currentRow) {
          const dbId = S.currentRow.dbId;
          const dbStillExists = S.pages.some((p) => p.Id === dbId);
          S.currentRow = null;
          if (dbStillExists) {
            const dbPage = S.pages.find((p) => p.Id === dbId);
            if (dbPage) await v.doSelectDb(dbId, dbPage);
          } else {
            S.currentId = null;
            showView('empty');
          }
        } else if (S.currentType === 'database' && S.currentId) {
          const dbPage = S.pages.find((p) => p.Id === S.currentId);
          if (dbPage) {
            // Re-select the DB → doSelectDb re-fetches items + re-renders,
            // so any rows the reset removed disappear immediately.
            await v.doSelectDb(S.currentId, dbPage);
          } else {
            // The DB itself got deleted by the reset
            S.currentId = null;
            showView('empty');
          }
        } else {
          const stillExists = S.currentId && S.pages.some((p) => p.Id === S.currentId);
          if (!stillExists) {
            S.currentId = null;
            showView('empty');
          }
        }
      }
      toast(label + ' 完了: ' + summary + errSummary,
        sum.errors.length > 0 ? 'err' : 'ok');
      // Close settings modal (may be null if user closed it during the
      // run; resolve fresh from DOM rather than capturing in closure).
      document.getElementById('memola-settings-md')?.classList.remove('on');
      // For full reset, prompt reload
      if (mode === 'all') {
        setTimeout(() => {
          if (confirm('完全リセットが完了しました。SP ページを今すぐリロードしますか?')) {
            location.reload();
          }
        }, 500);
      }
    } catch (e) {
      toast('リセット失敗: ' + (e as Error).message, 'err');
    } finally {
      setLoad(false);
    }
  }
  document.getElementById('memola-set-reset-mine')?.addEventListener('click', () =>
    runReset('mine', '自分のプライベートのみ削除'));
  document.getElementById('memola-set-reset-others')?.addEventListener('click', () =>
    runReset('others', '組織+他人のデータを削除'));
  document.getElementById('memola-set-reset-all')?.addEventListener('click', () =>
    runReset('all', '全データ + 設定を初期化'));
  if (setBtn && setMd && setKey && setProv && setClaudeModel && setCorpModel && setCorpKey && setCorpBaseUrl && setCorpPrefix && setCorpOverrides && setLocalBaseUrl && setLocalKey && setLocalModel && setLocalModels && setLocalReasoning && setDensity && setTheme && setSaveDelay && setSyncPoll && setPresence) {
    // Populate model dropdowns once.
    void import('../api/ai-settings').then((ai) => {
      ai.CLAUDE_MODELS.forEach((m) => {
        const o = document.createElement('option');
        o.value = m.id; o.textContent = m.label;
        setClaudeModel.appendChild(o);
      });
      ai.CORP_AI_MODELS.forEach((m) => {
        const o = document.createElement('option');
        o.value = m.id;
        o.textContent = m.id + (m.reasoning ? ' (推論)' : '') + (m.vision ? ' 🖼' : '');
        setCorpModel.appendChild(o);
      });
    });

    /** Show/hide rows based on the selected provider. Each conditional row
     *  has a `data-prov` attribute matching the provider value. */
    function syncProviderRows(): void {
      const cur = setProv!.value;
      document.querySelectorAll<HTMLElement>('.memola-set-row[data-prov]').forEach((row) => {
        row.style.display = (row.dataset.prov === cur) ? '' : 'none';
      });
    }
    setProv.addEventListener('change', syncProviderRows);

    // Sidebar nav inside the settings modal — tabs switch panes.
    document.querySelectorAll<HTMLElement>('.memola-set-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        if (!target) return;
        document.querySelectorAll<HTMLElement>('.memola-set-tab')
          .forEach((t) => t.classList.toggle('on', t === tab));
        document.querySelectorAll<HTMLElement>('.memola-set-pane')
          .forEach((p) => p.classList.toggle('on', p.dataset.pane === target));
      });
    });

    setBtn.addEventListener('click', () => {
      // Always reset to the first pane on open so the user has a
      // predictable starting point.
      document.querySelectorAll<HTMLElement>('.memola-set-tab')
        .forEach((t) => t.classList.toggle('on', t.dataset.tab === 'ai'));
      document.querySelectorAll<HTMLElement>('.memola-set-pane')
        .forEach((p) => p.classList.toggle('on', p.dataset.pane === 'ai'));
      void import('../api/ai-settings').then((ai) => {
        try {
          setProv.value = ai.getProvider();
          setClaudeModel.value = ai.getClaudeModel();
          setCorpModel.value = ai.getCorpAiModel();
          // Read via getApiKey so the settings panel reflects what
          // anthropic.ts actually uses (key was previously stored under
          // a different localStorage key, leaving the input always blank).
          setKey.value = getApiKey() || '';
          setCorpKey.value = ai.getCorpAiKey();
          setCorpBaseUrl.value = ai.getCorpAiBaseUrl();
          setCorpPrefix.value = ai.getCorpAiDeploymentPrefix();
          setCorpOverrides.value = ai.getCorpAiOverridesRaw();
          // Local AI prefill
          setLocalBaseUrl.value = ai.getLocalAiBaseUrl();
          setLocalKey.value = ai.getLocalAiKey();
          setLocalModel.value = ai.getLocalAiModel();
          setLocalModels.value = ai.getLocalAiModels().join('\n');
          setLocalReasoning.value = ai.getLocalAiReasoningModels().join(' ');
          setDensity.value = prefDensity.get();
          setTheme.value = prefTheme.get();
          // Save / sync / presence
          setSaveDelay.value = prefSaveDelayMs.get();
          setSyncPoll.value = prefSyncPollMs.get();
          setPresence.value = prefPresenceEnabled.get();
        } catch { /* ignore */ }
        syncProviderRows();
        setMd.classList.add('on');
      });
    });
    setMd.addEventListener('click', (e) => { if (e.target === setMd) setMd.classList.remove('on'); });
    document.getElementById('memola-set-cancel')?.addEventListener('click', () => setMd.classList.remove('on'));
    document.getElementById('memola-set-save')?.addEventListener('click', () => {
      // Pre-validate the overrides JSON so the user gets immediate feedback
      // rather than silent fallback at request time.
      const ovRaw = setCorpOverrides.value.trim();
      if (ovRaw) {
        try {
          const parsed = JSON.parse(ovRaw);
          if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
            toast('オーバーライド JSON はオブジェクト形式で書いてください', 'err');
            return;
          }
        } catch (e) {
          toast('オーバーライド JSON が不正です: ' + (e as Error).message, 'err');
          return;
        }
      }
      void import('../api/ai-settings').then((ai) => {
        try {
          ai.setProvider(setProv.value as 'claude' | 'corp' | 'local');
          if (setClaudeModel.value) ai.setClaudeModel(setClaudeModel.value);
          if (setCorpModel.value) ai.setCorpAiModel(setCorpModel.value);
          // Persist via setApiKey so the value lands at the same
          // localStorage key anthropic.ts reads from.
          setApiKey(setKey.value);
          ai.setCorpAiKey(setCorpKey.value);
          ai.setCorpAiBaseUrl(setCorpBaseUrl.value);
          ai.setCorpAiDeploymentPrefix(setCorpPrefix.value);
          ai.setCorpAiOverridesRaw(setCorpOverrides.value);
          // Local AI persist
          ai.setLocalAiBaseUrl(setLocalBaseUrl.value);
          ai.setLocalAiKey(setLocalKey.value);
          ai.setLocalAiModel(setLocalModel.value);
          const localModelsList = setLocalModels.value
            .split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
          ai.setLocalAiModels(localModelsList);
          ai.setLocalAiReasoningModels(setLocalReasoning.value);
          prefDensity.set(setDensity.value);
          prefTheme.set(setTheme.value);
          // Save / sync / presence
          prefSaveDelayMs.set(setSaveDelay.value);
          prefSyncPollMs.set(setSyncPoll.value);
          const prevPresence = prefPresenceEnabled.get();
          prefPresenceEnabled.set(setPresence.value);
          // Re-apply sync-watch + presence so the new pref takes effect
          // immediately without a reload.
          if (S.sync.pageId && S.sync.loadedModified && S.sync.loadedEtag) {
            void import('./sync-watch').then((m) => {
              m.startWatching(S.sync.pageId!, S.sync.loadedModified!, S.sync.loadedEtag!);
            });
          }
          // Presence: if turned off, drop our SP row + stop pinging now.
          // If turned on, syncPresenceForCurrent will (re-)register us.
          if (prevPresence !== setPresence.value) {
            void import('./presence-ui').then((m) => {
              if (setPresence.value === '0') m.shutdownPresence();
              else m.syncPresenceForCurrent();
            });
          }
        } catch { /* ignore */ }
        const ov = document.getElementById('memola-overlay');
        if (ov) {
          ov.dataset.density = setDensity.value;
          ov.dataset.theme = setTheme.value;
        }
        // Refresh the provider/model badge in the AI panel
        void import('./ai-chat').then((m) => m.syncProviderBadge?.());
        setMd.classList.remove('on');
        toast('設定を保存しました');
      });
    });
    // Apply on init
    const ov = document.getElementById('memola-overlay');
    if (ov) {
      ov.dataset.density = prefDensity.get();
      ov.dataset.theme = prefTheme.get();
    }
  }

  // Workspace switcher
  const wsName = getCurrentWorkspaceName();
  if (wsName) g('ws-name').textContent = wsName;
  g('ws-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    showWorkspaceMenu(g('ws-btn'));
  });

  // Outline panel
  g('outline-btn').addEventListener('click', toggleOutline);
  document.getElementById('memola-outline-x')?.addEventListener('click', () => {
    void import('./outline').then((m) => m.setOutlineOpen(false));
  });
  attachOutlineWatcher();
  applyOutlineState();

  // Properties panel
  g('props-btn').addEventListener('click', togglePropertiesPanel);
  document.getElementById('memola-props-x')?.addEventListener('click', () => {
    void import('./properties-panel').then((m) => m.setPropertiesOpen(false));
  });
  applyPropertiesState();

  // AI chat panel
  g('ai-btn').addEventListener('click', toggleAiPanel);
  g('ai-close').addEventListener('click', closeAiPanel);
  g('ai-clear').addEventListener('click', clearAiHistory);
  document.getElementById('memola-ai-new')?.addEventListener('click', () => newAiSession());
  g('ai-hist').addEventListener('change', () => {
    const v = (g('ai-hist') as HTMLSelectElement).value;
    if (v === '__new__') newAiSession();
    else loadAiSession(v);
  });
  renderHistoryDropdown();
  applyAiPanelState();
  // Pane resize handles (sidebar/outline/props/AI) — restore widths + install drag
  void import('./pane-resize').then((m) => m.attachPaneResizers());
  // Model picker in the chat input bar — single switch for provider+model.
  // Refresh on panel open so external (settings modal) changes show up.
  void import('./ai-chat').then((m) => m.syncProviderBadge?.());
  const modelPick = document.getElementById('memola-ai-model-pick') as HTMLSelectElement | null;
  if (modelPick) {
    modelPick.addEventListener('change', () => {
      void import('./ai-chat').then((m) => m.applyModelPick?.(modelPick.value));
    });
  }
  g('ai-send').addEventListener('click', () => {
    const ta = g('ai-input') as HTMLTextAreaElement;
    void sendAiMessage(ta.value);
  });
  g('ai-input').addEventListener('keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.isComposing || ke.keyCode === 229) return;
    if (ke.key === 'Enter' && !ke.shiftKey) {
      e.preventDefault();
      const ta = g('ai-input') as HTMLTextAreaElement;
      void sendAiMessage(ta.value);
    }
  });
  // Auto-grow up to 10 lines (~232px) on each input, then scroll.
  // We also nudge scrollTop to max so the bottom padding stays visible — the
  // browser's default cursor-into-view scroll lands flush with the bottom edge,
  // leaving the cursor seemingly without margin.
  const aiInputTa = g('ai-input') as HTMLTextAreaElement;
  aiInputTa.addEventListener('input', () => {
    aiInputTa.style.height = 'auto';
    aiInputTa.style.height = Math.min(aiInputTa.scrollHeight, 232) + 'px';
    // setting beyond max clamps to (scrollHeight - clientHeight); shows the
    // bottom padding-bottom region.
    aiInputTa.scrollTop = aiInputTa.scrollHeight;
  });
  // Quick chips
  const chips = g('ai-chips');
  getQuickPrompts().forEach((p) => {
    const b = document.createElement('button');
    b.className = 'memola-ai-chip';
    b.textContent = p.label;
    b.addEventListener('click', () => {
      void sendAiMessage(p.prompt);
    });
    chips.appendChild(b);
  });

  // Global keydown
  document.addEventListener('keydown', onKey);
}

// ── INIT ─────────────────────────────────────────────
/** Tear down everything that lives outside the DOM (intervals, listeners,
 *  presence row). Called when the user re-presses the bookmarklet to
 *  "close" the app — without this, the OLD instance's sync poller keeps
 *  running invisibly and would later flash a phantom "別のタブ (あなた)"
 *  banner against the NEXT instance's saves (its etag isn't in the OLD
 *  ourSavedEtags). Stored on the overlay element so the new IIFE can
 *  reach it across closure boundaries. */
function memolaShutdown(): void {
  // Bookmarklet re-press is the user's "close + reopen" gesture. We
  // share the same teardown as the in-app 「閉じる」 button so behaviour
  // is identical across paths (timers stopped, presence row deleted,
  // pending autosave flushed, keydown listener removed). The overlay
  // itself is removed by main.ts immediately after this returns, so we
  // tell teardown to leave the DOM alone.
  teardown({ flushSave: true, removeOverlay: false });
}

export async function init(): Promise<void> {
  // Expose shutdown on the overlay element so a subsequent bookmarklet
  // press (which runs in a separate IIFE / closure) can reach it.
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
    S.pages = await apiGetPages();
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
