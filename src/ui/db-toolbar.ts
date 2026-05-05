// DB grid toolbar wiring — view-switcher buttons (table / board / list /
// gallery / calendar / gantt), CSV import/export, "新規行" button,
// group placeholder, and the filter-popover trigger.

import { g } from './dom';
import { toast } from './ui-helpers';
import { renderKanban } from './views';
import { exportCsv, importCsv } from './csv-io';
import { doNewDbRow } from './actions';

let _attached = false;

function setDbView(name: string): void {
  const buttons = ['dbv-table', 'dbv-board', 'dbv-list', 'dbv-gallery', 'dbv-calendar', 'dbv-gantt'];
  buttons.forEach((id) => g(id).classList.toggle('on', id === 'dbv-' + name));
  g('dt-wrap').style.display = name === 'table' ? '' : 'none';
  g('dadd').style.display = name === 'table' ? '' : 'none';
  g('kb').classList.toggle('on', name === 'board');
  ['list', 'gallery', 'calendar', 'gantt'].forEach((v) => {
    g(v + '-view').classList.toggle('on', name === v);
  });
  if (name === 'board') renderKanban();
  else if (['list', 'gallery', 'calendar', 'gantt'].includes(name)) {
    void import('./db-views-extra').then((m) => m.renderActiveView(name));
  }
}

export function attachDbToolbar(): void {
  if (_attached) return;
  _attached = true;

  g('db-csv-export').addEventListener('click', exportCsv);
  g('db-csv-import').addEventListener('click', importCsv);
  document.getElementById('memola-db-new-row')?.addEventListener('click', doNewDbRow);
  document.getElementById('memola-db-group-btn')?.addEventListener('click', () => {
    toast('グループ機能は今後実装予定');
  });
  g('dbv-table').addEventListener('click', () => setDbView('table'));
  g('dbv-board').addEventListener('click', () => setDbView('board'));
  g('dbv-list').addEventListener('click', () => setDbView('list'));
  g('dbv-gallery').addEventListener('click', () => setDbView('gallery'));
  g('dbv-calendar').addEventListener('click', () => setDbView('calendar'));
  g('dbv-gantt').addEventListener('click', () => setDbView('gantt'));

  // Filter-field popover (the inline picker)
  g('db-filter-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    void import('./filter-ui').then((m) => m.showFilterPopover());
  });
  void import('./filter-ui').then((m) => m.attachFilterPopoverOutsideClick());
}
