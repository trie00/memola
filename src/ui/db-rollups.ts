// DB「ロールアップ(集計)」列のモデル + エディタ。
//   - 1対多リレーションの親側に、子DBの関連行をまとめた集計値を表示する。
//   - 親の parentKeyField の値 == 子の childForeignField の値 でグルーピングし、
//     子の targetField を agg(count/sum/avg/min/max/join)で集計。
//   - 値は保存せず描画時に参照する読み取り専用列。定義は共有(memola-db-config)。
//   - 子DBは GUID(childListId)で参照 → 子DBの改名/移動に強い(XLOOKUPと同方式)。

import { S } from '../state';
import type { DbRollupDef } from '../lib/prefs';
import { loadDbConfig, patchDbConfig } from '../api/db-config';
import { getListFields, getListItems, resolveListIdByTitle, resolveListTitleById } from '../api/sp-list';
import { setLoad, toast } from './ui-helpers';

const _defs = new Map<string, DbRollupDef[]>();
const _data = new Map<string, Map<string, string>>();   // def.id → parentKey値 → 集計結果文字列

function newId(): string { return 'ru' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36); }
function val2str(v: unknown): string {
  if (v == null) return '';
  if (typeof v === 'object') { const o = v as Record<string, unknown>; return String(o.Title ?? o.Label ?? o.Value ?? ''); }
  return String(v);
}
function toNum(v: unknown): number | null {
  if (v == null || v === '') return null;
  const n = typeof v === 'number' ? v : parseFloat(String(v).replace(/[, ]/g, ''));
  return isFinite(n) ? n : null;
}
function fmtNum(n: number): string {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
}

export function listRollups(listTitle: string): DbRollupDef[] { return _defs.get(listTitle) || []; }
export function getRollupValue(defId: string, parentKeyValue: unknown): string {
  const m = _data.get(defId);
  const v = m?.get(val2str(parentKeyValue));
  if (v != null) return v;
  return '';   // 関連行なし → 空(count は下の aggregate で 0 を入れる)
}

function aggregate(def: DbRollupDef, rows: Array<Record<string, unknown>>): string {
  if (def.agg === 'count') return String(rows.length);
  const raw = rows.map((r) => r[def.targetField]);
  if (def.agg === 'join') {
    const uniq = [...new Set(raw.map(val2str).filter((s) => s !== ''))];
    return uniq.join(', ');
  }
  const nums = raw.map(toNum).filter((n): n is number => n != null);
  if (nums.length === 0) return '';
  switch (def.agg) {
    case 'sum': return fmtNum(nums.reduce((a, b) => a + b, 0));
    case 'avg': return fmtNum(nums.reduce((a, b) => a + b, 0) / nums.length);
    case 'min': return fmtNum(Math.min(...nums));
    case 'max': return fmtNum(Math.max(...nums));
  }
  return '';
}

/** 1つのロールアップ定義について、子DBを引いて親キー→集計値マップを作る。 */
async function buildData(def: DbRollupDef): Promise<void> {
  try {
    const title = (await resolveListTitleById(def.childListId)) || def.childTitle;
    if (!title) { _data.set(def.id, new Map()); return; }
    const items = await getListItems(title);
    const groups = new Map<string, Array<Record<string, unknown>>>();
    for (const it of items) {
      const fk = val2str((it as Record<string, unknown>)[def.childForeignField]);
      if (fk === '') continue;
      const arr = groups.get(fk); if (arr) arr.push(it as Record<string, unknown>); else groups.set(fk, [it as Record<string, unknown>]);
    }
    const map = new Map<string, string>();
    for (const [k, rows] of groups) map.set(k, aggregate(def, rows));
    _data.set(def.id, map);
  } catch { _data.set(def.id, new Map()); }
}

/** DB を開いた時に呼ぶ: 共有設定からロールアップ定義を読み込み、子データを集計。 */
export async function loadRollups(listTitle: string): Promise<void> {
  try {
    const defs = (await loadDbConfig(listTitle)).rollups || [];
    _defs.set(listTitle, defs);
    await Promise.all(defs.map(buildData));
  } catch { _defs.set(listTitle, _defs.get(listTitle) || []); }
}

async function persist(listTitle: string): Promise<void> {
  await patchDbConfig(listTitle, { rollups: _defs.get(listTitle) || [] }).catch(() => undefined);
}

const AGG_LABEL: Record<DbRollupDef['agg'], string> = {
  count: '件数 (count)', sum: '合計 (sum)', avg: '平均 (avg)',
  min: '最小 (min)', max: '最大 (max)', join: '連結 (join)',
};

// ── エディタ ──
let _pop: HTMLElement | null = null;
export function closeRollupEditor(): void { if (_pop) { _pop.remove(); _pop = null; } }

export function openRollupEditor(listTitle: string, def: DbRollupDef | null, x: number, y: number, reload: () => void): void {
  closeRollupEditor();
  const overlay = document.getElementById('memola-overlay') || document.body;
  const pop = document.createElement('div');
  pop.className = 'memola-colmenu memola-formula-pop';
  pop.style.left = Math.round(Math.min(x, window.innerWidth - 380)) + 'px';
  pop.style.top = Math.round(y) + 'px';
  _pop = pop;

  const hdr = document.createElement('div');
  hdr.className = 'memola-colmenu-item';
  hdr.style.cssText = 'font-weight:600;color:var(--ink-3);cursor:default';
  hdr.textContent = def ? 'ロールアップ列を編集' : 'ロールアップ列を追加';
  pop.appendChild(hdr);

  const nameInp = document.createElement('input');
  nameInp.className = 'memola-formula-name';
  nameInp.placeholder = '列名';
  nameInp.value = def?.name || '';
  nameInp.addEventListener('keydown', (e) => e.stopPropagation());

  const mkSel = (): HTMLSelectElement => { const s = document.createElement('select'); s.className = 'memola-rule-f'; s.style.maxWidth = 'none'; s.style.width = '100%'; return s; };
  const labelled = (text: string, el: HTMLElement): HTMLElement => {
    const w = document.createElement('div'); w.style.cssText = 'display:flex;flex-direction:column;gap:3px;margin:2px 0';
    const l = document.createElement('label'); l.textContent = text; l.style.cssText = 'font-size:var(--fs-xs);color:var(--ink-3)';
    w.append(l, el); return w;
  };

  // 親(自)DBのキー列
  const keySel = mkSel();
  for (const f of S.dbFields) { const o = document.createElement('option'); o.value = f.InternalName; o.textContent = f.Title; if (f.InternalName === def?.parentKeyField) o.selected = true; keySel.appendChild(o); }

  // 子DB
  const childSel = mkSel();
  const dbPages = S.meta.pages.filter((p) => p.type === 'database' && p.list);
  { const o = document.createElement('option'); o.value = ''; o.textContent = '— 子DBを選択 —'; childSel.appendChild(o); }
  for (const p of dbPages) { const o = document.createElement('option'); o.value = p.list as string; o.textContent = (p.icon ? p.icon + ' ' : '') + (p.title || p.list); if (p.list === def?.childTitle) o.selected = true; childSel.appendChild(o); }

  // 子側: 親キーを持つ列 / 集計対象列
  const fkSel = mkSel();
  const targetSel = mkSel();
  const fillChildFields = async (title: string): Promise<void> => {
    fkSel.innerHTML = ''; targetSel.innerHTML = '';
    if (!title) return;
    try {
      // 管理用の内部列(Trashed/TrashedBy/Body_blocks)は候補に出さない。
      const { stripInternalDbFields } = await import('../api/db');
      const fields = stripInternalDbFields(await getListFields(title));
      for (const f of fields) {
        const a = document.createElement('option'); a.value = f.InternalName; a.textContent = f.Title; if (f.InternalName === def?.childForeignField) a.selected = true; fkSel.appendChild(a);
        const b = document.createElement('option'); b.value = f.InternalName; b.textContent = f.Title; if (f.InternalName === def?.targetField) b.selected = true; targetSel.appendChild(b);
      }
    } catch { /* 取得失敗時は空 */ }
  };
  childSel.addEventListener('change', () => { void fillChildFields(childSel.value); });
  if (def?.childTitle) void fillChildFields(def.childTitle);

  // 集計方法
  const aggSel = mkSel();
  (Object.keys(AGG_LABEL) as DbRollupDef['agg'][]).forEach((a) => {
    const o = document.createElement('option'); o.value = a; o.textContent = AGG_LABEL[a]; if (a === (def?.agg || 'count')) o.selected = true; aggSel.appendChild(o);
  });

  const help = document.createElement('div');
  help.className = 'memola-formula-help';
  help.textContent = '親(このDB)の「キー列」と一致する子DBの行をまとめ、「集計対象列」を選んだ方法で集計します(件数/合計/平均/最小/最大/連結)。子DBは改名・移動しても追従します。';

  const acts = document.createElement('div');
  acts.className = 'memola-formula-acts';
  const saveBtn = document.createElement('button');
  saveBtn.className = 'memola-btn p'; saveBtn.textContent = '保存';
  saveBtn.addEventListener('click', () => {
    const name = nameInp.value.trim() || 'ロールアップ';
    const childTitle = childSel.value;
    if (!childTitle) { toast('子DBを選択してください', 'err'); return; }
    if (!fkSel.value) { toast('子側の「親キー」列を選択してください', 'err'); return; }
    const agg = aggSel.value as DbRollupDef['agg'];
    if (agg !== 'count' && !targetSel.value) { toast('集計対象の列を選択してください', 'err'); return; }
    void (async () => {
      try {
        setLoad(true, '保存中...');
        const childListId = await resolveListIdByTitle(childTitle);
        const defs = listRollups(listTitle).slice();
        const next: DbRollupDef = {
          id: def?.id || newId(), name,
          parentKeyField: keySel.value, childListId, childTitle,
          childForeignField: fkSel.value, targetField: targetSel.value, agg,
        };
        const idx = defs.findIndex((d) => d.id === next.id);
        if (idx >= 0) defs[idx] = next; else defs.push(next);
        _defs.set(listTitle, defs);
        await persist(listTitle);
        await buildData(next);
        closeRollupEditor();
        reload();
      } catch (e) { toast('ロールアップ列の保存に失敗: ' + (e as Error).message, 'err'); }
      finally { setLoad(false); }
    })();
  });
  acts.appendChild(saveBtn);
  if (def) {
    const delBtn = document.createElement('button');
    delBtn.className = 'memola-btn ghost'; delBtn.textContent = '削除'; delBtn.style.color = 'var(--danger,#b8534a)';
    delBtn.addEventListener('click', () => {
      if (!confirm(`ロールアップ列「${def.name}」を削除しますか？`)) return;
      _defs.set(listTitle, listRollups(listTitle).filter((d) => d.id !== def.id));
      _data.delete(def.id);
      void persist(listTitle).then(() => { closeRollupEditor(); reload(); });
    });
    acts.appendChild(delBtn);
  }

  pop.append(nameInp, labelled('親(このDB)のキー列', keySel), labelled('子DB', childSel),
    labelled('子側: 親キーを持つ列', fkSel), labelled('集計対象の列', targetSel), labelled('集計方法', aggSel), help, acts);
  overlay.appendChild(pop);
  const r = pop.getBoundingClientRect();
  if (r.bottom > window.innerHeight - 8) pop.style.top = Math.max(8, window.innerHeight - r.height - 8) + 'px';
  nameInp.focus();
  const onOut = (e: MouseEvent): void => {
    if (_pop && !_pop.contains(e.target as Node)) { closeRollupEditor(); document.removeEventListener('mousedown', onOut, true); }
  };
  setTimeout(() => document.addEventListener('mousedown', onOut, true), 0);
}

/** ロールアップ列の定義を削除(共有設定にも反映)。 */
export async function deleteRollup(listTitle: string, id: string): Promise<void> {
  _defs.set(listTitle, listRollups(listTitle).filter((d) => d.id !== id));
  _data.delete(id);
  await persist(listTitle);
}

/** プログラム(AIスキャフォールド等)からロールアップ列を追加する。childTitle から
 *  GUID を解決して定義を保存し、集計データを構築する。 */
export async function addRollupSpec(listTitle: string, p: {
  name: string; parentKeyField: string; childTitle: string;
  childForeignField: string; targetField: string; agg: DbRollupDef['agg'];
}): Promise<void> {
  const childListId = await resolveListIdByTitle(p.childTitle).catch(() => '');
  const def: DbRollupDef = {
    id: newId(), name: p.name, parentKeyField: p.parentKeyField,
    childListId, childTitle: p.childTitle, childForeignField: p.childForeignField,
    targetField: p.targetField, agg: p.agg,
  };
  const defs = listRollups(listTitle).slice(); defs.push(def);
  _defs.set(listTitle, defs);
  await persist(listTitle);
  await buildData(def);
}

export function openNewRollup(x: number, y: number): void {
  openRollupEditor(S.dbList, null, x, y, () => {
    void import('./views-table').then((m) => {
      m.renderDbTable();
      const w = document.getElementById('memola-dt-wrap'); if (w) w.scrollLeft = w.scrollWidth;
    });
  });
}
