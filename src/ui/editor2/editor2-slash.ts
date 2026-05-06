// Slash menu for editor2 — opens when the user types `/` at the
// start of a paragraph block, lets them pick a block kind, and
// applies the kind change (or block insertion) via state mutation.
//
// Compared to the legacy slash menu (editor.ts), this version
// dispatches commands to `editor.applyMutation` / `setBlockKind`
// instead of manipulating the DOM directly. The menu UI itself is
// still a floating overlay (positioned at the caret) since that's
// what users expect.

import type { Editor } from './editor2';
import {
  changeBlockKind,
  insertBlockAfter,
  callout, codeBlock, rule, bulletList, orderedList, quote,
  paragraph, emptyTable, linkedDb,
  type EditorState,
} from './editor-state';
import type { Block } from '../../lib/blocks';
import { showPagePicker } from '../page-picker';

interface SlashItem {
  cmd: string;
  label: string;
  desc: string;
  hint?: string;
  /** Apply the command to a state. The block id is the one currently
   *  containing the caret (= the empty block that triggered the slash).
   *  Mutually exclusive with `pickAndApply`. */
  apply?: (state: EditorState, currentBlockId: string) => EditorState;
  /** Async variant: when set, called instead of `apply`. The handler is
   *  responsible for clearing the trigger block (= the '/foo' text) and
   *  applying its mutation, typically after opening a picker. The slash
   *  menu closes itself before invoking this. */
  pickAndApply?: (editor: Editor, currentBlockId: string) => void;
}

const ITEMS: SlashItem[] = [
  { cmd: 'p',  label: 'テキスト',   desc: 'プレーン段落',
    apply: (s, id) => changeBlockKind(s, id, 'p') },
  { cmd: 'h1', label: '見出し 1',  desc: '大きな見出し', hint: '#',
    apply: (s, id) => changeBlockKind(s, id, 'h1') },
  { cmd: 'h2', label: '見出し 2',  desc: '中見出し', hint: '##',
    apply: (s, id) => changeBlockKind(s, id, 'h2') },
  { cmd: 'h3', label: '見出し 3',  desc: '小見出し', hint: '###',
    apply: (s, id) => changeBlockKind(s, id, 'h3') },
  { cmd: 'todo', label: 'ToDo', desc: 'チェックボックス付き', hint: '[]',
    apply: (s, id) => changeBlockKind(s, id, 'todo') },
  { cmd: 'ul', label: '箇条書き', desc: '・', hint: '-',
    apply: (s, id) => replaceWithBlock(s, id, bulletList()) },
  { cmd: 'ol', label: '番号付き', desc: '1.', hint: '1.',
    apply: (s, id) => replaceWithBlock(s, id, orderedList()) },
  { cmd: 'quote', label: '引用', desc: '引用ブロック', hint: '>',
    apply: (s, id) => replaceWithBlock(s, id, quote()) },
  { cmd: 'callout', label: 'コールアウト', desc: 'ヒント / 注意ボックス',
    apply: (s, id) => replaceWithBlock(s, id, callout()) },
  { cmd: 'pre', label: 'コードブロック', desc: '整形済みコード', hint: '```',
    apply: (s, id) => replaceWithBlock(s, id, codeBlock()) },
  { cmd: 'hr', label: '区切り線', desc: 'セクション区切り', hint: '---',
    apply: (s, id) => insertBlockAfter(replaceWithBlock(s, id, rule()), id, paragraph('')) },
  { cmd: 'table', label: '表', desc: '簡易表 (3×2)・セル編集可',
    apply: (s, id) => replaceWithBlock(s, id, emptyTable(2, 3)) },
  { cmd: 'inlinedb', label: 'インラインDB', desc: 'ページに DB を埋め込む (DB を選択)',
    pickAndApply: openInlineDbPicker },
];

/** Open the page picker (DB-only) to choose a DB to embed, then replace
 *  the slash-trigger block with a fresh linkdb pointing at the chosen DB.
 *  Anchors the picker below the trigger block's row so it lands where
 *  the user just typed. */
function openInlineDbPicker(editor: Editor, blockId: string): void {
  // Compute anchor from the trigger block's element rect (caret rect
  // would also work but the block top-left is more visually predictable
  // after the slash menu has already closed).
  const blockEl = document.querySelector<HTMLElement>(
    '[data-block-id="' + CSS.escape(blockId) + '"]',
  );
  const rect = blockEl?.getBoundingClientRect();
  const anchor = rect
    ? { bottom: rect.bottom, left: rect.left }
    : { bottom: window.innerHeight / 2, left: window.innerWidth / 2 };
  showPagePicker({
    anchor,
    dbsOnly: true,
    onSelect: (p) => {
      editor.applyMutation((s) => {
        const idx = s.blocks.findIndex((b) => b.id === blockId);
        if (idx < 0) return s;
        const next = linkedDb(p.Id);
        const blocks = s.blocks.slice();
        blocks[idx] = next;
        return {
          ...s,
          blocks,
          selection: { kind: 'caret' as const, blockId: next.id, offset: 0 },
        };
      }, 'structural');
    },
  });
}

/** Replace a block with a fresh one (preserves position, drops content). */
function replaceWithBlock(state: EditorState, blockId: string, block: Block): EditorState {
  const idx = state.blocks.findIndex((b) => b.id === blockId);
  if (idx < 0) return state;
  const blocks = state.blocks.slice();
  blocks[idx] = block;
  return {
    ...state,
    blocks,
    selection: { kind: 'caret', blockId: block.id, offset: 0 },
  };
}

interface SlashMenu {
  destroy(): void;
}

/** Attach the slash-menu behaviour to a mounted editor2. Listens
 *  for `/` keystrokes; when one is typed at the start of an empty
 *  paragraph it opens the menu. */
export function attachSlashMenu(editor: Editor, rootEl: HTMLElement): SlashMenu {
  let menuEl: HTMLElement | null = null;
  let triggerBlockId: string | null = null;
  let query = '';
  let selIdx = 0;

  function isEmptyParagraph(blockId: string): boolean {
    const blocks = editor.getBlocks();
    const b = blocks.find((x) => x.id === blockId);
    if (!b || b.kind !== 'p') return false;
    const text = b.inline.map((i) => i.kind === 'text' ? i.text : '').join('');
    return text === '';
  }

  function getCaretRect(): DOMRect | null {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    const r = sel.getRangeAt(0).getBoundingClientRect();
    if (r.width === 0 && r.height === 0) {
      // Fallback to the focused block element's rect
      const block = (sel.anchorNode as Element | null)?.parentElement?.closest<HTMLElement>('[data-block-id]');
      return block?.getBoundingClientRect() || null;
    }
    return r;
  }

  function open(blockId: string): void {
    triggerBlockId = blockId;
    query = '';
    selIdx = 0;
    if (!menuEl) {
      menuEl = document.createElement('div');
      menuEl.className = 'memola-slash memola-slash2';
      // Explicit font-size + line-height so the menu doesn't inherit
      // SP page font sizing (which can vary dramatically per site theme).
      menuEl.style.cssText = 'position:absolute; z-index:2147483647; min-width:260px; max-width:320px; background:#fff; border:1px solid #e9e9e7; border-radius:6px; box-shadow:0 8px 24px rgba(0,0,0,0.12); max-height:340px; overflow-y:auto; font-size:14px; line-height:1.4; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Hiragino Sans","Noto Sans JP",sans-serif; color:#37352f;';
      (document.getElementById('memola-overlay') || document.body).appendChild(menuEl);
    }
    const rect = getCaretRect();
    if (rect) {
      menuEl.style.top = (rect.bottom + window.scrollY + 4) + 'px';
      menuEl.style.left = (rect.left + window.scrollX) + 'px';
    }
    paint();
  }

  function close(): void {
    if (menuEl) { menuEl.remove(); menuEl = null; }
    triggerBlockId = null;
    query = '';
  }

  function isOpen(): boolean { return !!menuEl; }

  function filteredItems(): SlashItem[] {
    if (!query) return ITEMS;
    const q = query.toLowerCase();
    return ITEMS.filter((it) =>
      it.cmd.toLowerCase().includes(q) ||
      it.label.toLowerCase().includes(q) ||
      (it.hint && it.hint.toLowerCase().startsWith(q)),
    );
  }

  function paint(): void {
    if (!menuEl) return;
    const items = filteredItems();
    if (selIdx >= items.length) selIdx = 0;
    if (items.length === 0) {
      menuEl.innerHTML = '<div style="padding:12px; color:#9b9a97; font-size:13px;">該当なし</div>';
      return;
    }
    menuEl.innerHTML = '';
    items.forEach((it, idx) => {
      const row = document.createElement('div');
      row.className = 'memola-slash2-item' + (idx === selIdx ? ' on' : '');
      row.style.cssText = 'padding:6px 10px; cursor:pointer; display:flex; align-items:center; gap:8px;'
        + (idx === selIdx ? 'background:#f1f1ef;' : '');
      row.innerHTML =
        '<div style="flex:1; min-width:0;">' +
          '<div style="font-weight:500; font-size:14px;">' + escapeHtml(it.label) + '</div>' +
          '<div style="font-size:11px; color:#9b9a97;">' + escapeHtml(it.desc) + '</div>' +
        '</div>' +
        (it.hint ? '<div style="font-family:ui-monospace,monospace; font-size:11px; color:#9b9a97; flex-shrink:0;">' + escapeHtml(it.hint) + '</div>' : '');
      row.addEventListener('mousedown', (e) => {
        e.preventDefault();
        commit(it);
      });
      menuEl!.appendChild(row);
    });
    // Keep the highlighted row visible when arrow-navigating past the
    // visible area. Without this the selection moves but the user can't
    // see where because the scrolled-out row stays scrolled-out.
    const sel = menuEl.children[selIdx] as HTMLElement | undefined;
    sel?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  function commit(item: SlashItem): void {
    if (!triggerBlockId) { close(); return; }
    const id = triggerBlockId;
    // pickAndApply items (= those that need a follow-up picker, like
    // inline-DB) own the whole flow: close the menu, open the picker,
    // and on selection issue their own applyMutation. The slash trigger
    // block ('/foo') is cleared at applyMutation time inside the
    // pickAndApply callback.
    if (item.pickAndApply) {
      close();
      item.pickAndApply(editor, id);
      return;
    }
    if (!item.apply) { close(); return; }
    const apply = item.apply;
    // Clear the trigger text ('/foo') from the block first, then
    // apply the command. Single mutation = one undo step.
    editor.applyMutation((s) => {
      const idx = s.blocks.findIndex((b) => b.id === id);
      if (idx < 0) return apply(s, id);
      const blocks = s.blocks.slice();
      const cur = blocks[idx];
      if ('inline' in cur) {
        blocks[idx] = { ...cur, inline: [] } as Block;
      }
      const cleared = { ...s, blocks,
        selection: { kind: 'caret' as const, blockId: id, offset: 0 } };
      return apply(cleared, id);
    }, 'structural');
    close();
  }

  function commitSelected(): void {
    const items = filteredItems();
    if (items[selIdx]) commit(items[selIdx]);
  }

  // ── Event handlers ────────────────────────────────────

  const onKeydown = (ev: KeyboardEvent): void => {
    if (!isOpen()) return;
    if (ev.key === 'Escape') {
      ev.preventDefault();
      close();
      return;
    }
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      selIdx = Math.min(selIdx + 1, filteredItems().length - 1);
      paint();
      return;
    }
    if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      selIdx = Math.max(selIdx - 1, 0);
      paint();
      return;
    }
    if (ev.key === 'Enter') {
      ev.preventDefault();
      commitSelected();
      return;
    }
    // Backspace: remove from query, or close if empty
    if (ev.key === 'Backspace') {
      if (query.length === 0) {
        // Codex review U3: prevent the editor's own delete handler
        // from running when the user just wants to close the menu.
        // Otherwise the empty paragraph the menu opened on would be
        // backspace-merged into the previous block.
        ev.preventDefault();
        // Also remove the literal '/' that opened the menu — backspace
        // here should fully undo the slash trigger, not leave a stray
        // '/' behind. The trigger block always contains exactly '/' at
        // this point (open() guards on text === '/' and any filter
        // chars are deleted via the let-through Backspace path before
        // we reach query.length === 0).
        const id = triggerBlockId;
        if (id) {
          editor.applyMutation((s) => {
            const idx = s.blocks.findIndex((b) => b.id === id);
            if (idx < 0) return s;
            const blocks = s.blocks.slice();
            const cur = blocks[idx];
            if ('inline' in cur) {
              blocks[idx] = { ...cur, inline: [] } as Block;
            }
            return { ...s, blocks,
              selection: { kind: 'caret' as const, blockId: id, offset: 0 } };
          }, 'structural');
        }
        close();
        return;
      }
      // The browser will also delete the character from the DOM, so
      // we don't preventDefault — let it through.
      query = query.slice(0, -1);
      paint();
      return;
    }
    // Plain chars extend the query
    if (ev.key.length === 1 && !ev.metaKey && !ev.ctrlKey && !ev.altKey) {
      query += ev.key;
      // Don't preventDefault — let the char enter the editor as normal,
      // we just track it for filtering.
      paint();
      return;
    }
  };

  // Listen on the editor root so we catch events even when focus
  // momentarily lives in the menu.
  rootEl.addEventListener('keydown', onKeydown, true);

  // Subscribe to editor state changes — close the menu when the user
  // navigates away from the trigger block, and detect '/' insertion.
  const unsubscribe = editor.subscribe((blocks) => {
    void blocks;
    if (isOpen()) {
      // Menu is open; selection / state changes don't close it
      return;
    }
    // Detect: the user just typed '/' on an empty paragraph.
    // We sample the current selection + check if the block contains
    // exactly one character which is '/'.
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (!range.collapsed) return;
    const blockEl = (range.startContainer as Element)?.parentElement?.closest<HTMLElement>('[data-block-id]');
    if (!blockEl) return;
    const id = blockEl.dataset.blockId;
    if (!id) return;
    const b = editor.getBlocks().find((x) => x.id === id);
    if (!b || b.kind !== 'p') return;
    const text = b.inline.map((i) => i.kind === 'text' ? i.text : '').join('');
    if (text === '/') {
      open(id);
      // Keep the '/' visible in the block. It (and any filter chars
      // typed after it) will be cleared at commit time. This matches
      // user expectation that "the slash I typed should not vanish
      // immediately"; cancelling the menu (Esc / click outside) leaves
      // the literal text behind so the user can decide what to do
      // with it.
    }
  });

  // Close on click outside
  const onDocClick = (ev: MouseEvent): void => {
    if (!isOpen()) return;
    const t = ev.target as Node;
    if (menuEl?.contains(t)) return;
    close();
  };
  document.addEventListener('mousedown', onDocClick, true);

  void isEmptyParagraph;       // exported via export below if needed

  return {
    destroy(): void {
      close();
      rootEl.removeEventListener('keydown', onKeydown, true);
      document.removeEventListener('mousedown', onDocClick, true);
      unsubscribe();
    },
  };
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
