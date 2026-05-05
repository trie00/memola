// Page-icon and DB-icon click handlers — show the emoji picker and
// persist the chosen emoji as the page's icon.
//
// Three trigger surfaces:
//   - `#add-icon` / `#pg-icon`         page editor's icon slot
//   - `#dv-add-icon` / `#dv-pg-icon`   DB view's icon slot
//   - `#emoji-rm`                      "remove icon" button inside the picker

import { S } from '../state';
import { g } from './dom';
import { toast } from './ui-helpers';
import { apiSetIcon } from '../api/pages';
import { renderTree } from './tree';
import { renderPageIcon } from './views';
import { showEmojiPicker } from './emoji-picker';

let _attached = false;

function setPageIcon(emoji: string): void {
  if (!S.currentId) return;
  const id = S.currentId;
  apiSetIcon(id, emoji).then(() => {
    renderPageIcon(id);
    renderTree();
  }).catch((e: Error) => { toast('アイコン保存失敗: ' + e.message, 'err'); });
}

function setDbIcon(emoji: string): void {
  if (!S.currentId) return;
  const id = S.currentId;
  apiSetIcon(id, emoji).then(() => {
    const dvIcon = g('dv-pg-icon');
    const dvAdd = g('dv-add-icon');
    const dvHd = document.getElementById('memola-dv-hd');
    if (emoji) {
      dvIcon.textContent = emoji;
      dvIcon.style.display = 'inline-block';
      dvAdd.style.display = 'none';
      dvHd?.classList.remove('no-icon');
    } else {
      dvIcon.style.display = 'none';
      dvAdd.style.display = '';
      dvHd?.classList.add('no-icon');
    }
    renderTree();
  }).catch((e: Error) => { toast('アイコン保存失敗: ' + e.message, 'err'); });
}

export function attachIconButtons(): void {
  if (_attached) return;
  _attached = true;

  // Page editor icon — both the "+" placeholder and the rendered icon
  // open the picker.
  g('add-icon').addEventListener('click', () => {
    showEmojiPicker(g('add-icon'), setPageIcon);
  });
  g('pg-icon').addEventListener('click', () => {
    showEmojiPicker(g('pg-icon'), setPageIcon);
  });

  // DB view icon
  g('dv-add-icon').addEventListener('click', () => {
    showEmojiPicker(g('dv-add-icon'), setDbIcon);
  });
  g('dv-pg-icon').addEventListener('click', () => {
    showEmojiPicker(g('dv-pg-icon'), setDbIcon);
  });

  // "Remove icon" — clears the icon on whichever view is showing it
  g('emoji-rm').addEventListener('click', () => {
    g('emoji').classList.remove('on');
    if (!S.currentId) return;
    const id = S.currentId;
    apiSetIcon(id, '').then(() => {
      const meta = S.meta.pages.find((p) => p.id === id);
      if (meta?.type === 'database') {
        const dvIcon = g('dv-pg-icon');
        const dvAdd = g('dv-add-icon');
        const dvHd = document.getElementById('memola-dv-hd');
        dvIcon.style.display = 'none';
        dvAdd.style.display = '';
        dvHd?.classList.add('no-icon');
      } else {
        renderPageIcon(id);
      }
      renderTree();
    }).catch((e: Error) => { toast('アイコン削除失敗: ' + e.message, 'err'); });
  });
}
