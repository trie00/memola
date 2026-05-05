// Quick-search popover wiring — top-bar 🔍 button, the input field's
// arrow-key navigation, and Enter/Esc handling.
//
// The actual popover rendering lives in ./search-ui.ts; this file just
// hooks the DOM listeners up.

import { g } from './dom';
import {
  openSearch, closeSearch, renderQs, qsMove, qsConfirm, resetQsSel,
} from './search-ui';

let _attached = false;

export function attachQuickSearch(): void {
  if (_attached) return;
  _attached = true;

  g('search-nav').addEventListener('click', openSearch);
  g('qs').addEventListener('click', (e) => {
    if (e.target === g('qs')) closeSearch();
  });
  g('qs-inp').addEventListener('input', () => {
    resetQsSel();
    renderQs((g('qs-inp') as HTMLInputElement).value);
  });
  g('qs-inp').addEventListener('keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.isComposing || ke.keyCode === 229) return;
    if (ke.key === 'ArrowDown') { e.preventDefault(); qsMove(1); }
    if (ke.key === 'ArrowUp')   { e.preventDefault(); qsMove(-1); }
    if (ke.key === 'Enter')     { e.preventDefault(); qsConfirm(); }
    if (ke.key === 'Escape')    { closeSearch(); }
  });
}
