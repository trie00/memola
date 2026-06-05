// ブラウザ風タブ。複数のページ(と将来は横断検索)を同時に開き、上部のタブ列で
// 切り替える。タブ構成はワークスペース毎に永続化し、再起動時に復元する。
//
// 設計:
//   - S.tabs / S.activeTabId が真実。renderTabs() が #memola-tabstrip を描画。
//   - ツリーのページをクリック → doSelect() が openInActiveTab() を呼び、アクティブ
//     タブの中身を差し替える(= ブラウザで同じタブ内遷移)。
//   - タブをクリック → activateTab() がそのタブのページを doSelect() で読み込む。
//   - タブの id 一意性・タイトルは renderTabs() 時に metaById で最新化。
//
// この module は views を静的 import しない(循環回避)。ページ読み込みが要るときだけ
// 動的 import する。

import { S, type Tab } from '../state';
import { metaById } from '../lib/page-store';
import { prefTabs } from '../lib/prefs';
import { SITE } from '../config';
import { ICONS } from '../icons';

let _seq = 0;
function genTabId(): string { return 't' + Date.now().toString(36) + (_seq++).toString(36); }

function activeTab(): Tab | undefined { return S.tabs.find((t) => t.tabId === S.activeTabId); }

// タブのアクティブ化履歴(末尾＝最後にアクティブにしたタブ)。閉じたとき「直前に
// 開いていたタブ」に戻すために使う(左隣ではない)。
let tabOrder: string[] = [];
function recordActivation(tabId: string | null): void {
  if (!tabId) return;
  const i = tabOrder.indexOf(tabId);
  if (i >= 0) tabOrder.splice(i, 1);
  tabOrder.push(tabId);
}

/** タブのタイトルを最新化(ページ名の変更/削除に追従)。 */
function tabTitle(t: Tab): string {
  if (t.kind === 'search') return t.title || '横断チャット';
  if (t.kind === 'row') return t.title || '無題';
  if (t.pageId) {
    const m = metaById(t.pageId);
    if (m) return m.title || '無題';
  }
  return t.title || '新規タブ';
}

function persist(): void {
  const map = prefTabs.get();
  map[SITE] = { tabs: S.tabs, active: S.activeTabId };
  prefTabs.set(map);
}

// 戻る/進む(nav-history)中は「新しいタブを作らず現在のタブで差し替える」。
// それ以外(リンク/サイドバー/バックリンク等の参照)は「未オープンなら新タブ」。
let _navInPlace = false;
export function setTabNavInPlace(b: boolean): void { _navInPlace = b; }

function makePageTabFields(tab: Tab, pageId: string, title: string): void {
  tab.kind = 'page'; tab.pageId = pageId; tab.title = title;
  tab.searchId = undefined; tab.rowDbId = undefined; tab.rowId = undefined;
}

/** doSelect から呼ばれる。基本ルール:
 *   - 戻る/進む(_navInPlace)は現在タブで差し替え
 *   - 既に同じページが今のタブ → タイトル更新のみ
 *   - 空タブ(新規タブ / Ctrl+クリック直後) → そこに入れる
 *   - 既に別タブで開いている → そのタブへ切替(複製しない)
 *   - どれでもない(現在タブに無いページ参照) → 新しいタブで開く */
export function openInActiveTab(pageId: string, title: string): void {
  const active = activeTab();
  // 戻る/進む: その場で差し替え
  if (_navInPlace && active) {
    makePageTabFields(active, pageId, title);
    renderTabs(); persist(); return;
  }
  // 同じページが今のタブ
  if (active && active.kind === 'page' && active.pageId === pageId) {
    active.title = title; renderTabs(); persist(); return;
  }
  // 空タブ(新規タブ等)に入れる
  if (active && active.kind === 'page' && !active.pageId) {
    makePageTabFields(active, pageId, title); renderTabs(); persist(); return;
  }
  // 既に別タブで開いている → そのタブへ
  const existing = S.tabs.find((t) => t.kind === 'page' && t.pageId === pageId);
  if (existing) {
    S.activeTabId = existing.tabId; recordActivation(existing.tabId);
    existing.title = title; renderTabs(); persist(); return;
  }
  // 未オープン → 新しいタブ
  const tab: Tab = { tabId: genTabId(), kind: 'page', pageId, title };
  S.tabs.push(tab); S.activeTabId = tab.tabId; recordActivation(tab.tabId);
  renderTabs(); persist();
}

/** openRowAsPage から呼ばれる。openInActiveTab と同じルール(行版):
 *   戻る/進む=その場 / 同じ行=現状維持 / 空タブ=そこに / 既存行タブ=切替 / 未オープン=新タブ。 */
export function openRowInActiveTab(dbId: string, rowId: number, title: string): void {
  const setRow = (t: Tab): void => {
    t.kind = 'row'; t.rowDbId = dbId; t.rowId = rowId; t.title = title;
    t.pageId = undefined; t.searchId = undefined;
  };
  const active = activeTab();
  if (_navInPlace && active) { setRow(active); renderTabs(); persist(); return; }
  if (active && active.kind === 'row' && active.rowId === rowId && active.rowDbId === dbId) {
    active.title = title; renderTabs(); persist(); return;
  }
  if (active && active.kind === 'page' && !active.pageId) { setRow(active); renderTabs(); persist(); return; }
  const existing = S.tabs.find((t) => t.kind === 'row' && t.rowId === rowId && t.rowDbId === dbId);
  if (existing) {
    S.activeTabId = existing.tabId; recordActivation(existing.tabId);
    existing.title = title; renderTabs(); persist(); return;
  }
  const tab: Tab = { tabId: genTabId(), kind: 'row', rowDbId: dbId, rowId, title };
  S.tabs.push(tab); S.activeTabId = tab.tabId; recordActivation(tab.tabId);
  renderTabs(); persist();
}

/** ページを新規タブで開く(Ctrl/⌘+クリック・中クリック用)。 */
export async function openPageInNewTab(pageId: string): Promise<void> {
  const tab: Tab = { tabId: genTabId(), kind: 'page', pageId: undefined, title: '' };
  S.tabs.push(tab);
  S.activeTabId = tab.tabId;
  recordActivation(tab.tabId);
  const { doSelect } = await import('./views');
  await doSelect(pageId); // 新アクティブタブを openInActiveTab で埋める
}

/** 新しい空タブを開く(クリック後にツリーのページを選ぶと中身が入る)。 */
export function newTab(): void {
  const tab: Tab = { tabId: genTabId(), kind: 'page', pageId: undefined, title: '新規タブ' };
  S.tabs.push(tab);
  S.activeTabId = tab.tabId;
  recordActivation(tab.tabId);
  renderTabs();
  persist();
  void import('./views').then((m) => m.showView('empty'));
}

/** タブをアクティブ化してその中身を表示。 */
export async function activateTab(tabId: string): Promise<void> {
  const tab = S.tabs.find((t) => t.tabId === tabId);
  if (!tab) return;
  S.activeTabId = tabId;
  recordActivation(tabId);
  renderTabs();
  persist();
  const x = await import('./xchat');
  if (tab.kind === 'search') {
    x.showSearchTab(tab.searchId || x.newSearchId());
    return;
  }
  // 行タブ(DB行/デイリーノート): 親DBを開いて行を再オープン(nav-history と同方式)。
  // 読み込み中は in-place 扱い(余計なタブを作らせない)。
  if (tab.kind === 'row') {
    x.hideSearchTab();
    if (tab.rowDbId && tab.rowId != null) {
      _navInPlace = true;
      try {
        const { doSelect } = await import('./views');
        await doSelect(tab.rowDbId);
        const row = S.dbItems.find((it) => it.Id === tab.rowId);
        if (row) { const rp = await import('./row-page'); await rp.openRowAsPage(tab.rowDbId, row); }
      } finally { _navInPlace = false; }
    }
    return;
  }
  // ページタブ: 検索パネルを隠してからページを表示。
  x.hideSearchTab();
  if (tab.pageId) {
    _navInPlace = true;
    try { const { doSelect } = await import('./views'); await doSelect(tab.pageId); }
    finally { _navInPlace = false; }
  } else {
    void import('./views').then((m) => m.showView('empty'));
  }
}

/** 横断検索を新規タブで開く(💬 ボタン / 「新規チャット」)。複数開ける。 */
export async function newSearchTab(): Promise<void> {
  const x = await import('./xchat');
  const sid = x.newSearchId();
  const tab: Tab = { tabId: genTabId(), kind: 'search', searchId: sid, title: '横断チャット' };
  S.tabs.push(tab);
  S.activeTabId = tab.tabId;
  recordActivation(tab.tabId);
  renderTabs();
  persist();
  x.showSearchTab(sid);
}

/** 検索パネル内の履歴ドロップダウンで別セッションを選んだとき、アクティブな
 *  検索タブの中身をそのセッションに差し替える。 */
export async function openSearchSessionInActiveTab(sessionId: string): Promise<void> {
  const t = activeTab();
  const x = await import('./xchat');
  if (t && t.kind === 'search') { t.searchId = sessionId; t.title = x.searchSessionTitle(sessionId); }
  renderTabs();
  persist();
  x.showSearchTab(sessionId);
}

/** チャット送信でセッションタイトルが決まったらタブ名を更新。 */
export function updateActiveSearchTitle(title: string): void {
  const t = activeTab();
  if (t && t.kind === 'search') { t.title = title || '横断チャット'; renderTabs(); persist(); }
}

/** タブを閉じる。アクティブを閉じたら「直前に開いていたタブ」へ戻る(左隣ではない)。
 *  最後の1枚を閉じたら空タブ。 */
export async function closeTab(tabId: string): Promise<void> {
  const idx = S.tabs.findIndex((t) => t.tabId === tabId);
  if (idx < 0) return;
  const wasActive = S.tabs[idx].tabId === S.activeTabId;
  S.tabs.splice(idx, 1);
  const oi = tabOrder.indexOf(tabId);
  if (oi >= 0) tabOrder.splice(oi, 1);
  if (!wasActive) { renderTabs(); persist(); return; }
  // アクティブを閉じた → アクティブ化履歴を新しい順にたどり、まだ存在するタブへ。
  let next: string | null = null;
  for (let i = tabOrder.length - 1; i >= 0; i--) {
    if (S.tabs.some((t) => t.tabId === tabOrder[i])) { next = tabOrder[i]; break; }
  }
  if (!next && S.tabs.length) next = S.tabs[S.tabs.length - 1].tabId; // 履歴に無ければ末尾
  S.activeTabId = next;
  if (next) { await activateTab(next); }
  else { newTab(); }
}

/** タブ列を描画。 */
export function renderTabs(): void {
  const strip = document.getElementById('memola-tabstrip');
  if (!strip) return;
  strip.textContent = '';
  for (const t of S.tabs) {
    const el = document.createElement('div');
    el.className = 'memola-tab' + (t.tabId === S.activeTabId ? ' on' : '');
    el.dataset.tabId = t.tabId;
    el.draggable = true;   // ドラッグでタブ並べ替え
    el.title = tabTitle(t);
    const ic = document.createElement('span');
    ic.className = 'memola-tab-ic';
    if (t.kind === 'search') ic.innerHTML = ICONS.chat;
    else if (t.kind === 'row') ic.textContent = '📄';
    else {
      const m = t.pageId ? metaById(t.pageId) : null;
      ic.textContent = m?.icon || (m?.type === 'database' ? '🗂' : '📄');
    }
    const lbl = document.createElement('span');
    lbl.className = 'memola-tab-lbl';
    lbl.textContent = tabTitle(t);
    const x = document.createElement('button');
    x.className = 'memola-tab-x';
    x.textContent = '×';
    x.title = '閉じる';
    x.dataset.close = t.tabId;
    el.append(ic, lbl, x);
    strip.appendChild(el);
  }
  // 新規タブボタンは「一番右のタブの右」に置く(タブ列の末尾に内包)。
  const add = document.createElement('button');
  add.className = 'memola-tab-newbtn';
  add.dataset.new = '1';
  add.title = '新しいタブ';
  add.innerHTML = ICONS.plus;
  strip.appendChild(add);
}

/** 起動時: 保存済みタブを復元。無ければ fallbackPageId を1タブで開く。 */
export async function restoreTabs(fallbackPageId: string | null): Promise<void> {
  const saved = prefTabs.get()[SITE];
  const savedTabs = (saved?.tabs as Tab[] | undefined) || [];
  // page タブは存在するページのみ残す(削除済みは捨てる)。search タブは保持。
  const valid = savedTabs.filter((t) =>
    t && ((t.kind === 'page' && t.pageId && metaById(t.pageId))
      || (t.kind === 'search' && t.searchId)
      || (t.kind === 'row' && t.rowDbId && metaById(t.rowDbId) && t.rowId != null)));
  if (valid.length) {
    S.tabs = valid.map((t) => t.kind === 'search'
      ? { tabId: t.tabId || genTabId(), kind: 'search', searchId: t.searchId, title: t.title || '横断チャット' }
      : t.kind === 'row'
        ? { tabId: t.tabId || genTabId(), kind: 'row', rowDbId: t.rowDbId, rowId: t.rowId, title: t.title || '無題' }
        : { tabId: t.tabId || genTabId(), kind: 'page', pageId: t.pageId, title: t.title || '' });
    const activeOk = S.tabs.some((t) => t.tabId === saved?.active);
    S.activeTabId = activeOk ? saved!.active : S.tabs[0].tabId;
    // アクティブ化履歴を復元(順序＝タブ列、アクティブを最後に)。閉じたときの戻り先用。
    tabOrder = S.tabs.map((t) => t.tabId);
    recordActivation(S.activeTabId);
    renderTabs();
    const active = activeTab();
    if (active) await activateTab(active.tabId);
    return;
  }
  // 保存タブ無し → fallback を1タブで。
  S.tabs = [];
  S.activeTabId = null;
  if (fallbackPageId) {
    const { doSelect } = await import('./views');
    await doSelect(fallbackPageId); // doSelect→openInActiveTab で1タブ生成
  } else {
    newTab();
  }
}

/** タブ列のイベント委譲を1回だけ張る。 */
export function attachTabs(): void {
  const strip = document.getElementById('memola-tabstrip');
  strip?.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    if (t.closest('[data-new]')) { newTab(); return; }   // 末尾の + ボタン
    const closeId = t.dataset.close;
    if (closeId) { e.stopPropagation(); void closeTab(closeId); return; }
    const row = t.closest<HTMLElement>('.memola-tab');
    if (row?.dataset.tabId) void activateTab(row.dataset.tabId);
  });

  // ── ドラッグでタブ並べ替え ──
  let dragId: string | null = null;
  strip?.addEventListener('dragstart', (e) => {
    const row = (e.target as HTMLElement).closest<HTMLElement>('.memola-tab');
    if (!row?.dataset.tabId) return;
    dragId = row.dataset.tabId;
    e.dataTransfer?.setData('text/plain', dragId);
    if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
    row.classList.add('dragging');
  });
  strip?.addEventListener('dragover', (e) => {
    if (!dragId) return;
    e.preventDefault();   // ドロップ許可
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
  });
  strip?.addEventListener('drop', (e) => {
    if (!dragId) return;
    e.preventDefault();
    const fromIdx = S.tabs.findIndex((t) => t.tabId === dragId);
    if (fromIdx < 0) { dragId = null; return; }
    const overRow = (e.target as HTMLElement).closest<HTMLElement>('.memola-tab');
    let toIdx: number;
    if (overRow?.dataset.tabId && overRow.dataset.tabId !== dragId) {
      toIdx = S.tabs.findIndex((t) => t.tabId === overRow.dataset.tabId);
      const r = overRow.getBoundingClientRect();
      if (e.clientX > r.left + r.width / 2) toIdx++;   // 右半分なら後ろへ
    } else {
      toIdx = S.tabs.length;   // 何も上に無ければ末尾(+ボタンの直前)
    }
    const [moved] = S.tabs.splice(fromIdx, 1);
    if (fromIdx < toIdx) toIdx--;   // 自分を抜いた分のズレ補正
    S.tabs.splice(Math.max(0, Math.min(toIdx, S.tabs.length)), 0, moved);
    dragId = null;
    renderTabs();
    persist();
  });
  strip?.addEventListener('dragend', () => {
    dragId = null;
    strip.querySelectorAll('.memola-tab.dragging').forEach((el) => el.classList.remove('dragging'));
  });
}
