// Quick search overlay — title search across pages/DBs + action palette +
// SharePoint-Search-backed full-text (本文/DB行の値) search.
//
// タイトル一致は即時(ローカル)。全文は SP Search API を非同期(デバウンス)で叩き、
// ヒットが返ったら「全文検索」セクションを下に追加する。

import { S, type Page } from '../state';
import { g } from './dom';
import { ancs } from './tree';
import { doSelect } from './views';
import { escHtml } from '../lib/search-utils';
import { metaById } from '../lib/page-store';
import type { SearchHit } from '../api/search';

interface CmdAction { id: string; label: string; icon: string; key: string; run: () => void; }

let _qsSel = 0;
let _qsItems: Array<{ kind: 'page' | 'action' | 'ft'; page?: Page; action?: CmdAction; hit?: SearchHit }> = [];
let _qsTitleItems: Page[] = [];
let _qsDbItems: Page[] = [];
let _qsActions: CmdAction[] = [];
let _qsFtItems: SearchHit[] = [];     // 全文検索ヒット(非同期で更新)
let _ftTimer: ReturnType<typeof setTimeout> | null = null;
let _ftSeq = 0;                       // 古い検索結果を無視するための世代

export function setCommandActions(actions: CmdAction[]): void {
  _qsActions = actions;
}

export function openSearch(): void {
  g('qs').classList.add('on');
  (g('qs-inp') as HTMLInputElement).value = '';
  _qsSel = 0;
  _qsFtItems = [];
  renderQs('');
  g('qs-inp').focus();
}

export function closeSearch(): void {
  g('qs').classList.remove('on');
}

export function getPagePath(id: string): string {
  const ancestors = ancs(id);
  return ancestors.map((p) => p.Title || '無題').join(' / ');
}

export function renderQs(q: string): void {
  const matchedPages = S.pages.filter((p) => {
    if (p.IsDraft) return false;     // drafts surface only in 「📝 下書き」
    if (metaById(p.Id)?.isTemplate) return false;   // templates: 「＋新規→テンプレートから」 only
    if (!q) return true;
    return (p.Title || '').toLowerCase().includes(q.toLowerCase());
  });
  _qsTitleItems = matchedPages.filter((p) => p.Type !== 'database').slice(0, 15);
  _qsDbItems = matchedPages.filter((p) => p.Type === 'database').slice(0, 8);
  rebuildQsDom();
  scheduleFullText(q);
}

/** SP Search による全文検索をデバウンス実行。結果が返ったら(入力が変わって
 *  いなければ)全文検索セクションを追加して再描画する。 */
function scheduleFullText(q: string): void {
  if (_ftTimer) { clearTimeout(_ftTimer); _ftTimer = null; }
  const query = q.trim();
  // アクションモード(>)や短すぎるクエリは全文検索しない。
  if (query.startsWith('>') || query.length < 2) { _qsFtItems = []; return; }
  const seq = ++_ftSeq;
  _ftTimer = setTimeout(() => {
    void import('../api/search').then(async (m) => {
      const hits = await m.spSearch(query, 20).catch(() => [] as SearchHit[]);
      if (seq !== _ftSeq) return;                       // 入力が変わった → 破棄
      if ((g('qs-inp') as HTMLInputElement).value.trim() !== query) return;
      _qsFtItems = hits;
      rebuildQsDom();
    });
  }, 350);
}

export function rebuildQsDom(): void {
  const res = g('qs-res');
  res.innerHTML = '';
  _qsItems = [];
  const q = (g('qs-inp') as HTMLInputElement).value || '';
  const ql = q.trim().toLowerCase();
  const isActionMode = q.startsWith('>');

  // ── ページセクション ──
  if (!isActionMode && _qsTitleItems.length > 0) {
    const hd = document.createElement('div');
    hd.className = 'memola-qs-section';
    hd.textContent = ql ? 'ページ' : '最近のページ';
    res.appendChild(hd);
    _qsTitleItems.forEach((p) => {
      _qsItems.push({ kind: 'page', page: p });
      res.appendChild(buildQsPageItem(p, _qsItems.length - 1));
    });
  }

  // ── DBセクション ──
  if (!isActionMode && _qsDbItems.length > 0) {
    const hd = document.createElement('div');
    hd.className = 'memola-qs-section';
    hd.textContent = 'DB';
    res.appendChild(hd);
    _qsDbItems.forEach((p) => {
      _qsItems.push({ kind: 'page', page: p });
      res.appendChild(buildQsPageItem(p, _qsItems.length - 1));
    });
  }

  // ── 全文検索(SP Search) ──
  if (!isActionMode && _qsFtItems.length > 0) {
    const hd = document.createElement('div');
    hd.className = 'memola-qs-section';
    hd.textContent = '全文検索';
    res.appendChild(hd);
    _qsFtItems.forEach((h) => {
      _qsItems.push({ kind: 'ft', hit: h });
      res.appendChild(buildQsFtItem(h, _qsItems.length - 1));
    });
  }

  // ── アクション ──
  const actionQuery = isActionMode ? ql.slice(1).trim() : ql;
  const matchingActions = _qsActions.filter((a) =>
    !actionQuery || a.label.toLowerCase().includes(actionQuery),
  );
  if (matchingActions.length > 0) {
    const hd = document.createElement('div');
    hd.className = 'memola-qs-section';
    hd.textContent = 'アクション';
    res.appendChild(hd);
    matchingActions.forEach((a) => {
      _qsItems.push({ kind: 'action', action: a });
      res.appendChild(buildQsActionItem(a, _qsItems.length - 1));
    });
  }

  // ── ヘルプ ──
  if (!isActionMode && !ql) {
    const hd = document.createElement('div');
    hd.className = 'memola-qs-section';
    hd.textContent = 'ヘルプ';
    res.appendChild(hd);
    const helpAction: CmdAction = {
      id: 'help-shortcuts', label: 'キーボードショートカット', icon: '?', key: '',
      run: () => {
        // Lazy import — keeps shortcuts-modal out of search-ui's dependency
        // graph (it's only loaded when this action fires).
        void import('./shortcuts-modal').then((m) => m.openShortcutsModal());
      },
    };
    _qsItems.push({ kind: 'action', action: helpAction });
    res.appendChild(buildQsActionItem(helpAction, _qsItems.length - 1));
  }

  if (_qsItems.length === 0) {
    res.innerHTML = '<div class="memola-qs-empty">見つかりませんでした</div>';
  }

  if (_qsSel >= _qsItems.length) _qsSel = 0;
}

export function buildQsPageItem(p: Page, idx: number): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'memola-qs-item' + (idx === _qsSel ? ' sel' : '');
  const isDb = p.Type === 'database';
  const pathStr = getPagePath(p.Id);
  div.innerHTML =
    '<span class="memola-qs-ic">' + (isDb ? '🗃' : '📄') + '</span>' +
    '<div style="flex:1;min-width:0">' +
      '<div class="memola-qs-title">' + escHtml(p.Title || '無題') + '</div>' +
      (pathStr ? '<div class="memola-qs-path">' + escHtml(pathStr) + '</div>' : '') +
    '</div>';
  div.addEventListener('click', () => {
    closeSearch();
    doSelect(p.Id);
  });
  return div;
}

/** HitHighlightedSummary(<c0>…</c0> / <ddd/>)を安全な HTML に変換。
 *  マーカーをプレースホルダに退避→HTMLエスケープ→<mark>/…へ復元。 */
function formatSnippet(summary: string): string {
  const tmp = (summary || '')
    .replace(/<c\d+>/g, '').replace(/<\/c\d+>/g, '')
    .replace(/<ddd\s*\/?>/g, '');
  return escHtml(tmp)
    .replace(//g, '<mark>').replace(//g, '</mark>')
    .replace(//g, '…');
}

export function buildQsFtItem(h: SearchHit, idx: number): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'memola-qs-item' + (idx === _qsSel ? ' sel' : '');
  div.innerHTML =
    '<span class="memola-qs-ic">🔎</span>' +
    '<div style="flex:1;min-width:0">' +
      '<div class="memola-qs-title">' + escHtml(h.title || '無題') + '</div>' +
      (h.summary ? '<div class="memola-qs-snippet">' + formatSnippet(h.summary) + '</div>' : '') +
    '</div>';
  div.addEventListener('click', () => { closeSearch(); void openSearchHit(h); });
  return div;
}

/** 全文検索ヒット(listId, itemId)を memola のページ/行に解決して開く。 */
async function openSearchHit(h: SearchHit): Promise<void> {
  try {
    const { resolveListTitleById, getListItemById } = await import('../api/sp-list');
    const { mintPageId } = await import('../api/pages');
    const listTitle = await resolveListTitleById(h.listId).catch(() => '');
    if (!listTitle) { toastMiss(); return; }
    // ページ系リスト(memola-pages / memola-user-*-pages)→ 通常ページ。
    if (listTitle === 'memola-pages' || /^memola-user-\d+-pages$/.test(listTitle)) {
      doSelect(mintPageId(listTitle, h.itemId));
      return;
    }
    // それ以外は DB リスト → 行ページ。親DBページを探して openRowAsPage。
    const dbPage = S.pages.find((p) => p.Type === 'database' && metaById(p.Id)?.list === listTitle);
    if (!dbPage) { toastMiss(); return; }
    const item = await getListItemById(listTitle, h.itemId);
    if (!item) { toastMiss(); return; }
    const { openRowAsPage } = await import('./row-page');
    await openRowAsPage(dbPage.Id, item);
  } catch { toastMiss(); }
}

function toastMiss(): void {
  void import('./ui-helpers').then((m) => m.toast('対象を開けませんでした(削除/権限の可能性)', 'err'));
}

export function buildQsActionItem(a: CmdAction, idx: number): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'memola-qs-item' + (idx === _qsSel ? ' sel' : '');
  div.innerHTML =
    '<span class="memola-qs-ic">' + escHtml(a.icon) + '</span>' +
    '<div style="flex:1;min-width:0">' +
      '<div class="memola-qs-title">' + escHtml(a.label) + '</div>' +
    '</div>' +
    (a.key ? '<span class="memola-qs-kbd">' + escHtml(a.key) + '</span>' : '');
  div.addEventListener('click', () => {
    closeSearch();
    a.run();
  });
  return div;
}

export function qsMove(dir: number): void {
  if (_qsItems.length === 0) return;
  _qsSel = (_qsSel + dir + _qsItems.length) % _qsItems.length;
  const nodes = g('qs-res').querySelectorAll<HTMLElement>('.memola-qs-item');
  nodes.forEach((it, i) => { it.classList.toggle('sel', i === _qsSel); });
  if (nodes[_qsSel]) nodes[_qsSel].scrollIntoView({ block: 'nearest' });
}

export function qsConfirm(): void {
  const item = _qsItems[_qsSel];
  if (!item) return;
  if (item.kind === 'page' && item.page) {
    closeSearch();
    doSelect(item.page.Id);
  } else if (item.kind === 'ft' && item.hit) {
    closeSearch();
    void openSearchHit(item.hit);
  } else if (item.kind === 'action' && item.action) {
    closeSearch();
    item.action.run();
  }
}

export function resetQsSel(): void {
  _qsSel = 0;
}
