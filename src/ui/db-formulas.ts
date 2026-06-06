// DB「数式」列のモデル + エディタ。
//   - 数式列はリスト単位で localStorage に保持(prefDbFormulas)。
//   - 値は保存せず、テーブル描画時に各行で評価する読み取り専用列。

import { S } from '../state';
import { prefDbFormulas, type DbFormulaDef } from '../lib/prefs';
import { checkFormula } from '../lib/formula';
import { setLoad } from './ui-helpers';

export function listFormulas(listTitle: string): DbFormulaDef[] {
  return prefDbFormulas.get()[listTitle] || [];
}
function save(listTitle: string, defs: DbFormulaDef[]): void {
  const all = prefDbFormulas.get();
  if (defs.length) all[listTitle] = defs; else delete all[listTitle];
  prefDbFormulas.set(all);
}
function newId(): string { return 'f' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36); }

export function getFormula(listTitle: string, id: string): DbFormulaDef | undefined {
  return listFormulas(listTitle).find((f) => f.id === id);
}
export function addFormula(listTitle: string, name: string, expr: string): DbFormulaDef {
  const defs = listFormulas(listTitle).slice();
  const def: DbFormulaDef = { id: newId(), name, expr };
  defs.push(def); save(listTitle, defs); return def;
}
export function updateFormula(listTitle: string, id: string, patch: Partial<DbFormulaDef>): void {
  const defs = listFormulas(listTitle).map((f) => (f.id === id ? { ...f, ...patch } : f));
  save(listTitle, defs);
}
export function deleteFormula(listTitle: string, id: string): void {
  save(listTitle, listFormulas(listTitle).filter((f) => f.id !== id));
}

// ── エディタ(ポップオーバー) ──
let _pop: HTMLElement | null = null;
export function closeFormulaEditor(): void { if (_pop) { _pop.remove(); _pop = null; } }

/** 数式列の作成/編集。def=null で新規。保存/削除後に reload を呼ぶ。
 *  initialName: 新規時の列名プリセット(＋モーダルから来た場合)。 */
export function openFormulaEditor(listTitle: string, def: DbFormulaDef | null, x: number, y: number, reload: () => void, initialName?: string): void {
  closeFormulaEditor();
  const overlay = document.getElementById('memola-overlay') || document.body;
  const pop = document.createElement('div');
  pop.className = 'memola-colmenu memola-formula-pop';
  pop.style.left = Math.round(Math.min(x, window.innerWidth - 380)) + 'px';
  pop.style.top = Math.round(y) + 'px';
  _pop = pop;

  const hdr = document.createElement('div');
  hdr.className = 'memola-colmenu-item';
  hdr.style.cssText = 'font-weight:600;color:var(--ink-3);cursor:default';
  hdr.textContent = def ? '数式列を編集' : '数式列を追加';
  pop.appendChild(hdr);

  const nameInp = document.createElement('input');
  nameInp.className = 'memola-formula-name';
  nameInp.placeholder = '列名';
  nameInp.value = def?.name || initialName || '';

  const exprTa = document.createElement('textarea');
  exprTa.className = 'memola-formula-expr';
  exprTa.placeholder = '例: prop("単価") * prop("数量")';
  exprTa.rows = 3;
  exprTa.value = def?.expr || '';

  const err = document.createElement('div');
  err.className = 'memola-formula-err';
  const validate = (): boolean => {
    const e = exprTa.value.trim() ? checkFormula(exprTa.value.trim()) : null;
    err.textContent = e || '';
    err.style.display = e ? '' : 'none';
    return !e;
  };
  exprTa.addEventListener('input', validate);
  exprTa.addEventListener('keydown', (e) => { e.stopPropagation(); });   // ESC等をグローバルに伝播させない
  nameInp.addEventListener('keydown', (e) => { e.stopPropagation(); });

  const help = document.createElement('div');
  help.className = 'memola-formula-help';
  help.textContent = '使える例: + - * / 、if(条件, A, B)、concat(a,b)、round(x,2)、dateBetween(prop("締切"), now(), "days")';

  const acts = document.createElement('div');
  acts.className = 'memola-formula-acts';
  const saveBtn = document.createElement('button');
  saveBtn.className = 'memola-btn p'; saveBtn.textContent = '保存';
  saveBtn.addEventListener('click', () => {
    const name = nameInp.value.trim() || '数式';
    const expr = exprTa.value.trim();
    if (!validate()) return;
    setLoad(true, '保存中...');
    try {
      if (def) updateFormula(listTitle, def.id, { name, expr });
      else addFormula(listTitle, name, expr);
      closeFormulaEditor();
      reload();
    } finally { setLoad(false); }
  });
  acts.appendChild(saveBtn);
  if (def) {
    const delBtn = document.createElement('button');
    delBtn.className = 'memola-btn ghost'; delBtn.textContent = '削除'; delBtn.style.color = 'var(--danger,#b8534a)';
    delBtn.addEventListener('click', () => {
      if (!confirm(`数式列「${def.name}」を削除しますか？`)) return;
      deleteFormula(listTitle, def.id); closeFormulaEditor(); reload();
    });
    acts.appendChild(delBtn);
  }

  pop.append(nameInp, exprTa, err, help, acts);
  overlay.appendChild(pop);
  validate();
  const r = pop.getBoundingClientRect();
  if (r.bottom > window.innerHeight - 8) pop.style.top = Math.max(8, window.innerHeight - r.height - 8) + 'px';
  nameInp.focus();

  const onOut = (e: MouseEvent): void => {
    if (_pop && !_pop.contains(e.target as Node)) { closeFormulaEditor(); document.removeEventListener('mousedown', onOut, true); }
  };
  setTimeout(() => document.addEventListener('mousedown', onOut, true), 0);
}

/** S.dbList の数式列エディタを開く(新規)。 */
export function openNewFormula(x: number, y: number): void {
  openFormulaEditor(S.dbList, null, x, y, () => {
    void import('./views-table').then((m) => {
      m.renderDbTable();
      // 数式列はデータ列の右端に追加されるので、横に広いDBでも気づけるよう右へスクロール。
      const wrap = document.getElementById('memola-dt-wrap');
      if (wrap) wrap.scrollLeft = wrap.scrollWidth;
    });
  });
}
