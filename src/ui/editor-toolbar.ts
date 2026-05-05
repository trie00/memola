// Editor toolbar wiring: the static toolbar (`#tb`) and the floating
// toolbar (`#ftb`) that appears next to a text selection. Both
// dispatch `data-cmd` button clicks through `execCmd`.
//
// Mousedown listeners use `preventDefault()` to keep the editor's
// selection alive while the user clicks a toolbar button — without
// it, the click steals focus and the formatting command lands on an
// empty range.

import { g } from './dom';
import { editor2ExecCmd } from './editor2/editor2-bridge';

let _attached = false;

/** Dispatch a toolbar command. Phase 2c-5: editor2 is the only
 *  editor — silently ignores commands editor2 doesn't recognise. */
function dispatch(cmd: string): void {
  editor2ExecCmd(cmd);
}

export function attachEditorToolbar(): void {
  if (_attached) return;
  _attached = true;

  // Static toolbar (#tb) — preserve selection on mousedown, dispatch on click.
  g('tb').addEventListener('mousedown', (e) => {
    if ((e.target as HTMLElement).closest('.memola-b')) e.preventDefault();
  });
  g('tb').addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('.memola-b');
    if (b && b.dataset.cmd) dispatch(b.dataset.cmd);
  });

  // Floating toolbar (#ftb) — single mousedown handler that also runs
  // the command (the popover is dismissed before a click would fire,
  // so we hit the button on press).
  g('ftb').addEventListener('mousedown', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('.memola-fb');
    if (b && b.dataset.cmd) {
      e.preventDefault();
      dispatch(b.dataset.cmd);
    }
  });
}
