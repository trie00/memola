// Undo / redo stack for the controlled-rendering editor.
//
// Each entry is a complete `EditorState` snapshot. State is small
// (block-tree JSON, hundreds of bytes for typical documents) so the
// memory cost is fine even with 100+ history entries.
//
// Coalescing: consecutive insertText mutations are merged into a
// single undo step so the user doesn't have to ⌘Z 200 times to undo
// "typed a paragraph". The merge window is character-typing within
// the same block, no more than ~750ms apart.
//
// `pushIfChanged` is the main entry point — call it after every
// state mutation; it dedupes against the last entry.

import type { EditorState } from './editor-state';

interface UndoEntry {
  state: EditorState;
  /** Coalescing tag — consecutive entries with the same tag merge
   *  into one undo step. We use the source mutation type as the tag
   *  ('typing', 'delete', 'structural'). */
  tag: string;
  /** Wall-clock timestamp (ms). Used by the coalescing window. */
  at: number;
  /** Block id this mutation operated on (when known). Coalescing is
   *  scoped per-block so typing in block A then typing in block B
   *  produces two undo steps, not one. Codex review O5. */
  blockId: string | null;
}

/** Maximum entries kept in the undo stack. Older entries roll off
 *  the bottom. */
const MAX_HISTORY = 200;

/** Coalescing window for mergeable mutations (= consecutive typing
 *  within a single block). */
const COALESCE_MS = 750;

export class UndoStack {
  private _undo: UndoEntry[] = [];
  private _redo: UndoEntry[] = [];

  /** Reset to a known starting state. */
  reset(state: EditorState): void {
    this._undo = [{ state, tag: 'init', at: Date.now(), blockId: null }];
    this._redo = [];
  }

  /** Push a new state. Coalesces with the previous entry when:
   *    - tag matches AND tag is 'typing' or 'delete' (the only
   *      coalescable tags — structural mutations always start a new
   *      undo step), AND
   *    - blockId matches (= same block being edited), AND
   *    - within COALESCE_MS of the previous entry.
   *
   *  Codex review O5 + E7: the previous coalescer only checked tag +
   *  time, so typing in block A then quickly typing in block B got
   *  merged into one undo step. With block-scoped coalescing, op-tag
   *  matching, and a strict typing↔delete boundary, ⌘Z now reverses
   *  one logical edit at a time. */
  push(next: EditorState, tag: string, blockId: string | null = null): void {
    const top = this._undo[this._undo.length - 1];
    const now = Date.now();
    const COALESCABLE = tag === 'typing' || tag === 'delete';
    const canCoalesce = !!top
      && COALESCABLE
      && top.tag === tag
      && top.blockId === blockId
      && (now - top.at) < COALESCE_MS;
    if (canCoalesce) {
      top.state = next;
      // Keep the older timestamp so a long burst eventually breaks
      // into a fresh undo step.
    } else {
      this._undo.push({ state: next, tag, at: now, blockId });
      if (this._undo.length > MAX_HISTORY) {
        this._undo.shift();
      }
    }
    this._redo = [];
  }

  canUndo(): boolean { return this._undo.length > 1; }
  canRedo(): boolean { return this._redo.length > 0; }

  /** Pop the top entry into the redo stack and return the state
   *  beneath it (= the state to revert to). Returns null when there
   *  is nothing to undo. */
  undo(): EditorState | null {
    if (this._undo.length <= 1) return null;
    const top = this._undo.pop()!;
    this._redo.push(top);
    return this._undo[this._undo.length - 1].state;
  }

  redo(): EditorState | null {
    const top = this._redo.pop();
    if (!top) return null;
    this._undo.push(top);
    return top.state;
  }

  /** Read-only accessor for the current top state. */
  current(): EditorState | null {
    const top = this._undo[this._undo.length - 1];
    return top ? top.state : null;
  }
}
