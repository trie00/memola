// DB「参照(XLOOKUP)」列のモデル + エディタ。
//   - 自DBのキー列の値を、対象DBのキー列から探して「返す列」の値を表示(先頭一致)。
//   - 値は保存せず描画時に評価する読み取り専用列。定義は共有(memola-db-config)。
//   - 対象DBは GUID(targetListId)で参照 → 対象DBの改名/ツリー移動に強い。

import { S } from '../state';
import type { DbLookupDef } from '../lib/prefs';
import { loadDbConfig, patchDbConfig } from '../api/db-config';
import { getListFields, getListItems, resolveListIdByTitle, resolveListTitleById, addListField } from '../api/sp-list';
import { setLoad, toast } from './ui-helpers';

// 定義キャッシュ(現在開いている DB ごと)と、対象データの照合マップ(def.id → key→value)。
const _defs = new Map<string, DbLookupDef[]>();
const _data = new Map<string, Map<string, string>>();
const _idData = new Map<string, Map<string, number>>();   // def.id → key値 → 対象行のItemId(リレーションのリンク先)

function newId(): string { return 'lk' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36); }
function val2str(v: unknown): string {
  if (v == null) return '';
  if (typeof v === 'object') { const o = v as Record<string, unknown>; return String(o.Title ?? o.Label ?? o.Value ?? ''); }
  return String(v);
}

export function listLookups(listTitle: string): DbLookupDef[] { return _defs.get(listTitle) || []; }
export function getLookupValue(defId: string, keyValue: unknown): string {
  return _data.get(defId)?.get(val2str(keyValue)) ?? '';
}
/** リレーション(asLink)の選択肢 = 相手DBの照合キー列の値一覧(ロード済みデータから)。
 *  セルのピッカーが「相手DBの行から選ぶ」ために使う。 */
export function getRelationOptions(defId: string): string[] {
  const m = _data.get(defId);
  return m ? [...m.keys()] : [];
}

/** 指定列(keyField)をピッカー対象にしているリレーション定義を返す(無ければ null)。 */
export function relationForKeyField(listTitle: string, internalName: string): DbLookupDef | null {
  return (listLookups(listTitle).find((d) => d.asLink && d.keyField === internalName)) || null;
}

/** リレーション(asLink)時のリンク先: 対象行の ItemId。無ければ null。 */
export function getLookupTargetId(defId: string, keyValue: unknown): number | null {
  const id = _idData.get(defId)?.get(val2str(keyValue));
  return typeof id === 'number' ? id : null;
}
/** クリックされたリレーションチップから対象行ページを開く。 */
export async function openLookupTarget(def: DbLookupDef, keyValue: unknown): Promise<void> {
  const itemId = getLookupTargetId(def.id, keyValue);
  if (!itemId) return;
  const title = (await resolveListTitleById(def.targetListId)) || def.targetTitle;
  if (!title) return;
  const dbPage = S.meta.pages.find((p) => p.type === 'database' && p.list === title);
  if (!dbPage) { toast('対象DBがツリーに見つかりません', 'err'); return; }
  const { getListItemById } = await import('../api/sp-list');
  const item = await getListItemById(title, itemId);
  if (item) { const { openRowAsPage } = await import('./row-page'); await openRowAsPage(dbPage.id, item); }
}

/** 1つの参照定義について、対象DBを引いて key→value マップを作る。 */
async function buildData(def: DbLookupDef): Promise<void> {
  try {
    const title = (await resolveListTitleById(def.targetListId)) || def.targetTitle;
    if (!title) { _data.set(def.id, new Map()); return; }
    const items = await getListItems(title);
    const map = new Map<string, string>();
    const idMap = new Map<string, number>();
    for (const it of items) {
      const rec = it as Record<string, unknown>;
      const k = val2str(rec[def.targetKeyField]);
      if (k === '' || map.has(k)) continue;               // 先頭一致を採用
      map.set(k, val2str(rec[def.returnField]));
      const id = rec.Id; if (typeof id === 'number') idMap.set(k, id);
    }
    _data.set(def.id, map);
    _idData.set(def.id, idMap);
  } catch { _data.set(def.id, new Map()); _idData.set(def.id, new Map()); }
}

/** DB を開いた時に呼ぶ: 共有設定から参照定義を読み込み、対象データを取得。 */
export async function loadLookups(listTitle: string): Promise<void> {
  try {
    const defs = (await loadDbConfig(listTitle)).lookups || [];
    _defs.set(listTitle, defs);
    await Promise.all(defs.map(buildData));
  } catch { _defs.set(listTitle, _defs.get(listTitle) || []); }
}

async function persist(listTitle: string): Promise<void> {
  await patchDbConfig(listTitle, { lookups: _defs.get(listTitle) || [] }).catch(() => undefined);
}

// ── エディタ ──
let _pop: HTMLElement | null = null;
export function closeLookupEditor(): void { if (_pop) { _pop.remove(); _pop = null; } }

/** 参照列の作成/編集。def=null で新規。保存/削除後に reload を呼ぶ。
 *  initialName/initialAsLink は新規時の初期値(列追加モーダルで入力済みの列名を引き継ぐ)。 */
export function openLookupEditor(listTitle: string, def: DbLookupDef | null, x: number, y: number, reload: () => void, initialName?: string, initialAsLink?: boolean): void {
  closeLookupEditor();
  const overlay = document.getElementById('memola-overlay') || document.body;
  const pop = document.createElement('div');
  pop.className = 'memola-colmenu memola-formula-pop';
  pop.style.left = Math.round(Math.min(x, window.innerWidth - 380)) + 'px';
  pop.style.top = Math.round(y) + 'px';
  _pop = pop;

  const hdr = document.createElement('div');
  hdr.className = 'memola-colmenu-item';
  hdr.style.cssText = 'font-weight:600;color:var(--ink-3);cursor:default';
  hdr.textContent = def ? '参照列を編集' : '参照列を追加';
  pop.appendChild(hdr);

  const nameInp = document.createElement('input');
  nameInp.className = 'memola-formula-name';
  nameInp.placeholder = '列名';
  nameInp.value = def?.name || initialName || '';
  nameInp.addEventListener('keydown', (e) => e.stopPropagation());

  const mkSel = (): HTMLSelectElement => { const s = document.createElement('select'); s.className = 'memola-rule-f'; s.style.maxWidth = 'none'; s.style.width = '100%'; return s; };
  const labelled = (text: string, el: HTMLElement): HTMLElement => {
    const w = document.createElement('div'); w.style.cssText = 'display:flex;flex-direction:column;gap:3px;margin:2px 0';
    const l = document.createElement('label'); l.textContent = text; l.style.cssText = 'font-size:var(--fs-xs);color:var(--ink-3)';
    w.append(l, el); return w;
  };

  // 自DBのキー列。新規作成時は「➕ 新しい列を作成」も選べる(リレーション/参照の
  // 実体となるテキスト列をこの列名で作る)。列追加モーダル経由(initialName あり)では
  // それを既定にする=「列を追加したのに列が増えない」を防ぐ。
  const NEW_COL = '__new__';
  const keySel = mkSel();
  if (!def) {
    const o = document.createElement('option'); o.value = NEW_COL;
    o.textContent = '➕ 新しい列を作成（上の列名で）';
    keySel.appendChild(o);
  }
  const nameMatchesExisting = !!initialName && S.dbFields.some((f) => f.Title === initialName || f.InternalName === initialName);
  for (const f of S.dbFields) {
    const o = document.createElement('option'); o.value = f.InternalName; o.textContent = f.Title;
    if (def ? f.InternalName === def.keyField
      : (nameMatchesExisting && (f.Title === initialName || f.InternalName === initialName))) o.selected = true;
    keySel.appendChild(o);
  }
  if (!def && initialName && !nameMatchesExisting) keySel.value = NEW_COL;

  // 対象DB(データベースページ一覧)
  const targetSel = mkSel();
  const dbPages = S.meta.pages.filter((p) => p.type === 'database' && p.list);
  { const o = document.createElement('option'); o.value = ''; o.textContent = '— 対象DBを選択 —'; targetSel.appendChild(o); }
  for (const p of dbPages) { const o = document.createElement('option'); o.value = p.list as string; o.textContent = (p.icon ? p.icon + ' ' : '') + (p.title || p.list); if (p.list === def?.targetTitle) o.selected = true; targetSel.appendChild(o); }

  // 対象のキー列 / 返す列(対象DB選択後に取得)
  const tKeySel = mkSel();
  const tRetSel = mkSel();
  const fillTargetFields = async (title: string): Promise<void> => {
    tKeySel.innerHTML = ''; tRetSel.innerHTML = '';
    if (!title) return;
    try {
      // 管理用の内部列(Trashed/TrashedBy/Body_blocks)は候補に出さない。
      const { stripInternalDbFields } = await import('../api/db');
      const fields = stripInternalDbFields(await getListFields(title));
      // 対象のキー列: 全列から選べる(同値が複数あれば先頭一致)。ユニーク(重複禁止)
      // 列には★印を付けて推奨を示す(以前はユニーク限定だったが、制約未設定の
      // マスターで選べず詰まるため緩和)。ユニーク列を先頭に並べる。
      const sorted = [...fields].sort((a, b) => Number(!!b.Unique) - Number(!!a.Unique));
      for (const f of sorted) {
        const a = document.createElement('option');
        a.value = f.InternalName;
        a.textContent = (f.Unique ? '★ ' : '') + f.Title + (f.Unique ? '（ユニーク）' : '');
        if (f.InternalName === def?.targetKeyField) a.selected = true;
        tKeySel.appendChild(a);
      }
      for (const f of fields) {
        const b = document.createElement('option'); b.value = f.InternalName; b.textContent = f.Title; if (f.InternalName === def?.returnField) b.selected = true; tRetSel.appendChild(b);
      }
    } catch { /* 取得失敗時は空 */ }
  };
  targetSel.addEventListener('change', () => { void fillTargetFields(targetSel.value); });
  if (def?.targetTitle) void fillTargetFields(def.targetTitle);

  // リレーション表示(値ではなく対象行へのリンクチップ)
  const linkWrap = document.createElement('label');
  linkWrap.style.cssText = 'display:flex;align-items:center;gap:6px;margin:4px 0;font-size:var(--fs-sm);cursor:pointer';
  const linkChk = document.createElement('input'); linkChk.type = 'checkbox'; linkChk.checked = def ? !!def.asLink : !!initialAsLink;
  linkWrap.append(linkChk, document.createTextNode('リンクとして表示(リレーション=クリックで相手行を開く)'));

  const help = document.createElement('div');
  help.className = 'memola-formula-help';
  help.textContent = '自DBの「キー列」の値を、対象DBの「キー列」から探して「返す列」の値を表示します(先頭一致)。「リンクとして表示」をオンにすると、値の代わりに相手行へのリンク(リレーション)になります。対象DBは改名・移動しても追従します。';

  const acts = document.createElement('div');
  acts.className = 'memola-formula-acts';
  const saveBtn = document.createElement('button');
  saveBtn.className = 'memola-btn p'; saveBtn.textContent = '保存';
  saveBtn.addEventListener('click', () => {
    const name = nameInp.value.trim() || '参照';
    const targetTitle = targetSel.value;
    if (!targetTitle) { toast('対象DBを選択してください', 'err'); return; }
    if (!tKeySel.value || !tRetSel.value) { toast('対象のキー列と返す列を選択してください', 'err'); return; }
    void (async () => {
      try {
        setLoad(true, '保存中...');
        // 「➕ 新しい列を作成」: リレーション/参照のキーとなるテキスト列を列名で作る。
        let keyField = keySel.value;
        if (keyField === NEW_COL) {
          await addListField(listTitle, name, 2);
          const fields = await getListFields(listTitle);
          keyField = fields.find((f) => f.Title === name)?.InternalName || name;
          // 開いているDBのスキーマを更新(再描画で新列が出るように)。
          if (S.dbList === listTitle) {
            const { stripInternalDbFields } = await import('../api/db');
            S.dbFields = stripInternalDbFields(fields);
          }
        }
        const targetListId = await resolveListIdByTitle(targetTitle);
        const defs = listLookups(listTitle).slice();
        const next: DbLookupDef = {
          id: def?.id || newId(), name,
          keyField, targetListId, targetTitle,
          targetKeyField: tKeySel.value, returnField: tRetSel.value,
          asLink: linkChk.checked,
        };
        const idx = defs.findIndex((d) => d.id === next.id);
        if (idx >= 0) defs[idx] = next; else defs.push(next);
        _defs.set(listTitle, defs);
        await persist(listTitle);
        await buildData(next);
        closeLookupEditor();
        reload();
      } catch (e) { toast('参照列の保存に失敗: ' + (e as Error).message, 'err'); }
      finally { setLoad(false); }
    })();
  });
  acts.appendChild(saveBtn);
  if (def) {
    const delBtn = document.createElement('button');
    delBtn.className = 'memola-btn ghost'; delBtn.textContent = '削除'; delBtn.style.color = 'var(--danger,#b8534a)';
    delBtn.addEventListener('click', () => {
      if (!confirm(`参照列「${def.name}」を削除しますか？`)) return;
      _defs.set(listTitle, listLookups(listTitle).filter((d) => d.id !== def.id));
      _data.delete(def.id); _idData.delete(def.id);
      void persist(listTitle).then(() => { closeLookupEditor(); reload(); });
    });
    acts.appendChild(delBtn);
  }

  pop.append(nameInp, labelled('自DBのキー列', keySel), labelled('対象DB', targetSel),
    labelled('対象のキー列', tKeySel), labelled('返す列(リンク時は表示する列)', tRetSel), linkWrap, help, acts);
  overlay.appendChild(pop);
  const r = pop.getBoundingClientRect();
  if (r.bottom > window.innerHeight - 8) pop.style.top = Math.max(8, window.innerHeight - r.height - 8) + 'px';
  nameInp.focus();
  const onOut = (e: MouseEvent): void => {
    if (_pop && !_pop.contains(e.target as Node)) { closeLookupEditor(); document.removeEventListener('mousedown', onOut, true); }
  };
  setTimeout(() => document.addEventListener('mousedown', onOut, true), 0);
}

function reloadTable(): void {
  void import('./views-table').then((m) => {
    m.renderDbTable();
    const w = document.getElementById('memola-dt-wrap'); if (w) w.scrollLeft = w.scrollWidth;
  });
}

/** 新規参照列エディタを開く(S.dbList 対象)。name=列追加モーダルで入力済みの列名。 */
export function openNewLookup(x: number, y: number, name?: string): void {
  openLookupEditor(S.dbList, null, x, y, reloadTable, name, false);
}

/** リレーション/参照列の定義を削除(共有設定にも反映)。 */
export async function deleteLookup(listTitle: string, id: string): Promise<void> {
  _defs.set(listTitle, listLookups(listTitle).filter((d) => d.id !== id));
  _data.delete(id); _idData.delete(id);
  await persist(listTitle);
}

/** プログラム(AIスキャフォールド等)からリレーション/参照列を追加する。 */
export async function addLookupSpec(listTitle: string, p: {
  name: string; keyField: string; targetTitle: string;
  targetKeyField: string; returnField: string; asLink?: boolean;
}): Promise<void> {
  const targetListId = await resolveListIdByTitle(p.targetTitle).catch(() => '');
  const def: DbLookupDef = {
    id: newId(), name: p.name, keyField: p.keyField, targetListId,
    targetTitle: p.targetTitle, targetKeyField: p.targetKeyField,
    returnField: p.returnField, asLink: !!p.asLink,
  };
  const defs = listLookups(listTitle).slice(); defs.push(def);
  _defs.set(listTitle, defs);
  await persist(listTitle);
  await buildData(def);
}

/** 新規リレーション列エディタ(asLink 既定オン)を開く。name=列追加モーダルの列名。 */
export function openNewRelation(x: number, y: number, name?: string): void {
  openLookupEditor(S.dbList, null, x, y, reloadTable, name, true);
}
