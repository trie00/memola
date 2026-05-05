// Side-panel toggles wired in the top bar:
//   - Outline panel (#outline-btn / #memola-outline-x)
//   - Properties panel (#props-btn / #memola-props-x)
//   - Trash modal (#trash-btn / #trash-close + backdrop)
//   - Workspace switcher (#ws-btn + name in #ws-name)
//
// Each is independent — bundled here so the top-bar wiring stays
// readable in one place.

import { g } from './dom';
import { toggleOutline, applyOutlineState, attachOutlineWatcher } from './outline';
import { togglePropertiesPanel, applyPropertiesState } from './properties-panel';
import { openTrash, closeTrash } from './trash';
import { showWorkspaceMenu, getCurrentWorkspaceName } from './workspaces';

let _attached = false;

export function attachSidePanels(): void {
  if (_attached) return;
  _attached = true;

  // Outline panel
  g('outline-btn').addEventListener('click', toggleOutline);
  document.getElementById('memola-outline-x')?.addEventListener('click', () => {
    void import('./outline').then((m) => m.setOutlineOpen(false));
  });
  attachOutlineWatcher();
  applyOutlineState();

  // Properties panel
  g('props-btn').addEventListener('click', togglePropertiesPanel);
  document.getElementById('memola-props-x')?.addEventListener('click', () => {
    void import('./properties-panel').then((m) => m.setPropertiesOpen(false));
  });
  applyPropertiesState();

  // Trash modal
  g('trash-btn').addEventListener('click', openTrash);
  g('trash-close').addEventListener('click', closeTrash);
  g('trash-md').addEventListener('click', (e) => {
    if (e.target === g('trash-md')) closeTrash();
  });

  // Workspace switcher (name + dropdown)
  const wsName = getCurrentWorkspaceName();
  if (wsName) g('ws-name').textContent = wsName;
  g('ws-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    showWorkspaceMenu(g('ws-btn'));
  });
}
