// DB ビューのモデル(リスト単位で複数ビューを保持)。
//   - 既定ビュー(__default__): テーブル・削除不可・行の色機能なし。
//   - ユーザー追加ビュー: 名前/タイプ変更・削除可。手動行色 + 条件付き行色あり。
// フィルター/ソート/色/条件はビューごとに独立して localStorage に保存。

import {
  prefDbViews, type DbViewDef, type DbViewType, type DbViewsState,
} from '../lib/prefs';

export const DEFAULT_VIEW_ID = '__default__';

export const VIEW_TYPE_LABEL: Record<DbViewType, string> = {
  table: 'テーブル', board: 'ボード', list: 'リスト',
  gallery: 'ギャラリー', calendar: 'カレンダー', gantt: 'ガント',
};

function newId(): string {
  // ブラウザ実行なので Date.now は利用可。衝突回避に乱数を足す。
  return 'v' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
}

function makeDefault(): DbViewDef {
  return {
    id: DEFAULT_VIEW_ID, name: 'テーブル', type: 'table',
    filters: [], sort: { field: null, asc: true }, colors: { rows: {}, cols: {} }, rules: [],
  };
}

/** リストのビュー状態を取得(無ければ既定ビューだけ作って保存)。 */
export function ensureViews(listTitle: string): DbViewsState {
  const all = prefDbViews.get();
  let st = all[listTitle];
  if (!st || !Array.isArray(st.views) || st.views.length === 0) {
    st = { activeId: DEFAULT_VIEW_ID, views: [makeDefault()] };
    all[listTitle] = st;
    prefDbViews.set(all);
  } else if (!st.views.some((v) => v.id === DEFAULT_VIEW_ID)) {
    // 既定ビューが無ければ先頭に補う。
    st.views.unshift(makeDefault());
    prefDbViews.set(all);
  }
  return st;
}

export function listViews(listTitle: string): DbViewDef[] {
  return ensureViews(listTitle).views;
}

export function getView(listTitle: string, viewId: string): DbViewDef {
  const st = ensureViews(listTitle);
  return st.views.find((v) => v.id === viewId) || st.views[0];
}

export function getActiveViewId(listTitle: string): string {
  const st = ensureViews(listTitle);
  if (st.views.some((v) => v.id === st.activeId)) return st.activeId;
  return st.views[0].id;
}

export function setActiveViewId(listTitle: string, viewId: string): void {
  const all = prefDbViews.get();
  const st = all[listTitle]; if (!st) return;
  st.activeId = viewId;
  prefDbViews.set(all);
}

export function isDefaultView(view: DbViewDef | string): boolean {
  return (typeof view === 'string' ? view : view.id) === DEFAULT_VIEW_ID;
}
/** 行の色(手動・条件)を持てるか。既定ビューは不可。 */
export function canColorRows(view: DbViewDef | string): boolean {
  return !isDefaultView(view);
}

/** 新規ビューを追加して返す(active にはしない)。 */
export function addView(listTitle: string, type: DbViewType): DbViewDef {
  const all = prefDbViews.get();
  const st = all[listTitle] || (all[listTitle] = { activeId: DEFAULT_VIEW_ID, views: [makeDefault()] });
  const base = VIEW_TYPE_LABEL[type];
  const n = st.views.filter((v) => v.type === type).length;
  const view: DbViewDef = {
    id: newId(), name: n > 0 ? `${base} ${n + 1}` : base, type,
    filters: [], sort: { field: null, asc: true }, colors: { rows: {}, cols: {} }, rules: [],
  };
  st.views.push(view);
  prefDbViews.set(all);
  return view;
}

export function renameView(listTitle: string, viewId: string, name: string): void {
  const all = prefDbViews.get();
  const v = all[listTitle]?.views.find((x) => x.id === viewId);
  if (!v) return;
  v.name = name.trim() || v.name;
  prefDbViews.set(all);
}

export function changeViewType(listTitle: string, viewId: string, type: DbViewType): void {
  const all = prefDbViews.get();
  const v = all[listTitle]?.views.find((x) => x.id === viewId);
  if (!v || isDefaultView(v)) return;   // 既定ビューはテーブル固定
  v.type = type;
  prefDbViews.set(all);
}

/** ビュー削除。既定ビューは消せない。active だった場合は既定へ。 */
export function deleteView(listTitle: string, viewId: string): void {
  if (isDefaultView(viewId)) return;
  const all = prefDbViews.get();
  const st = all[listTitle]; if (!st) return;
  st.views = st.views.filter((v) => v.id !== viewId);
  if (st.activeId === viewId) st.activeId = DEFAULT_VIEW_ID;
  prefDbViews.set(all);
}

/** 部分更新(filters / sort / colors / rules)を active ビューに保存。 */
export function patchView(listTitle: string, viewId: string, patch: Partial<DbViewDef>): void {
  const all = prefDbViews.get();
  const v = all[listTitle]?.views.find((x) => x.id === viewId);
  if (!v) return;
  Object.assign(v, patch);
  prefDbViews.set(all);
}
