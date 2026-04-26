// Event-listener registration & app bootstrap.

import { S } from '../state';
import { SITE, FOLDER } from '../config';
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
import { openSearch, closeSearch, renderQs, qsMove, qsConfirm, resetQsSel } from './search-ui';
import {
  closeAiPanel, toggleAiPanel, sendAiMessage, clearAiHistory,
  configureApiKey, getQuickPrompts, loadAiSession, newAiSession, renderHistoryDropdown,
} from './ai-chat';
import { toggleOutline, applyOutlineState, attachOutlineWatcher } from './outline';
import { togglePropertiesPanel, applyPropertiesState } from './properties-panel';
import { showWorkspaceMenu, getCurrentWorkspaceName } from './workspaces';
import { openTrash, closeTrash } from './trash';
import { exportCsv, importCsv } from './csv-io';

const FOCUS_KEY = 'n365.focus';
function applyFocusMode(): void {
  const ov = document.getElementById('n365-overlay');
  if (!ov) return;
  if (localStorage.getItem(FOCUS_KEY) === '1') ov.classList.add('focus-mode');
  else ov.classList.remove('focus-mode');
}
function toggleFocusMode(): void {
  const cur = localStorage.getItem(FOCUS_KEY) === '1';
  if (cur) localStorage.removeItem(FOCUS_KEY);
  else localStorage.setItem(FOCUS_KEY, '1');
  applyFocusMode();
}
import { apiGetPages, apiSetIcon } from '../api/pages';
import { apiCreateDb } from '../api/db';
import { ensureFolder } from '../api/sp-core';
import { addListField, getListFields, getListItems } from '../api/sp-list';
import { saveMeta } from '../api/meta';

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

  // Sidebar toggle
  g('sb-toggle').addEventListener('click', () => {
    // 3-state cycle: full → rail (44px) → collapsed (hidden) → full
    const sb = g('sb');
    if (sb.classList.contains('collapsed')) { sb.classList.remove('collapsed'); sb.classList.remove('rail'); }
    else if (sb.classList.contains('rail')) { sb.classList.remove('rail'); sb.classList.add('collapsed'); }
    else sb.classList.add('rail');
    return;
  });

  // New page buttons
  g('nr').addEventListener('click', () => { doNew(''); });
  g('ne').addEventListener('click', () => { doNew(''); });

  // DB create
  g('ndb').addEventListener('click', () => { doNewDb(''); });
  g('ne-db').addEventListener('click', () => { doNewDb(''); });

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
    setLoad(true, 'フォルダを作成中...');
    try {
      await ensureFolder();
      S.pages = await apiGetPages();
      renderTree();
      toast('n365-pages フォルダを作成しました');
    } catch (e) { toast('作成に失敗: ' + (e as Error).message, 'err'); }
    finally { setLoad(false); }
  });

  // Column modal
  g('col-type').addEventListener('change', () => {
    const isChoice = (g('col-type') as HTMLSelectElement).value === '6';
    g('col-choices-row').classList.toggle('on', isChoice);
  });
  g('col-cancel').addEventListener('click', () => { g('col-md').classList.remove('on'); });
  g('col-ok').addEventListener('click', async () => {
    const name = (g('col-name') as HTMLInputElement).value.trim();
    if (!name) { g('col-name').focus(); return; }
    const typeKind = parseInt((g('col-type') as HTMLSelectElement).value);
    let choices: string[] = [];
    if (typeKind === 6) {
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
      saveMeta().catch((e: Error) => { toast('タイトル保存失敗: ' + e.message, 'err'); });
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
  g('dbv-table').addEventListener('click', () => setDbView('table'));
  g('dbv-board').addEventListener('click', () => setDbView('board'));
  g('dbv-list').addEventListener('click', () => setDbView('list'));
  g('dbv-gallery').addEventListener('click', () => setDbView('gallery'));
  g('dbv-calendar').addEventListener('click', () => setDbView('calendar'));
  g('dbv-gantt').addEventListener('click', () => setDbView('gantt'));

  // DB filter
  g('db-filter-btn').addEventListener('click', () => {
    g('filter-bar').classList.toggle('on');
    if (g('filter-bar').classList.contains('on')) g('filter-inp').focus();
  });
  g('filter-inp').addEventListener('input', () => {
    S.dbFilter = (g('filter-inp') as HTMLInputElement).value;
    renderDbTable();
  });
  g('filter-close').addEventListener('click', () => {
    g('filter-bar').classList.remove('on');
    (g('filter-inp') as HTMLInputElement).value = '';
    S.dbFilter = '';
    renderDbTable();
  });

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
      if (emoji) { dvIcon.textContent = emoji; dvIcon.style.display = 'inline-block'; dvAdd.style.display = 'none'; }
      else { dvIcon.style.display = 'none'; dvAdd.style.display = 'inline-flex'; }
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
      renderPageIcon(id);
      renderTree();
    }).catch((e: Error) => { toast('アイコン削除失敗: ' + e.message, 'err'); });
  });

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

  // Page menu (top-right "...")
  g('pgm-btn').addEventListener('click', (e) => {
    e.stopPropagation();
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
      case 'print':       printCurrent(); break;
      case 'info':        showPageInfo(); break;
      case 'focus':       toggleFocusMode(); break;
      case 'delete':      if (S.currentId) await doDel(S.currentId); break;
    }
  });
  attachPageMenuOutsideClick();

  // Apply persisted focus mode
  applyFocusMode();

  // Trash
  g('trash-btn').addEventListener('click', openTrash);
  g('trash-close').addEventListener('click', closeTrash);
  g('trash-md').addEventListener('click', (e) => { if (e.target === g('trash-md')) closeTrash(); });

  // Workspace switcher
  const wsName = getCurrentWorkspaceName();
  if (wsName) g('ws-name').textContent = wsName;
  g('ws-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    showWorkspaceMenu(g('ws-btn'));
  });

  // Outline panel
  g('outline-btn').addEventListener('click', toggleOutline);
  attachOutlineWatcher();
  applyOutlineState();

  // Properties panel
  g('props-btn').addEventListener('click', togglePropertiesPanel);
  applyPropertiesState();

  // AI chat panel
  g('ai-btn').addEventListener('click', toggleAiPanel);
  g('ai-close').addEventListener('click', closeAiPanel);
  g('ai-clear').addEventListener('click', clearAiHistory);
  g('ai-hist').addEventListener('change', () => {
    const v = (g('ai-hist') as HTMLSelectElement).value;
    if (v === '__new__') newAiSession();
    else loadAiSession(v);
  });
  renderHistoryDropdown();
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
    const r = await fetch(SITE + "/_api/web/GetFolderByServerRelativeUrl('" + FOLDER + "')", {
      headers: { Accept: 'application/json;odata=verbose' },
      credentials: 'include',
    });
    if (!r.ok) { setLoad(false); g('md').classList.add('on'); return; }
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
