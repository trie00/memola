// "公開中" status tag in the top bar.
//
// Visibility: shown only for real, currently-published pages (PageType='page',
// not a DB row, S.meta.pages[i].published === true).
// State:
//   - in sync     → label "公開中"           (subdued)
//   - dirty       → label "公開中 ●未反映"   (accent color)
// Click opens a small popover offering "今すぐ同期 / 公開ページを開く / 閉じる".
//
// Sync is explicit (no auto-resync on save). Save merely sets PublishedDirty=1
// in api/pages.ts; we mirror that here.

import { S } from '../state';
import { g, getEd } from './dom';
import { toast } from './ui-helpers';

let _outsideHandler: ((e: MouseEvent) => void) | null = null;

/** Reflect current page's publish state on the tag button.
 *  Hides the tag (and any open popover) when the active context isn't a
 *  publishable page. */
export function syncPubTag(): void {
  const tag = document.getElementById('n365-pub-tag');
  if (!tag) return;
  const labelEl = tag.querySelector<HTMLElement>('.n365-pub-tag-label');
  const isRealPage = !!S.currentId && S.currentType === 'page' && !S.currentRow;
  const meta = isRealPage && S.currentId
    ? S.meta.pages.find((p) => p.id === S.currentId)
    : null;
  if (!meta?.published) {
    tag.style.display = 'none';
    closePubPop();
    return;
  }
  tag.style.display = '';
  if (meta.publishedDirty) {
    tag.classList.add('dirty');
    if (labelEl) labelEl.textContent = '公開中・未反映';
    tag.title = 'n365 側に未反映の更新があります — クリックで操作メニュー';
  } else {
    tag.classList.remove('dirty');
    if (labelEl) labelEl.textContent = '公開中';
    tag.title = '公開ページと同期しています — クリックで操作メニュー';
  }
}

function openPubPop(): void {
  const pop = document.getElementById('n365-pub-pop');
  const tag = document.getElementById('n365-pub-tag');
  if (!pop || !tag) return;
  if (!S.currentId) return;
  const meta = S.meta.pages.find((p) => p.id === S.currentId);
  if (!meta?.published) return;
  const msg = pop.querySelector<HTMLElement>('.n365-pub-pop-msg');
  if (msg) {
    msg.textContent = meta.publishedDirty
      ? 'n365 の最新内容が公開ページに反映されていません。'
      : '公開ページは最新の内容と同期しています。';
  }
  // Position popover under the tag.
  const r = tag.getBoundingClientRect();
  pop.style.top = (r.bottom + 6) + 'px';
  pop.style.right = (window.innerWidth - r.right) + 'px';
  pop.style.display = '';
  // Disable the sync button when not dirty? No — allow forced re-sync any time.
  if (!_outsideHandler) {
    _outsideHandler = (e: MouseEvent) => {
      const t = e.target as Node | null;
      if (!t) return;
      if (pop.contains(t) || tag.contains(t)) return;
      closePubPop();
    };
    document.addEventListener('mousedown', _outsideHandler, true);
  }
}

function closePubPop(): void {
  const pop = document.getElementById('n365-pub-pop');
  if (pop) pop.style.display = 'none';
  if (_outsideHandler) {
    document.removeEventListener('mousedown', _outsideHandler, true);
    _outsideHandler = null;
  }
}

async function runSync(): Promise<void> {
  const id = S.currentId;
  if (!id) return;
  const meta = S.meta.pages.find((p) => p.id === id);
  if (!meta?.published) return;
  // Persist any in-flight edits to n365-pages first. Without this we'd push
  // the editor buffer to the Site Page while the source row still has the
  // pre-edit body — a subsequent reload would lose the synced content.
  if (S.dirty) {
    const { doSave } = await import('./actions');
    await doSave();
  }
  const tag = document.getElementById('n365-pub-tag');
  const titleEl = g('ttl') as HTMLTextAreaElement | null;
  const ed = getEd();
  const title = (titleEl?.value || '').trim() || '無題';
  const { htmlToMd } = await import('../lib/markdown');
  const bodyMd = htmlToMd(ed.innerHTML || '');
  const labelEl = tag?.querySelector<HTMLElement>('.n365-pub-tag-label');
  const prevLabel = labelEl?.textContent || '';
  if (tag) tag.classList.add('busy');
  if (labelEl) labelEl.textContent = '同期中…';
  try {
    const m = await import('../api/publish');
    await m.syncPublishedPage(id, title, bodyMd);
    toast('公開ページを同期しました');
  } catch (e) {
    toast('同期失敗: ' + (e as Error).message, 'err');
    if (labelEl && prevLabel) labelEl.textContent = prevLabel;
  } finally {
    if (tag) tag.classList.remove('busy');
    syncPubTag();
  }
}

function openPublishedPage(): void {
  const id = S.currentId;
  if (!id) return;
  const meta = S.meta.pages.find((p) => p.id === id);
  const url = meta?.publishedUrl || '';
  if (!url) { toast('URL が見つかりません', 'err'); return; }
  window.open(url, '_blank', 'noopener');
}

async function copyPublishedUrl(): Promise<void> {
  const id = S.currentId;
  if (!id) return;
  const meta = S.meta.pages.find((p) => p.id === id);
  const url = meta?.publishedUrl || '';
  if (!url) { toast('URL が見つかりません', 'err'); return; }
  try { await navigator.clipboard.writeText(url); toast('URL をコピーしました'); }
  catch { toast('コピー失敗', 'err'); }
}

async function unpublishHere(): Promise<void> {
  const id = S.currentId;
  if (!id) return;
  if (!confirm('Web 公開を解除します。SP 上の公開ページ（Site Page）も削除されます。よろしいですか？')) return;
  try {
    const m = await import('../api/publish');
    await m.unpublishPage(id);
    toast('公開を解除しました');
  } catch (e) {
    toast('解除失敗: ' + (e as Error).message, 'err');
  } finally {
    syncPubTag();
  }
}

/** Wire click handlers — call once at startup. */
export function attachPubTag(): void {
  const tag = document.getElementById('n365-pub-tag');
  const pop = document.getElementById('n365-pub-pop');
  if (!tag || !pop) return;
  tag.addEventListener('click', (e) => {
    e.stopPropagation();
    if (pop.style.display === 'none') openPubPop();
    else closePubPop();
  });
  pop.addEventListener('click', async (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-pub-act]');
    if (!btn) return;
    const act = btn.dataset.pubAct;
    closePubPop();
    if (act === 'sync')           await runSync();
    else if (act === 'open')      openPublishedPage();
    else if (act === 'copy')      await copyPublishedUrl();
    else if (act === 'unpublish') await unpublishHere();
    // 'close' → already handled by closePubPop above
  });
}
