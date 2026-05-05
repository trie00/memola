// 「＋ 新規」 quick-add popover anchored below the sidebar's primary
// create button. Picks new page / new DB / template chips, then routes
// to the corresponding create action.
//
// Self-contained: all state lives in the DOM (the popover's `on`
// class). Idempotent attachAll guard via a body dataset flag so a
// re-mount doesn't pile up listeners.

import { doNew } from './actions';

let _attached = false;

export function attachCreateMenu(doNewDb: (parentId: string) => Promise<void>): void {
  if (_attached) return;
  _attached = true;

  const quickAddBtn = document.getElementById('memola-quick-add');
  const createMenu = document.getElementById('memola-create-menu');
  if (!quickAddBtn || !createMenu) return;

  quickAddBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const rect = quickAddBtn.getBoundingClientRect();
    createMenu.style.left = rect.left + 'px';
    createMenu.style.top = (rect.bottom + 4) + 'px';
    createMenu.classList.toggle('on');
  });

  createMenu.addEventListener('click', (e) => {
    const item = (e.target as HTMLElement).closest<HTMLElement>('.memola-cm-item');
    if (!item) return;
    createMenu.classList.remove('on');
    switch (item.dataset.cm) {
      case 'new-page':
      case 'tpl-weekly':
      case 'tpl-minutes':
        void doNew('');
        break;
      case 'new-db':
      case 'tpl-tasks':
        void doNewDb('');
        break;
    }
  });

  // Outside-click dismissal
  document.addEventListener('click', (e) => {
    if (!createMenu.classList.contains('on')) return;
    const t = e.target as Node;
    if (createMenu.contains(t) || quickAddBtn.contains(t)) return;
    createMenu.classList.remove('on');
  });
}
