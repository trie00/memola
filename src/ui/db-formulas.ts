// DB「数式」列のモデル + エディタ。
//   - 数式列はリスト単位で localStorage に保持(prefDbFormulas)。
//   - 値は保存せず、テーブル描画時に各行で評価する読み取り専用列。

import { S } from '../state';
import { prefDbFormulas, type DbFormulaDef } from '../lib/prefs';
import { checkFormula, FORMULA_FUNCTIONS } from '../lib/formula';
import { setLoad } from './ui-helpers';
import { loadDbConfig, patchDbConfig } from '../api/db-config';

// 数式定義は SharePoint 共有(memola-db-config)に保存。描画は同期で行うため
// 開いた DB の定義はメモリにキャッシュし、変更時に SP へ非同期保存する。
const _cache = new Map<string, DbFormulaDef[]>();

/** DB を開いた時に呼ぶ: 共有設定から数式定義を読み込みキャッシュ。
 *  旧ローカル(localStorage)に定義が残っていて共有側が空なら一度だけ移行する。 */
export async function loadFormulas(listTitle: string): Promise<void> {
  try {
    const cfg = await loadDbConfig(listTitle);
    let defs = cfg.formulas || [];
    const local = prefDbFormulas.get()[listTitle];
    if (!defs.length && local && local.length) {
      defs = local;                                   // ローカル→共有へ移行
      await patchDbConfig(listTitle, { formulas: defs }).catch(() => undefined);
    }
    _cache.set(listTitle, defs);
  } catch { _cache.set(listTitle, _cache.get(listTitle) || []); }
}

export function listFormulas(listTitle: string): DbFormulaDef[] {
  return _cache.get(listTitle) || [];
}
function save(listTitle: string, defs: DbFormulaDef[]): void {
  _cache.set(listTitle, defs);
  // 共有保存(非同期・ベストエフォート)。UI はキャッシュで即時反映。
  void patchDbConfig(listTitle, { formulas: defs }).catch(() => undefined);
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

/** 数式列どうしの並べ替え(from を to の位置へ)。 */
export function reorderFormulas(listTitle: string, from: number, to: number): void {
  const defs = listFormulas(listTitle).slice();
  if (from < 0 || from >= defs.length) return;
  const [m] = defs.splice(from, 1);
  let t = to;
  if (from < to) t -= 1;          // 取り除いた分の補正
  t = Math.max(0, Math.min(defs.length, t));
  defs.splice(t, 0, m);
  save(listTitle, defs);
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
  // stopPropagation でグローバルESCに届かなくなるため、ESCはここで自前で閉じる。
  const onKeyClose = (e: KeyboardEvent): void => {
    e.stopPropagation();
    if (e.key === 'Escape') closeFormulaEditor();
  };
  exprTa.addEventListener('keydown', onKeyClose);
  nameInp.addEventListener('keydown', onKeyClose);

  // カーソル位置に挿入(関数は () 内にキャレットを置く)。
  const insertAtCaret = (text: string, caretBack = 0): void => {
    const s = exprTa.selectionStart ?? exprTa.value.length;
    const e = exprTa.selectionEnd ?? exprTa.value.length;
    exprTa.value = exprTa.value.slice(0, s) + text + exprTa.value.slice(e);
    const pos = s + text.length - caretBack;
    exprTa.focus();
    exprTa.setSelectionRange(pos, pos);
    validate();
  };

  // 列・関数の一覧(検索 + クリックで挿入) — Notion 風。
  const picker = document.createElement('div');
  picker.className = 'memola-formula-picker';
  const search = document.createElement('input');
  search.className = 'memola-formula-search';
  search.placeholder = '列・関数を挿入（検索）…';
  search.addEventListener('keydown', onKeyClose);
  const listEl = document.createElement('div');
  listEl.className = 'memola-formula-list';
  const addHeader = (text: string): void => {
    const h = document.createElement('div'); h.className = 'memola-formula-list-hd'; h.textContent = text; listEl.appendChild(h);
  };
  const addItem = (primary: string, secondary: string, onPick: () => void): void => {
    const it = document.createElement('div');
    it.className = 'memola-formula-list-item';
    it.innerHTML = '<span class="memola-formula-li-1"></span><span class="memola-formula-li-2"></span>';
    (it.querySelector('.memola-formula-li-1') as HTMLElement).textContent = primary;
    (it.querySelector('.memola-formula-li-2') as HTMLElement).textContent = secondary;
    it.addEventListener('mousedown', (ev) => { ev.preventDefault(); onPick(); });   // preventDefault でテキストエリアのキャレット維持
    listEl.appendChild(it);
  };
  const renderList = (q: string): void => {
    listEl.innerHTML = '';
    const ql = q.trim().toLowerCase();
    const cols = S.dbFields.filter((f) => !ql || f.Title.toLowerCase().includes(ql));
    if (cols.length) {
      addHeader('列（プロパティ）');
      for (const f of cols) addItem('prop("' + f.Title + '")', '', () => insertAtCaret('prop("' + f.Title + '")'));
    }
    let lastGroup = '';
    for (const fn of FORMULA_FUNCTIONS) {
      if (ql && !(fn.name.toLowerCase().includes(ql) || fn.desc.toLowerCase().includes(ql) || fn.group.toLowerCase().includes(ql))) continue;
      if (fn.group !== lastGroup) { addHeader(fn.group); lastGroup = fn.group; }
      addItem(fn.sig, fn.desc, () => insertAtCaret(fn.name + '()', 1));
    }
    if (!listEl.children.length) {
      const empty = document.createElement('div'); empty.className = 'memola-formula-list-hd'; empty.textContent = '一致なし'; listEl.appendChild(empty);
    }
  };
  search.addEventListener('input', () => renderList(search.value));
  renderList('');
  picker.append(search, listEl);

  const help = document.createElement('div');
  help.className = 'memola-formula-help';
  help.textContent = '演算子: + - * / %、比較 == != < >、&& || !、三項 ?:。列や関数は下の一覧から挿入できます。';

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

  pop.append(nameInp, exprTa, err, picker, help, acts);
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
