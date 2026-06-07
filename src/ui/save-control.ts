// Save flow controllers. Thin shims over the Saver state machine
// (`src/lib/saver.ts`) — they pull the current editor content into the
// Saver and trigger save / flush operations. The Saver, autosave
// scheduler, status bar bridge, conflict modal and merge modal are
// all wired together via subscriptions; nothing else has to know about
// state transitions.
//
// 通常ページも DB行ページも同じ Saver 経路で保存する(行専用の saveCurrentRow /
// armRowAutosave / `if (S.currentRow)` 分岐は廃止)。行ページは openRowAsPage が
// saver.loadPage で「その行」を保存対象に設定済みなので、ここは currentRow を
// 区別せず常にセーバへ流す。
//
// Public API:
//   - `schedSave()`        editor mutation hook (flips Saver to 'dirty')
//   - `flushPendingSave()` save the current edits NOW (Ctrl+S, page nav, close)
//   - `clearSaveTimer()`   cancel pending autosave (close path)

import { S } from '../state';
import { g, getEd } from './dom';
import { saver } from '../lib/saver';
import { cancelAutosave } from '../lib/autosave';
import { syncEditor2IntoSaver } from './editor2/editor2-bridge';

/** Pull the editor's current content (blocks + title) and push it to the
 *  Saver. The only bridge between "the editor's DOM" and "the Saver's view
 *  of pending changes". The Saver writes to its loaded page (base.pageId),
 *  which is the normal page OR the DB row established by openRowAsPage. */
function syncEditorIntoSaver(): void {
  if (!S.currentId) return;
  if (S.currentType === 'database') return;
  const te = g('ttl') as HTMLTextAreaElement | null;
  const ed = getEd();
  if (!te || !ed) return;
  const title = te.value.trim() || '無題';
  syncEditor2IntoSaver(title);
}

/** Editor-input hook — debounced autosave. Pulls the current editor
 *  content into the Saver (which transitions to 'dirty'); the autosave
 *  scheduler arms a timer to call `saver.save()`. */
export function schedSave(): void {
  if (!S.currentId || S.currentType === 'database') return;
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
 *  follow-up if the user typed during the round-trip. It does NOT retry
 *  after a conflict — the user must resolve it explicitly. */
export async function flushPendingSave(): Promise<void> {
  syncEditorIntoSaver();
  await saver.flush();
}
