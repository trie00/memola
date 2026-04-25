// DOM lookup helpers shared across the UI modules.

export function g(id: string): HTMLElement {
  const el = document.getElementById('n365-' + id);
  if (!el) throw new Error('n365: missing element n365-' + id);
  return el;
}

export function getOverlay(): HTMLElement {
  const el = document.getElementById('n365-overlay');
  if (!el) throw new Error('n365: overlay not mounted');
  return el;
}

export function getEd(): HTMLElement { return g('ed'); }
