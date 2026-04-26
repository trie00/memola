// Sidebar tree + breadcrumb rendering.

import { S, type Page } from '../state';
import { g } from './dom';
import { doSelect } from './views';
import { doNew, doDel } from './actions';
import { apiMovePage } from '../api/pages';
import { toast } from './ui-helpers';

export function kidsOf(pid: string): Page[] {
  return S.pages
    .filter((p) => (p.ParentId || '') === (pid || ''))
    .sort((a, b) => (a.Id < b.Id ? -1 : 1));
}

export function mkNode(page: Page, depth: number): HTMLDivElement {
  const isDb = page.Type === 'database';
  const kids = kidsOf(page.Id);
  const hasK = kids.length > 0;
  const exp = S.expanded.has(page.Id);
  const act = page.Id === S.currentId;
  const metaPage = S.meta.pages.find((p) => p.id === page.Id);
  const icon = metaPage && metaPage.icon ? metaPage.icon : (isDb ? '🗃' : '📄');

  const item = document.createElement('div');
  const row = document.createElement('div');
  row.className = 'n365-tr' + (act ? ' on' : '');
  row.style.paddingLeft = (depth * 16 + 6) + 'px';

  const tog = document.createElement('span');
  tog.className = 'n365-tog' + (hasK ? '' : ' lf') + (exp ? ' op' : '');
  tog.innerHTML = hasK ? '&#9658;' : '';
  tog.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!hasK) return;
    if (S.expanded.has(page.Id)) S.expanded.delete(page.Id); else S.expanded.add(page.Id);
    renderTree();
  });

  const icEl = document.createElement('span');
  icEl.className = 'n365-ti';
  icEl.textContent = icon;
  const lbl = document.createElement('span');
  lbl.className = 'n365-tl';
  lbl.textContent = page.Title || '無題';
  const acts = document.createElement('span');
  acts.className = 'n365-ta';

  if (!isDb) {
    const ab = document.createElement('button');
    ab.className = 'n365-tac';
    ab.title = '子ページを追加';
    ab.innerHTML = '+';
    ab.addEventListener('click', (e) => { e.stopPropagation(); doNew(page.Id); });
    acts.appendChild(ab);
  }
  const db = document.createElement('button');
  db.className = 'n365-tac';
  db.title = '削除';
  db.innerHTML = '🗑';
  db.addEventListener('click', (e) => { e.stopPropagation(); doDel(page.Id); });
  acts.appendChild(db);
  row.append(tog, icEl, lbl, acts);
  row.addEventListener('click', () => { doSelect(page.Id); });

  // Drag & drop: move page to another parent
  row.draggable = true;
  row.dataset.pageId = page.Id;
  row.addEventListener('dragstart', (e) => {
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', page.Id);
    }
    row.classList.add('n365-tr-dragging');
  });
  row.addEventListener('dragend', () => row.classList.remove('n365-tr-dragging'));
  row.addEventListener('dragover', (e) => {
    e.preventDefault();
    row.classList.add('n365-tr-dropover');
  });
  row.addEventListener('dragleave', () => row.classList.remove('n365-tr-dropover'));
  row.addEventListener('drop', async (e) => {
    e.preventDefault();
    row.classList.remove('n365-tr-dropover');
    const dragId = e.dataTransfer?.getData('text/plain');
    if (!dragId || dragId === page.Id) return;
    try {
      await apiMovePage(dragId, page.Id);
      S.expanded.add(page.Id);
      renderTree();
      toast('移動しました');
    } catch (err) { toast('移動失敗: ' + (err as Error).message, 'err'); }
  });

  item.appendChild(row);

  if (hasK && exp) {
    const sub = document.createElement('div');
    kids.forEach((c) => { sub.appendChild(mkNode(c, depth + 1)); });
    item.appendChild(sub);
  }
  return item;
}

export function renderTree(): void {
  const w = g('tree');
  w.innerHTML = '';
  kidsOf('').forEach((p) => { w.appendChild(mkNode(p, 0)); });

  // Allow dropping onto the root area to make a page top-level
  w.ondragover = (e) => { e.preventDefault(); };
  w.ondrop = async (e) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.closest('.n365-tr')) return;     // handled per-row
    const dragId = e.dataTransfer?.getData('text/plain');
    if (!dragId) return;
    try {
      await apiMovePage(dragId, '');
      renderTree();
      toast('ルートに移動しました');
    } catch (err) { toast('移動失敗: ' + (err as Error).message, 'err'); }
  };
}

export function ancs(id: string): Page[] {
  const map: Record<string, Page> = {};
  const path: Page[] = [];
  S.pages.forEach((p) => { map[p.Id] = p; });
  let cur: string | undefined = id;
  while (cur) {
    const p: Page | undefined = map[cur];
    if (!p) break;
    path.unshift(p);
    cur = p.ParentId || '';
  }
  return path;
}

export function renderBc(id: string): void {
  const bc = g('bc');
  bc.innerHTML = '';
  const ancestors = ancs(id);
  ancestors.forEach((p, i) => {
    const s = document.createElement('span');
    s.className = 'n365-bi';
    s.textContent = p.Title || '無題';
    s.addEventListener('click', () => { doSelect(p.Id); });
    bc.appendChild(s);
    if (i < ancestors.length - 1) {
      const sep = document.createElement('span');
      sep.textContent = '/';
      sep.style.color = '#e9e9e7';
      bc.appendChild(sep);
    }
  });
}
