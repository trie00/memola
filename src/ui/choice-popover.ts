// Generic single-choice popover styled like #n365-create-menu.
// Used by row-props (DB row detail panel) for choice columns and any other
// single-pick UI where the native <select> dropdown looks out of place.

import { getOverlay } from './dom';

let _open: HTMLElement | null = null;
let _onOutside: ((e: MouseEvent) => void) | null = null;

function close(): void {
  if (_open) { _open.remove(); _open = null; }
  if (_onOutside) {
    document.removeEventListener('mousedown', _onOutside, true);
    _onOutside = null;
  }
}

export interface ChoiceItem {
  value: string;
  label: string;
  icon?: string;          // optional emoji / single char
  sub?: string;           // optional secondary line
}

/**
 * Open a popover anchored to `anchor`. `choices` may include an empty-string
 * value (rendered as "—") to represent "no selection". Calls `onSelect` and
 * closes on pick.
 */
export function openChoicePopover(
  anchor: HTMLElement,
  choices: ChoiceItem[],
  current: string,
  onSelect: (value: string) => void,
): void {
  close();
  const overlay = getOverlay();
  if (!overlay) return;

  const pop = document.createElement('div');
  pop.className = 'n365-choice-pop';

  for (const it of choices) {
    const row = document.createElement('div');
    row.className = 'n365-cp-item';
    const isSel = it.value === current;
    if (isSel) row.classList.add('sel');
    const ic = document.createElement('span');
    ic.className = 'n365-cp-ic';
    ic.textContent = isSel ? '✓' : (it.icon || '');
    const lbl = document.createElement('span');
    lbl.className = 'n365-cp-label';
    lbl.textContent = it.label || '—';
    if (!it.label) lbl.classList.add('n365-cp-empty');
    row.append(ic, lbl);
    if (it.sub) {
      const sub = document.createElement('span');
      sub.className = 'n365-cp-sub';
      sub.textContent = it.sub;
      row.appendChild(sub);
    }
    row.addEventListener('mousedown', (e) => {
      // mousedown so the outside-click listener (also mousedown) doesn't fire first
      e.preventDefault();
      e.stopPropagation();
      onSelect(it.value);
      close();
    });
    pop.appendChild(row);
  }

  // Position: just below the anchor, left-aligned, viewport-clamped
  const r = anchor.getBoundingClientRect();
  pop.style.top = (r.bottom + 4) + 'px';
  pop.style.left = r.left + 'px';
  pop.style.minWidth = Math.max(180, r.width) + 'px';
  overlay.appendChild(pop);

  // Clamp: if it would extend past the viewport bottom, flip above the anchor
  requestAnimationFrame(() => {
    const pr = pop.getBoundingClientRect();
    if (pr.bottom > window.innerHeight - 8) {
      const above = r.top - pr.height - 4;
      if (above >= 8) pop.style.top = above + 'px';
    }
    if (pr.right > window.innerWidth - 8) {
      pop.style.left = (window.innerWidth - pr.width - 8) + 'px';
    }
  });

  _open = pop;
  _onOutside = (e: MouseEvent) => {
    if (!_open) return;
    if (e.target instanceof Node && _open.contains(e.target)) return;
    close();
  };
  // Defer one frame so the click that opened us doesn't immediately close it
  setTimeout(() => {
    if (_onOutside) document.addEventListener('mousedown', _onOutside, true);
  }, 0);
}

export function closeChoicePopover(): void { close(); }
