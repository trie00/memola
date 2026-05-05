// Focus-mode toggle. Hides the sidebar and adds a CSS class on the
// overlay that the stylesheet uses to widen the editor + dim chrome.
// Pref-backed so the setting survives across sessions.

import { prefFocusMode, prefSidebarState } from '../lib/prefs';

export function applyFocusMode(): void {
  const ov = document.getElementById('memola-overlay');
  if (!ov) return;
  const isFocus = prefFocusMode.get() === '1';
  if (isFocus) {
    ov.classList.add('focus-mode');
    // Focus mode auto-hides the sidebar (don't persist this state)
    document.getElementById('memola-sb')?.classList.add('collapsed');
  } else {
    ov.classList.remove('focus-mode');
    // Restore persisted visibility on exit
    const saved = prefSidebarState.get();
    const sb = document.getElementById('memola-sb');
    if (sb) {
      sb.classList.remove('collapsed');
      if (saved === 'collapsed') sb.classList.add('collapsed');
    }
  }
}

export function toggleFocusMode(): void {
  const cur = prefFocusMode.get() === '1';
  if (cur) prefFocusMode.clear();
  else prefFocusMode.set('1');
  applyFocusMode();
}

/** ビューポート < 900px で自動折畳（明示状態を上書きしない）。
 *  Window resize hook — wired by attachAll. */
export function applyViewportAutoCollapse(): void {
  const sb = document.getElementById('memola-sb');
  if (!sb) return;
  if (window.innerWidth < 900) {
    if (!sb.classList.contains('collapsed')) {
      sb.dataset.autoCollapsed = '1';
      sb.classList.add('collapsed');
    }
  } else if (sb.dataset.autoCollapsed === '1') {
    delete sb.dataset.autoCollapsed;
    sb.classList.remove('collapsed');
  }
}
