// Right-positioned (in DOM, but we'll render as a floating panel) outline
// listing the current page's headings (H1/H2/H3). Click to scroll.

import { S } from '../state';
import { g, getEd } from './dom';

const PANEL_KEY = 'n365.outline.open';

export function isOutlineOpen(): boolean {
  return localStorage.getItem(PANEL_KEY) === '1';
}

export function setOutlineOpen(open: boolean): void {
  if (open) localStorage.setItem(PANEL_KEY, '1');
  else localStorage.removeItem(PANEL_KEY);
  applyOutlineState();
}

export function toggleOutline(): void { setOutlineOpen(!isOutlineOpen()); }

export function applyOutlineState(): void {
  const panel = g('outline');
  const btn = document.getElementById('n365-outline-btn');
  const isPage = S.currentType === 'page' && !!S.currentId;
  // Outline isn't meaningful for DB views — hide the topbar toggle entirely.
  if (btn) btn.style.display = isPage ? '' : 'none';
  if (isOutlineOpen() && isPage) {
    panel.classList.add('on');
    btn?.classList.add('on');
    renderOutline();
  } else {
    panel.classList.remove('on');
    btn?.classList.remove('on');
  }
}

export function renderOutline(): void {
  if (!isOutlineOpen() || S.currentType !== 'page') return;
  const list = g('outline-list');
  list.innerHTML = '';
  const ed = getEd();
  const headings = ed.querySelectorAll('h1, h2, h3');
  if (headings.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'n365-outline-empty';
    empty.textContent = '見出しがありません';
    list.appendChild(empty);
    return;
  }
  headings.forEach((h, idx) => {
    const id = 'n365-outline-h-' + idx;
    h.setAttribute('data-outline-id', id);
    const item = document.createElement('div');
    item.className = 'n365-outline-item n365-outline-' + h.tagName.toLowerCase();
    item.textContent = (h.textContent || '').trim() || '(無題)';
    item.addEventListener('click', () => {
      h.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    list.appendChild(item);
  });
}

// Re-render when editor content changes
export function attachOutlineWatcher(): void {
  const ed = getEd();
  let timer: ReturnType<typeof setTimeout> | null = null;
  const observer = new MutationObserver(() => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => renderOutline(), 300);
  });
  observer.observe(ed, { childList: true, subtree: true, characterData: true });
}
