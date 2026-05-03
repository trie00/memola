// Shared scaffold for "floating drag handle" UI patterns.
//
// Two modules use this exact pattern: `block-drag.ts` (editor block
// reordering) and `db-row-drag.ts` (DB table row reordering). Both
// follow the same recipe:
//   - One global handle element follows the mouse
//   - Hit-detection extends ~40px to the LEFT of items so the gap
//     between item and handle counts as "still hovering"
//   - dragstart on the handle uses the currently-hovered item as the
//     drag source
//
// This module abstracts the handle DOM, positioning, and mousemove
// tracking. Each caller wires its own dragstart / drop logic — those
// have meaningful differences (placeholder vs reorder-line; per-block
// schedule-save vs per-row API call) that don't justify a single
// "drop" abstraction.

const HANDLE_SVG =
  '<svg viewBox="0 0 10 16" width="10" height="16" fill="currentColor" style="pointer-events:none">' +
  '<circle cx="2" cy="3" r="1.3"/><circle cx="2" cy="8" r="1.3"/><circle cx="2" cy="13" r="1.3"/>' +
  '<circle cx="8" cy="3" r="1.3"/><circle cx="8" cy="8" r="1.3"/><circle cx="8" cy="13" r="1.3"/>' +
  '</svg>';

export interface FloatingHandleOpts {
  /** DOM id for the handle element. Used for CSS targeting. */
  id: string;
  /** Tooltip text shown on hover. */
  title: string;
  /** Container that the handle is appended to. Defaults to memola-overlay. */
  container?: HTMLElement;
  /** dragstart event handler — fired when the user begins dragging. */
  onDragStart: (e: DragEvent) => void;
  /** dragend event handler — fired regardless of drop success/failure. */
  onDragEnd: (e: DragEvent) => void;
  /** Optional mouseleave callback — called when the cursor leaves both
   *  the handle AND the area we consider "still hovering" the target. */
  onMouseLeave?: (e: MouseEvent) => void;
  /** When true, fixes the handle to a smaller height + centres vertically
   *  on the target instead of stretching to its height. */
  centred?: boolean;
}

export interface FloatingHandle {
  /** The DOM element. Caller can read `.style.display` etc. */
  el: HTMLElement;
  /** Position the handle to the left of `target`. */
  positionAt(target: HTMLElement): void;
  /** Hide the handle (no-op if already hidden). */
  hide(): void;
  /** True iff the cursor is currently over the handle itself. */
  isCursorOnHandle(clientX: number, clientY: number, padding?: number): boolean;
}

export function createFloatingHandle(opts: FloatingHandleOpts): FloatingHandle {
  const h = document.createElement('div');
  h.id = opts.id;
  h.draggable = true;
  h.title = opts.title;
  h.innerHTML = HANDLE_SVG;
  h.addEventListener('dragstart', opts.onDragStart);
  h.addEventListener('dragend', opts.onDragEnd);
  if (opts.onMouseLeave) h.addEventListener('mouseleave', opts.onMouseLeave);
  const container = opts.container || document.getElementById('memola-overlay') || document.body;
  container.appendChild(h);

  return {
    el: h,
    positionAt(target: HTMLElement): void {
      const rect = target.getBoundingClientRect();
      if (opts.centred) {
        const handleH = 18;
        h.style.top = (rect.top + window.scrollY + (rect.height - handleH) / 2) + 'px';
        h.style.height = handleH + 'px';
      } else {
        h.style.top = (rect.top + window.scrollY) + 'px';
        h.style.height = Math.max(20, Math.min(rect.height, 32)) + 'px';
      }
      h.style.left = (rect.left + window.scrollX - 24) + 'px';
      h.style.display = 'flex';
    },
    hide(): void { h.style.display = 'none'; },
    isCursorOnHandle(clientX: number, clientY: number, padding = 2): boolean {
      if (h.style.display === 'none') return false;
      const r = h.getBoundingClientRect();
      return clientX >= r.left - padding && clientX <= r.right + padding &&
             clientY >= r.top - padding && clientY <= r.bottom + padding;
    },
  };
}

/** Hit-detection that treats `extendLeft` pixels to the left of `target`
 *  as "still inside" the target. Used so the cursor can travel from the
 *  item's left edge into the floating handle without the item losing
 *  hover. `padVert` is the same idea on the top/bottom edges. */
export function isCursorOverWithExtend(
  target: HTMLElement, clientX: number, clientY: number,
  extendLeft = 44, padVert = 2,
): boolean {
  const r = target.getBoundingClientRect();
  return clientY >= r.top - padVert && clientY <= r.bottom + padVert &&
         clientX >= r.left - extendLeft && clientX <= r.right;
}
