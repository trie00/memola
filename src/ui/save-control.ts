// Save flow controllers. Thin shims over the Saver state machine
// (`src/lib/saver.ts`) — they pull the current editor content into the
// Saver and trigger save / flush operations. The Saver, autosave
// scheduler, status bar bridge, conflict modal and merge modal are
// all wired together via subscriptions; nothing else has to know about
// state transitions.
//
// Public API:
//   - `schedSave()`       editor mutation hook (flips Saver to 'dirty')
//   - `flushPendingSave()` save the current edits NOW (Ctrl+S, page
//                         nav, app close). Handles both Saver-driven
//                         pages and the legacy row-page branch.
//   - `clearSaveTimer()`  cancel pending autosave (close path)
//
// Row-page saves take a separate code path (`row-page.saveCurrentRow`)
// because DB rows aren't yet migrated to the Saver. flushPendingSave
// delegates when `S.currentRow` is set.

import { S } from '../state';
import { g, getEd } from './dom';
import { saver } from '../lib/saver';
import { cancelAutosave } from '../lib/autosave';
import { syncEditor2IntoSaver } from './editor2/editor2-bridge';
import { setSave } from './ui-helpers';

/** Pull the editor's current content (HTML → markdown + title) and
 *  push it to the Saver. Called from every editor mutation site via
 *  `schedSave()` and from the keyboard `Ctrl+S` / page-nav flush.
 *
 *  This is the only bridge between "the editor's DOM" and "the
 *  Saver's view of pending changes". Everywhere else, the source of
 *  truth is `saver.state()`. */
function syncEditorIntoSaver(): void {
  if (!S.currentId) return;
  if (S.currentType === 'database') return;
  if (S.currentRow) return;     // row-pages have their own save path
  const te = g('ttl') as HTMLTextAreaElement | null;
  const ed = getEd();
  if (!te || !ed) return;
  const title = te.value.trim() || '無題';
  // editor2 (controlled-rendering) owns the editor DOM — pull blocks
  // straight from its canonical state. The legacy htmlToBlocks parse
  // path was deleted in Phase 2c-5 along with editor.ts.
  syncEditor2IntoSaver(title);
}

/** Editor-input hook — debounced autosave. Pulls the current editor
 *  content into the Saver (which transitions to 'dirty'); the autosave
 *  scheduler arms a timer to call `saver.save()`. */
export function schedSave(): void {
  if (!S.currentId || S.currentType === 'database') return;
  if (S.currentRow) {
    // Row-pages still use the legacy dirty/saving markers (= the
    // memola-pages row save path is markdown-based and doesn't go
    // through the Saver state machine). Mark dirty so the next
    // flushPendingSave / Ctrl+S / close-app actually persists the
    // edit; legacy editor.ts did this on every mutation, and after
    // moving row-pages to editor2 we need to re-establish the same
    // signal at the editor-subscribe boundary.
    if (!S.dirty) {
      S.dirty = true;
      setSave('未保存');
    }
    return;
  }
  syncEditorIntoSaver();
}

/** Cancel any pending autosave timer. Used by close / nav teardown. */
export function clearSaveTimer(): void {
  cancelAutosave();
}

/** Robust "save right now and don't lose anything" flush. Used by:
 *  - page navigation (`doSelect` calls this before swapping the editor DOM)
 *  - manual save (Ctrl/Cmd+S)
 *  - app close / bookmarklet teardown
 *
 *  The Saver's `flush()` waits for any in-flight save and triggers a
 *  follow-up if the user typed during the round-trip. It does NOT
 *  retry after a conflict — the user must resolve it explicitly. */
export async function flushPendingSave(): Promise<void> {
  // Row-page (= DB row's body editor) still uses its own save path
  // distinct from the Saver state machine. Without this branch the
  // row-page Ctrl+S, page-nav flush and close-app flush were all
  // no-ops (the lower syncEditorIntoSaver early-returns when
  // `S.currentRow` is set), silently dropping unsaved row edits.
  if (S.currentRow && S.dirty && !S.saving) {
    S.saving = true;
    try {
      const m = await import('./row-page');
      await m.saveCurrentRow();
    } finally { S.saving = false; }
    return;
  }
  syncEditorIntoSaver();
  await saver.flush();
}
