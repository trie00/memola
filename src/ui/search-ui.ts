// Quick search overlay: title (local) + body (SP Search) results.

import { S, type Page } from '../state';
import { g } from './dom';
import { ancs } from './tree';
import { doSelect } from './views';
import { spSearch } from '../api/search';
import { escHtml, renderSnippet, pageFromSPPath as pageFromSPPathPure } from '../lib/search-utils';

let _qsSel = 0;
let _qsItems: Array<{ page: Page; summary: string }> = [];
let _qsTitleItems: Page[] = [];
let _qsBodyItems: Array<{ page: Page; summary: string }> = [];
let _qsBodyLoading = false;
let _qsToken = 0;

export function openSearch(): void {
  g('qs').classList.add('on');
  (g('qs-inp') as HTMLInputElement).value = '';
  _qsSel = 0;
  renderQs('');
  g('qs-inp').focus();
}

export function closeSearch(): void {
  g('qs').classList.remove('on');
  _qsToken++;
}

export function getPagePath(id: string): string {
  const ancestors = ancs(id);
  return ancestors.map((p) => p.Title || '無題').join(' / ');
}

export function pageFromSPPath(spPath: string): Page | null {
  return pageFromSPPathPure(spPath, S.meta, S.pages);
}

export function renderQs(q: string): void {
  // Title search (instant, local)
  _qsTitleItems = S.pages.filter((p) => {
    if (!q) return true;
    return (p.Title || '').toLowerCase().includes(q.toLowerCase());
  }).slice(0, 20);

  _qsBodyItems = [];
  _qsBodyLoading = false;

  // Body search (debounced, async via SP Search)
  if (q && q.trim().length >= 2) {
    _qsBodyLoading = true;
    const token = ++_qsToken;
    setTimeout(() => {
      if (token !== _qsToken) return;
      spSearch(q).then((hits) => {
        if (token !== _qsToken) return;
        const seen: Record<string, boolean> = {};
        _qsTitleItems.forEach((p) => { seen[p.Id] = true; });
        _qsBodyItems = hits.map((h) => {
          const p = pageFromSPPath(h.path);
          if (!p || seen[p.Id]) return null;
          return { page: p, summary: h.summary };
        }).filter((x): x is { page: Page; summary: string } => x !== null);
        _qsBodyLoading = false;
        rebuildQsDom();
      }).catch(() => {
        _qsBodyLoading = false;
        rebuildQsDom();
      });
    }, 300);
  } else {
    _qsToken++;
  }

  rebuildQsDom();
}

export function rebuildQsDom(): void {
  const res = g('qs-res');
  res.innerHTML = '';
  _qsItems = [];
  const q = (g('qs-inp') as HTMLInputElement).value || '';

  if (_qsTitleItems.length > 0) {
    const hd1 = document.createElement('div');
    hd1.className = 'n365-qs-section';
    hd1.textContent = q.trim() ? 'タイトル' : '最近のページ';
    res.appendChild(hd1);
    _qsTitleItems.forEach((p) => {
      _qsItems.push({ page: p, summary: '' });
      res.appendChild(buildQsItem(p, '', _qsItems.length - 1));
    });
  }

  if (_qsBodyItems.length > 0) {
    const hd2 = document.createElement('div');
    hd2.className = 'n365-qs-section';
    hd2.textContent = '本文';
    res.appendChild(hd2);
    _qsBodyItems.forEach((item) => {
      _qsItems.push({ page: item.page, summary: item.summary });
      res.appendChild(buildQsItem(item.page, item.summary, _qsItems.length - 1));
    });
  } else if (_qsBodyLoading) {
    const ld = document.createElement('div');
    ld.className = 'n365-qs-loading';
    ld.textContent = '🔍 本文を検索中...';
    res.appendChild(ld);
  }

  if (_qsItems.length === 0 && !_qsBodyLoading) {
    res.innerHTML = '<div class="n365-qs-empty">見つかりませんでした</div>';
  }

  if (_qsSel >= _qsItems.length) _qsSel = 0;
}

export function buildQsItem(p: Page, summary: string, idx: number): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'n365-qs-item' + (idx === _qsSel ? ' sel' : '');
  const isDb = p.Type === 'database';
  const pathStr = getPagePath(p.Id);
  div.innerHTML =
    '<span class="n365-qs-ic">' + (isDb ? '🗃' : '📄') + '</span>' +
    '<div style="flex:1;min-width:0">' +
      '<div class="n365-qs-title">' + escHtml(p.Title || '無題') + '</div>' +
      (pathStr ? '<div class="n365-qs-path">' + escHtml(pathStr) + '</div>' : '') +
      (summary ? '<div class="n365-qs-snippet">' + renderSnippet(summary) + '</div>' : '') +
    '</div>';
  div.addEventListener('click', () => {
    closeSearch();
    doSelect(p.Id);
  });
  return div;
}

export function qsMove(dir: number): void {
  if (_qsItems.length === 0) return;
  _qsSel = (_qsSel + dir + _qsItems.length) % _qsItems.length;
  const nodes = g('qs-res').querySelectorAll<HTMLElement>('.n365-qs-item');
  nodes.forEach((it, i) => { it.classList.toggle('sel', i === _qsSel); });
  if (nodes[_qsSel]) nodes[_qsSel].scrollIntoView({ block: 'nearest' });
}

export function qsConfirm(): void {
  if (_qsItems[_qsSel]) {
    closeSearch();
    doSelect(_qsItems[_qsSel].page.Id);
  }
}

export function resetQsSel(): void {
  _qsSel = 0;
}
