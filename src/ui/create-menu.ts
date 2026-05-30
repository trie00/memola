// 「＋ 新規」 quick-add popover anchored below the sidebar's primary
// create button. Picks new page / new DB, plus a dynamic 「テンプレートから」
// list of registered templates — each row creates a page from the
// template, with inline edit (open the template) / delete controls.
//
// Self-contained: popover visibility lives in the DOM (`on` class).
// Idempotent attachAll guard via a module flag.

import { doNew } from './actions';
import { S } from '../state';
import { setLoad, toast } from './ui-helpers';
import { escapeHtml } from '../lib/html-escape';
import { listTemplates } from '../api/pages';
import { renderTree } from './tree';

let _attached = false;

/** (Re)render the dynamic 「テンプレートから」 list inside the create menu.
 *  Exported so the page menu can refresh it right after registering. */
export function renderCreateMenuTemplates(): void {
  const host = document.getElementById('memola-cm-templates');
  if (!host) return;
  const tpls = listTemplates();
  if (tpls.length === 0) {
    host.innerHTML =
      '<div class="memola-cm-empty">まだテンプレートがありません。'
      + 'ページの「…」→「テンプレートとして登録」で追加できます。</div>';
    return;
  }
  host.innerHTML = tpls.map((t) => {
    const ic = t.icon || (t.type === 'database' ? '🗂' : '📄');
    return '<div class="memola-cm-item memola-cm-tpl" data-tpl-id="' + escapeHtml(t.id) + '">' +
      '<span class="memola-cm-ic">' + escapeHtml(ic) + '</span>' +
      '<span class="memola-cm-name">' + escapeHtml(t.title || '無題') + '</span>' +
      '<span class="memola-cm-tpl-actions">' +
        '<button class="memola-cm-tpl-btn" data-tpl-edit="' + escapeHtml(t.id) + '" title="テンプレートを編集">✎</button>' +
        '<button class="memola-cm-tpl-btn" data-tpl-del="' + escapeHtml(t.id) + '" title="テンプレートを削除">🗑</button>' +
      '</span>' +
    '</div>';
  }).join('');
}

export function attachCreateMenu(doNewDb: (parentId: string) => Promise<void>): void {
  if (_attached) return;
  _attached = true;

  const quickAddBtn = document.getElementById('memola-quick-add');
  const createMenu = document.getElementById('memola-create-menu');
  if (!quickAddBtn || !createMenu) return;

  quickAddBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const rect = quickAddBtn.getBoundingClientRect();
    createMenu.style.left = rect.left + 'px';
    createMenu.style.top = (rect.bottom + 4) + 'px';
    renderCreateMenuTemplates();              // refresh list each open
    createMenu.classList.toggle('on');
  });

  createMenu.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    // Template row controls (edit / delete) take priority over the row click.
    const editId = target.closest<HTMLElement>('[data-tpl-edit]')?.dataset.tplEdit;
    if (editId) {
      e.stopPropagation();
      createMenu.classList.remove('on');
      void import('./views').then((m) => m.doSelect(editId));   // open template to edit
      return;
    }
    const delId = target.closest<HTMLElement>('[data-tpl-del]')?.dataset.tplDel;
    if (delId) {
      e.stopPropagation();
      void deleteTemplate(delId);
      return;
    }
    const tplRow = target.closest<HTMLElement>('.memola-cm-tpl');
    if (tplRow?.dataset.tplId) {
      createMenu.classList.remove('on');
      void createFromTemplate(tplRow.dataset.tplId);
      return;
    }

    // Built-in create items.
    const item = target.closest<HTMLElement>('.memola-cm-item');
    if (!item || !item.dataset.cm) return;
    createMenu.classList.remove('on');
    switch (item.dataset.cm) {
      case 'new-page': void doNew(''); break;
      case 'new-db':   void doNewDb(''); break;
    }
  });

  // Outside-click dismissal
  document.addEventListener('click', (e) => {
    if (!createMenu.classList.contains('on')) return;
    const t = e.target as Node;
    if (createMenu.contains(t) || quickAddBtn.contains(t)) return;
    createMenu.classList.remove('on');
  });
}

async function createFromTemplate(templateId: string): Promise<void> {
  try {
    setLoad(true, 'テンプレートから作成中...');
    const { apiCreatePageFromTemplate } = await import('../api/pages');
    const page = await apiCreatePageFromTemplate(templateId);
    renderTree();
    const v = await import('./views');
    await v.doSelect(page.Id);
    toast('テンプレートからページを作成しました');
  } catch (e) {
    toast('作成失敗: ' + (e as Error).message, 'err');
  } finally { setLoad(false); }
}

async function deleteTemplate(templateId: string): Promise<void> {
  const t = S.meta.pages.find((p) => p.id === templateId);
  if (!confirm('テンプレート「' + (t?.title || '無題') + '」を削除しますか?')) return;
  try {
    setLoad(true, 'テンプレートを削除中...');
    const { apiDeleteTemplate } = await import('../api/pages');
    await apiDeleteTemplate(templateId);
    renderCreateMenuTemplates();
    toast('テンプレートを削除しました');
  } catch (e) {
    toast('削除失敗: ' + (e as Error).message, 'err');
  } finally { setLoad(false); }
}
