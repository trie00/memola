// "Add column" modal for the DB grid view. Lets the user pick a column
// type (text / number / date / choice / …) and a name, then provisions
// it on the active DB list and re-renders the table.

import { S } from '../state';
import { g } from './dom';
import { setLoad, toast } from './ui-helpers';
import { addListField, getListFields, getListItems } from '../api/sp-list';
import { renderDbTable } from './views';

let _attached = false;

export function attachColumnModal(): void {
  if (_attached) return;
  _attached = true;

  let typeKind = 2;
  let typeTk = '2';            // 生の data-tk('formula' 等の擬似タイプも保持)
  const colGrid = document.getElementById('memola-col-type-grid');
  if (colGrid) {
    const tiles = Array.from(colGrid.querySelectorAll<HTMLDivElement>('.memola-col-type'));
    tiles[0]?.classList.add('on');
    tiles.forEach((tile) => {
      tile.addEventListener('click', () => {
        tiles.forEach((t) => t.classList.remove('on'));
        tile.classList.add('on');
        typeTk = tile.dataset.tk || '2';
        typeKind = parseInt(typeTk);      // 'formula' は NaN(下で分岐するので未使用)
        // Show the choices textarea only for Choice (6) / Lookup (15)
        g('col-choices-row').classList.toggle('on', typeKind === 6 || typeKind === 15);
      });
    });
  }

  g('col-cancel').addEventListener('click', () => {
    g('col-md').classList.remove('on');
  });

  g('col-ok').addEventListener('click', async () => {
    const name = (g('col-name') as HTMLInputElement).value.trim();
    if (!name) { g('col-name').focus(); return; }
    // 「数式」は SP 列ではなくクライアント側の数式列 → 数式エディタを開く。
    if (typeTk === 'formula') {
      g('col-md').classList.remove('on');
      const r = (g('col-ok') as HTMLElement).getBoundingClientRect();
      const m = await import('./db-formulas');
      m.openFormulaEditor(S.dbList, null, r.left, r.bottom + 4, () => {
        renderDbTable();
        const w = document.getElementById('memola-dt-wrap');
        if (w) w.scrollLeft = w.scrollWidth;
      }, name);
      return;
    }
    // 「参照(他DB)」も SP 列ではなくクライアント側の XLOOKUP 参照列 → 参照エディタ。
    if (typeTk === 'lookup') {
      g('col-md').classList.remove('on');
      const r = (g('col-ok') as HTMLElement).getBoundingClientRect();
      const m = await import('./db-lookups');
      m.openLookupEditor(S.dbList, null, r.left, r.bottom + 4, () => {
        renderDbTable();
        const w = document.getElementById('memola-dt-wrap');
        if (w) w.scrollLeft = w.scrollWidth;
      });
      return;
    }
    // 「リレーション(他DB)」= asLink 付きの参照列(クリックで相手行へ)。
    if (typeTk === 'relation') {
      g('col-md').classList.remove('on');
      const r = (g('col-ok') as HTMLElement).getBoundingClientRect();
      const m = await import('./db-lookups');
      m.openNewRelation(r.left, r.bottom + 4);
      return;
    }
    // 「ロールアップ(集計)」もクライアント側の集計列 → 集計エディタ。
    if (typeTk === 'rollup') {
      g('col-md').classList.remove('on');
      const r = (g('col-ok') as HTMLElement).getBoundingClientRect();
      const m = await import('./db-rollups');
      m.openRollupEditor(S.dbList, null, r.left, r.bottom + 4, () => {
        renderDbTable();
        const w = document.getElementById('memola-dt-wrap');
        if (w) w.scrollLeft = w.scrollWidth;
      });
      return;
    }
    let choices: string[] = [];
    if (typeKind === 6 || typeKind === 15) {
      const raw = (g('col-choices') as HTMLTextAreaElement).value.trim();
      choices = raw ? raw.split('\n').map((s) => s.trim()).filter(Boolean) : [];
    }
    g('col-md').classList.remove('on');
    setLoad(true, '列を追加中...');
    try {
      await addListField(S.dbList, name, typeKind, choices);
      const [fields, items] = await Promise.all([
        getListFields(S.dbList),
        getListItems(S.dbList),
      ]);
      const { stripInternalDbFields } = await import('../api/db');
      S.dbFields = stripInternalDbFields(fields);
      S.dbItems = items;
      renderDbTable();
      toast('列「' + name + '」を追加しました');
    } catch (e) {
      toast('列追加失敗: ' + (e as Error).message, 'err');
    } finally {
      setLoad(false);
    }
  });

  g('col-name').addEventListener('keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.isComposing || ke.keyCode === 229) return;
    if (ke.key === 'Enter') (g('col-ok') as HTMLButtonElement).click();
    if (ke.key === 'Escape') g('col-md').classList.remove('on');
  });
}
