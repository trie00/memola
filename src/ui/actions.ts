// Page CRUD (create / delete / purge), lifecycle (teardown / closeApp),
// and the DB new-row inline form.
//
// Other concerns split out:
//   - save flow         → src/ui/save-control.ts
//   - emoji picker      → src/ui/emoji-picker.ts
//   - export (md/html)  → src/ui/page-export.ts
//   - per-page actions  → src/ui/page-actions.ts
//   - page menu popover → src/ui/page-menu.ts
//   - global keymap     → src/ui/keymap.ts

import { S } from '../state';
import { g } from './dom';
import { setLoad, toast } from './ui-helpers';
import { renderTree } from './tree';
import { showView, doSelect } from './views';
import { apiCreatePage, apiDeletePage, apiTrashPage } from '../api/pages';
import { collectDescendantIds } from '../lib/page-tree';
import { getDbFields, mkDbRow } from './views';
import { saver } from '../lib/saver';
import { flushPendingSave, clearSaveTimer } from './save-control';
import { onKey } from './keymap';
import { addPage, removePages } from '../lib/page-store';

export async function doNew(parentId: string): Promise<void> {
  try {
    setLoad(true, 'ページを作成中...');
    const p = await apiCreatePage('無題', parentId || '');
    addPage(p);
    if (parentId) S.expanded.add(parentId);
    renderTree();
    await doSelect(p.Id);
    (g('ttl') as HTMLTextAreaElement).select();
  } catch (e) { toast('ページ作成に失敗: ' + (e as Error).message, 'err'); }
  finally { setLoad(false); }
}

const collectIds = (id: string): string[] => collectDescendantIds(S.pages, id);

export async function doDel(id: string): Promise<void> {
  const page = S.pages.find((p) => p.Id === id);
  const name = page ? (page.Title || '無題') : '無題';
  const hasK = S.pages.some((p) => p.ParentId === id);
  // Hard block: the daily DB is treated as undeletable infrastructure.
  // Showing the user a "delete?" confirm here even with strong warnings
  // turned out to invite accidental loss + reproduce the duplicate-DB
  // bug on restore. Just refuse outright.
  const meta = S.meta.pages.find((p) => p.id === id);
  const isDailyDb = meta?.type === 'database' && meta.list === 'memola-daily';
  if (isDailyDb) {
    toast(
      'デイリーノート DB は削除できません (個人運用に必須)',
      'err',
    );
    return;
  }
  if (!confirm(hasK ? '「' + name + '」と子ページをゴミ箱へ移動しますか？' : '「' + name + '」をゴミ箱へ移動しますか？')) {
    return;
  }
  try {
    setLoad(true, '移動中...');
    await apiTrashPage(id);
    const trashedIds = collectIds(id);
    removePages(trashedIds);
    if (S.currentId !== null && trashedIds.includes(S.currentId)) {
      S.currentId = null;
      showView('empty');
    }
    renderTree();
    toast('ゴミ箱に移動しました');
  } catch (e) { toast('削除に失敗: ' + (e as Error).message, 'err'); }
  finally { setLoad(false); }
}

// Permanently remove from trash (called by trash UI)
export async function doPurge(id: string): Promise<void> {
  if (!confirm('完全に削除します。元に戻せませんがよろしいですか？')) return;
  try {
    setLoad(true, '完全削除中...');
    await apiDeletePage(id);
    toast('完全に削除しました');
  } catch (e) { toast('削除失敗: ' + (e as Error).message, 'err'); }
  finally { setLoad(false); }
}

// ── DB new row action ─────────────────────────────────
export function doNewDbRow(): void {
  const tbody = g('dtb');
  if (tbody.querySelector('.memola-dr-new')) return;
  const fields = getDbFields();
  const tr = document.createElement('tr');
  tr.className = 'memola-dr-new';
  let saved = false;

  // Leading checkbox cell — empty placeholder so column alignment matches the
  // existing rows (which now have a checkbox column at the start).
  const cbTd = document.createElement('td');
  cbTd.className = 'memola-td-cb';
  tr.appendChild(cbTd);

  fields.forEach((f) => {
    const td = document.createElement('td');
    const span = document.createElement('span');
    span.className = 'memola-dc';
    span.contentEditable = 'true';
    span.dataset.field = f.InternalName;
    span.addEventListener('keydown', (e) => {
      const ke = e as KeyboardEvent;
      if (ke.key === 'Enter' && !ke.shiftKey) { e.preventDefault(); saveNewRow(); }
      if (ke.key === 'Escape') { tr.remove(); }
      if (ke.key === 'Tab') {
        e.preventDefault();
        const cells = Array.from(tr.querySelectorAll<HTMLElement>('.memola-dc'));
        const next = ke.shiftKey ? cells[cells.indexOf(span) - 1] : cells[cells.indexOf(span) + 1];
        if (next) next.focus(); else saveNewRow();
      }
    });
    td.appendChild(span);
    tr.appendChild(td);
  });
  const emptyTd = document.createElement('td');
  emptyTd.className = 'memola-td-del';
  tr.appendChild(emptyTd);
  tbody.appendChild(tr);
  const first = tr.querySelector<HTMLElement>('.memola-dc');
  if (first) first.focus();

  async function saveNewRow(): Promise<void> {
    if (saved) return;
    const data: Record<string, unknown> = {};
    tr.querySelectorAll<HTMLElement>('.memola-dc').forEach((s) => {
      const v = (s.textContent || '').trim();
      if (v) data[s.dataset.field as string] = v;
    });
    if (!data.Title) { tr.remove(); return; }
    saved = true;
    try {
      setLoad(true, '追加中...');
      const { addRowWithUndo } = await import('./db-history');
      const item = await addRowWithUndo(S.dbList, data);
      S.dbItems.push(item);
      tr.remove();
      g('dtb').appendChild(mkDbRow(item, fields));
      toast('行を追加しました（⌘Z で取消可能）');
    } catch (e) {
      toast('追加失敗: ' + (e as Error).message, 'err');
      tr.remove();
      saved = false;
    } finally { setLoad(false); }
  }

  tr.addEventListener('focusout', () => {
    setTimeout(() => { if (!tr.contains(document.activeElement)) saveNewRow(); }, 100);
  });
}

// ── CLOSE ─────────────────────────────────────────────
/** Single tear-down used by every close path:
 *    ① 「閉じる」 button (`closeApp`)
 *    ② ESC key (also via `closeApp`)
 *    ③ Bookmarklet re-press (`memolaShutdown` in wiring.ts → calls this)
 *    ④ Browser-tab close / browser quit (beforeunload — best-effort,
 *       async work won't always complete but we attempt the same steps)
 *
 *  All paths share:
 *    - flushPendingSave (fire-and-forget — overlay removal doesn't wait
 *      because the network request itself continues even after the DOM
 *      is detached, and we want UI feedback to be instant).
 *    - clearSaveTimer (cancel debounced autosave; nothing to do anyway
 *      after flushPendingSave fires).
 *    - stopWatching (sync-poll timer).
 *    - shutdownPresence (delete this tab's presence row + stop pinging
 *      so other users see us go away immediately, not after STALE_MS).
 *    - removeEventListener('keydown', onKey) so a re-injected
 *      bookmarklet starts with a clean listener count.
 *
 *  `removeOverlay=true` is for closeApp (the user expects the UI gone);
 *  bookmarklet-shutdown sets it false because main.ts removes the
 *  overlay itself just after calling shutdown. */
export function teardown(opts: { flushSave: boolean; removeOverlay: boolean }): void {
  if (opts.flushSave) {
    void flushPendingSave().catch(() => undefined);
  }
  clearSaveTimer();
  void import('./sync-watch').then((m) => m.stopWatching()).catch(() => undefined);
  void import('./presence-ui').then((m) => m.shutdownPresence()).catch(() => undefined);
  document.removeEventListener('keydown', onKey);
  if (opts.removeOverlay) {
    const overlay = document.getElementById('memola-overlay');
    if (overlay) overlay.remove();
    const st = document.getElementById('memola-style');
    if (st) st.remove();
  }
}

/** Close the app with a confirmation dialog. Uses the custom modal
 *  (close-confirm-modal.ts) instead of native `window.confirm()` so the
 *  ESC handling is fully under our control and doesn't bounce back to
 *  zombie keydown listeners.
 *
 *  Marked async because the custom modal is Promise-based. Callers can
 *  `void closeApp()` if they don't care about the resolution. */
export async function closeApp(): Promise<void> {
  const msg = saver.isDirty()
    ? '保存していない変更があります。アプリを閉じますか？\n(OK で保存してから閉じます)'
    : 'アプリを閉じますか？';
  const { confirmClose } = await import('./close-confirm-modal');
  const proceed = await confirmClose(msg);
  if (!proceed) return;
  teardown({ flushSave: true, removeOverlay: true });
}


