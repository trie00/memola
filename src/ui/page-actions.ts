// Per-page operations triggered from the page-menu / toolbar:
// duplicate, copy-link, show-info. Page-CRUD (create / delete /
// purge) lives in actions.ts; these are read-only or copy-style
// operations that don't mutate the current page.

import { S } from '../state';
import { SITE } from '../config';
import { getEd } from './dom';
import { setLoad, toast } from './ui-helpers';
import { renderTree } from './tree';
import { doSelect } from './views';
import { apiCreatePage, apiLoadRawBody, listForPageId } from '../api/pages';
import { metaById } from '../lib/page-store';

function currentPage() {
  if (!S.currentId) return null;
  return S.pages.find((p) => p.Id === S.currentId) || null;
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
    const body = await apiLoadRawBody(page.Id);
    const newTitle = (page.Title || '無題') + ' (コピー)';
    const newPage = await apiCreatePage(newTitle, page.ParentId);
    // Write the duplicated body through the unified memola-pages writer
    // so the watermark stays in sync, matching every other body-modifying
    // path.
    const { updatePageRow } = await import('../api/pages');
    const { addPage } = await import('../lib/page-store');
    await updatePageRow(newPage.Id, { Body: body });
    addPage(newPage);
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
    const meta = metaById(page.Id);
    if (!meta || !meta.list) { toast('リンク取得失敗', 'err'); return; }
    url = SITE + '/Lists/' + encodeURIComponent(meta.list);
  } else {
    // Link to the page row in its backing pages list (per-user list under Phase 3).
    url = SITE + '/Lists/' + encodeURIComponent(listForPageId(page.Id)) +
      '/DispForm.aspx?ID=' + encodeURIComponent(page.Id);
  }
  try {
    await navigator.clipboard.writeText(url);
    toast('リンクをコピーしました');
  } catch {
    toast('コピー失敗', 'err');
  }
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
  const blockCount = ed.querySelectorAll('p, h1, h2, h3, li, pre, blockquote, .memola-callout, .memola-todo, hr').length;
  toast(`📄 ${page.Title || '無題'}: ${charCount}文字 / 約${wordCount}語 / ${blockCount}ブロック`);
}
