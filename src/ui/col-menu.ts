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

  const sortBy = (asc: boolean): void => {
    S.dbSort.field = field.InternalName; S.dbSort.asc = asc;
    void import('./db-views-model').then((m) => m.patchView(S.dbList, S.dbViewId, { sort: { field: S.dbSort.field, asc: S.dbSort.asc } }));
    void reRender();
  };
  menu.append(
    item('ℹ️ プロパティ', () => { void showColumnProps(field, x, y); }),
    item('列名を変更', () => startColRename(field)),
    item('💬 コメント', () => {
      void (async () => {
        const { metaById } = await import('../lib/page-store');
        const scope = metaById(S.currentId)?.scope === 'org' ? 'org' : 'user';
        const m = await import('./comments-ui');
        await m.openColumnComment(S.dbList, scope, field.InternalName, field.Title);
      })();
    }),
    sep(),
    item('↑ 昇順で並べ替え', () => sortBy(true)),
    item('↓ 降順で並べ替え', () => sortBy(false)),
    item('フィルター', () => { void import('./filter-ui').then((m) => m.addFilterForField(field.InternalName)); }),
  );

  // Choice 列: 選択肢の編集(追加/改名/削除/色)を1つのエディタに集約。
  if (field.FieldTypeKind === 6) {
    menu.append(item('選択肢を編集', () => openOptionsEditor(field, x, y)));
  }

  // ユニーク(重複禁止)トグル — 対応型のみ(テキスト/日付/選択単一/数値)。
  if ([2, 4, 6, 9].includes(field.FieldTypeKind)) {
    menu.append(item((field.Unique ? '☑' : '☐') + ' ユニーク（重複禁止）', () => {
      void (async () => {
        try {
          setLoad(true, 'ユニーク設定を変更中...');
          const { setFieldUnique } = await import('../api/sp-list');
          await setFieldUnique(S.dbList, field.InternalName, !field.Unique);
          await reloadDb();
          toast(field.Unique ? 'ユニークを解除しました' : 'ユニーク（重複禁止）にしました', 'ok');
        } catch (e) { toast('ユニーク設定の変更に失敗(既存の重複値がある可能性): ' + (e as Error).message, 'err'); }
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

// ── 計算列(数式/参照/集計)の列メニュー ──
// 通常列と同じ操作感(並べ替え/フィルター/削除)+「編集」で各エディタを開く。
// ソート/フィルタのキーは '#f:'/'#l:'/'#r:' + 定義id(views-table が値を算出)。
import type { DbFormulaDef, DbLookupDef, DbRollupDef } from '../lib/prefs';
export type ComputedColKind = 'formula' | 'lookup' | 'rollup';

export function openComputedColumnMenu(
  kind: ComputedColKind,
  def: DbFormulaDef | DbLookupDef | DbRollupDef,
  x: number, y: number,
): void {
  closeColumnMenu();
  const overlay = document.getElementById('memola-overlay');
  if (!overlay) return;
  const key = (kind === 'formula' ? '#f:' : kind === 'lookup' ? '#l:' : '#r:') + def.id;
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

  const sortBy = (asc: boolean): void => {
    S.dbSort.field = key; S.dbSort.asc = asc;
    void import('./db-views-model').then((m) => m.patchView(S.dbList, S.dbViewId, { sort: { field: key, asc } }));
    void reRender();
  };
  const openEditor = (): void => {
    if (kind === 'formula') {
      void import('./db-formulas').then((m) => m.openFormulaEditor(S.dbList, def as DbFormulaDef, x, y, () => void reRender()));
    } else if (kind === 'lookup') {
      void import('./db-lookups').then((m) => m.openLookupEditor(S.dbList, def as DbLookupDef, x, y, () => void reRender()));
    } else {
      void import('./db-rollups').then((m) => m.openRollupEditor(S.dbList, def as DbRollupDef, x, y, () => void reRender()));
    }
  };

  menu.append(
    item('✏️ 編集', openEditor),
    sep(),
    item('↑ 昇順で並べ替え', () => sortBy(true)),
    item('↓ 降順で並べ替え', () => sortBy(false)),
    item('フィルター', () => { void import('./filter-ui').then((m) => m.addFilterForField(key)); }),
    sep(),
    item('🗑 列を削除', () => {
      if (!confirm(`列「${def.name}」を削除しますか？(定義のみ削除。元データは消えません)`)) return;
      void (async () => {
        try {
          setLoad(true, '列を削除中...');
          if (kind === 'formula') {
            const m = await import('./db-formulas'); m.deleteFormula(S.dbList, def.id);
          } else if (kind === 'lookup') {
            const m = await import('./db-lookups'); await m.deleteLookup(S.dbList, def.id);
          } else {
            const m = await import('./db-rollups'); await m.deleteRollup(S.dbList, def.id);
          }
          // この列でソート/フィルタ中なら解除しておく(幽霊キー防止)。
          if (S.dbSort.field === key) S.dbSort.field = null;
          S.dbFilters = S.dbFilters.filter((f) => f.field !== key);
          await reRender();
          toast('列を削除しました', 'ok');
        } catch (e) { toast('列の削除に失敗: ' + (e as Error).message, 'err'); }
        finally { setLoad(false); }
      })();
    }, { danger: true }),
  );

  overlay.appendChild(menu);
  const r = menu.getBoundingClientRect();
  if (r.right > window.innerWidth - 8) menu.style.left = Math.max(8, window.innerWidth - r.width - 8) + 'px';
  if (r.bottom > window.innerHeight - 8) menu.style.top = Math.max(8, y - r.height) + 'px';
  _outside = (e: MouseEvent): void => { if (_menu && !_menu.contains(e.target as Node)) closeColumnMenu(); };
  setTimeout(() => { if (_outside) document.addEventListener('mousedown', _outside, true); }, 0);
  _menu = menu;
}

const KIND_LABEL: Record<number, string> = {
  2: 'テキスト', 3: '複数行テキスト', 4: '日付', 6: '選択肢', 8: 'チェック', 9: '数値', 20: '担当者',
};

/** 列のプロパティ(型/ユニーク/選択肢/リレーション参照先など)を表示する読み取り専用パネル。 */
async function showColumnProps(field: ListField, x: number, y: number): Promise<void> {
  const overlay = document.getElementById('memola-overlay') || document.body;
  document.getElementById('memola-colprops')?.remove();
  const pop = document.createElement('div');
  pop.id = 'memola-colprops';
  pop.className = 'memola-colmenu memola-colprops';
  pop.style.left = Math.round(x) + 'px';
  pop.style.top = Math.round(y) + 'px';

  const row = (label: string, value: string): HTMLElement => {
    const r = document.createElement('div');
    r.className = 'memola-colprops-row';
    const l = document.createElement('span'); l.className = 'memola-colprops-k'; l.textContent = label;
    const v = document.createElement('span'); v.className = 'memola-colprops-v'; v.textContent = value;
    r.append(l, v); return r;
  };

  const hdr = document.createElement('div');
  hdr.className = 'memola-colmenu-item';
  hdr.style.cssText = 'font-weight:600;color:var(--ink-3);cursor:default';
  hdr.textContent = 'ℹ️ 列のプロパティ';
  pop.appendChild(hdr);

  pop.appendChild(row('列名', field.Title));
  pop.appendChild(row('型', KIND_LABEL[field.FieldTypeKind] || ('種別 ' + field.FieldTypeKind)));
  if ([2, 4, 6, 9].includes(field.FieldTypeKind)) {
    pop.appendChild(row('ユニーク', field.Unique ? 'あり（重複禁止）' : 'なし'));
  }
  if (field.FieldTypeKind === 6 && field.Choices) {
    pop.appendChild(row('選択肢', field.Choices.join(' / ')));
  }

  // この列がリレーションの照合キーなら、参照先の情報も表示。
  try {
    const { relationForKeyField } = await import('./db-lookups');
    const rel = relationForKeyField(S.dbList, field.InternalName);
    if (rel) {
      const dbPage = S.meta.pages.find((p) => p.type === 'database' && p.list === rel.targetTitle);
      pop.appendChild(row('リレーション', '🔗 ' + rel.name));
      pop.appendChild(row('参照先DB', dbPage?.title || rel.targetTitle));
      // 参照先の列は表示名に解決して見せる(内部名は日本語列だと読めないため)。
      try {
        const { getListFields } = await import('../api/sp-list');
        const tFields = await getListFields(rel.targetTitle);
        const disp = (internal: string): string => tFields.find((f) => f.InternalName === internal)?.Title || internal;
        pop.appendChild(row('照合列(相手)', disp(rel.targetKeyField)));
        pop.appendChild(row('表示列(相手)', disp(rel.returnField)));
      } catch { /* 解決できなければ省略 */ }
    }
  } catch { /* ignore */ }

  overlay.appendChild(pop);
  const r = pop.getBoundingClientRect();
  if (r.right > window.innerWidth - 8) pop.style.left = Math.max(8, window.innerWidth - r.width - 8) + 'px';
  if (r.bottom > window.innerHeight - 8) pop.style.top = Math.max(8, window.innerHeight - r.height - 8) + 'px';
  const onOut = (e: MouseEvent): void => {
    if (!pop.contains(e.target as Node)) { pop.remove(); document.removeEventListener('mousedown', onOut, true); }
  };
  setTimeout(() => document.addEventListener('mousedown', onOut, true), 0);
}

/** 列ヘッダをその場でインライン編集して列名(表示名)を変更。タイトル列も可。 */
function startColRename(field: ListField): void {
  const sel = '#memola-dt th[data-field="' + CSS.escape(field.InternalName) + '"]';
  const th = document.querySelector<HTMLElement>(sel);
  if (!th) return;
  const inp = document.createElement('input');
  inp.className = 'memola-colrename-inp';
  inp.value = field.Title;
  th.innerHTML = '';
  th.appendChild(inp);
  inp.focus(); inp.select();
  let done = false;
  const restore = (): void => { void reRender(); };
  const commit = (): void => {
    if (done) return; done = true;
    const nv = inp.value.trim();
    if (!nv || nv === field.Title) { restore(); return; }
    void (async () => {
      try {
        setLoad(true, '列名を変更中...');
        const { renameListField } = await import('../api/sp-list');
        await renameListField(S.dbList, field.InternalName, nv);
        await reloadDb();
        toast('列名を変更しました', 'ok');
      } catch (e) { toast('列名の変更に失敗: ' + (e as Error).message, 'err'); restore(); }
      finally { setLoad(false); }
    })();
  };
  inp.addEventListener('keydown', (e) => {
    e.stopPropagation();   // ESC/Enter をグローバルキーマップに伝播させない(アプリ終了確認防止)
    if (e.key === 'Enter') { e.preventDefault(); inp.blur(); }
    if (e.key === 'Escape') { e.preventDefault(); done = true; restore(); }
  });
  inp.addEventListener('blur', commit);
}

// 未指定の選択肢に割り当たるプリセット色(memola-sc-0..5 と同じ)。
const SC_COLORS = ['#e8e4d8', '#dde6dc', '#dce2e6', '#e8dccf', '#f0d8d2', '#f0e3ef'];

/** Notion 風の選択肢エディタ: 追加 / 改名 / 削除 / 色(デフォルト色も表示)。
 *  画面上部の白枠入力ボックス(列追加モーダル)は使わず、この場で完結。 */
function openOptionsEditor(field: ListField, x: number, y: number): void {
  closeColumnMenu();
  const overlay = document.getElementById('memola-overlay');
  if (!overlay) return;
  const menu = document.createElement('div');
  menu.className = 'memola-colmenu memola-optedit';
  menu.style.left = Math.round(x) + 'px';
  menu.style.top = Math.round(y) + 'px';

  const choices = [...(field.Choices || [])];
  const colKey = (opt: string): string => SC_COLORS[Math.max(0, choices.indexOf(opt)) % 6];

  const hdr = document.createElement('div');
  hdr.className = 'memola-colmenu-item';
  hdr.style.cssText = 'font-weight:600;color:var(--ink-3);cursor:default';
  hdr.textContent = '選択肢を編集';
  menu.appendChild(hdr);
  menu.appendChild(Object.assign(document.createElement('div'), { className: 'memola-colmenu-sep' }));

  void (async () => {
    const [{ getTagColor, setTagColor }, { openColorPalette }, { updateListFieldChoices }, { apiUpdateDbRow }] =
      await Promise.all([import('./tag-colors'), import('./db-view-colors'), import('../api/sp-list'), import('../api/db')]);
    const dataKey = field.Title || field.InternalName;

    // 構造変更後: SP の選択肢を更新 → DB を開き直してエディタを再表示。
    const commit = async (next: string[], migrate?: () => Promise<void>): Promise<void> => {
      try {
        setLoad(true, '選択肢を更新中...');
        if (migrate) await migrate();
        await updateListFieldChoices(S.dbList, field.InternalName, next);
        await reloadDb();
        const fresh = S.dbFields.find((f) => f.InternalName === field.InternalName);
        if (fresh) openOptionsEditor(fresh, x, y);   // 最新の選択肢で再表示
      } catch (e) { toast('選択肢の更新に失敗: ' + (e as Error).message, 'err'); }
      finally { setLoad(false); }
    };
    const rowsWithVal = (v: string): Array<{ Id: number }> =>
      S.dbItems.filter((it) => (it[field.InternalName] as string) === v) as Array<{ Id: number }>;

    for (const opt of choices) {
      const row = document.createElement('div');
      row.className = 'memola-optedit-row';
      // 色スウォッチ(上書き色 or デフォルト色)
      const sw = document.createElement('button');
      sw.className = 'memola-optedit-sw';
      sw.title = '色を変更';
      sw.style.background = getTagColor(S.dbList, field.InternalName, opt) || colKey(opt);
      sw.addEventListener('click', (e) => {
        e.stopPropagation();
        const r = sw.getBoundingClientRect();
        openColorPalette(r.right + 4, r.top, (color) => {
          setTagColor(S.dbList, field.InternalName, opt, color);
          sw.style.background = color || colKey(opt);
          void reRender();
        });
      });
      // 改名(テキスト入力)
      const inp = document.createElement('input');
      inp.className = 'memola-optedit-inp';
      inp.value = opt;
      const rename = (): void => {
        const nv = inp.value.trim();
        if (!nv || nv === opt) { inp.value = opt; return; }
        if (choices.includes(nv)) { toast('同じ選択肢が既にあります'); inp.value = opt; return; }
        const next = choices.map((c) => (c === opt ? nv : c));
        void commit(next, async () => {
          // 既存行の値を改名先へ移行 + タグ色キーを引き継ぎ
          for (const it of rowsWithVal(opt)) await apiUpdateDbRow(S.dbList, it.Id, { [dataKey]: nv });
          const ov = getTagColor(S.dbList, field.InternalName, opt);
          if (ov) { setTagColor(S.dbList, field.InternalName, nv, ov); setTagColor(S.dbList, field.InternalName, opt, ''); }
        });
      };
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); inp.blur(); } });
      inp.addEventListener('blur', rename);
      // 削除
      const del = document.createElement('button');
      del.className = 'memola-optedit-del';
      del.textContent = '×'; del.title = '削除';
      del.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!confirm(`選択肢「${opt}」を削除しますか？(この選択肢の値は空になります)`)) return;
        const next = choices.filter((c) => c !== opt);
        void commit(next, async () => {
          for (const it of rowsWithVal(opt)) await apiUpdateDbRow(S.dbList, it.Id, { [dataKey]: '' });
          setTagColor(S.dbList, field.InternalName, opt, '');
        });
      });
      row.append(sw, inp, del);
      menu.appendChild(row);
    }

    // 追加行
    menu.appendChild(Object.assign(document.createElement('div'), { className: 'memola-colmenu-sep' }));
    const addRow = document.createElement('div');
    addRow.className = 'memola-optedit-row';
    const addInp = document.createElement('input');
    addInp.className = 'memola-optedit-inp';
    addInp.placeholder = '＋ 新しい選択肢';
    const doAdd = (): void => {
      const v = addInp.value.trim();
      if (!v) return;
      if (choices.includes(v)) { toast('同じ選択肢が既にあります'); return; }
      void commit([...choices, v]);
    };
    addInp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); doAdd(); } });
    addRow.appendChild(addInp);
    menu.appendChild(addRow);
  })();

  overlay.appendChild(menu);
  const r = menu.getBoundingClientRect();
  if (r.right > window.innerWidth - 8) menu.style.left = Math.max(8, window.innerWidth - r.width - 8) + 'px';
  if (r.bottom > window.innerHeight - 8) menu.style.top = Math.max(8, window.innerHeight - r.height - 8) + 'px';
  _outside = (e: MouseEvent): void => { if (_menu && !_menu.contains(e.target as Node)) closeColumnMenu(); };
  setTimeout(() => { if (_outside) document.addEventListener('mousedown', _outside, true); }, 0);
  _menu = menu;
}
