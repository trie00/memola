// Rich-text editor: slash menu, exec commands, key handling, floating toolbar.

import { S, type Page } from '../state';
import { g, getEd, getOverlay } from './dom';
import { setSave } from './ui-helpers';
import { schedSave } from './actions';
import {
  showPagePicker, updatePagePickerQuery, hide as hidePagePicker,
  pagePickerActive, pagePickerCount, pagePickerMove, pagePickerCommit,
} from './page-picker';

interface SlashItem {
  cmd: string;
  icon: string;
  name: string;
  desc: string;
  cat: string;
  /** Optional keyboard shortcut hint (rendered as a kbd badge in the menu). */
  kbd?: string;
  /** Optional markdown shortcut. When the slash query is a prefix of `md`,
   *  the item is filtered to the top of the menu so the user can type
   *  `/##` to jump straight to 見出し2 etc. Also rendered as the kbd badge
   *  if `kbd` is not set. */
  md?: string;
}

// Platform-specific modifier label for kbd badges.
const MOD = (typeof navigator !== 'undefined' && /Mac/.test(navigator.platform)) ? '⌘' : 'Ctrl';

const SLASH_ITEMS: SlashItem[] = [
  // ナビゲーション
  { cat: 'ナビゲーション', cmd: 'nav-back',    icon: '←', name: '戻る',            desc: '前に開いていたページへ', kbd: MOD + ' [' },
  { cat: 'ナビゲーション', cmd: 'nav-forward', icon: '→', name: '進む',            desc: '次のページへ',            kbd: MOD + ' ]' },
  // 基本
  { cat: '基本', cmd: 'p',       icon: 'T',    name: 'テキスト',        desc: 'プレーンテキスト' },
  { cat: '基本', cmd: 'h1',      icon: 'H1',   name: '見出し1',         desc: '大きな見出し',         md: '#' },
  { cat: '基本', cmd: 'h2',      icon: 'H2',   name: '見出し2',         desc: '中見出し',             md: '##' },
  { cat: '基本', cmd: 'h3',      icon: 'H3',   name: '見出し3',         desc: '小見出し',             md: '###' },
  { cat: '基本', cmd: 'callout', icon: '💡',   name: 'コールアウト',    desc: 'ハイライトボックス' },
  { cat: '基本', cmd: 'quote',   icon: '❝',    name: '引用',            desc: '引用ブロック',         md: '>' },
  // リスト
  { cat: 'リスト', cmd: 'ul',    icon: '•',    name: '箇条書き',        desc: 'シンプルな箇条書き',  md: '-' },
  { cat: 'リスト', cmd: 'ol',    icon: '1.',   name: '番号付き',        desc: '番号付き箇条書き',    md: '1.' },
  { cat: 'リスト', cmd: 'todo',  icon: '☐',    name: 'ToDoリスト',      desc: 'チェックボックス付き', md: '[]' },
  // メディア
  { cat: 'メディア', cmd: 'hr',  icon: '—',    name: '区切り線',        desc: 'セクション区切り',     md: '---' },
  // コード
  { cat: 'コード', cmd: 'pre',   icon: '</>',  name: 'コードブロック',  desc: 'シンタックスハイライト', md: '```' },
  // データ
  { cat: 'データ', cmd: 'table',    icon: '⊞', name: '表',             desc: '簡易表 (3×2)・セル編集可' },
  { cat: 'データ', cmd: 'inlinedb', icon: '▤', name: 'インラインDB',    desc: 'ページにDBを埋め込む' },
  { cat: 'データ', cmd: 'page-link', icon: '🔗', name: 'ページリンク',   desc: 'n365 内の他ページにリンク' },
  // AI
  { cat: 'AI',  cmd: 'ai',       icon: '✦',    name: 'AI 要約',         desc: 'このページを要約' },
  { cat: 'AI',  cmd: 'ai-rewrite', icon: '✦',  name: 'AI 改稿',         desc: 'トーン調整・敬体/常体' },
  { cat: 'AI',  cmd: 'ai-translate', icon: '✦', name: 'AI 翻訳',        desc: '日↔英 翻訳' },
  { cat: 'AI',  cmd: 'ai-actions', icon: '✦',  name: 'AI アクション抽出', desc: '議事録からTODO抽出' },
];

let _slashActive = false;
let _slashQuery = '';
let _slashSel = 0;
let _slashFiltered: SlashItem[] = [];
let _slashNode: Node | null = null;
/** Caret rect captured when the slash menu opened. Reused by command
 *  handlers that need to position a follow-up popover (page picker, DB
 *  picker, …) — by then the slash text has been deleted and the caret's
 *  current bounding rect is collapsed at (0,0). */
let _slashAnchorRect: { bottom: number; left: number } = { bottom: 0, left: 0 };

// `[[` page-link autocomplete state. Tracked separately from slash so the
// two trigger modes don't fight each other when both keys appear in
// quick succession.
let _wikiActive = false;
let _wikiQuery = '';
let _wikiNode: Node | null = null;
let _wikiStartOffset = -1; // offset of the first `[` in _wikiNode

export function isSlashActive(): boolean { return _slashActive; }

export function closeSlashMenu(): void {
  _slashActive = false;
  _slashQuery = '';
  _slashSel = 0;
  _slashNode = null;
  g('slash').classList.remove('on');
}

function closeWikiPicker(): void {
  _wikiActive = false;
  _wikiQuery = '';
  _wikiNode = null;
  _wikiStartOffset = -1;
  hidePagePicker();
}

/** Replace the `[[<query>` text with an atomic page-link chip pointing to the
 *  picked page, then position the caret right after the chip with a single
 *  trailing space so the user can keep typing. */
function insertPageLinkAtWikiTrigger(page: Page): void {
  const _ed = getEd();
  if (!_wikiNode || !_ed.contains(_wikiNode) || _wikiStartOffset < 0) {
    closeWikiPicker();
    return;
  }
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) { closeWikiPicker(); return; }
  const txtNode = _wikiNode as Text;
  const fullTxt = txtNode.textContent || '';
  const rng0 = sel.getRangeAt(0);
  const curOff = (rng0.startContainer === txtNode) ? rng0.startOffset : fullTxt.length;
  // Verify the trigger is still intact (user might have backspaced past it)
  if (fullTxt.substr(_wikiStartOffset, 2) !== '[[') {
    closeWikiPicker();
    return;
  }
  // Split the text node: keep [0, _wikiStartOffset) before the trigger, drop
  // [_wikiStartOffset, curOff) which is the typed `[[query`, then resume
  // with [curOff, end). Insert the link element + trailing space between.
  const before = fullTxt.substring(0, _wikiStartOffset);
  const after = fullTxt.substring(curOff);
  const a = document.createElement('a');
  a.className = 'n365-page-link';
  a.setAttribute('data-page-id', page.Id);
  a.setAttribute('contenteditable', 'false');
  a.textContent = page.Title || '無題';
  // Replace the trigger text node with: [before-text] [<a>] [space + after]
  txtNode.textContent = before;
  const parent = txtNode.parentNode;
  if (!parent) { closeWikiPicker(); return; }
  const tail = document.createTextNode(' ' + after);
  parent.insertBefore(a, txtNode.nextSibling);
  parent.insertBefore(tail, a.nextSibling);
  // Caret right after the inserted space
  const r = document.createRange();
  r.setStart(tail, 1);
  r.collapse(true);
  sel.removeAllRanges();
  sel.addRange(r);
  closeWikiPicker();
  S.dirty = true;
  setSave('未保存');
  schedSave();
}

/** Filter slash items by `_slashQuery`. When the query starts with a
 *  markdown shortcut character (`#`, `-`, `>`, `[`, `1`, `\``), filter on
 *  `md` (Markdown notation prefix) instead of the name/cmd substring. This
 *  is what enables `/##` → 見出し2 etc. */
function filterSlashItems(): SlashItem[] {
  if (!_slashQuery) return SLASH_ITEMS;
  // If the query looks like a markdown shortcut (any non-word starting char),
  // try md-prefix matching first. Exact md matches are sorted first, then
  // longer-md matches that still share the prefix.
  const startsWithMd = !/^\w/.test(_slashQuery);
  if (startsWithMd) {
    const mdHits = SLASH_ITEMS.filter((it) => it.md && it.md.startsWith(_slashQuery));
    if (mdHits.length > 0) {
      return mdHits.sort((a, b) => {
        const aExact = a.md === _slashQuery ? 0 : 1;
        const bExact = b.md === _slashQuery ? 0 : 1;
        if (aExact !== bExact) return aExact - bExact;
        return (a.md?.length || 0) - (b.md?.length || 0);
      });
    }
    // No md hits — return empty so the menu closes (rather than showing
    // unrelated text matches for cryptic markdown queries).
    return [];
  }
  // Word-style query → match by name / cmd as before.
  const q = _slashQuery.toLowerCase();
  return SLASH_ITEMS.filter((it) =>
    it.name.toLowerCase().includes(q) || it.cmd.toLowerCase().includes(q),
  );
}

function showSlashMenu(rect: { bottom: number; left: number }): void {
  const el = g('slash');
  _slashFiltered = filterSlashItems();
  if (_slashFiltered.length === 0) { closeSlashMenu(); return; }
  if (_slashSel >= _slashFiltered.length) _slashSel = 0;

  el.innerHTML = '';
  let prevCat = '';
  let selEl: HTMLElement | null = null;
  _slashFiltered.forEach((item, idx) => {
    if (item.cat !== prevCat) {
      const sec = document.createElement('div');
      sec.className = 'n365-slash-section';
      sec.textContent = item.cat;
      el.appendChild(sec);
      prevCat = item.cat;
    }
    const div = document.createElement('div');
    div.className = 'n365-slash-item' + (idx === _slashSel ? ' sel' : '');
    // Display priority: explicit kbd > md notation > nothing
    const hint = item.kbd || item.md;
    const kbdHtml = hint ? '<div class="n365-slash-kbd">' + hint + '</div>' : '';
    div.innerHTML =
      '<div class="n365-slash-icon">' + item.icon + '</div>' +
      '<div class="n365-slash-body"><div class="n365-slash-name">' + item.name + '</div><div class="n365-slash-desc">' + item.desc + '</div></div>' +
      kbdHtml;
    div.addEventListener('mousedown', (e) => { e.preventDefault(); applySlashCmd(item.cmd); });
    el.appendChild(div);
    if (idx === _slashSel) selEl = div;
  });

  const top = rect.bottom + window.scrollY + 4;
  let left = rect.left + window.scrollX;
  const vpW = window.innerWidth;
  if (left + 260 > vpW) left = vpW - 264;
  el.style.top = top + 'px';
  el.style.left = left + 'px';

  // Stash the caret position so commands that show a *follow-up* popover
  // (DB picker / page picker) can anchor to the same point — by the time
  // those handlers run, the typed slash text has been deleted and the
  // collapsed caret range no longer has usable bounding rects.
  _slashAnchorRect = { bottom: rect.bottom, left: rect.left };

  // Scroll the selected item into view (within the slash-menu's own scroll container)
  if (selEl) {
    requestAnimationFrame(() => {
      try { (selEl as HTMLElement).scrollIntoView({ block: 'nearest' }); } catch { /* ignore */ }
    });
  }
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
  } else if (cmd === 'nav-back') {
    void import('./nav-history').then((m) => m.goBack());
    return;
  } else if (cmd === 'nav-forward') {
    void import('./nav-history').then((m) => m.goForward());
    return;
  } else if (cmd === 'ai') {
    void import('./ai-block').then((m) => m.insertAiBlock());
    return;
  } else if (cmd === 'table') {
    void import('./inline-table').then((m) => m.insertInlineTable(3, 1));
    return;
  } else if (cmd === 'inlinedb') {
    // Open the page picker filtered to DB pages, then insert a linked-DB
    // block at the caret. The block renders asynchronously from the live
    // SP data so it stays in sync with the underlying DB.
    showPagePicker({
      anchor: _slashAnchorRect,
      dbsOnly: true,
      onSelect: (p) => {
        void import('./linked-db').then((m) => {
          m.insertLinkedDb(p.Id);
          _ed.focus();
          S.dirty = true; setSave('未保存'); schedSave();
        });
      },
    });
    return;
  } else if (cmd === 'page-link') {
    // Open the page picker at the caret. Selection inserts an atomic
    // <a class="n365-page-link"> chip with a trailing space for further typing.
    showPagePicker({
      anchor: _slashAnchorRect,
      onSelect: (p) => {
        const s2 = window.getSelection();
        if (!s2 || !s2.rangeCount) return;
        const a = document.createElement('a');
        a.className = 'n365-page-link';
        a.setAttribute('data-page-id', p.Id);
        a.setAttribute('contenteditable', 'false');
        a.textContent = p.Title || '無題';
        const tail = document.createTextNode(' ');
        const r = s2.getRangeAt(0);
        r.insertNode(tail);
        r.insertNode(a);
        // Caret right after the trailing space
        const r2 = document.createRange();
        r2.setStartAfter(tail);
        r2.collapse(true);
        s2.removeAllRanges();
        s2.addRange(r2);
        _ed.focus();
        S.dirty = true; setSave('未保存'); schedSave();
      },
    });
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
  void import('./inline-table').then((m) => m.attachTablePaste());

  // Strip inline format wrappers (code/b/i/s/u/em/strong) duplicated to the new
  // paragraph by the browser when Enter is pressed inside them — Notion-style:
  // pressing Enter exits the inline format.
  const INLINE_FMT = /^(CODE|B|STRONG|I|EM|S|DEL|U)$/;
  function unwrapLeadingInlineFormats(block: HTMLElement): { node: Node; offset: number } | null {
    while (block.firstChild) {
      const first = block.firstChild;
      if (first.nodeType !== 1) return { node: first, offset: 0 };
      const el = first as Element;
      if (!INLINE_FMT.test(el.tagName)) return null;
      const parent = first.parentNode!;
      while (first.firstChild) parent.insertBefore(first.firstChild, first);
      first.remove();
    }
    if (!block.firstChild) {
      block.appendChild(document.createElement('br'));
      return { node: block, offset: 0 };
    }
    return null;
  }
  // Also clean the OLD block (the one before split) — if user pressed Enter at
  // start of an inline format, the old block may be left with an empty wrapper.
  function pruneEmptyInlineFormats(block: HTMLElement): void {
    block.querySelectorAll('code,b,strong,i,em,s,del,u').forEach((el) => {
      if (!el.textContent) el.remove();
    });
  }
  _ed.addEventListener('input', (e: Event) => {
    const ie = e as InputEvent;
    if (ie.inputType === 'insertParagraph') {
      const sel = window.getSelection();
      if (sel && sel.rangeCount) {
        const newBlock = curBlock();
        if (newBlock && newBlock !== _ed) {
          const target = unwrapLeadingInlineFormats(newBlock);
          // also clean previous block (split residue)
          const prev = newBlock.previousElementSibling as HTMLElement | null;
          if (prev) pruneEmptyInlineFormats(prev);
          if (target) {
            const r = document.createRange();
            r.setStart(target.node, target.offset);
            r.collapse(true);
            sel.removeAllRanges();
            sel.addRange(r);
          }
        }
      }
    }
  });

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
      // `[[query` page-link trigger — match between the last `[[` and the
      // caret. Cancel if a closing `]]`, newline, or another `[[` appears.
      const wikiMatch = before.match(/\[\[([^\[\]\n]*)$/);
      if (wikiMatch) {
        const startIdx = before.lastIndexOf('[[');
        _wikiActive = true;
        _wikiQuery = wikiMatch[1] || '';
        _wikiNode = node;
        _wikiStartOffset = startIdx;
        const rect = range.getBoundingClientRect();
        if (!pagePickerActive()) {
          showPagePicker({
            anchor: { bottom: rect.bottom, left: rect.left },
            query: _wikiQuery,
            onSelect: (p) => insertPageLinkAtWikiTrigger(p),
            onCancel: () => closeWikiPicker(),
          });
        } else {
          updatePagePickerQuery(_wikiQuery);
        }
        // Wiki trigger and slash menu are mutually exclusive
        if (_slashActive) closeSlashMenu();
        return;
      }
      if (_wikiActive) closeWikiPicker();

      // Allow any non-whitespace chars after `/` so markdown notation like
      // `/##`, `/-`, `/[]`, `/>` and `/```` can filter the menu directly.
      const slashMatch = before.match(/(^|\s)\/(\S*)$/);
      if (slashMatch) {
        _slashActive = true;
        _slashQuery = slashMatch[2] || '';
        _slashSel = 0;
        _slashNode = node;
        const rect = range.getBoundingClientRect();
        showSlashMenu(rect);
        return;
      }
    } else {
      // caret moved off a text node — close any open trigger
      if (_wikiActive) closeWikiPicker();
    }
    if (_slashActive) closeSlashMenu();
  });

  _ed.addEventListener('keydown', (e) => {
    // Skip during IME composition (Japanese input etc.)
    const ke = e as KeyboardEvent;
    if (ke.isComposing || ke.keyCode === 229) return;

    // Wiki-style `[[` autocomplete takes precedence over slash menu when
    // active, but both keybindings overlap so we handle them carefully.
    if (_wikiActive && pagePickerActive()) {
      if (ke.key === 'ArrowDown') { e.preventDefault(); pagePickerMove(1); return; }
      if (ke.key === 'ArrowUp')   { e.preventDefault(); pagePickerMove(-1); return; }
      if (ke.key === 'Enter') {
        if (pagePickerCount() > 0) { e.preventDefault(); pagePickerCommit(); return; }
        // No matches → just close picker, let Enter through as a newline
        closeWikiPicker();
      }
      if (ke.key === 'Escape') { e.preventDefault(); closeWikiPicker(); return; }
      // Spaces are allowed in queries (page titles often have spaces) — don't dismiss on space
    }

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
    // Internal page-link → navigate via doSelect.
    const linkEl = target.closest<HTMLElement>('a.n365-page-link');
    if (linkEl) {
      e.preventDefault();
      // Daily-note deferred link: find-or-create the row for that date and
      // open it as a row-page. This is what lets prev/next links work even
      // when the target hasn't been written yet.
      const dailyDate = linkEl.getAttribute('data-daily-date') || '';
      if (dailyDate) {
        void (async () => {
          try {
            const daily = await import('../api/daily');
            const ref = await daily.getOrCreateNoteForDate(dailyDate);
            const dbPage = S.pages.find((p) => p.Id === ref.dbPageId);
            if (!dbPage) return;
            const v = await import('./views');
            await v.doSelectDb(ref.dbPageId, dbPage);
            const r = await import('./row-page');
            const item = S.dbItems.find((i) => i.Id === ref.rowId);
            if (item) await r.openRowAsPage(ref.dbPageId, item);
          } catch (err) {
            const ui = await import('./ui-helpers');
            ui.toast('デイリーノートを開けませんでした: ' + (err as Error).message, 'err');
          }
        })();
        return;
      }
      const pageId = linkEl.getAttribute('data-page-id') || '';
      const pendingTitle = linkEl.getAttribute('data-pending') === '1'
        ? (linkEl.textContent || '').trim()
        : '';
      const target2 = pageId
        ? S.pages.find((p) => p.Id === pageId)
        : (pendingTitle ? S.pages.find((p) => (p.Title || '') === pendingTitle) : null);
      if (target2) {
        // Resolve pending title-only links to their canonical id form so
        // future opens are stable across renames.
        if (pendingTitle && !pageId) {
          linkEl.setAttribute('data-page-id', target2.Id);
          linkEl.removeAttribute('data-pending');
          S.dirty = true; setSave('未保存'); schedSave();
        }
        void import('./views').then((m) => m.doSelect(target2.Id));
      } else {
        void import('./ui-helpers').then((m) =>
          m.toast('リンク先のページが見つかりません', 'err'));
      }
    }
  });

  // Notion-style: clicking on the empty area below the last block adds
  // a new <p> at the end and focuses it.
  _ed.addEventListener('mousedown', (e) => {
    if (e.target !== _ed) return;        // clicked on a child block — let default handle
    const last = _ed.lastElementChild as HTMLElement | null;
    if (last) {
      const r = last.getBoundingClientRect();
      if (e.clientY < r.bottom) return;  // not below the last block
    }
    e.preventDefault();
    const p = document.createElement('p');
    p.appendChild(document.createElement('br'));
    _ed.appendChild(p);
    const rng = document.createRange();
    rng.setStart(p, 0); rng.collapse(true);
    const sel = window.getSelection();
    if (sel) { sel.removeAllRanges(); sel.addRange(rng); }
    _ed.focus();
    S.dirty = true; setSave('未保存'); schedSave();
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
