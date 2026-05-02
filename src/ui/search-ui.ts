// Quick search overlay — local title search across pages/DBs + action palette.
//
// Body (full-text) search is intentionally not provided: the previous SP-Search
// path indexed markdown files in a document library, but pages now live as rows
// in the n365-pages list. Searching list bodies via SP REST is left as future
// work; until then this overlay is title + action only.

import { S, type Page } from '../state';
import { g } from './dom';
import { ancs } from './tree';
import { doSelect } from './views';
import { escHtml } from '../lib/search-utils';

interface CmdAction { id: string; label: string; icon: string; key: string; run: () => void; }

let _qsSel = 0;
let _qsItems: Array<{ kind: 'page' | 'action'; page?: Page; action?: CmdAction }> = [];
let _qsTitleItems: Page[] = [];
let _qsDbItems: Page[] = [];
let _qsActions: CmdAction[] = [];

export function setCommandActions(actions: CmdAction[]): void {
  _qsActions = actions;
}

export function openSearch(): void {
  g('qs').classList.add('on');
  (g('qs-inp') as HTMLInputElement).value = '';
  _qsSel = 0;
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
    if (!q) return true;
    return (p.Title || '').toLowerCase().includes(q.toLowerCase());
  });
  _qsTitleItems = matchedPages.filter((p) => p.Type !== 'database').slice(0, 15);
  _qsDbItems = matchedPages.filter((p) => p.Type === 'database').slice(0, 8);
  rebuildQsDom();
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
    hd.className = 'n365-qs-section';
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
    hd.className = 'n365-qs-section';
    hd.textContent = 'DB';
    res.appendChild(hd);
    _qsDbItems.forEach((p) => {
      _qsItems.push({ kind: 'page', page: p });
      res.appendChild(buildQsPageItem(p, _qsItems.length - 1));
    });
  }

  // ── アクション ──
  const actionQuery = isActionMode ? ql.slice(1).trim() : ql;
  const matchingActions = _qsActions.filter((a) =>
    !actionQuery || a.label.toLowerCase().includes(actionQuery),
  );
  if (matchingActions.length > 0) {
    const hd = document.createElement('div');
    hd.className = 'n365-qs-section';
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
    hd.className = 'n365-qs-section';
    hd.textContent = 'ヘルプ';
    res.appendChild(hd);
    const helpAction: CmdAction = {
      id: 'help-shortcuts', label: 'キーボードショートカット', icon: '?', key: '',
      run: () => { /* TODO open shortcuts modal */ },
    };
    _qsItems.push({ kind: 'action', action: helpAction });
    res.appendChild(buildQsActionItem(helpAction, _qsItems.length - 1));
  }

  if (_qsItems.length === 0) {
    res.innerHTML = '<div class="n365-qs-empty">見つかりませんでした</div>';
  }

  if (_qsSel >= _qsItems.length) _qsSel = 0;
}

export function buildQsPageItem(p: Page, idx: number): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'n365-qs-item' + (idx === _qsSel ? ' sel' : '');
  const isDb = p.Type === 'database';
  const pathStr = getPagePath(p.Id);
  div.innerHTML =
    '<span class="n365-qs-ic">' + (isDb ? '🗃' : '📄') + '</span>' +
    '<div style="flex:1;min-width:0">' +
      '<div class="n365-qs-title">' + escHtml(p.Title || '無題') + '</div>' +
      (pathStr ? '<div class="n365-qs-path">' + escHtml(pathStr) + '</div>' : '') +
    '</div>';
  div.addEventListener('click', () => {
    closeSearch();
    doSelect(p.Id);
  });
  return div;
}

export function buildQsActionItem(a: CmdAction, idx: number): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'n365-qs-item' + (idx === _qsSel ? ' sel' : '');
  div.innerHTML =
    '<span class="n365-qs-ic">' + escHtml(a.icon) + '</span>' +
    '<div style="flex:1;min-width:0">' +
      '<div class="n365-qs-title">' + escHtml(a.label) + '</div>' +
    '</div>' +
    (a.key ? '<span class="n365-qs-kbd">' + escHtml(a.key) + '</span>' : '');
  div.addEventListener('click', () => {
    closeSearch();
    a.run();
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
  const item = _qsItems[_qsSel];
  if (!item) return;
  if (item.kind === 'page' && item.page) {
    closeSearch();
    doSelect(item.page.Id);
  } else if (item.kind === 'action' && item.action) {
    closeSearch();
    item.action.run();
  }
}

export function resetQsSel(): void {
  _qsSel = 0;
}
