// Sidebar visibility, navigation history buttons, daily-notes shortcuts,
// and the empty-state create chips. All listener registration that's
// scoped to the sidebar or empty-state goes here so wiring.ts can stay
// focused on cross-cutting concerns.

import { g } from './dom';
import { prefSidebarState } from '../lib/prefs';
import { doNew } from './actions';

let _attached = false;

function persistSidebarState(): void {
  const sb = g('sb');
  const state = sb.classList.contains('collapsed') ? 'collapsed' : 'expanded';
  prefSidebarState.set(state);
}

export function attachSidebarWiring(opts: {
  /** Daily-note opener — provided by wiring.ts because it depends on
   *  workspace context that lives there. */
  openTodayDailyNote: () => void | Promise<void>;
  /** Date-picker popover for arbitrary daily notes. */
  showDailyPicker: (anchor: HTMLElement) => void;
  /** DB-create entry (used by the empty-state DB chip + button). */
  doNewDb: (parentId: string) => void | Promise<void>;
}): void {
  if (_attached) return;
  _attached = true;

  // Sidebar toggle (top-bar button + in-sidebar × button)
  g('sb-toggle').addEventListener('click', () => {
    g('sb').classList.toggle('collapsed');
    persistSidebarState();
  });
  document.getElementById('memola-sb-collapse')?.addEventListener('click', () => {
    g('sb').classList.add('collapsed');
    persistSidebarState();
  });
  if (prefSidebarState.get() === 'collapsed') {
    g('sb').classList.add('collapsed');
  }

  // Browser-style back/forward through page-open history
  document.getElementById('memola-nav-back')?.addEventListener('click', () => {
    void import('./nav-history').then((m) => m.goBack());
  });
  document.getElementById('memola-nav-fwd')?.addEventListener('click', () => {
    void import('./nav-history').then((m) => m.goForward());
  });

  // Daily notes — sidebar entries between 「+ 新規」 and 「下書き / ゴミ箱」
  document.getElementById('memola-sb-daily-today')?.addEventListener('click', () => {
    void opts.openTodayDailyNote();
  });
  document.getElementById('memola-sb-daily-pick')?.addEventListener('click', (e) => {
    opts.showDailyPicker(e.currentTarget as HTMLElement);
  });

  // Empty-state CTAs
  g('ne').addEventListener('click', () => { void doNew(''); });
  g('ne-db').addEventListener('click', () => { void opts.doNewDb(''); });

  // Empty-state "テンプレ" button + chip-style starter shortcuts
  document.getElementById('memola-ne-tpl')?.addEventListener('click', () => {
    document.getElementById('memola-quick-add')?.click();
  });
  document.querySelectorAll<HTMLElement>('.memola-em-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const tpl = chip.dataset.tpl;
      if (tpl === 'tasks') void opts.doNewDb('');
      else void doNew('');
    });
  });
}
