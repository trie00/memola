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

  // リレーションか参照かでUIを分ける。リレーションは内部実装(キー列)を見せず、
  // 「列名 / 相手DB / 選択肢にする列」だけのシンプルな設定にする。
  const relMode = def ? !!def.asLink : !!initialAsLink;

  const hdr = document.createElement('div');
  hdr.className = 'memola-colmenu-item';
  hdr.style.cssText = 'font-weight:600;color:var(--ink-3);cursor:default';
  hdr.textContent = relMode
    ? (def ? '🔗 リレーション列を編集' : '🔗 リレーション列を追加')
    : (def ? '参照列を編集' : '参照列を追加');
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

  // 参照(lookup)モードのみ: 自DBのキー列(照合に使う自分の列)。
  // 「➕ 新しい列を作成」で実体のテキスト列をこの列名で作ることもできる。
  // リレーションモードではこの配管は見せない(新規=列名で自動作成 / 編集=固定)。
  const NEW_COL = '__new__';
  const keySel = mkSel();
  if (!relMode) {
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
  }

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

  const help = document.createElement('div');
  help.className = 'memola-formula-help';
  help.textContent = relMode
    ? 'セルをクリックすると、相手DBの行(「選択肢にする列」の値)から選べる列になります。'
      + (def ? '' : '列は上の列名で新しく作成されます。') + '相手DBに行を足せば選択肢にも自動で反映されます。'
    : '自DBの「キー列」の値を、対象DBの「キー列」から探して「返す列」の値を表示します(先頭一致)。対象DBは改名・移動しても追従します。';

  const acts = document.createElement('div');
  acts.className = 'memola-formula-acts';
  const saveBtn = document.createElement('button');
  saveBtn.className = 'memola-btn p'; saveBtn.textContent = '保存';
  saveBtn.addEventListener('click', () => {
    const name = nameInp.value.trim() || (relMode ? 'リレーション' : '参照');
    const targetTitle = targetSel.value;
    if (!targetTitle) { toast('相手DBを選択してください', 'err'); return; }
    if (!tKeySel.value) { toast(relMode ? '選択肢にする列を選択してください' : '対象のキー列を選択してください', 'err'); return; }
    if (!relMode && !tRetSel.value) { toast('返す列を選択してください', 'err'); return; }
    void (async () => {
      try {
        setLoad(true, '保存中...');
        // 実体のキー列を決める。
        //  - リレーション新規: 列名で新しいテキスト列を自動作成(配管は見せない)。
        //  - リレーション編集: 既存の実体列のまま。
        //  - 参照: キー列セレクト(「➕ 新しい列を作成」を選んだら作成)。
        let keyField = relMode ? (def?.keyField || NEW_COL) : keySel.value;
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
          // リレーションは「選択肢にする列」=照合列=チップ表示列(1つの選択で完結)。
          targetKeyField: tKeySel.value,
          returnField: relMode ? tKeySel.value : tRetSel.value,
          asLink: relMode,
        };
        const idx = defs.findIndex((d) => d.id === next.id);
        if (idx >= 0) defs[idx] = next; else defs.push(next);
        _defs.set(listTitle, defs);
        await persist(listTitle);
        await buildData(next);
        closeLookupEditor();
        reload();
      } catch (e) { toast((relMode ? 'リレーション列' : '参照列') + 'の保存に失敗: ' + (e as Error).message, 'err'); }
      finally { setLoad(false); }
    })();
  });
  acts.appendChild(saveBtn);
  if (def) {
    const delBtn = document.createElement('button');
    delBtn.className = 'memola-btn ghost'; delBtn.textContent = '削除'; delBtn.style.color = 'var(--danger,#b8534a)';
    delBtn.addEventListener('click', () => {
      const kindLabel = relMode ? 'リレーション列' : '参照列';
      if (!confirm(`${kindLabel}「${def.name}」を削除しますか？` + (relMode ? '\n(実体のテキスト列とデータは残ります)' : ''))) return;
      _defs.set(listTitle, listLookups(listTitle).filter((d) => d.id !== def.id));
      _data.delete(def.id); _idData.delete(def.id);
      void persist(listTitle).then(() => { closeLookupEditor(); reload(); });
    });
    acts.appendChild(delBtn);
  }

  if (relMode) {
    // リレーション: 列名 / 相手DB / 選択肢にする列 のみ(内部のキー列は見せない)。
    // 編集時は実体列を参考表示。
    pop.append(nameInp, labelled('相手DB(マスター)', targetSel),
      labelled('選択肢にする列(相手DB)', tKeySel));
    if (def) {
      const bound = S.dbFields.find((f) => f.InternalName === def.keyField);
      const info = document.createElement('div');
      info.className = 'memola-formula-help';
      info.textContent = '実体列: ' + (bound?.Title || def.keyField) + '（この列に選択値が保存されます）';
      pop.appendChild(info);
    }
    pop.append(help, acts);
  } else {
    pop.append(nameInp, labelled('自DBのキー列', keySel), labelled('対象DB', targetSel),
      labelled('対象のキー列', tKeySel), labelled('返す列', tRetSel), help, acts);
  }
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
