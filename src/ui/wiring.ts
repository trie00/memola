// Event-listener registration & app bootstrap.

import { S } from '../state';
import { g, getEd } from './dom';
import { setLoad, setSave, toast, autoR } from './ui-helpers';
import { renderTree } from './tree';
import { showView, doSelect, renderPageIcon, renderDbTable, renderKanban } from './views';
import { execCmd, attachEditor } from './editor';
import {
  doNew, doDel, doSave, schedSave, doNewDbRow, closeApp, onKey,
  showEmojiPicker, attachEmojiPickerOutsideClick,
  exportMd, exportHtml, duplicateCurrent, copyPageLink, printCurrent, showPageInfo,
  togglePageMenu, hidePageMenu, attachPageMenuOutsideClick,
} from './actions';
import { openSearch, closeSearch, renderQs, qsMove, qsConfirm, resetQsSel, setCommandActions } from './search-ui';
import {
  closeAiPanel, toggleAiPanel, sendAiMessage, clearAiHistory,
  configureApiKey, getQuickPrompts, loadAiSession, newAiSession, renderHistoryDropdown,
  applyAiPanelState,
} from './ai-chat';
import { toggleOutline, applyOutlineState, attachOutlineWatcher } from './outline';
import { togglePropertiesPanel, applyPropertiesState } from './properties-panel';
import { attachPubTag, syncPubTag } from './pub-tag';
import { showWorkspaceMenu, getCurrentWorkspaceName } from './workspaces';
import { openTrash, closeTrash } from './trash';
import { exportCsv, importCsv } from './csv-io';

const FOCUS_KEY = 'n365.focus';
function applyFocusMode(): void {
  const ov = document.getElementById('n365-overlay');
  if (!ov) return;
  const isFocus = localStorage.getItem(FOCUS_KEY) === '1';
  if (isFocus) {
    ov.classList.add('focus-mode');
    // Focus mode auto-hides the sidebar (don't persist this state)
    document.getElementById('n365-sb')?.classList.add('collapsed');
  } else {
    ov.classList.remove('focus-mode');
    // Restore persisted visibility on exit
    const saved = (() => { try { return localStorage.getItem('n365.sidebar'); } catch { return null; } })();
    const sb = document.getElementById('n365-sb');
    if (sb) {
      sb.classList.remove('collapsed');
      if (saved === 'collapsed') sb.classList.add('collapsed');
    }
  }
}
function toggleFocusMode(): void {
  const cur = localStorage.getItem(FOCUS_KEY) === '1';
  if (cur) localStorage.removeItem(FOCUS_KEY);
  else localStorage.setItem(FOCUS_KEY, '1');
  applyFocusMode();
}

// ビューポート < 900px で自動折畳（明示状態を上書きしない）
function applyViewportAutoCollapse(): void {
  const sb = document.getElementById('n365-sb');
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
    try { localStorage.setItem('n365.sidebar', state); } catch { /* ignore */ }
  }
  g('sb-toggle').addEventListener('click', () => {
    g('sb').classList.toggle('collapsed');
    persistSidebarState();
  });
  document.getElementById('n365-sb-collapse')?.addEventListener('click', () => {
    g('sb').classList.add('collapsed');
    persistSidebarState();
  });
  try {
    if (localStorage.getItem('n365.sidebar') === 'collapsed') g('sb').classList.add('collapsed');
  } catch { /* ignore */ }

  // New page buttons (empty-state CTA)
  g('ne').addEventListener('click', () => { doNew(''); });

  // DB create (empty-state CTA)
  g('ne-db').addEventListener('click', () => { doNewDb(''); });

  // Empty-state template chips & "テンプレ" button
  document.getElementById('n365-ne-tpl')?.addEventListener('click', () => {
    document.getElementById('n365-quick-add')?.click();
  });
  document.querySelectorAll<HTMLElement>('.n365-em-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const tpl = chip.dataset.tpl;
      if (tpl === 'tasks') void doNewDb('');
      else void doNew('');
    });
  });

  // Quick-add (＋ 新規) primary button → CreateMenu popup
  const quickAddBtn = document.getElementById('n365-quick-add');
  const createMenu = document.getElementById('n365-create-menu');
  if (quickAddBtn && createMenu) {
    quickAddBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = quickAddBtn.getBoundingClientRect();
      createMenu.style.left = rect.left + 'px';
      createMenu.style.top = (rect.bottom + 4) + 'px';
      createMenu.classList.toggle('on');
    });
    createMenu.addEventListener('click', (e) => {
      const item = (e.target as HTMLElement).closest<HTMLElement>('.n365-cm-item');
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
    if ((e.target as HTMLElement).closest('.n365-b')) e.preventDefault();
  });
  g('tb').addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('.n365-b');
    if (b && b.dataset.cmd) execCmd(b.dataset.cmd);
  });

  // Floating toolbar buttons
  g('ftb').addEventListener('mousedown', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('.n365-fb');
    if (b && b.dataset.cmd) { e.preventDefault(); execCmd(b.dataset.cmd); }
  });

  // Setup modal
  g('mc').addEventListener('click', () => { g('md').classList.remove('on'); });
  g('mk').addEventListener('click', async () => {
    g('md').classList.remove('on');
    setLoad(true, 'リストを準備中...');
    try {
      // apiGetPages auto-creates the n365-pages list and its columns on first call
      S.pages = await apiGetPages();
      renderTree();
      toast('n365-pages リストを初期化しました');
    } catch (e) { toast('初期化に失敗: ' + (e as Error).message, 'err'); }
    finally { setLoad(false); }
  });

  // Column modal — grid type picker
  let _colTypeKind = 2;
  const colGrid = document.getElementById('n365-col-type-grid');
  if (colGrid) {
    const tiles = Array.from(colGrid.querySelectorAll<HTMLDivElement>('.n365-col-type'));
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
      S.dbFields = results[0];
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
  document.getElementById('n365-db-new-row')?.addEventListener('click', doNewDbRow);
  document.getElementById('n365-db-group-btn')?.addEventListener('click', () => {
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
      const dvHd = document.getElementById('n365-dv-hd');
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
        const dvHd = document.getElementById('n365-dv-hd');
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
    { id: 'settings', label: '設定',              icon: '⚙', key: '',    run: () => { document.getElementById('n365-settings-md')?.classList.add('on'); } },
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

  // Page menu (top-right "...")
  g('pgm-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    syncPublishMenuItem();
    togglePageMenu(g('pgm-btn'));
  });
  g('pgm').addEventListener('click', async (e) => {
    const item = (e.target as HTMLElement).closest<HTMLElement>('.n365-pgm-item');
    if (!item || !item.dataset.action) return;
    const action = item.dataset.action;
    hidePageMenu();
    switch (action) {
      case 'export-md':   await exportMd(); break;
      case 'export-html': await exportHtml(); break;
      case 'duplicate':   await duplicateCurrent(); break;
      case 'copy-link':   await copyPageLink(); break;
      case 'publish':     await togglePublish(); break;
      case 'copy-pub-url': await copyPublishedUrl(); break;
      case 'print':       printCurrent(); break;
      case 'info':        showPageInfo(); break;
      case 'focus':       toggleFocusMode(); break;
      case 'delete':      if (S.currentId) await doDel(S.currentId); break;
    }
  });
  attachPageMenuOutsideClick();
  // Refresh the publish/unpublish label every time the menu opens
  function syncPublishMenuItem(): void {
    const lbl = document.querySelector('.n365-pgm-publish-label');
    const copyItem = document.querySelector<HTMLElement>('[data-action="copy-pub-url"]');
    const publishItem = document.querySelector<HTMLElement>('[data-action="publish"]');
    // Only real pages (not DB views, not row-as-page) can be published.
    const isRealPage = !!S.currentId && S.currentType === 'page' && !S.currentRow;
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
      // Flush any pending in-editor changes to n365-pages first, so the
      // Site Page mirror can't diverge from the source row. Otherwise, if
      // the user clicks 公開 before the 2s autosave fires, the publish path
      // sends *new* text to SP while n365-pages keeps the *old* body — a
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

  // Apply persisted focus mode + viewport-based auto collapse
  applyFocusMode();
  applyViewportAutoCollapse();
  window.addEventListener('resize', applyViewportAutoCollapse);

  // Trash
  g('trash-btn').addEventListener('click', openTrash);
  g('trash-close').addEventListener('click', closeTrash);
  g('trash-md').addEventListener('click', (e) => { if (e.target === g('trash-md')) closeTrash(); });

  // Settings modal
  const setBtn = document.getElementById('n365-settings-btn');
  const setMd = document.getElementById('n365-settings-md');
  const setKey = document.getElementById('n365-set-aikey') as HTMLInputElement | null;
  const setDensity = document.getElementById('n365-set-density') as HTMLSelectElement | null;
  const setTheme = document.getElementById('n365-set-theme') as HTMLSelectElement | null;
  if (setBtn && setMd && setKey && setDensity && setTheme) {
    setBtn.addEventListener('click', () => {
      try {
        setKey.value = localStorage.getItem('n365.aiKey') || '';
        setDensity.value = localStorage.getItem('n365.density') || 'regular';
        setTheme.value = localStorage.getItem('n365.theme') || 'light';
      } catch { /* ignore */ }
      setMd.classList.add('on');
    });
    setMd.addEventListener('click', (e) => { if (e.target === setMd) setMd.classList.remove('on'); });
    document.getElementById('n365-set-cancel')?.addEventListener('click', () => setMd.classList.remove('on'));
    document.getElementById('n365-set-save')?.addEventListener('click', () => {
      try {
        if (setKey.value) localStorage.setItem('n365.aiKey', setKey.value);
        else localStorage.removeItem('n365.aiKey');
        localStorage.setItem('n365.density', setDensity.value);
        localStorage.setItem('n365.theme', setTheme.value);
      } catch { /* ignore */ }
      const ov = document.getElementById('n365-overlay');
      if (ov) {
        ov.dataset.density = setDensity.value;
        ov.dataset.theme = setTheme.value;
      }
      setMd.classList.remove('on');
      toast('設定を保存しました');
    });
    // Apply on init
    try {
      const ov = document.getElementById('n365-overlay');
      if (ov) {
        ov.dataset.density = localStorage.getItem('n365.density') || 'regular';
        ov.dataset.theme = localStorage.getItem('n365.theme') || 'light';
      }
    } catch { /* ignore */ }
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
  document.getElementById('n365-outline-x')?.addEventListener('click', () => {
    void import('./outline').then((m) => m.setOutlineOpen(false));
  });
  attachOutlineWatcher();
  applyOutlineState();

  // Properties panel
  g('props-btn').addEventListener('click', togglePropertiesPanel);
  document.getElementById('n365-props-x')?.addEventListener('click', () => {
    void import('./properties-panel').then((m) => m.setPropertiesOpen(false));
  });
  applyPropertiesState();

  // AI chat panel
  g('ai-btn').addEventListener('click', toggleAiPanel);
  g('ai-close').addEventListener('click', closeAiPanel);
  g('ai-clear').addEventListener('click', clearAiHistory);
  document.getElementById('n365-ai-new')?.addEventListener('click', () => newAiSession());
  g('ai-hist').addEventListener('change', () => {
    const v = (g('ai-hist') as HTMLSelectElement).value;
    if (v === '__new__') newAiSession();
    else loadAiSession(v);
  });
  renderHistoryDropdown();
  applyAiPanelState();
  // Pane resize handles (sidebar/outline/props/AI) — restore widths + install drag
  void import('./pane-resize').then((m) => m.attachPaneResizers());
  g('ai-key').addEventListener('click', configureApiKey);
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
    b.className = 'n365-ai-chip';
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
export async function init(): Promise<void> {
  setLoad(true);
  try {
    // n365-pages list is auto-created by apiGetPages on first call
    S.pages = await apiGetPages();
    renderTree();
    showView('empty');
    if (S.pages.length > 0) await doSelect(S.pages[0].Id);
  } catch (e) {
    g('em').innerHTML = '<div style="font-size:48px">⚠️</div><h2>エラー</h2><p>' + (e as Error).message + '</p>';
    g('em').style.display = 'flex';
    console.error(e);
  } finally { setLoad(false); }
}
