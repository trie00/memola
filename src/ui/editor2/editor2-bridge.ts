// Bridge between editor2 (controlled-rendering) and the rest of the
// app. Owns the lazily-created singleton `Editor` instance and wires
// it to the Saver via debounced subscribe.
//
// **Phase 2c gating** — switched on by `prefEditor2.get() === '1'`.
// When off, the legacy attachEditor path runs (DOM-direct edits via
// htmlToBlocks at save time). This lets the user A/B test the new
// editor in a real browser without committing to the full migration.

import type { Block } from '../../lib/blocks';
import { newBlockId } from '../../lib/blocks';
import { createEditor, type Editor } from './editor2';
import { parseBlocksJson, serializeBlocks } from '../../api/pages';
import { mdToBlocks } from '../../lib/blocks-md';
import { htmlToBlocks } from '../../lib/blocks-html';
import { saver } from '../../lib/saver';
import { prefEditor2 } from '../../lib/prefs';
import { attachSlashMenu } from './editor2-slash';
import { attachWikiTrigger } from './editor2-wiki';
import { attachImageHandlers } from './editor2-image';
import { attachBlockDrag } from './editor2-drag';
import { attachTableHandlers } from './editor2-table';
import {
  bulletList, orderedList, quote, callout, codeBlock, rule,
} from './editor-state';

let _editor: Editor | null = null;
let _unsubscribe: (() => void) | null = null;
let _slashMenu: { destroy(): void } | null = null;
let _wikiTrigger: { destroy(): void } | null = null;
let _pasteCleanup: (() => void) | null = null;
let _ftbCleanup: (() => void) | null = null;
let _imageCleanup: (() => void) | null = null;
let _dragCleanup: (() => void) | null = null;
let _tableCleanup: (() => void) | null = null;
/** Codex review E5: incremented on every mount/destroy. Subscriber
 *  callbacks capture this value; if a deferred async path (e.g. the
 *  dynamic `import('../save-control')`) resolves AFTER the editor was
 *  destroyed and a new one mounted, the captured generation no longer
 *  matches and the deferred work is dropped. Without this, a stale
 *  schedSave() could land on a different page than the one the user
 *  is now on. */
let _generation = 0;

/** True unless the user has explicitly opted out of editor2. After
 *  Phase 2c-5 (legacy removal) this is effectively always true —
 *  the legacy editor.ts was deleted, the flag stays in source for
 *  documentation purposes only. */
export function isEditor2Enabled(): boolean {
  return prefEditor2.get() !== '0';
}

/** Mount editor2 on the given root, replacing any prior instance.
 *  Wires the editor's state changes to the autosave scheduler via
 *  the same `schedSave` entry-point the legacy editor uses, and
 *  attaches the slash menu + paste handler. */
export function mountEditor2(rootEl: HTMLElement): Editor {
  destroyEditor2();
  _generation++;
  const myGen = _generation;
  _editor = createEditor(rootEl);
  // Subscribe: every state change schedules an autosave. The save
  // path itself reads from `getBlocks()` via syncEditor2IntoSaver.
  _unsubscribe = _editor.subscribe((_blocks: Block[]) => {
    void _blocks;
    void import('../save-control').then((m) => {
      // Codex review E5: drop the schedSave when this editor mount is
      // no longer current — protects against a destroy + remount that
      // happened while the dynamic import was loading.
      if (myGen !== _generation) return;
      m.schedSave();
    });
  });
  _slashMenu = attachSlashMenu(_editor, rootEl);
  _wikiTrigger = attachWikiTrigger(_editor, rootEl);
  // Image handler runs in capture phase so it intercepts paste BEFORE
  // the markdown-paste fallback below — that's why we attach it first.
  _imageCleanup = attachImageHandlers(_editor, rootEl);
  _pasteCleanup = attachPasteHandler(_editor, rootEl);
  _ftbCleanup = attachFloatingToolbar(rootEl);
  _dragCleanup = attachBlockDrag(_editor, rootEl);
  _tableCleanup = attachTableHandlers(_editor, rootEl);
  return _editor;
}

/** Load blocks into the active editor2 (called on page navigation).
 *  Always silent — page-load is establishing the BASELINE, not a
 *  user mutation, so the autosave scheduler shouldn't fire.
 *
 *  Empty-page guard: if the loaded body has no blocks, seed an empty
 *  paragraph so the user has something to type INTO. Without this the
 *  editor renders 0 children, the user clicks, and the browser's
 *  contenteditable default kicks in — typing goes into a bare text
 *  node with no `data-block-id` ancestor, our `findBlockElement`
 *  returns null, every input event is ignored, slash/wiki/autosave
 *  all stop firing. */
export function loadBlocks(blocks: Block[]): void {
  if (!_editor) return;
  const seeded = blocks.length === 0
    ? [{ id: newBlockId(), kind: 'p' as const, inline: [] }]
    : blocks;
  _editor.setBlocks(seeded, { silent: true });
}

/** Load blocks from the JSON body string returned by apiLoadContentMeta. */
export function loadBlocksFromJson(json: string): void {
  loadBlocks(parseBlocksJson(json));
}

/** Read the current blocks (for save-time serialization). */
export function getBlocks(): Block[] {
  return _editor ? _editor.getBlocks() : [];
}

/** Tear down the active editor2 instance. */
export function destroyEditor2(): void {
  // Codex review E5: bump the generation BEFORE running cleanup so any
  // in-flight subscriber callback (= deferred dynamic import) sees a
  // stale generation and bails out.
  _generation++;
  if (_slashMenu) { _slashMenu.destroy(); _slashMenu = null; }
  if (_wikiTrigger) { _wikiTrigger.destroy(); _wikiTrigger = null; }
  if (_imageCleanup) { _imageCleanup(); _imageCleanup = null; }
  if (_pasteCleanup) { _pasteCleanup(); _pasteCleanup = null; }
  if (_ftbCleanup) { _ftbCleanup(); _ftbCleanup = null; }
  if (_dragCleanup) { _dragCleanup(); _dragCleanup = null; }
  if (_tableCleanup) { _tableCleanup(); _tableCleanup = null; }
  if (_unsubscribe) { _unsubscribe(); _unsubscribe = null; }
  if (_editor) { _editor.destroy(); _editor = null; }
}

/** Sync the active editor2's blocks into the Saver — called from
 *  save-control.ts when editor2 is enabled (replaces the legacy
 *  htmlToBlocks path). */
export function syncEditor2IntoSaver(title: string): void {
  if (!_editor) return;
  const body = serializeBlocks(_editor.getBlocks());
  saver.notifyEdit(body, title);
}

/** Toolbar / shortcut command dispatcher. Returns true when editor2
 *  handled the command, false otherwise. */
export function editor2ExecCmd(cmd: string): boolean {
  if (!_editor) return false;
  const ed = _editor;
  // Helper: id of the block that currently contains the caret. Used
  // by every block-replacement command (ul / ol / quote / callout /
  // pre / hr / kind toggles).
  const currentBlockId = (): string | null => {
    const sel = window.getSelection();
    const anchor = sel?.anchorNode;
    if (!anchor) return null;
    const el = (anchor.nodeType === 1 ? anchor as Element : anchor.parentElement);
    const blk = el?.closest<HTMLElement>('[data-block-id]');
    return blk?.dataset.blockId ?? null;
  };
  switch (cmd) {
    // Inline-format toggles
    case 'bold':       ed.toggleInlineFormat('bold');   return true;
    case 'italic':     ed.toggleInlineFormat('italic'); return true;
    case 'strike':     ed.toggleInlineFormat('strike'); return true;
    case 'codeInline':
    case 'code':       ed.toggleInlineFormat('code');   return true;
    // Block-kind toggles (paragraph / heading / todo)
    case 'p':
    case 'h1':
    case 'h2':
    case 'h3':
    case 'todo': {
      const id = currentBlockId();
      if (id) ed.setBlockKind(id, cmd);
      return true;
    }
    // Block-shape replacements (= replace the current block with a
    // fresh container of that kind). The block gets replaced wholesale
    // — current text is dropped intentionally; user can re-type or
    // type before pressing the toolbar button to author content
    // inside the new block. (The slash menu has the same shape.)
    case 'ul':
    case 'ol':
    case 'quote':
    case 'callout':
    case 'pre':
    case 'hr': {
      const id = currentBlockId();
      if (!id) return true;
      ed.applyMutation((s) => {
        const idx = s.blocks.findIndex((b) => b.id === id);
        if (idx < 0) return s;
        const blocks = s.blocks.slice();
        const made = makeBlock(cmd);
        blocks[idx] = made;
        const focusId = focusableIdOf(made);
        return {
          ...s,
          blocks,
          selection: focusId ? { kind: 'caret', blockId: focusId, offset: 0 } : s.selection,
        };
      }, 'structural');
      return true;
    }
  }
  return false;
}

/** Construct a fresh block instance for one of the block-shape
 *  toolbar commands. */
function makeBlock(cmd: 'ul' | 'ol' | 'quote' | 'callout' | 'pre' | 'hr'): Block {
  switch (cmd) {
    case 'ul':      return bulletList();
    case 'ol':      return orderedList();
    case 'quote':   return quote();
    case 'callout': return callout();
    case 'pre':     return codeBlock();
    case 'hr':      return rule();
  }
}

/** Find the child block whose caret should land at offset 0 after a
 *  shape-replacement command. For lists / callouts / quotes that's
 *  the inner first paragraph; for code / rule the block itself. */
function focusableIdOf(b: Block): string | null {
  if (b.kind === 'list') return b.items[0]?.[0]?.id ?? null;
  if (b.kind === 'callout' || b.kind === 'quote') return b.children[0]?.id ?? null;
  if ('inline' in b) return b.id;
  return null;
}

/** Reveal the floating toolbar (#ftb) on text selection within the
 *  editor. Mirrors the legacy editor's behaviour but the dispatch
 *  itself goes through `editor-toolbar.ts:dispatch` (= routes to
 *  editor2ExecCmd). */
function attachFloatingToolbar(rootEl: HTMLElement): () => void {
  const ftb = document.getElementById('memola-ftb') ||
    document.getElementById('ftb');
  if (!ftb) return () => undefined;
  const onSelChange = (): void => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
      ftb.classList.remove('on');
      return;
    }
    const range = sel.getRangeAt(0);
    if (!rootEl.contains(range.startContainer)) {
      ftb.classList.remove('on');
      return;
    }
    const rect = range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      ftb.classList.remove('on');
      return;
    }
    ftb.style.top = (rect.top + window.scrollY - 48) + 'px';
    ftb.style.left = (rect.left + window.scrollX) + 'px';
    ftb.classList.add('on');
  };
  document.addEventListener('selectionchange', onSelChange);
  return () => {
    document.removeEventListener('selectionchange', onSelChange);
    ftb.classList.remove('on');
  };
}

/** Strip empty todo blocks from the active editor's state. Called
 *  on page navigation by `views.ts:doSelect` so unfilled todos don't
 *  accumulate across sessions. Returns the number removed. */
export function pruneEmptyTodosEditor2(): number {
  if (!_editor) return 0;
  const blocks = _editor.getBlocks();
  const kept = blocks.filter((b) => {
    if (b.kind !== 'todo') return true;
    const text = b.inline.map((i) => i.kind === 'text' ? i.text : '').join('').trim();
    return text !== '';
  });
  const removed = blocks.length - kept.length;
  if (removed > 0) {
    _editor.applyMutation((s) => ({ ...s, blocks: kept }), 'structural');
  }
  return removed;
}

/** Slash menu open-state accessor — used by keymap.ts's Esc handler
 *  to know whether Esc should close the menu vs the bookmarklet. */
export function isSlashActiveEditor2(): boolean {
  return !!document.querySelector('.memola-slash2');
}

/** Force-close the editor2 slash menu (Esc handler). */
export function closeSlashMenuEditor2(): void {
  document.querySelectorAll('.memola-slash2').forEach((el) => el.remove());
}

/** Paste handler — runs in editor2 mount. Parses clipboard text /
 *  HTML into blocks and inserts them after the current block.
 *  Plaintext → mdToBlocks (so pasted markdown is interpreted as
 *  structure). HTML → htmlToBlocks. */
function attachPasteHandler(editor: Editor, rootEl: HTMLElement): () => void {
  const onPaste = (ev: ClipboardEvent): void => {
    const dt = ev.clipboardData;
    if (!dt) return;
    const html = dt.getData('text/html');
    const text = dt.getData('text/plain');
    let blocks: Block[] = [];
    if (html) {
      blocks = htmlToBlocks(html);
    } else if (text) {
      // Treat pasted plaintext as markdown — gives users free
      // structural conversion when they paste md from elsewhere.
      blocks = mdToBlocks(text);
    }
    if (blocks.length === 0) return;
    ev.preventDefault();
    // Codex review O4: insert in a SINGLE mutation so subscribers
    // see one notification (= one undo step, one autosave kick).
    // The previous reverse-loop produced N notifications and
    // additionally reversed order because insertBlockAfterCurrent
    // moves the caret to each new block.
    editor.applyMutation((s) => {
      const sel = s.selection;
      const anchorId = sel?.kind === 'caret' ? sel.blockId
        : sel?.kind === 'range' ? sel.focusBlockId
        : (s.blocks[s.blocks.length - 1]?.id);
      const blocksOut = s.blocks.slice();
      let insertAt = anchorId
        ? blocksOut.findIndex((b) => b.id === anchorId) + 1
        : blocksOut.length;
      if (insertAt <= 0) insertAt = blocksOut.length;
      blocksOut.splice(insertAt, 0, ...blocks);
      const last = blocks[blocks.length - 1];
      return {
        ...s,
        blocks: blocksOut,
        selection: { kind: 'caret', blockId: last.id, offset: 0 },
      };
    }, 'structural');
  };
  rootEl.addEventListener('paste', onPaste);
  return () => rootEl.removeEventListener('paste', onPaste);
}
