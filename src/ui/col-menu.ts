// DB 列ヘッダのクリックで開く Notion 風の列操作メニュー。
//   - 昇順 / 降順で並べ替え
//   - フィルター(既存の filter popover)
//   - 選択肢を追加(Choice 列のみ)
//   - 列を削除
// (列タイプ変更・タグ色は別途)

import { S, type ListField } from '../state';
import { setLoad, toast } from './ui-helpers';

let _menu: HTMLElement | null = null;
let _outside: ((e: MouseEvent) => void) | null = null;

export function closeColumnMenu(): void {
  if (_menu) { _menu.remove(); _menu = null; }
  if (_outside) { document.removeEventListener('mousedown', _outside, true); _outside = null; }
}

async function reRender(): Promise<void> {
  const m = await import('./views-table');
  m.renderDbTable();
}

/** スキーマが変わった時(列削除/選択肢更新)は DB を開き直して再取得・再描画。 */
async function reloadDb(): Promise<void> {
  const dbPage = S.pages.find((p) => p.Id === S.currentId);
  if (!dbPage) return;
  const v = await import('./views');
  await v.doSelectDb(S.currentId as string, dbPage);
}

export function openColumnMenu(field: ListField, x: number, y: number): void {
  closeColumnMenu();
  const overlay = document.getElementById('memola-overlay');
  if (!overlay) return;
  const menu = document.createElement('div');
  menu.className = 'memola-colmenu';
  menu.style.left = Math.round(x) + 'px';
  menu.style.top = Math.round(y) + 'px';

  const item = (label: string, onClick: () => void, opts: { danger?: boolean } = {}): HTMLElement => {
    const el = document.createElement('div');
    el.className = 'memola-colmenu-item' + (opts.danger ? ' danger' : '');
    el.textContent = label;
    el.addEventListener('click', () => { closeColumnMenu(); onClick(); });
    return el;
  };
  const sep = (): HTMLElement => { const s = document.createElement('div'); s.className = 'memola-colmenu-sep'; return s; };

  menu.append(
    item('↑ 昇順で並べ替え', () => { S.dbSort.field = field.InternalName; S.dbSort.asc = true; void reRender(); }),
    item('↓ 降順で並べ替え', () => { S.dbSort.field = field.InternalName; S.dbSort.asc = false; void reRender(); }),
    item('フィルター', () => { void import('./filter-ui').then((m) => m.showFilterPopover()); }),
  );

  // Choice 列: 選択肢を追加
  if (field.FieldTypeKind === 6) {
    menu.append(item('＋ 選択項目を追加', () => {
      const v = (prompt('追加する選択肢を入力') || '').trim();
      if (!v) return;
      const choices = [...(field.Choices || [])];
      if (choices.includes(v)) { toast('同じ選択肢が既にあります'); return; }
      choices.push(v);
      void (async () => {
        try {
          setLoad(true, '選択肢を追加中...');
          const { updateListFieldChoices } = await import('../api/sp-list');
          await updateListFieldChoices(S.dbList, field.InternalName, choices);
          await reloadDb();
          toast('選択肢を追加しました', 'ok');
        } catch (e) { toast('選択肢の追加に失敗: ' + (e as Error).message, 'err'); }
        finally { setLoad(false); }
      })();
    }));
  }

  menu.append(sep(), item('🗑 列を削除', () => {
    if (!confirm(`列「${field.Title}」を削除しますか？(この列の値も失われます)`)) return;
    void (async () => {
      try {
        setLoad(true, '列を削除中...');
        const { deleteListField } = await import('../api/sp-list');
        await deleteListField(S.dbList, field.InternalName);
        await reloadDb();
        toast('列を削除しました', 'ok');
      } catch (e) { toast('列の削除に失敗: ' + (e as Error).message, 'err'); }
      finally { setLoad(false); }
    })();
  }, { danger: true }));

  overlay.appendChild(menu);
  // 画面外にはみ出さないよう右/下端を補正
  const r = menu.getBoundingClientRect();
  if (r.right > window.innerWidth - 8) menu.style.left = Math.max(8, window.innerWidth - r.width - 8) + 'px';
  if (r.bottom > window.innerHeight - 8) menu.style.top = Math.max(8, y - r.height) + 'px';

  _outside = (e: MouseEvent): void => { if (_menu && !_menu.contains(e.target as Node)) closeColumnMenu(); };
  setTimeout(() => { if (_outside) document.addEventListener('mousedown', _outside, true); }, 0);
  _menu = menu;
}
