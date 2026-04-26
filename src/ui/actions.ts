// Page actions: create / delete / save plus the emoji picker.

import { S } from '../state';
import { SAVE_MS, SITE, SITE_REL, FOLDER } from '../config';
import { g, getEd, getOverlay } from './dom';
import { setLoad, setSave, toast } from './ui-helpers';
import { renderTree } from './tree';
import { showView, doSelect } from './views';
import { apiCreatePage, apiDeletePage, apiSavePage, getPathForId, apiTrashPage } from '../api/pages';
import { apiAddDbRow } from '../api/db';
import { readFile, writeFile } from '../api/sp-core';
import { getBody, mdToHtml } from '../lib/markdown';
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
  if (!confirm(hasK ? '「' + name + '」と子ページをゴミ箱へ移動しますか？' : '「' + name + '」をゴミ箱へ移動しますか？')) return;
  try {
    setLoad(true, '移動中...');
    await apiTrashPage(id);
    const trashedIds = collectIds(id);
    S.pages = S.pages.filter((p) => !trashedIds.includes(p.Id));
    if (S.currentId !== null && trashedIds.includes(S.currentId)) {
      S.currentId = null;
      showView('empty');
    }
    renderTree();
    toast('ゴミ箱に移動しました');
  } catch (e) { toast('削除に失敗: ' + (e as Error).message, 'err'); }
  finally { setLoad(false); }
}

// Permanently remove from trash (called by trash UI)
export async function doPurge(id: string): Promise<void> {
  if (!confirm('完全に削除します。元に戻せませんがよろしいですか？')) return;
  try {
    setLoad(true, '完全削除中...');
    await apiDeletePage(id);
    toast('完全に削除しました');
  } catch (e) { toast('削除失敗: ' + (e as Error).message, 'err'); }
  finally { setLoad(false); }
}

export async function doSave(): Promise<void> {
  if (!S.currentId || !S.dirty || S.saving || S.currentType === 'database') return;
  S.saving = true; setSave('保存中...');
  try {
    const te = g('ttl') as HTMLTextAreaElement;
    const title = te.value.trim() || '無題';
    const html = getEd().innerHTML;
    const expectedEtag = S.sync.pageId === S.currentId ? S.sync.loadedEtag : null;
    const result = await apiSavePage(S.currentId, title, html, expectedEtag || undefined);
    if (!result.ok) {
      // Conflict: another user beat us to it
      setSave('競合');
      const want = confirm(
        '他のユーザーが先にこのページを更新しました。\n' +
        'OK: 自分の変更で上書き保存\n' +
        'キャンセル: 自分の変更を破棄して相手の版にリロード',
      );
      if (want) {
        // Force overwrite (no If-Match)
        const force = await apiSavePage(S.currentId, title, html);
        if (force.ok) {
          if (S.sync.pageId === S.currentId) S.sync.loadedEtag = force.etag;
          S.dirty = false; setSave('保存済み');
        }
      } else {
        // Reload from server, dropping local edits
        S.dirty = false; setSave('');
        const { doSelect } = await import('./views');
        await doSelect(S.currentId);
      }
      return;
    }
    if (S.sync.pageId === S.currentId) {
      S.sync.loadedEtag = result.etag;
      // Refresh modified timestamp via meta
      const { apiLoadFileMeta } = await import('../api/pages');
      const fm = await apiLoadFileMeta(S.currentId);
      if (fm) S.sync.loadedModified = fm.modified;
    }
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
  void import('./sync-watch').then((m) => m.stopWatching());
  getOverlay().remove();
  const st = document.getElementById('n365-style');
  if (st) st.remove();
  document.removeEventListener('keydown', onKey);
}

export function onKey(e: KeyboardEvent): void {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); clearSaveTimer(); doSave(); }
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearchProxy(); }
  if ((e.ctrlKey || e.metaKey) && e.key === 'j') { e.preventDefault(); toggleAiProxy(); }
  if (e.key === 'Escape') {
    if (g('qs').classList.contains('on')) { closeSearch(); return; }
    if (g('emoji').classList.contains('on')) { g('emoji').classList.remove('on'); return; }
    if (g('ai-panel').classList.contains('on')) { void import('./ai-chat').then((m) => m.closeAiPanel()); return; }
    if (isSlashActive()) { closeSlashMenu(); return; }
    closeApp();
  }
}

function toggleAiProxy(): void {
  void import('./ai-chat').then((m) => m.toggleAiPanel());
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

// ── Page menu actions ──────────────────────────────────

function downloadFile(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: mime + ';charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function safeFilename(s: string): string {
  return s.replace(/[/\\?%*:|"<>]/g, '_').slice(0, 100) || 'untitled';
}

function exportCss(): string {
  return `
:root { color-scheme: light; }
body {
  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif;
  max-width: 720px; margin: 48px auto; padding: 0 24px;
  color: rgb(55, 53, 47); background: #fff; line-height: 1.6; font-size: 16px;
}
h1, h2, h3 { line-height: 1.3; margin: 1.2em 0 .3em; }
h1 { font-size: 2em; font-weight: 700; }
h2 { font-size: 1.5em; font-weight: 600; }
h3 { font-size: 1.25em; font-weight: 600; }
p { margin: .25em 0; }
ul, ol { padding-left: 1.6em; margin: .25em 0; }
li + li { margin-top: 4px; }
blockquote { border-left: 3px solid rgb(55, 53, 47); padding-left: .9em; opacity: .65; margin: .25em 0; }
hr { border: none; border-top: 1px solid rgba(55, 53, 47, .16); margin: 1em 0; }
pre {
  background: rgb(247, 246, 243); padding: 14px 16px; border-radius: 4px;
  font-family: "SFMono-Regular", Menlo, Consolas, "Liberation Mono", Courier, monospace;
  font-size: 85%; overflow-x: auto; white-space: pre; tab-size: 2; margin: .5em 0;
}
pre code { background: none; padding: 0; color: inherit; font-size: inherit; }
code {
  background: rgba(135, 131, 120, .2); padding: 2px 4px; border-radius: 3px;
  font-family: "SFMono-Regular", Menlo, Consolas, monospace; font-size: 85%; color: #eb5757;
}
strong { font-weight: 600; }
em { font-style: italic; }
s, del { text-decoration: line-through; opacity: .7; }
a { color: inherit; text-decoration: underline; opacity: .75; }
.n365-callout {
  display: flex; gap: 10px; background: rgb(241, 241, 239); border-radius: 4px;
  padding: 12px 16px; margin: .8em 0;
}
.n365-callout + .n365-callout { margin-top: .8em; }
.n365-callout-ic { font-size: 20px; flex-shrink: 0; line-height: 1.5; }
.n365-callout-body { flex: 1; min-width: 0; }
.n365-callout-body > p:first-child { margin-top: 0; }
.n365-callout-body > p:last-child  { margin-bottom: 0; }
.n365-todo { display: flex; align-items: flex-start; gap: 6px; margin: 4px 0; }
.n365-todo-cb { margin-top: 5px; width: 14px; height: 14px; flex-shrink: 0; accent-color: rgb(35, 131, 226); }
.n365-todo-txt { flex: 1; }
.n365-todo-txt.done { text-decoration: line-through; opacity: .4; }
`.replace(/\s+/g, ' ').trim();
}

function currentPage() {
  if (!S.currentId) return null;
  return S.pages.find((p) => p.Id === S.currentId) || null;
}

export async function exportMd(): Promise<void> {
  const page = currentPage();
  if (!page) return;
  if (page.Type === 'database') {
    toast('データベースはMD出力できません', 'err');
    return;
  }
  try {
    setLoad(true, 'エクスポート中...');
    const path = getPathForId(page.Id);
    const content = await readFile(path + '/index.md');
    downloadFile(safeFilename(page.Title || '無題') + '.md', content, 'text/markdown');
  } catch (err) {
    toast('MD出力失敗: ' + (err as Error).message, 'err');
  } finally {
    setLoad(false);
  }
}

export async function exportHtml(): Promise<void> {
  const page = currentPage();
  if (!page) return;
  if (page.Type === 'database') {
    toast('データベースはHTML出力できません', 'err');
    return;
  }
  try {
    setLoad(true, 'エクスポート中...');
    const path = getPathForId(page.Id);
    const md = await readFile(path + '/index.md');
    const body = mdToHtml(getBody(md));
    const title = page.Title || '無題';
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const css = exportCss();
    const html =
      '<!DOCTYPE html>\n<html lang="ja">\n<head>\n' +
      '<meta charset="UTF-8">\n<title>' + esc(title) + '</title>\n' +
      '<style>' + css + '</style>\n' +
      '</head>\n<body>\n<h1>' + esc(title) + '</h1>\n' + body + '\n</body>\n</html>';
    downloadFile(safeFilename(title) + '.html', html, 'text/html');
  } catch (err) {
    toast('HTML出力失敗: ' + (err as Error).message, 'err');
  } finally {
    setLoad(false);
  }
}

export async function duplicateCurrent(): Promise<void> {
  const page = currentPage();
  if (!page) return;
  if (page.Type === 'database') {
    toast('データベースは複製できません', 'err');
    return;
  }
  try {
    setLoad(true, '複製中...');
    const origPath = getPathForId(page.Id);
    const origMd = await readFile(origPath + '/index.md');
    const body = getBody(origMd);
    const newTitle = (page.Title || '無題') + ' (コピー)';
    const newPage = await apiCreatePage(newTitle, page.ParentId);
    const newPath = getPathForId(newPage.Id);
    const today = new Date().toISOString().slice(0, 10);
    const newMd = '---\ntitle: ' + newTitle + '\nparent: ' + (newPage.ParentId || '') + '\ncreated: ' + today + '\n---\n\n' + body;
    await writeFile(newPath + '/index.md', newMd);
    S.pages.push(newPage);
    renderTree();
    await doSelect(newPage.Id);
    toast('複製しました');
  } catch (err) {
    toast('複製失敗: ' + (err as Error).message, 'err');
  } finally {
    setLoad(false);
  }
}

export async function copyPageLink(): Promise<void> {
  const page = currentPage();
  if (!page) return;
  let url: string;
  if (page.Type === 'database') {
    const meta = S.meta.pages.find((p) => p.id === page.Id);
    if (!meta || !meta.list) { toast('リンク取得失敗', 'err'); return; }
    url = SITE + '/Lists/' + encodeURIComponent(meta.list);
  } else {
    const path = getPathForId(page.Id);
    const folderUrlPath = FOLDER.substring(SITE_REL.length);
    url = SITE + folderUrlPath + '/' + path + '/index.md';
  }
  try {
    await navigator.clipboard.writeText(url);
    toast('リンクをコピーしました');
  } catch {
    toast('コピー失敗', 'err');
  }
}

export function printCurrent(): void {
  window.print();
}

export function showPageInfo(): void {
  const page = currentPage();
  if (!page) return;
  if (page.Type === 'database') {
    toast(`🗃 ${page.Title || '無題'} (DB) — ${S.dbItems.length}行 / ${S.dbFields.length}列`);
    return;
  }
  const ed = getEd();
  const text = (ed.textContent || '').replace(/\s+/g, ' ').trim();
  const charCount = text.length;
  const wordCount = text ? text.split(/\s+/).length : 0;
  const blockCount = ed.querySelectorAll('p, h1, h2, h3, li, pre, blockquote, .n365-callout, .n365-todo, hr').length;
  toast(`📄 ${page.Title || '無題'}: ${charCount}文字 / 約${wordCount}語 / ${blockCount}ブロック`);
}

let _pgmTarget: HTMLElement | null = null;

export function togglePageMenu(btn: HTMLElement): void {
  const pgm = g('pgm');
  if (pgm.classList.contains('on')) {
    hidePageMenu();
    return;
  }
  if (!S.currentId) {
    toast('ページを選択してください');
    return;
  }
  const rect = btn.getBoundingClientRect();
  const top = rect.bottom + 4;
  const right = window.innerWidth - rect.right;
  pgm.style.top = top + 'px';
  pgm.style.right = right + 'px';
  pgm.style.left = '';
  pgm.classList.add('on');
  _pgmTarget = btn;
}

export function hidePageMenu(): void {
  g('pgm').classList.remove('on');
  _pgmTarget = null;
}

export function attachPageMenuOutsideClick(): void {
  document.addEventListener('mousedown', (e) => {
    const pgm = g('pgm');
    const target = e.target as Node;
    if (pgm && pgm.classList.contains('on') && !pgm.contains(target) && target !== _pgmTarget && (!_pgmTarget || !_pgmTarget.contains(target))) {
      hidePageMenu();
    }
  });
}
