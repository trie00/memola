// Saver → UI bridge.
//
// Subscribes to the Saver state machine and:
//   - Drives the status bar text (「未保存」「保存中…」「保存済み」「競合」)
//   - Mirrors the watermark (`S.sync.loadedEtag` / `loadedModified`) so
//     `sync-watch.ts` can detect foreign edits against a stable baseline
//   - Keeps the legacy `S.dirty` / `S.saving` markers alive for the DB
//     row-page flow (still owns its own dirty state and reads these)
//
// Page bodies are now exclusively driven by the Saver state machine.
// The bridge is the only place that maps Saver state → status bar UI.

import { S } from '../state';
import { setSave } from '../ui/ui-helpers';
import { saver, type SaverState } from './saver';

let _attached = false;

export function attachSaverBridge(): void {
  if (_attached) return;
  _attached = true;
  saver.subscribe(onState);
}

function onState(s: SaverState): void {
  switch (s.kind) {
    case 'unloaded':
      // No active page → leave row-page dirty state alone (row-page
      // manages its own S.dirty for DB rows).
      return;

    case 'idle':
      S.dirty = false;
      S.saving = false;
      S.sync.loadedEtag = s.base.etag;
      S.sync.loadedModified = s.base.modified;
      setSave('保存済み');
      return;

    case 'dirty':
      S.dirty = true;
      S.saving = false;
      S.sync.loadedEtag = s.base.etag;
      S.sync.loadedModified = s.base.modified;
      setSave('未保存');
      return;

    case 'saving':
      S.dirty = true;
      S.saving = true;
      S.sync.loadedEtag = s.base.etag;
      S.sync.loadedModified = s.base.modified;
      setSave('保存中...');
      return;

    case 'conflict':
      // Keep showing the original base etag/modified so sync-watch can
      // detect further SP advancement against our pre-conflict baseline.
      S.dirty = true;
      S.saving = false;
      S.sync.loadedEtag = s.conflict.base.etag;
      setSave('競合');
      return;

    case 'merging':
      S.dirty = true;
      S.saving = false;
      S.sync.loadedEtag = s.conflict.base.etag;
      setSave('競合');
      return;
  }
}
