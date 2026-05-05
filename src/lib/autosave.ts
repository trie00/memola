// Autosave scheduler — subscribes to the Saver and debounces saves.
//
// Replaces the old `_svT` / `schedSave` / `clearSaveTimer` constellation
// that was scattered across actions.ts. The scheduler is now driven
// entirely by Saver state transitions:
//
//   - kind === 'dirty'                → arm timer (debounced save in N ms)
//   - kind === 'idle' / 'unloaded'    → cancel timer (nothing to save)
//   - kind === 'saving' / 'conflict'  → cancel timer (don't pile on)
//   - kind === 'merging'              → cancel timer (merge UI owns saves)
//
// The pref `prefSaveDelayMs === '0'` switches to manual-save-only mode:
// editor input is silently noted by the Saver (state goes to 'dirty')
// but no autosave fires; the user must press Ctrl/Cmd+S.
//
// The "deferred-conflict" behaviour the old code tried to express via
// `S.sync.conflictPendingId` is now FREE: when the Saver is in
// 'conflict' state, the timer is cancelled. The user can keep typing
// (Saver transitions back to 'dirty' on edit), which arms a new timer,
// which fires a save, which re-detects the conflict (or succeeds if SP
// caught up). No flag, no spurious modal-multiplication.

import { saver, type SaverState } from './saver';
import { SAVE_MS } from '../config';
import { prefSaveDelayMs } from './prefs';

let _timer: ReturnType<typeof setTimeout> | null = null;

function delayMs(): number {
  const raw = prefSaveDelayMs.get();
  const n = raw ? parseInt(raw, 10) : SAVE_MS;
  if (!isFinite(n) || n < 0) return SAVE_MS;
  return n;     // 0 means "manual only"
}

function clear(): void {
  if (_timer) {
    clearTimeout(_timer);
    _timer = null;
  }
}

function onState(s: SaverState): void {
  switch (s.kind) {
    case 'dirty': {
      clear();
      const ms = delayMs();
      if (ms <= 0) return;            // manual-only mode
      _timer = setTimeout(() => {
        _timer = null;
        // Re-check state — by the time the timer fires the user may
        // have undone back to idle, or the page might have been
        // unloaded. saver.save() handles all those cases as no-ops.
        void saver.save().catch(() => undefined);
      }, ms);
      return;
    }
    case 'idle':
    case 'unloaded':
    case 'saving':
    case 'conflict':
    case 'merging':
      clear();
      return;
  }
}

let _attached = false;

/** Wire the autosave scheduler. Idempotent — safe to call from
 *  bookmarklet boot and again from re-mounts. */
export function attachAutosaveScheduler(): void {
  if (_attached) return;
  _attached = true;
  saver.subscribe(onState);
}

/** Cancel any pending autosave timer. Used by app teardown so a
 *  delayed save doesn't fire after the overlay is gone. */
export function cancelAutosave(): void {
  clear();
}
