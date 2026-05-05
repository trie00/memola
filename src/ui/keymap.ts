// Global keyboard router. Wired once at boot
// (`document.addEventListener('keydown', onKey)` in wiring.ts) and
// dispatches every meaningful shortcut: undo/redo, save (Ctrl+S), open
// search, toggle AI panel, navigation history, focus mode toggle, modal
// dismissal cascades on ESC, etc.
//
// Editor-internal shortcuts (slash menu, page picker, formatting keys)
// are handled by editor.ts — those run BEFORE this handler in capture
// phase. This handler only catches keys that bubble out of the editor
// or fire outside any editable region.

import { S } from '../state';
import { g } from './dom';
import { toast } from './ui-helpers';
import { isSlashActiveEditor2 as isSlashActive, closeSlashMenuEditor2 as closeSlashMenu } from './editor2/editor2-bridge';
import { closeSearch } from './search-ui';
import { flushPendingSave } from './save-control';
import { doNew, closeApp } from './actions';

function isEditableTarget(t: EventTarget | null): boolean {
  const el = t as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (el.isContentEditable) return true;
  return false;
}

/** Late-bound — search-ui imports closeSearch from here, so reaching
 *  for openSearch directly during module load would create a cycle. */
function openSearchProxy(): void {
  void import('./search-ui').then((m) => m.openSearch());
}

function toggleAiProxy(): void {
  void import('./ai-chat').then((m) => m.toggleAiPanel());
}

export function onKey(e: KeyboardEvent): void {
  const mod = e.ctrlKey || e.metaKey;
  // ── Undo / redo ───────────────────────────────────────
  // Z/Y mapping: Cmd/Ctrl+Z = undo, Cmd/Ctrl+Shift+Z = redo,
  // Cmd/Ctrl+Y = redo (Windows convention; we also bind it on Mac).
  const isUndoKey = mod && !e.shiftKey && (e.key === 'z' || e.key === 'Z');
  const isRedoKey = mod && (
    (e.shiftKey && (e.key === 'z' || e.key === 'Z')) ||
    (!e.shiftKey && (e.key === 'y' || e.key === 'Y'))
  );
  if (isUndoKey || isRedoKey) {
    // DB view → custom undo/redo stack
    if (S.currentType === 'database' && S.dbList && !isEditableTarget(e.target)) {
      e.preventDefault();
      const isRedo = isRedoKey;
      void import('./db-history').then(async (m) => {
        try {
          const r = isRedo ? await m.redoDb(S.dbList) : await m.undoDb(S.dbList);
          if (!r) toast(isRedo ? '再実行できる操作がありません' : '取り消す操作がありません');
        } catch (err) { toast((isRedo ? '再実行' : '取り消し') + '失敗: ' + (err as Error).message, 'err'); }
      });
      return;
    }
    // Editor: Cmd/Ctrl+Y on Mac doesn't bind to redo natively; route it
    // through `document.execCommand('redo')` so it works the same as
    // Cmd/Ctrl+Shift+Z. (Cmd+Z and Cmd+Shift+Z are handled natively by
    // the browser, so don't intercept those.)
    if (isRedoKey && !e.shiftKey && (e.key === 'y' || e.key === 'Y') && isEditableTarget(e.target)) {
      e.preventDefault();
      try { document.execCommand('redo'); } catch { /* ignore */ }
      return;
    }
  }
  // Cmd/Ctrl+A in DB view → select all visible rows
  if (mod && (e.key === 'a' || e.key === 'A') && !e.shiftKey) {
    if (S.currentType === 'database' && S.dbList && !isEditableTarget(e.target)) {
      e.preventDefault();
      void import('./views').then((m) => {
        const visible = m.getSortedFilteredItems();
        visible.forEach((it) => S.dbSelected.add(it.Id));
        m.renderDbTable();
      });
      return;
    }
  }
  if (mod && e.key === 's') {
    e.preventDefault();
    // Use the same flush path as page navigation — bails the in-flight
    // autosave race so Ctrl+S always persists the latest content.
    void flushPendingSave();
    return;
  }
  if (mod && e.key === 'k') { e.preventDefault(); openSearchProxy(); return; }
  if (mod && e.key === 'j') { e.preventDefault(); toggleAiProxy(); return; }
  // ? (any platform — Shift+/) outside a contenteditable opens the
  // shortcut cheatsheet. Editing context is excluded so users typing a
  // literal "?" in their notes don't get a popup.
  if (e.key === '?' && !mod && !isEditableTarget(e.target)) {
    e.preventDefault();
    void import('./shortcuts-modal').then((m) => m.openShortcutsModal());
    return;
  }
  // ⌘+\ サイドバー切替
  if (mod && (e.key === '\\' || e.code === 'Backslash')) {
    e.preventDefault();
    document.getElementById('memola-sb-toggle')?.click();
    return;
  }
  // ⌘+[ / ⌘+] 戻る・進む (browser convention)。
  if (mod && (e.key === '[' || e.code === 'BracketLeft')) {
    e.preventDefault();
    void import('./nav-history').then((m) => m.goBack());
    return;
  }
  if (mod && (e.key === ']' || e.code === 'BracketRight')) {
    e.preventDefault();
    void import('./nav-history').then((m) => m.goForward());
    return;
  }
  // ⌘+Shift+L 目次 / R プロパティ / F 集中 / A AI / N 新規ページ / N+Shift 新規DB
  if (mod && e.shiftKey) {
    const k = e.key.toLowerCase();
    if (k === 'l') { e.preventDefault(); void import('./outline').then((m) => m.toggleOutline()); return; }
    if (k === 'r') { e.preventDefault(); void import('./properties-panel').then((m) => m.togglePropertiesPanel()); return; }
    if (k === 'f') { e.preventDefault(); document.getElementById('memola-overlay')?.classList.toggle('focus-mode'); return; }
    if (k === 'a') { e.preventDefault(); toggleAiProxy(); return; }
    if (k === 'n') { e.preventDefault(); /* new DB - left to wiring */ return; }
  }
  if (mod && e.key.toLowerCase() === 'n' && !e.shiftKey) {
    e.preventDefault();
    void doNew('');
    return;
  }
  if (e.key === 'Escape') {
    // Auto-repeat (OS keyboard repeat while ESC is held) would re-fire
    // the close-confirm dialog after each cycle. Ignore repeats — user
    // has to release + press ESC again to trigger another close attempt.
    if (e.repeat) return;
    if (g('qs').classList.contains('on')) { closeSearch(); return; }
    if (g('emoji').classList.contains('on')) { g('emoji').classList.remove('on'); return; }
    // Modal popups (drafts / trash / settings / version history / col-add /
    // create / general): just close the topmost modal, never the whole app.
    const trashMd = document.getElementById('memola-trash-md');
    if (trashMd?.classList.contains('on')) { trashMd.classList.remove('on'); return; }
    const draftsMd = document.getElementById('memola-drafts-md');
    if (draftsMd && draftsMd.style.display === 'flex') { draftsMd.style.display = 'none'; return; }
    const setMd = document.getElementById('memola-settings-md');
    if (setMd?.classList.contains('on')) { setMd.classList.remove('on'); return; }
    const scMd = document.getElementById('memola-shortcuts-md');
    if (scMd) { scMd.remove(); return; }
    const verMd = document.getElementById('memola-versions-md');
    if (verMd && verMd.style.display === 'flex') { verMd.style.display = 'none'; return; }
    const colMd = document.getElementById('memola-col-md');
    if (colMd?.classList.contains('on')) { colMd.classList.remove('on'); return; }
    const wsMenu = document.getElementById('memola-ws-menu');
    if (wsMenu) { wsMenu.remove(); return; }
    if (g('ai-panel').classList.contains('on')) { void import('./ai-chat').then((m) => m.closeAiPanel()); return; }
    if (isSlashActive()) { closeSlashMenu(); return; }
    closeApp();
  }
}
