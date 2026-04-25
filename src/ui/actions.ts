// Page actions: create / delete / save plus the emoji picker.

import { S } from '../state';
import { SAVE_MS } from '../config';
import { g, getEd, getOverlay } from './dom';
import { setLoad, setSave, toast } from './ui-helpers';
import { renderTree } from './tree';
import { showView, doSelect } from './views';
import { apiCreatePage, apiDeletePage, apiSavePage } from '../api/pages';
import { apiAddDbRow } from '../api/db';
import { getDbFields } from './views';
import { mkDbRow } from './views';
import { isSlashActive, closeSlashMenu } from './editor';
import { closeSearch } from './search-ui';

let _svT: ReturnType<typeof setTimeout> | undefined;

export async function doNew(parentId: string): Promise<void> {
  try {
    setLoad(true, 'ページを作成中...');
    const p = await apiCreatePage('無題', parentId || '');
    S.pages.push(p);
    if (parentId) S.expanded.add(parentId);
    renderTree();
    await doSelect(p.Id);
    (g('ttl') as HTMLTextAreaElement).select();
  } catch (e) { toast('ページ作成に失敗: ' + (e as Error).message, 'err'); }
  finally { setLoad(false); }
}

export function collectIds(id: string): string[] {
  let r = [id];
  S.pages.filter((p) => p.ParentId === id).forEach((c) => { r = r.concat(collectIds(c.Id)); });
  return r;
}

export async function doDel(id: string): Promise<void> {
  const page = S.pages.find((p) => p.Id === id);
  const name = page ? (page.Title || '無題') : '無題';
  const hasK = S.pages.some((p) => p.ParentId === id);
  if (!confirm(hasK ? '「' + name + '」と子ページをすべて削除しますか？' : '「' + name + '」を削除しますか？')) return;
  try {
    setLoad(true, '削除中...');
    const ids = await apiDeletePage(id);
    S.pages = S.pages.filter((p) => ids.indexOf(p.Id) < 0);
    if (S.currentId !== null && ids.indexOf(S.currentId) >= 0) {
      S.currentId = null;
      showView('empty');
    }
    renderTree();
    toast('削除しました');
  } catch (e) { toast('削除に失敗: ' + (e as Error).message, 'err'); }
  finally { setLoad(false); }
}

export async function doSave(): Promise<void> {
  if (!S.currentId || !S.dirty || S.saving || S.currentType === 'database') return;
  S.saving = true; setSave('保存中...');
  try {
    const te = g('ttl') as HTMLTextAreaElement;
    const title = te.value.trim() || '無題';
    const html = getEd().innerHTML;
    await apiSavePage(S.currentId, title, html);
    const p = S.pages.find((x) => x.Id === S.currentId);
    if (p) p.Title = title;
    S.dirty = false;
    setSave('保存済み');
    renderTree();
    setTimeout(() => { if (!S.dirty) setSave(''); }, 2000);
  } catch (e) { toast('保存に失敗: ' + (e as Error).message, 'err'); setSave('保存失敗'); }
  finally { S.saving = false; }
}

export function schedSave(): void {
  clearTimeout(_svT);
  _svT = setTimeout(doSave, SAVE_MS);
}

export function clearSaveTimer(): void {
  clearTimeout(_svT);
}

// ── DB new row action ─────────────────────────────────
export function doNewDbRow(): void {
  const tbody = g('dtb');
  if (tbody.querySelector('.n365-dr-new')) return;
  const fields = getDbFields();
  const tr = document.createElement('tr');
  tr.className = 'n365-dr-new';
  let saved = false;

  fields.forEach((f) => {
    const td = document.createElement('td');
    const span = document.createElement('span');
    span.className = 'n365-dc';
    span.contentEditable = 'true';
    span.dataset.field = f.InternalName;
    span.addEventListener('keydown', (e) => {
      const ke = e as KeyboardEvent;
      if (ke.key === 'Enter' && !ke.shiftKey) { e.preventDefault(); saveNewRow(); }
      if (ke.key === 'Escape') { tr.remove(); }
      if (ke.key === 'Tab') {
        e.preventDefault();
        const cells = Array.from(tr.querySelectorAll<HTMLElement>('.n365-dc'));
        const next = ke.shiftKey ? cells[cells.indexOf(span) - 1] : cells[cells.indexOf(span) + 1];
        if (next) next.focus(); else saveNewRow();
      }
    });
    td.appendChild(span);
    tr.appendChild(td);
  });
  const emptyTd = document.createElement('td');
  emptyTd.className = 'n365-td-del';
  tr.appendChild(emptyTd);
  tbody.appendChild(tr);
  const first = tr.querySelector<HTMLElement>('.n365-dc');
  if (first) first.focus();

  async function saveNewRow(): Promise<void> {
    if (saved) return;
    const data: Record<string, unknown> = {};
    tr.querySelectorAll<HTMLElement>('.n365-dc').forEach((s) => {
      const v = (s.textContent || '').trim();
      if (v) data[s.dataset.field as string] = v;
    });
    if (!data.Title) { tr.remove(); return; }
    saved = true;
    try {
      setLoad(true, '追加中...');
      const item = await apiAddDbRow(S.dbList, data);
      S.dbItems.push(item);
      tr.remove();
      g('dtb').appendChild(mkDbRow(item, fields));
      toast('行を追加しました');
    } catch (e) {
      toast('追加失敗: ' + (e as Error).message, 'err');
      tr.remove();
      saved = false;
    } finally { setLoad(false); }
  }

  tr.addEventListener('focusout', () => {
    setTimeout(() => { if (!tr.contains(document.activeElement)) saveNewRow(); }, 100);
  });
}

// ── CLOSE ─────────────────────────────────────────────
export function closeApp(): void {
  clearSaveTimer();
  if (S.dirty && S.currentType !== 'database' && !confirm('保存していない変更があります。閉じますか？')) return;
  getOverlay().remove();
  const st = document.getElementById('n365-style');
  if (st) st.remove();
  document.removeEventListener('keydown', onKey);
}

export function onKey(e: KeyboardEvent): void {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); clearSaveTimer(); doSave(); }
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearchProxy(); }
  if (e.key === 'Escape') {
    if (g('qs').classList.contains('on')) { closeSearch(); return; }
    if (g('emoji').classList.contains('on')) { g('emoji').classList.remove('on'); return; }
    if (isSlashActive()) { closeSlashMenu(); return; }
    closeApp();
  }
}

// Late-bound to avoid an actions <-> search-ui circular import edge case.
function openSearchProxy(): void {
  // Imported lazily — search-ui imports from here for closeSearch.
  // Using dynamic require pattern to break the cycle is unnecessary because
  // ESM hoists imports, but we still keep a thin wrapper for clarity.
  void import('./search-ui').then((m) => m.openSearch());
}

// ── Emoji picker ─────────────────────────────────────
export const EMOJIS: string[] = [
  '📄', '📝', '📋', '📌', '📍', '📎', '🗂', '🗃', '🗄', '📁', '📂', '🗑',
  '📚', '📖', '📗', '📘', '📙', '📔', '📒', '📃', '📜', '📑', '🔖',
  '✏️', '🖊', '🖋', '🖌', '🖍', '✒️', '🔏', '🔐', '🔒', '🔓', '🔑', '🗝',
  '💡', '🔦', '🕯', '💰', '💵', '💳', '🏆', '🥇', '🎯', '🎪', '🎨', '🎭',
  '🌟', '⭐', '✨', '💫', '🔥', '❄️', '🌊', '🌈', '☀️', '🌙', '⚡', '🌿',
  '🍎', '🍊', '🍋', '🍇', '🍓', '🥝', '🥑', '🌮', '🍕', '☕', '🎂', '🍰',
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮',
  '🚀', '✈️', '🚂', '🚗', '🏠', '🏢', '🏖', '🏔', '🌍', '🗺', '🧭', '⛵',
];

let _emojiTarget: HTMLElement | null = null;
let _emojiCallback: ((emoji: string) => void) | null = null;

export function showEmojiPicker(targetEl: HTMLElement, onSelect: (emoji: string) => void): void {
  _emojiTarget = targetEl;
  _emojiCallback = onSelect;
  const grid = g('emoji-grid');
  grid.innerHTML = '';
  EMOJIS.forEach((em) => {
    const btn = document.createElement('button');
    btn.className = 'n365-emoji-btn';
    btn.textContent = em;
    btn.addEventListener('click', () => {
      g('emoji').classList.remove('on');
      if (_emojiCallback) _emojiCallback(em);
    });
    grid.appendChild(btn);
  });

  const rect = targetEl.getBoundingClientRect();
  const ep = g('emoji');
  ep.style.top = (rect.bottom + 4) + 'px';
  ep.style.left = rect.left + 'px';
  ep.classList.add('on');
}

export function hideEmojiPicker(): void {
  g('emoji').classList.remove('on');
}

export function attachEmojiPickerOutsideClick(): void {
  document.addEventListener('mousedown', (e) => {
    const ep = g('emoji');
    const target = e.target as Node;
    if (ep && ep.classList.contains('on') && !ep.contains(target) && target !== _emojiTarget) {
      ep.classList.remove('on');
    }
  });
}
