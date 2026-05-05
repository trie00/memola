// Small modal helper. Centralises the boilerplate that used to be
// re-implemented in every modal: backdrop click, ESC capture-phase
// handler with stopImmediatePropagation, singleton guard, initial
// focus, cleanup.
//
// Two distinct shapes:
//   - `confirm()` — returns a Promise<T> for caller-driven flows
//     (e.g. close-confirm → boolean, conflict modal → choice)
//   - `subscriberModal()` — for state-driven modals that show/hide
//     based on a Saver subscription. Returns a controller with
//     `render(html)` and `close()`.
//
// CSS lives in app.css under each modal's specific class. The helper
// just owns ID + outer `<div class="<userClass> on">` wrapper.

export interface ModalConfirmOpts<T> {
  /** Stable DOM id — used for singleton guard + cleanup. */
  id: string;
  /** Outer wrapper class (the existing per-modal class — keeps CSS unchanged). */
  className: string;
  /** Inner HTML for the modal box. Should NOT include the outer wrapper. */
  contentHtml: string;
  /** Map data-attribute value → resolution. Buttons in `contentHtml`
   *  with `data-c="<key>"` will resolve the Promise to the mapped value. */
  buttons: Record<string, T>;
  /** What value to resolve to on backdrop click / ESC. Omit to disable
   *  ESC dismissal (rare — confirm modals usually want it). */
  cancelValue?: T;
  /** Querystring of the element to autofocus (default: first button). */
  focusSel?: string;
  /** Optional: called after the modal is in the DOM, before user input.
   *  Use this to wire any non-button click handlers. */
  onMounted?: (root: HTMLElement) => void;
}

/** Show a modal and return the user's choice. Singleton — a second call
 *  with the same id while the modal is open resolves to `cancelValue`
 *  (or rejects with NoOp if cancelValue is omitted). */
export function confirmModal<T>(opts: ModalConfirmOpts<T>): Promise<T> {
  // Singleton guard — earlier code's recurring bug was double-rendering.
  if (document.getElementById(opts.id)) {
    return opts.cancelValue !== undefined
      ? Promise.resolve(opts.cancelValue)
      : Promise.reject(new Error('modal-already-open'));
  }
  return new Promise<T>((resolve) => {
    const overlay = document.getElementById('memola-overlay') || document.body;
    const back = document.createElement('div');
    back.id = opts.id;
    back.className = opts.className + ' on';
    back.innerHTML = opts.contentHtml;
    overlay.appendChild(back);

    let settled = false;
    const finish = (v: T): void => {
      if (settled) return;
      settled = true;
      back.remove();
      document.removeEventListener('keydown', onKey, true);
      resolve(v);
    };

    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape' && opts.cancelValue !== undefined) {
        // Capture phase + stopImmediatePropagation: any global onKey
        // listener (including zombies from earlier bookmarklet cycles)
        // won't see this ESC, so they can't pop their own confirm
        // dialog.
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        finish(opts.cancelValue);
      }
    }
    document.addEventListener('keydown', onKey, true);

    back.addEventListener('click', (e) => {
      const t = e.target as HTMLElement;
      if (t === back && opts.cancelValue !== undefined) {
        finish(opts.cancelValue);
        return;
      }
      const btn = t.closest<HTMLElement>('button[data-c]');
      if (!btn) return;
      const key = btn.dataset.c || '';
      if (key in opts.buttons) {
        finish(opts.buttons[key]);
      }
    });

    if (opts.onMounted) opts.onMounted(back);

    // Initial focus
    const focusSel = opts.focusSel || 'button[data-c]';
    back.querySelector<HTMLElement>(focusSel)?.focus();
  });
}

export interface SubscriberModalController {
  /** Re-render with new content. Idempotent — replaces current DOM. */
  render(contentHtml: string, onMounted?: (root: HTMLElement) => void): void;
  /** Remove the modal and stop listening. */
  close(): void;
  /** Whether the modal is currently in the DOM. */
  isOpen(): boolean;
}

export interface SubscriberModalOpts {
  id: string;
  className: string;
  /** Called when the user presses ESC. The subscriber decides whether
   *  to actually close (e.g. Saver.cancelMerge instead of remove). */
  onEscape?: () => void;
  /** Called on backdrop click. */
  onBackdropClick?: () => void;
}

/** Headless controller for a state-driven modal. The subscriber owns
 *  the lifecycle — `render()` to (re)build, `close()` to dismiss. ESC
 *  and backdrop callbacks are configurable.
 *
 *  Used by conflict-modal and merge-modal which derive show/hide from
 *  Saver state. */
export function subscriberModal(opts: SubscriberModalOpts): SubscriberModalController {
  let _root: HTMLElement | null = null;

  function escHandler(e: KeyboardEvent): void {
    if (e.key === 'Escape' && document.getElementById(opts.id)) {
      e.preventDefault();
      e.stopPropagation();
      if (opts.onEscape) opts.onEscape();
    }
  }

  function close(): void {
    const el = document.getElementById(opts.id);
    if (el) el.remove();
    document.removeEventListener('keydown', escHandler, true);
    _root = null;
  }

  function render(contentHtml: string, onMounted?: (root: HTMLElement) => void): void {
    // Remove existing first — we re-render from scratch on every state
    // emission. The earlier code did this too; trying to diff in-place
    // led to subtle bugs (button click handlers losing their closure
    // identity, ESC listener piling up, etc).
    const existing = document.getElementById(opts.id);
    if (existing) existing.remove();
    document.removeEventListener('keydown', escHandler, true);

    const overlay = document.getElementById('memola-overlay') || document.body;
    const root = document.createElement('div');
    root.id = opts.id;
    root.className = opts.className + ' on';
    root.innerHTML = contentHtml;
    overlay.appendChild(root);
    _root = root;

    if (opts.onBackdropClick) {
      root.addEventListener('click', (e) => {
        if (e.target === root) opts.onBackdropClick!();
      });
    }
    document.addEventListener('keydown', escHandler, true);

    if (onMounted) onMounted(root);
  }

  return {
    render,
    close,
    isOpen: () => _root !== null && document.getElementById(opts.id) !== null,
  };
}
