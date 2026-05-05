// Title-bar editing wiring.
//
// `#ttl`     — page editor title (textarea, autoresizes, schedSave on
//              input, Enter focuses the editor body).
// `#dv-ttl`  — DB view title (contenteditable span, blur persists via
//              apiSetTitle, input live-updates the in-memory tree
//              entry so the sidebar tracks instantly).

import { S } from '../state';
import { g, getEd } from './dom';
import { autoR, toast } from './ui-helpers';
import { apiSetTitle } from '../api/pages';
import { renderTree } from './tree';
import { schedSave } from './save-control';
import { setPageTitle } from '../lib/page-store';

let _attached = false;

export function attachTitleWiring(): void {
  if (_attached) return;
  _attached = true;

  // Page editor title (textarea)
  const te = g('ttl') as HTMLTextAreaElement;
  te.addEventListener('input', () => { autoR(te); schedSave(); });
  te.addEventListener('keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.isComposing || ke.keyCode === 229) return;
    if (ke.key === 'Enter') { e.preventDefault(); getEd().focus(); }
  });

  // DB title (contenteditable span)
  g('dv-ttl').addEventListener('input', () => {
    const newTitle = (g('dv-ttl').textContent || '').trim() || '無題';
    if (S.currentId) {
      setPageTitle(S.currentId, newTitle);
      renderTree();
    }
  });
  g('dv-ttl').addEventListener('blur', () => {
    if (S.currentId) {
      const newTitle = (g('dv-ttl').textContent || '').trim() || '無題';
      apiSetTitle(S.currentId, newTitle).catch((e: Error) => {
        toast('タイトル保存失敗: ' + e.message, 'err');
      });
    }
  });
}
