// Pane resize: drag the inner edge of any pane (sidebar / outline / props / AI)
// to change its width. Persists per-pane width to localStorage.

import {
  prefPaneSbWidth, prefPaneOutlineWidth, prefPanePropsWidth, prefPaneAiWidth,
} from '../lib/prefs';

type WidthPref = { get: () => string; set: (v: string) => void; clear: () => void };

interface PaneSpec {
  paneId: string;          // element id of the pane being resized
  edge: 'right' | 'left';  // which edge the handle lives on
  pref: WidthPref;
  min: number;
  max: number;
  enabled?: () => boolean; // optional: skip handle when false (e.g. sidebar collapsed)
}

const SPECS: PaneSpec[] = [
  { paneId: 'memola-sb',      edge: 'right', pref: prefPaneSbWidth,      min: 160, max: 360,
    enabled: () => {
      const sb = document.getElementById('memola-sb');
      return !!sb && !sb.classList.contains('collapsed');
    } },
  { paneId: 'memola-outline', edge: 'right', pref: prefPaneOutlineWidth, min: 180, max: 400 },
  { paneId: 'memola-props',   edge: 'left',  pref: prefPanePropsWidth,   min: 200, max: 480 },
  { paneId: 'memola-ai-panel', edge: 'left', pref: prefPaneAiWidth,      min: 240, max: 500 },
];

function applyStoredWidth(spec: PaneSpec): void {
  const pane = document.getElementById(spec.paneId);
  if (!pane) return;
  const v = spec.pref.get();
  if (!v) return;
  const w = parseInt(v, 10);
  if (isNaN(w)) return;
  pane.style.width = Math.min(spec.max, Math.max(spec.min, w)) + 'px';
}

function ensureHandle(spec: PaneSpec): void {
  const pane = document.getElementById(spec.paneId);
  if (!pane) return;
  let handle = pane.querySelector<HTMLDivElement>(':scope > .memola-pane-resize');
  if (!handle) {
    handle = document.createElement('div');
    handle.className = 'memola-pane-resize memola-pane-resize-' + spec.edge;
    handle.title = '幅を変更 (ドラッグ)';
    pane.appendChild(handle);
    pane.style.position = pane.style.position || 'relative';
    handle.addEventListener('mousedown', (e) => onMouseDown(e, spec));
    handle.addEventListener('dblclick', () => {
      // Reset to default by clearing the stored value & inline width
      spec.pref.clear();
      pane.style.width = '';
    });
  }
  handle.style.display = (spec.enabled && !spec.enabled()) ? 'none' : '';
}

function onMouseDown(e: MouseEvent, spec: PaneSpec): void {
  const paneMaybe = document.getElementById(spec.paneId);
  if (!paneMaybe) return;
  const pane: HTMLElement = paneMaybe;
  e.preventDefault();
  e.stopPropagation();
  const startX = e.clientX;
  const startW = pane.offsetWidth;
  const sign = spec.edge === 'right' ? 1 : -1;
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';
  // ドラッグ中は transition を無効化
  const overlay = document.getElementById('memola-overlay');
  overlay?.classList.add('memola-resizing');

  function onMove(ev: MouseEvent): void {
    const delta = (ev.clientX - startX) * sign;
    const w = Math.min(spec.max, Math.max(spec.min, startW + delta));
    pane.style.width = w + 'px';
  }
  function onUp(): void {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    overlay?.classList.remove('memola-resizing');
    spec.pref.set(String(pane.offsetWidth));
  }
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}

/** Public: install resize handles on all known panes and restore stored widths. */
export function attachPaneResizers(): void {
  SPECS.forEach((spec) => {
    applyStoredWidth(spec);
    ensureHandle(spec);
  });
  // Re-evaluate handle visibility when sidebar state changes (rail/collapse)
  const sb = document.getElementById('memola-sb');
  if (sb) {
    const obs = new MutationObserver(() => {
      const spec = SPECS.find((s) => s.paneId === 'memola-sb');
      if (spec) ensureHandle(spec);
    });
    obs.observe(sb, { attributes: true, attributeFilter: ['class'] });
  }
  // Outline / Props / AI panels appear/disappear via .on class — handle stays
  // hidden via display:none when the pane itself is display:none.
}
