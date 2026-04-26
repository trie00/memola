// Rich-text editor: slash menu, exec commands, key handling, floating toolbar.

import { S } from '../state';
import { g, getEd, getOverlay } from './dom';
import { setSave } from './ui-helpers';
import { schedSave } from './actions';

interface SlashItem { cmd: string; icon: string; name: string; desc: string }

const SLASH_ITEMS: SlashItem[] = [
  { cmd: 'p',       icon: 'T',    name: 'テキスト',        desc: 'プレーンテキスト' },
  { cmd: 'h1',      icon: 'H1',   name: '見出し1',         desc: '大きな見出し' },
  { cmd: 'h2',      icon: 'H2',   name: '見出し2',         desc: '中見出し' },
  { cmd: 'h3',      icon: 'H3',   name: '見出し3',         desc: '小見出し' },
  { cmd: 'ul',      icon: '•',    name: '箇条書き',        desc: 'シンプルな箇条書き' },
  { cmd: 'ol',      icon: '1.',   name: '番号付きリスト',  desc: '番号付き箇条書き' },
  { cmd: 'todo',    icon: '☐',    name: 'ToDoリスト',      desc: 'チェックボックス付きリスト' },
  { cmd: 'callout', icon: '💡',   name: 'コールアウト',    desc: 'ハイライトボックス' },
  { cmd: 'quote',   icon: '❝',    name: '引用',            desc: '引用ブロック' },
  { cmd: 'pre',     icon: '</>',  name: 'コードブロック',  desc: 'コードを記述' },
  { cmd: 'hr',      icon: '—',    name: '区切り線',        desc: 'セクション区切り' },
  { cmd: 'ai',      icon: '✦',    name: 'AI ブロック',     desc: 'AIに要約・改稿を依頼' },
];

let _slashActive = false;
let _slashQuery = '';
let _slashSel = 0;
let _slashFiltered: SlashItem[] = [];
let _slashNode: Node | null = null;

export function isSlashActive(): boolean { return _slashActive; }

export function closeSlashMenu(): void {
  _slashActive = false;
  _slashQuery = '';
  _slashSel = 0;
  _slashNode = null;
  g('slash').classList.remove('on');
}

function showSlashMenu(rect: { bottom: number; left: number }): void {
  const el = g('slash');
  _slashFiltered = SLASH_ITEMS.filter((item) => {
    if (!_slashQuery) return true;
    return item.name.toLowerCase().includes(_slashQuery.toLowerCase()) ||
      item.cmd.toLowerCase().includes(_slashQuery.toLowerCase());
  });
  if (_slashFiltered.length === 0) { closeSlashMenu(); return; }
  if (_slashSel >= _slashFiltered.length) _slashSel = 0;

  el.innerHTML = '';
  _slashFiltered.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'n365-slash-item' + (idx === _slashSel ? ' sel' : '');
    div.innerHTML =
      '<div class="n365-slash-icon">' + item.icon + '</div>' +
      '<div><div class="n365-slash-name">' + item.name + '</div><div class="n365-slash-desc">' + item.desc + '</div></div>';
    div.addEventListener('mousedown', (e) => { e.preventDefault(); applySlashCmd(item.cmd); });
    el.appendChild(div);
  });

  const top = rect.bottom + window.scrollY + 4;
  let left = rect.left + window.scrollX;
  const vpW = window.innerWidth;
  if (left + 260 > vpW) left = vpW - 264;
  el.style.top = top + 'px';
  el.style.left = left + 'px';
  el.classList.add('on');
}

function applySlashCmd(cmd: string): void {
  const _ed = getEd();
  // Delete only the typed /query (not the rest of the line)
  if (_slashNode && _ed.contains(_slashNode)) {
    const sel0 = window.getSelection();
    if (sel0 && sel0.rangeCount) {
      const rng0 = sel0.getRangeAt(0);
      const txt = (_slashNode as Text).textContent || '';
      const curOff = (rng0.startContainer === _slashNode) ? rng0.startOffset : txt.length;
      const slashStart = curOff - _slashQuery.length - 1;
      if (slashStart >= 0 && txt.charAt(slashStart) === '/') {
        (_slashNode as Text).textContent = txt.substring(0, slashStart) + txt.substring(curOff);
        const r = document.createRange();
        r.setStart(_slashNode, slashStart); r.collapse(true);
        sel0.removeAllRanges(); sel0.addRange(r);
      }
    }
  }
  closeSlashMenu();

  _ed.focus();
  if (cmd === 'p') {
    document.execCommand('formatBlock', false, 'p');
  } else if (cmd === 'todo') {
    const sel = window.getSelection();
    const div = document.createElement('div');
    div.className = 'n365-todo';
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.className = 'n365-todo-cb';
    const sp = document.createElement('span');
    sp.className = 'n365-todo-txt';
    div.appendChild(cb); div.appendChild(sp);
    if (sel && sel.rangeCount) {
      const r = sel.getRangeAt(0);
      const block = curBlock();
      const hasContent = !!block && block !== _ed && (block.textContent || '').trim() !== '';
      let caretEl: Node = sp;
      let caretOff = 0;
      if (hasContent && block) {
        // Move block's children into the span, then replace block with todo
        while (block.firstChild) sp.appendChild(block.firstChild);
        // Place caret at end of moved content
        caretEl = sp;
        caretOff = sp.childNodes.length;
        block.parentNode!.replaceChild(div, block);
      } else if (block && block !== _ed) {
        sp.appendChild(document.createElement('br'));
        block.parentNode!.replaceChild(div, block);
      } else {
        sp.appendChild(document.createElement('br'));
        r.insertNode(div);
      }
      requestAnimationFrame(() => {
        const rng = document.createRange();
        rng.setStart(caretEl, caretOff); rng.collapse(true);
        const s = window.getSelection();
        if (s) { s.removeAllRanges(); s.addRange(rng); }
        _ed.focus();
      });
    }
  } else if (cmd === 'callout') {
    const calloutDiv = document.createElement('div');
    calloutDiv.className = 'n365-callout';
    const ic = document.createElement('span');
    ic.className = 'n365-callout-ic'; ic.textContent = '💡';
    const body = document.createElement('div');
    body.className = 'n365-callout-body';
    calloutDiv.appendChild(ic); calloutDiv.appendChild(body);
    const selC = window.getSelection();
    if (selC && selC.rangeCount) {
      const rc = selC.getRangeAt(0);
      const blocks = getSelectedTopBlocks();
      let caretEl: Node | null = null;
      let caretOff = 0;

      if (blocks.length >= 2) {
        // Multi-block: move all selected blocks into the callout body
        const firstBlock = blocks[0];
        firstBlock.parentNode!.insertBefore(calloutDiv, firstBlock);
        for (const blk of blocks) body.appendChild(blk);
        const last = body.lastElementChild as HTMLElement | null;
        if (last) { caretEl = last; caretOff = last.childNodes.length; }
      } else {
        const p = document.createElement('p');
        body.appendChild(p);
        const blockC = curBlock();
        const hasContent = !!blockC && blockC !== _ed && (blockC.textContent || '').trim() !== '';
        if (hasContent && blockC) {
          while (blockC.firstChild) p.appendChild(blockC.firstChild);
          caretEl = p; caretOff = p.childNodes.length;
          blockC.parentNode!.replaceChild(calloutDiv, blockC);
        } else if (blockC && blockC !== _ed) {
          p.appendChild(document.createElement('br'));
          caretEl = p; caretOff = 0;
          blockC.parentNode!.replaceChild(calloutDiv, blockC);
        } else {
          p.appendChild(document.createElement('br'));
          caretEl = p; caretOff = 0;
          rc.insertNode(calloutDiv);
        }
      }

      if (!body.firstChild) {
        const ep = document.createElement('p');
        ep.appendChild(document.createElement('br'));
        body.appendChild(ep);
        caretEl = ep; caretOff = 0;
      }

      requestAnimationFrame(() => {
        if (caretEl) {
          const rngC = document.createRange();
          rngC.setStart(caretEl, caretOff); rngC.collapse(true);
          const s = window.getSelection();
          if (s) { s.removeAllRanges(); s.addRange(rngC); }
        }
        _ed.focus();
      });
    }
  } else if (cmd === 'ai') {
    void import('./ai-block').then((m) => m.insertAiBlock());
    return;
  } else {
    execCmd(cmd);
  }
  S.dirty = true; setSave('未保存'); schedSave();
}

export function curBlock(): HTMLElement | null {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return null;
  let n: Node | null = sel.getRangeAt(0).startContainer;
  const _ed = getEd();
  while (n && n !== _ed) {
    if (n.nodeType === 1 && /^(P|H[1-6]|PRE|BLOCKQUOTE|LI|UL|OL|DIV)$/.test((n as Element).tagName)) {
      return n as HTMLElement;
    }
    n = n.parentNode;
  }
  return null;
}

function findCallout(node: Node | null): HTMLElement | null {
  const _ed = getEd();
  while (node && node !== _ed) {
    if (node.nodeType === 1 && (node as Element).classList && (node as Element).classList.contains('n365-callout')) {
      return node as HTMLElement;
    }
    node = node.parentNode;
  }
  return null;
}

function findAncestor(node: Node | null, selector: string): HTMLElement | null {
  const _ed = getEd();
  while (node && node !== _ed) {
    if (node.nodeType === 1) {
      const el = node as Element;
      if (el.matches && el.matches(selector)) return el as HTMLElement;
    }
    node = node.parentNode;
  }
  return null;
}

function isAtBlockStart(range: Range, block: Node): boolean {
  const r = document.createRange();
  r.setStart(block, 0);
  r.setEnd(range.startContainer, range.startOffset);
  return r.toString() === '';
}

function isAtBlockEnd(range: Range, block: Node): boolean {
  const r = document.createRange();
  r.setStart(range.startContainer, range.startOffset);
  r.setEnd(block, block.childNodes.length);
  return r.toString() === '';
}

function placeCaretAtStart(el: Node): void {
  const sel = window.getSelection();
  const r = document.createRange();
  r.setStart(el, 0); r.collapse(true);
  if (sel) { sel.removeAllRanges(); sel.addRange(r); }
}

function unwrapToP(block: HTMLElement, useTextOnly: boolean): HTMLElement {
  const p = document.createElement('p');
  if (useTextOnly) {
    p.textContent = block.textContent || '';
  } else {
    while (block.firstChild) p.appendChild(block.firstChild);
  }
  if (!p.firstChild) p.innerHTML = '<br>';
  block.parentNode!.replaceChild(p, block);
  placeCaretAtStart(p);
  return p;
}

function unwrapPre(pre: HTMLElement): void {
  // Convert each line of the pre into its own <p>. Empty lines become <p><br></p>.
  flattenBrToNewline(pre);
  const text = pre.textContent || '';
  const lines = text.split('\n');
  while (lines.length > 1 && lines[lines.length - 1] === '') lines.pop();
  const parent = pre.parentNode!;
  const ref = pre.nextSibling;
  let firstP: HTMLParagraphElement | null = null;
  for (const line of lines) {
    const p = document.createElement('p');
    if (line) {
      p.textContent = line;
    } else {
      p.appendChild(document.createElement('br'));
    }
    parent.insertBefore(p, ref);
    if (!firstP) firstP = p;
  }
  if (!firstP) {
    firstP = document.createElement('p');
    firstP.appendChild(document.createElement('br'));
    parent.insertBefore(firstP, ref);
  }
  pre.remove();
  placeCaretAtStart(firstP);
}

function unwrapTodo(todo: HTMLElement): void {
  const p = document.createElement('p');
  const txt = todo.querySelector('.n365-todo-txt');
  if (txt) { while (txt.firstChild) p.appendChild(txt.firstChild); }
  if (!p.firstChild) p.innerHTML = '<br>';
  todo.parentNode!.replaceChild(p, todo);
  placeCaretAtStart(p);
}

function unwrapCallout(callout: HTMLElement): void {
  const body = callout.querySelector('.n365-callout-body');
  const parent = callout.parentNode!;
  let firstMoved: Node | null = null;
  if (body) {
    while (body.firstChild) {
      const child = body.firstChild;
      parent.insertBefore(child, callout);
      if (!firstMoved) firstMoved = child;
    }
  }
  if (!firstMoved) {
    const p = document.createElement('p');
    p.innerHTML = '<br>';
    parent.insertBefore(p, callout);
    firstMoved = p;
  }
  callout.remove();
  const sel = window.getSelection();
  const r = document.createRange();
  r.setStart(firstMoved, 0); r.collapse(true);
  if (sel) { sel.removeAllRanges(); sel.addRange(r); }
}

function isAtCalloutStart(range: Range, callout: HTMLElement): boolean {
  const body = callout.querySelector('.n365-callout-body');
  if (!body) return false;
  const r = document.createRange();
  r.setStart(body, 0);
  r.setEnd(range.startContainer, range.startOffset);
  return r.toString() === '';
}

function insertTextAtCursor(text: string): void {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;
  const r = sel.getRangeAt(0);
  r.deleteContents();
  const tn = document.createTextNode(text);
  r.insertNode(tn);
  const newR = document.createRange();
  newR.setStartAfter(tn);
  newR.collapse(true);
  sel.removeAllRanges(); sel.addRange(newR);
}

function getSelectedTopBlocks(): HTMLElement[] {
  const _ed = getEd();
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return [];
  const range = sel.getRangeAt(0);

  function topBlock(node: Node | null): HTMLElement | null {
    let n: Node | null = node;
    while (n && n.parentNode !== _ed) n = n.parentNode;
    return n as HTMLElement | null;
  }

  const startBlock = topBlock(range.startContainer);
  const endBlock = topBlock(range.endContainer);
  if (!startBlock || !endBlock) return [];

  const result: HTMLElement[] = [];
  let cur: Element | null = startBlock;
  while (cur) {
    result.push(cur as HTMLElement);
    if (cur === endBlock) break;
    cur = cur.nextElementSibling;
  }
  return result;
}

function flattenBrToNewline(el: HTMLElement): void {
  const brs = el.querySelectorAll('br');
  brs.forEach((br) => {
    const tn = document.createTextNode('\n');
    br.parentNode!.replaceChild(tn, br);
  });
  el.normalize();
}

export function execCmd(cmd: string): void {
  const _ed = getEd();
  _ed.focus();
  const sel = window.getSelection();
  switch (cmd) {
    case 'h1': case 'h2': case 'h3': document.execCommand('formatBlock', false, cmd); break;
    case 'bold':   document.execCommand('bold'); break;
    case 'italic': document.execCommand('italic'); break;
    case 'strike': document.execCommand('strikeThrough'); break;
    case 'code':
      if (sel && sel.rangeCount && !sel.isCollapsed) {
        const r = sel.getRangeAt(0);
        const t = r.toString();
        r.deleteContents();
        const c = document.createElement('code');
        c.textContent = t;
        r.insertNode(c);
      }
      break;
    case 'ul': document.execCommand('insertUnorderedList'); break;
    case 'ol': document.execCommand('insertOrderedList'); break;
    case 'quote': {
      const selQ = window.getSelection();
      if (selQ && selQ.rangeCount) {
        const bqEl = findAncestor(selQ.getRangeAt(0).startContainer, 'blockquote');
        if (bqEl) {
          unwrapToP(bqEl, false);
          S.dirty = true; setSave('未保存'); schedSave();
          refTb();
          return;
        }
      }
      document.execCommand('formatBlock', false, 'blockquote');
      break;
    }
    case 'pre': {
      const selP = window.getSelection();
      if (selP && selP.rangeCount) {
        const preEl = findAncestor(selP.getRangeAt(0).startContainer, 'pre');
        if (preEl) {
          unwrapPre(preEl);
          S.dirty = true; setSave('未保存'); schedSave();
          refTb();
          return;
        }
      }
      document.execCommand('formatBlock', false, 'pre');
      break;
    }
    case 'hr': document.execCommand('insertHTML', false, '<hr>'); break;
    case 'todo': {
      const selTd = window.getSelection();
      if (selTd && selTd.rangeCount) {
        const todoEl = findAncestor(selTd.getRangeAt(0).startContainer, '.n365-todo');
        if (todoEl) {
          unwrapTodo(todoEl);
          S.dirty = true; setSave('未保存'); schedSave();
          refTb();
          return;
        }
      }
      applySlashCmd('todo');
      return;
    }
    case 'callout': {
      const selC = window.getSelection();
      if (selC && selC.rangeCount) {
        const existing = findCallout(selC.getRangeAt(0).startContainer);
        if (existing) {
          unwrapCallout(existing);
          S.dirty = true; setSave('未保存'); schedSave();
          refTb();
          return;
        }
      }
      applySlashCmd('callout');
      return;
    }
  }
  refTb();
}

export function refTb(): void {
  const m: Record<string, () => boolean> = {
    h1: () => document.queryCommandValue('formatBlock').toLowerCase() === 'h1',
    h2: () => document.queryCommandValue('formatBlock').toLowerCase() === 'h2',
    h3: () => document.queryCommandValue('formatBlock').toLowerCase() === 'h3',
    bold:   () => document.queryCommandState('bold'),
    italic: () => document.queryCommandState('italic'),
    strike: () => document.queryCommandState('strikeThrough'),
    ul:     () => document.queryCommandState('insertUnorderedList'),
    ol:     () => document.queryCommandState('insertOrderedList'),
    quote:  () => document.queryCommandValue('formatBlock').toLowerCase() === 'blockquote',
    pre:    () => document.queryCommandValue('formatBlock').toLowerCase() === 'pre',
    callout: () => {
      const s = window.getSelection();
      if (!s || !s.rangeCount) return false;
      return !!findCallout(s.getRangeAt(0).startContainer);
    },
    todo: () => {
      const s = window.getSelection();
      if (!s || !s.rangeCount) return false;
      return !!findAncestor(s.getRangeAt(0).startContainer, '.n365-todo');
    },
  };
  const _ov = getOverlay();
  _ov.querySelectorAll<HTMLElement>('.n365-b[data-cmd]').forEach((b) => {
    const cmd = b.dataset.cmd!;
    const f = m[cmd];
    b.classList.toggle('on', f ? f() : false);
  });
}

// Editor event hooks (called once from wiring.attachAll).
export function attachEditor(): void {
  const _ed = getEd();

  // Make Enter create <p> instead of Chrome's default <div>.
  try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch { /* unsupported */ }

  // Block drag handle (lazy import keeps this file's footprint small)
  void import('./block-drag').then((m) => m.attachBlockDrag());
  void import('./image-paste').then((m) => m.attachImagePaste());

  _ed.addEventListener('input', () => {
    S.dirty = true; setSave('未保存'); schedSave();

    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    const node = range.startContainer;
    if (node.nodeType === 3) {
      const txt = node.textContent || '';
      const offset = range.startOffset;
      const before = txt.substring(0, offset);
      const slashMatch = before.match(/(^|\s)\/(\w*)$/);
      if (slashMatch) {
        _slashActive = true;
        _slashQuery = slashMatch[2] || '';
        _slashSel = 0;
        _slashNode = node;
        const rect = range.getBoundingClientRect();
        showSlashMenu(rect);
        return;
      }
    }
    if (_slashActive) closeSlashMenu();
  });

  _ed.addEventListener('keydown', (e) => {
    // Skip during IME composition (Japanese input etc.)
    const ke = e as KeyboardEvent;
    if (ke.isComposing || ke.keyCode === 229) return;

    if (_slashActive) {
      if (ke.key === 'ArrowDown') {
        e.preventDefault();
        _slashSel = (_slashSel + 1) % _slashFiltered.length;
        const sel0 = window.getSelection();
        const rect2 = sel0 && sel0.rangeCount
          ? sel0.getRangeAt(0).getBoundingClientRect()
          : { bottom: 0, left: 0 } as DOMRect;
        showSlashMenu(rect2);
        return;
      }
      if (ke.key === 'ArrowUp') {
        e.preventDefault();
        _slashSel = (_slashSel - 1 + _slashFiltered.length) % _slashFiltered.length;
        const sel0 = window.getSelection();
        const rect3 = sel0 && sel0.rangeCount
          ? sel0.getRangeAt(0).getBoundingClientRect()
          : { bottom: 0, left: 0 } as DOMRect;
        showSlashMenu(rect3);
        return;
      }
      if (ke.key === 'Enter') {
        e.preventDefault();
        if (_slashFiltered[_slashSel]) applySlashCmd(_slashFiltered[_slashSel].cmd);
        return;
      }
      if (ke.key === 'Escape' || ke.key === ' ') {
        closeSlashMenu();
        return;
      }
    }

    if (ke.key === 'Backspace') {
      const bsSel = window.getSelection();
      if (bsSel && bsSel.rangeCount && bsSel.isCollapsed) {
        const bsRange = bsSel.getRangeAt(0);
        const startNode = bsRange.startContainer;

        const bsCallout = findCallout(startNode);
        if (bsCallout && isAtCalloutStart(bsRange, bsCallout)) {
          e.preventDefault();
          unwrapCallout(bsCallout);
          S.dirty = true; setSave('未保存'); schedSave();
          refTb();
          return;
        }

        const bsTodo = findAncestor(startNode, '.n365-todo');
        if (bsTodo && isAtBlockStart(bsRange, bsTodo)) {
          e.preventDefault();
          unwrapTodo(bsTodo);
          S.dirty = true; setSave('未保存'); schedSave();
          refTb();
          return;
        }

        const bsPre = findAncestor(startNode, 'pre');
        if (bsPre && isAtBlockStart(bsRange, bsPre)) {
          e.preventDefault();
          unwrapPre(bsPre);
          S.dirty = true; setSave('未保存'); schedSave();
          refTb();
          return;
        }

        const bsQuote = findAncestor(startNode, 'blockquote');
        if (bsQuote && isAtBlockStart(bsRange, bsQuote)) {
          e.preventDefault();
          unwrapToP(bsQuote, false);
          S.dirty = true; setSave('未保存'); schedSave();
          refTb();
          return;
        }

        const bsCb = curBlock();
        if (bsCb && bsCb !== _ed && isAtBlockStart(bsRange, bsCb)) {
          const prev = bsCb.previousElementSibling;
          if (prev && prev.tagName === 'HR') {
            e.preventDefault();
            prev.remove();
            S.dirty = true; setSave('未保存'); schedSave();
            refTb();
            return;
          }
        }
      }
    }

    // Todo: Enter creates a new todo below (or exits to plain <p> if current is empty)
    if (ke.key === 'Enter' && !ke.shiftKey) {
      const tdSel = window.getSelection();
      if (tdSel && tdSel.rangeCount) {
        const tdRange = tdSel.getRangeAt(0);
        const tdEl = findAncestor(tdRange.startContainer, '.n365-todo');
        if (tdEl) {
          e.preventDefault();
          const txt = tdEl.querySelector('.n365-todo-txt');
          const isEmpty = !txt || !(txt.textContent || '').trim();
          if (isEmpty) {
            // Empty todo → exit to a plain <p>
            const np = document.createElement('p');
            np.appendChild(document.createElement('br'));
            tdEl.parentNode!.insertBefore(np, tdEl.nextSibling);
            tdEl.remove();
            const r = document.createRange();
            r.setStart(np, 0); r.collapse(true);
            tdSel.removeAllRanges(); tdSel.addRange(r);
          } else {
            const newTodo = document.createElement('div');
            newTodo.className = 'n365-todo';
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.className = 'n365-todo-cb';
            const sp = document.createElement('span');
            sp.className = 'n365-todo-txt';
            sp.appendChild(document.createElement('br'));
            newTodo.appendChild(cb);
            newTodo.appendChild(sp);
            tdEl.parentNode!.insertBefore(newTodo, tdEl.nextSibling);
            const r = document.createRange();
            r.setStart(sp, 0); r.collapse(true);
            tdSel.removeAllRanges(); tdSel.addRange(r);
          }
          S.dirty = true; setSave('未保存'); schedSave();
          refTb();
          return;
        }
      }
    }

    // Blockquote: any Enter (without Shift) exits to a plain <p> below.
    // Shift+Enter inside a quote still inserts a soft <br> via the browser default.
    if (ke.key === 'Enter' && !ke.shiftKey) {
      const bqSel = window.getSelection();
      if (bqSel && bqSel.rangeCount) {
        const bqRange = bqSel.getRangeAt(0);
        const bqEl = findAncestor(bqRange.startContainer, 'blockquote');
        if (bqEl) {
          e.preventDefault();
          const np = document.createElement('p');
          np.appendChild(document.createElement('br'));
          bqEl.parentNode!.insertBefore(np, bqEl.nextSibling);
          const r = document.createRange();
          r.setStart(np, 0); r.collapse(true);
          bqSel.removeAllRanges(); bqSel.addRange(r);
          S.dirty = true; setSave('未保存'); schedSave();
          refTb();
          return;
        }
      }
    }

    // Callout: empty trailing <p> + Enter exits the callout
    if (ke.key === 'Enter' && !ke.shiftKey) {
      const enSel = window.getSelection();
      if (enSel && enSel.rangeCount) {
        const enRng = enSel.getRangeAt(0);
        const callout = findCallout(enRng.startContainer);
        if (callout) {
          const body = callout.querySelector('.n365-callout-body');
          const lastChild = body && (body.lastElementChild as HTMLElement | null);
          if (body && lastChild) {
            const inLast = lastChild === enRng.startContainer || lastChild.contains(enRng.startContainer);
            const lastEmpty = !lastChild.textContent || lastChild.textContent.trim() === '';
            if (inLast && lastEmpty) {
              e.preventDefault();
              lastChild.remove();
              if (!body.firstChild) {
                const refill = document.createElement('p');
                refill.appendChild(document.createElement('br'));
                body.appendChild(refill);
              }
              const np = document.createElement('p');
              np.appendChild(document.createElement('br'));
              callout.parentNode!.insertBefore(np, callout.nextSibling);
              const r = document.createRange();
              r.setStart(np, 0); r.collapse(true);
              enSel.removeAllRanges(); enSel.addRange(r);
              S.dirty = true; setSave('未保存'); schedSave();
              return;
            }
          }
        }
      }
    }

    const b = curBlock();
    if (ke.key === 'Enter' && b && b.tagName === 'PRE') {
      e.preventDefault();
      const preSel = window.getSelection();
      if (preSel && preSel.rangeCount) {
        const preRng = preSel.getRangeAt(0);

        // Normalize: collapse any <br> into actual \n in the pre's text
        // (some browsers insert <br> on Enter even in <pre>)
        flattenBrToNewline(b);

        const fullText = b.textContent || '';
        // Cmd/Ctrl + Enter, OR pre already ends with \n\n  → exit the pre
        const wantExit = ke.metaKey || ke.ctrlKey || fullText.endsWith('\n\n');

        if (wantExit && fullText.length > 0) {
          // Strip trailing \n's
          const walker = document.createTreeWalker(b, NodeFilter.SHOW_TEXT);
          let lastTxt: Text | null = null;
          let n: Node | null;
          while ((n = walker.nextNode())) lastTxt = n as Text;
          while (lastTxt && lastTxt.textContent && lastTxt.textContent.endsWith('\n')) {
            lastTxt.textContent = lastTxt.textContent.replace(/\n+$/, '');
            if (lastTxt.textContent) break;
            const prev = lastTxt.previousSibling;
            lastTxt.remove();
            lastTxt = prev && prev.nodeType === 3 ? (prev as Text) : null;
          }
          const np = document.createElement('p');
          np.appendChild(document.createElement('br'));
          b.parentNode!.insertBefore(np, b.nextSibling);
          const r = document.createRange();
          r.setStart(np, 0); r.collapse(true);
          preSel.removeAllRanges(); preSel.addRange(r);
          S.dirty = true; setSave('未保存'); schedSave();
          return;
        }

        // Otherwise: insert \n (or \n\n if at end so the new line is visible)
        const atEnd = isAtBlockEnd(preRng, b);
        insertTextAtCursor(atEnd ? '\n\n' : '\n');
        if (atEnd) {
          const s2 = window.getSelection();
          if (s2 && s2.rangeCount) {
            const r2 = s2.getRangeAt(0);
            if (r2.startContainer.nodeType === 3 && r2.startOffset > 0) {
              const newR = document.createRange();
              newR.setStart(r2.startContainer, r2.startOffset - 1);
              newR.collapse(true);
              s2.removeAllRanges(); s2.addRange(newR);
            }
          }
        }
      }
    }
    if (ke.key === 'Tab' && b && b.tagName === 'PRE') {
      e.preventDefault();
      insertTextAtCursor('  ');
    }
  });

  _ed.addEventListener('keyup', refTb);
  _ed.addEventListener('mouseup', refTb);

  // Todo checkbox click handler (delegated)
  // innerHTML serializes ATTRIBUTES not properties — sync the `checked` attribute
  // explicitly, otherwise the saved markdown will always be `[ ]` regardless of UI state.
  _ed.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('n365-todo-cb')) {
      const cb = target as HTMLInputElement;
      if (cb.checked) cb.setAttribute('checked', 'checked');
      else cb.removeAttribute('checked');
      const txt = cb.nextElementSibling;
      if (txt && txt.classList.contains('n365-todo-txt')) {
        txt.classList.toggle('done', cb.checked);
        S.dirty = true; setSave('未保存'); schedSave();
      }
    }
  });

  // Floating selection toolbar
  document.addEventListener('selectionchange', () => {
    const sel = window.getSelection();
    const ftb = g('ftb');
    if (!sel || sel.isCollapsed || !sel.rangeCount) { ftb.classList.remove('on'); return; }
    const range = sel.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const node = container.nodeType === 3 ? container.parentNode : container;
    if (!node || !_ed.contains(node)) { ftb.classList.remove('on'); return; }
    if (_slashActive) { ftb.classList.remove('on'); return; }

    const rect = range.getBoundingClientRect();
    if (!rect || rect.width === 0) { ftb.classList.remove('on'); return; }

    let top = rect.top + window.scrollY - 44;
    const left = rect.left + window.scrollX + (rect.width / 2);
    if (top < 4) top = rect.bottom + window.scrollY + 4;

    ftb.style.top = top + 'px';
    ftb.style.left = left + 'px';
    ftb.classList.add('on');
  });
}
