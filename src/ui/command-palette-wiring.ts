// Command-palette action registration. The palette UI lives in
// search-ui.ts; this module just registers the global commands the
// user can run from `Cmd+K`.

import { setCommandActions } from './search-ui';
import { doNew } from './actions';
import { toggleAiPanel } from './ai-chat';
import { toggleOutline } from './outline';
import { togglePropertiesPanel } from './properties-panel';
import { toggleFocusMode } from './focus-mode';
import { openTrash } from './trash';

let _attached = false;

export function attachCommandPalette(opts: {
  /** DB-create entry — provided by wiring.ts because it depends on the
   *  workspace context that lives there. */
  doNewDb: (parentId: string) => void | Promise<void>;
}): void {
  if (_attached) return;
  _attached = true;

  setCommandActions([
    { id: 'new-page', label: '新しいページ',     icon: '＋', key: '⌘N',  run: () => { void doNew(''); } },
    { id: 'new-db',   label: '新しいDB',         icon: '🗂', key: '⌘⇧N', run: () => { void opts.doNewDb(''); } },
    { id: 'ai-ask',   label: 'AIに質問',          icon: '✦', key: '⌘⇧A', run: () => { toggleAiPanel(); } },
    { id: 'toc',      label: '目次パネルを切替',   icon: '☰', key: '⌘⇧L', run: () => { toggleOutline(); } },
    { id: 'props',    label: 'プロパティパネルを切替', icon: '▤', key: '⌘⇧R', run: () => { togglePropertiesPanel(); } },
    { id: 'focus',    label: '集中モード切替',    icon: '⛶',  key: '⌘⇧F', run: () => { toggleFocusMode(); } },
    { id: 'trash',    label: 'ゴミ箱を開く',       icon: '🗑', key: '',    run: () => { openTrash(); } },
    { id: 'settings', label: '設定',              icon: '⚙', key: '',    run: () => { document.getElementById('memola-settings-md')?.classList.add('on'); } },
  ]);
}
