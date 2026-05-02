// Pane resize: drag the inner edge of any pane (sidebar / outline / props / AI)
// to change its width. Persists per-pane width to localStorage.

interface PaneSpec {
  paneId: string;          // element id of the pane being resized
  edge: 'right' | 'left';  // which edge the handle lives on
  storageKey: string;
  min: number;
  max: number;
  enabled?: () => boolean; // optional: skip handle when false (e.g. sidebar collapsed)
}

const SPECS: PaneSpec[] = [
  { paneId: 'n365-sb',      edge: 'right', storageKey: 'n365.pane.sb',      min: 160, max: 360,
    enabled: () => {
      const sb = document.getElementById('n365-sb');
      return !!sb && !sb.classList.contains('collapsed');
    } },
  { paneId: 'n365-outline', edge: 'right', storageKey: 'n365.pane.outline', min: 180, max: 400 },
  { paneId: 'n365-props',   edge: 'left',  storageKey: 'n365.pane.props',   min: 200, max: 480 },
  { paneId: 'n365-ai-panel', edge: 'left', storageKey: 'n365.pane.ai',      min: 240, max: 500 },
];

function applyStoredWidth(spec: PaneSpec): void {
  const pane = document.getElementById(spec.paneId);
  if (!pane) return;
  try {
    const v = localStorage.getItem(spec.storageKey);
    if (!v) return;
    const w = parseInt(v, 10);
    if (isNaN(w)) return;
    pane.style.width = Math.min(spec.max, Math.max(spec.min, w)) + 'px';
  } catch { /* ignore */ }
}

function ensureHandle(spec: PaneSpec): void {
  const pane = document.getElementById(spec.paneId);
  if (!pane) return;
  let handle = pane.querySelector<HTMLDivElement>(':scope > .n365-pane-resize');
  if (!handle) {
    handle = document.createElement('div');
    handle.className = 'n365-pane-resize n365-pane-resize-' + spec.edge;
    handle.title = '幅を変更 (ドラッグ)';
    pane.appendChild(handle);
    pane.style.position = pane.style.position || 'relative';
    handle.addEventListener('mousedown', (e) => onMouseDown(e, spec));
    handle.addEventListener('dblclick', () => {
      // Reset to default by clearing the stored value & inline width
      try { localStorage.removeItem(spec.storageKey); } catch { /* ignore */ }
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
  const overlay = document.getElementById('n365-overlay');
  overlay?.classList.add('n365-resizing');

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
    overlay?.classList.remove('n365-resizing');
    try { localStorage.setItem(spec.storageKey, String(pane.offsetWidth)); } catch { /* ignore */ }
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
  const sb = document.getElementById('n365-sb');
  if (sb) {
    const obs = new MutationObserver(() => {
      const spec = SPECS.find((s) => s.paneId === 'n365-sb');
      if (spec) ensureHandle(spec);
    });
    obs.observe(sb, { attributes: true, attributeFilter: ['class'] });
  }
  // Outline / Props / AI panels appear/disappear via .on class — handle stays
  // hidden via display:none when the pane itself is display:none.
}
