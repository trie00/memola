// DOM lookup helpers shared across the UI modules.

export function g(id: string): HTMLElement {
  const el = document.getElementById('memola-' + id);
  if (!el) throw new Error('Memola: missing element memola-' + id);
  return el;
}

export function getOverlay(): HTMLElement {
  const el = document.getElementById('memola-overlay');
  if (!el) throw new Error('Memola: overlay not mounted');
  return el;
}

export function getEd(): HTMLElement { return g('ed'); }
