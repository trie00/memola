// Controlled-rendering editor — orchestrator.
//
// Wires together the state model (`editor-state`), DOM rendering
// (`editor-render`), selection mapping (`editor-selection`), input
// dispatching (`editor-input`), and undo (`editor-undo`).
//
// Use:
//   const editor = createEditor(rootEl);
//   editor.setBlocks(initialBlocks);
//   editor.subscribe((blocks) => { /* persist */ });
//   editor.destroy();
//
// The editor handles its own DOM mutations — callers should NOT
// directly modify the rootEl. Callers MAY call `setBlocks` to load
// fresh content (e.g. from a server load).

import type { Block, BlockId } from '../../lib/blocks';
import {
  type EditorState, EMPTY_STATE,
  changeBlockKind, toggleTodo,
  insertText as insertTextStatic,
  applyInlineFormat, insertPagelink, insertBlockAfter,
  type InlineFormatKind,
} from './editor-state';
import type { Block as BlockType } from '../../lib/blocks';
import { render } from './editor-render';
import { applySelection, captureSelection } from './editor-selection';
import { handleBeforeInput } from './editor-input';
import { UndoStack } from './editor-undo';

/** External-facing handle to a mounted editor. */
export interface Editor {
  /** Replace the editor's blocks. When `silent: true`, subscribers
   *  are NOT notified — used by page-load to seed state without
   *  firing the autosave scheduler (Codex review O2). */
  setBlocks(blocks: Block[], opts?: { silent?: boolean }): void;
  getBlocks(): Block[];
  subscribe(fn: (blocks: Block[]) => void): () => void;
  destroy(): void;
  /** Force a fresh render (= reapply current state to the DOM).
   *  Used after external DOM changes (e.g. CSS theme swap) or when
   *  the caller knows the rendered DOM may have drifted. */
  rerender(): void;
  /** Manually trigger a state change for slash-command-style ops. */
  applyMutation(mutate: (s: EditorState) => EditorState, tag?: string): void;
  /** Toggle a todo's checked flag (called from the rendered checkbox). */
  toggleTodoBlock(blockId: BlockId): void;
  /** Change a block's kind in place (slash menu). */
  setBlockKind(blockId: BlockId, kind: 'p' | 'h1' | 'h2' | 'h3' | 'todo'): void;
  /** Apply or toggle an inline format on the current selection.
   *  Captures the live selection from the DOM, so the caller doesn't
   *  need to know the offsets. */
  toggleInlineFormat(kind: InlineFormatKind): void;
  /** Insert a `[[pageId]]` page-link at the caret. */
  insertPagelink(pageId: string, alias?: string): void;
  /** Insert a fresh block AFTER the block currently containing the
   *  caret. Useful for slash menu's "insert image / linkdb" etc. */
  insertBlockAfterCurrent(block: BlockType): void;
  /** Undo / redo. Returns true if a step was applied. */
  undo(): boolean;
  redo(): boolean;
}

interface EditorOpts {
  /** When true, blocks are written through stable IDs so re-render
   *  doesn't churn ids. Default true. */
  stableIds?: boolean;
}

export function createEditor(rootEl: HTMLElement, opts: EditorOpts = {}): Editor {
  void opts;     // reserved for later
  const undo = new UndoStack();
  let state: EditorState = EMPTY_STATE;
  const subscribers = new Set<(blocks: Block[]) => void>();
  let composing = false;
  /** Buffered text the IME inserted while we were composing — applied
   *  at compositionend. */
  let compositionStart: { blockId: BlockId; offset: number } | null = null;

  rootEl.contentEditable = 'true';
  rootEl.classList.add('memola-editor2');

  function setState(next: EditorState, tag = 'mutate'): void {
    if (next === state) return;
    state = next;
    // Codex review O5: pass the focused block id to the undo stack so
    // coalescing scopes per-block.
    const sel = next.selection;
    const blockId = sel?.kind === 'caret' ? sel.blockId
      : sel?.kind === 'range' ? sel.focusBlockId
      : null;
    undo.push(state, tag, blockId);
    paint();
    notify();
  }

  function paint(): void {
    render(rootEl, state.blocks);
    applySelection(rootEl, state.selection);
  }

  function notify(): void {
    for (const fn of subscribers) {
      try { fn(state.blocks); }
      catch { /* subscriber errors don't stop other subscribers */ }
    }
  }

  // ── Event handlers ──────────────────────────────────────

  const onBeforeInput = (ev: InputEvent): void => {
    if (composing) return;     // browser handles in-flight composition
    const result = handleBeforeInput(state, ev, rootEl);
    if (result.preventDefault) ev.preventDefault();
    if (result.next !== state) {
      const tag = ev.inputType.startsWith('insert') ? 'typing'
        : ev.inputType.startsWith('delete') ? 'delete'
        : 'structural';
      setState(result.next, tag);
    }
  };

  /** IME composition handlers. The browser owns DOM during composition;
   *  we sit out of the way (composing flag gates beforeinput) and apply
   *  the committed text at compositionend. */
  const onCompositionStart = (): void => {
    composing = true;
    const sel = captureSelection(rootEl);
    if (sel?.kind === 'caret') {
      compositionStart = { blockId: sel.blockId, offset: sel.offset };
    } else {
      compositionStart = null;
    }
  };

  const onCompositionEnd = (ev: CompositionEvent): void => {
    composing = false;
    const data = ev.data || '';
    if (!compositionStart || !data) {
      compositionStart = null;
      // Cancelled or no captured start — re-paint from state so the
      // browser's mid-composition DOM mutations don't leak into our
      // controlled rendering.
      paint();
      return;
    }
    const start = compositionStart;
    compositionStart = null;
    const next = insertTextStatic(state, start.blockId, start.offset, data);
    setState(next, 'typing');
  };

  const onSelectionChange = (): void => {
    if (composing) return;
    const sel = captureSelection(rootEl);
    if (sel) {
      // Update state.selection without churning the undo stack
      state = { ...state, selection: sel };
    }
  };

  const onKeydown = (ev: KeyboardEvent): void => {
    // Undo / redo (Cmd / Ctrl)
    const meta = ev.metaKey || ev.ctrlKey;
    if (meta && ev.key === 'z' && !ev.shiftKey) {
      ev.preventDefault();
      const prev = undo.undo();
      if (prev) {
        state = prev;
        paint();
        notify();
      }
      return;
    }
    if ((meta && ev.key === 'z' && ev.shiftKey) || (meta && ev.key === 'y')) {
      ev.preventDefault();
      const next = undo.redo();
      if (next) {
        state = next;
        paint();
        notify();
      }
      return;
    }
  };

  const onTodoToggle = (ev: Event): void => {
    const t = ev.target as HTMLElement;
    if (!t.classList.contains('memola-todo-cb')) return;
    const blk = t.closest<HTMLElement>('[data-block-id]');
    if (!blk) return;
    const id = blk.dataset.blockId!;
    setState(toggleTodo(state, id), 'structural');
  };

  rootEl.addEventListener('beforeinput', onBeforeInput);
  rootEl.addEventListener('compositionstart', onCompositionStart);
  rootEl.addEventListener('compositionend', onCompositionEnd);
  rootEl.addEventListener('keydown', onKeydown);
  rootEl.addEventListener('change', onTodoToggle);
  document.addEventListener('selectionchange', onSelectionChange);

  // ── External API ────────────────────────────────────────

  const editor: Editor = {
    setBlocks(blocks: Block[], opts: { silent?: boolean } = {}): void {
      state = { blocks, selection: null };
      undo.reset(state);
      paint();
      // Codex review O2: page-load uses silent so the autosave
      // scheduler isn't kicked by what is effectively the BASELINE.
      if (!opts.silent) notify();
    },
    getBlocks(): Block[] {
      return state.blocks;
    },
    subscribe(fn): () => void {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    },
    destroy(): void {
      rootEl.removeEventListener('beforeinput', onBeforeInput);
      rootEl.removeEventListener('compositionstart', onCompositionStart);
      rootEl.removeEventListener('compositionend', onCompositionEnd);
      rootEl.removeEventListener('keydown', onKeydown);
      rootEl.removeEventListener('change', onTodoToggle);
      document.removeEventListener('selectionchange', onSelectionChange);
      subscribers.clear();
      // Codex review O3: restore the root to non-editable so the
      // unmounted editor can't accept further keystrokes (e.g. user
      // is on the next page already but a quick keystroke before the
      // new mount would otherwise edit through us).
      rootEl.contentEditable = 'false';
      rootEl.classList.remove('memola-editor2');
      composing = false;
      compositionStart = null;
    },
    rerender: paint,
    applyMutation(mutate, tag = 'structural'): void {
      const next = mutate(state);
      setState(next, tag);
    },
    toggleTodoBlock(blockId: BlockId): void {
      setState(toggleTodo(state, blockId), 'structural');
    },
    setBlockKind(blockId: BlockId, kind): void {
      setState(changeBlockKind(state, blockId, kind), 'structural');
    },
    toggleInlineFormat(kind: InlineFormatKind): void {
      // Prefer the live DOM selection (= the most up-to-date), then
      // fall back to the cached state.selection. Toolbar clicks can
      // briefly disturb the live selection between mousedown and
      // click; the cached state.selection survived the disturbance
      // because onSelectionChange only updates it when the new
      // selection is non-null.
      const live = captureSelection(rootEl);
      const sel = live ?? state.selection;
      if (!sel || sel.kind !== 'range') return;
      if (sel.anchorBlockId !== sel.focusBlockId) return;     // multi-block deferred
      const from = Math.min(sel.anchorOffset, sel.focusOffset);
      const to = Math.max(sel.anchorOffset, sel.focusOffset);
      // Persist the captured range into state.selection BEFORE the
      // mutation so applySelection re-applies the same range after
      // paint (otherwise an interleaved selectionchange could swap
      // state.selection to a stale caret and we'd lose the visual
      // range highlight after the first toggle).
      const stateWithSel: EditorState = {
        ...state,
        selection: {
          kind: 'range',
          anchorBlockId: sel.anchorBlockId,
          anchorOffset: from,
          focusBlockId: sel.anchorBlockId,
          focusOffset: to,
        },
      };
      setState(applyInlineFormat(stateWithSel, sel.anchorBlockId, from, to, kind), 'structural');
    },
    insertPagelink(pageId: string, alias?: string): void {
      const sel = captureSelection(rootEl);
      if (!sel || sel.kind !== 'caret') return;
      setState(insertPagelink(state, sel.blockId, sel.offset, pageId, alias), 'structural');
    },
    insertBlockAfterCurrent(block: BlockType): void {
      const sel = captureSelection(rootEl);
      const anchorId = sel?.kind === 'caret' ? sel.blockId
        : sel?.kind === 'range' ? sel.focusBlockId
        : (state.blocks[state.blocks.length - 1]?.id);
      if (!anchorId) {
        // Empty editor → just append
        setState({
          blocks: [...state.blocks, block],
          selection: { kind: 'caret', blockId: block.id, offset: 0 },
        }, 'structural');
        return;
      }
      setState(insertBlockAfter(state, anchorId, block), 'structural');
    },
    undo(): boolean {
      const prev = undo.undo();
      if (!prev) return false;
      state = prev;
      paint();
      notify();
      return true;
    },
    redo(): boolean {
      const next = undo.redo();
      if (!next) return false;
      state = next;
      paint();
      notify();
      return true;
    },
  };

  return editor;
}
