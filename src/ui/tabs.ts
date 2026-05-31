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

/** タブのタイトルを最新化(ページ名の変更/削除に追従)。 */
function tabTitle(t: Tab): string {
  if (t.kind === 'search') return t.title || '横断チャット';
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

/** doSelect から呼ばれ、アクティブタブの中身をこのページに差し替える。
 *  アクティブタブが無ければ新規に作る。 */
export function openInActiveTab(pageId: string, title: string): void {
  let tab = activeTab();
  if (!tab) {
    tab = { tabId: genTabId(), kind: 'page', pageId, title };
    S.tabs.push(tab);
    S.activeTabId = tab.tabId;
  } else {
    tab.kind = 'page';
    tab.pageId = pageId;
    tab.searchId = undefined;
    tab.title = title;
  }
  renderTabs();
  persist();
}

/** 新しい空タブを開く(クリック後にツリーのページを選ぶと中身が入る)。 */
export function newTab(): void {
  const tab: Tab = { tabId: genTabId(), kind: 'page', pageId: undefined, title: '新規タブ' };
  S.tabs.push(tab);
  S.activeTabId = tab.tabId;
  renderTabs();
  persist();
  void import('./views').then((m) => m.showView('empty'));
}

/** タブをアクティブ化してその中身を表示。 */
export async function activateTab(tabId: string): Promise<void> {
  const tab = S.tabs.find((t) => t.tabId === tabId);
  if (!tab) return;
  S.activeTabId = tabId;
  renderTabs();
  persist();
  if (tab.kind === 'search') {
    // Phase 2 で本実装。暫定でオーバーレイを開く。
    void import('./xchat').then((m) => m.openXChat());
    return;
  }
  if (tab.pageId) {
    const { doSelect } = await import('./views');
    await doSelect(tab.pageId);
  } else {
    void import('./views').then((m) => m.showView('empty'));
  }
}

/** タブを閉じる。アクティブを閉じたら隣を選ぶ。最後の1枚を閉じたら空タブ。 */
export async function closeTab(tabId: string): Promise<void> {
  const idx = S.tabs.findIndex((t) => t.tabId === tabId);
  if (idx < 0) return;
  const wasActive = S.tabs[idx].tabId === S.activeTabId;
  S.tabs.splice(idx, 1);
  if (!wasActive) { renderTabs(); persist(); return; }
  // アクティブを閉じた → 隣(右優先、無ければ左)を選ぶ
  const next = S.tabs[idx] || S.tabs[idx - 1] || null;
  S.activeTabId = next ? next.tabId : null;
  if (next) { await activateTab(next.tabId); }
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
    el.title = tabTitle(t);
    const ic = document.createElement('span');
    ic.className = 'memola-tab-ic';
    if (t.kind === 'search') ic.innerHTML = ICONS.chat;
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
}

/** 起動時: 保存済みタブを復元。無ければ fallbackPageId を1タブで開く。 */
export async function restoreTabs(fallbackPageId: string | null): Promise<void> {
  const saved = prefTabs.get()[SITE];
  const savedTabs = (saved?.tabs as Tab[] | undefined) || [];
  // page タブのうち、まだ存在するページだけ残す(削除済みは捨てる)。search は当面捨てる(Phase2)。
  const valid = savedTabs.filter((t) => t && t.kind === 'page' && t.pageId && metaById(t.pageId));
  if (valid.length) {
    S.tabs = valid.map((t) => ({ tabId: t.tabId || genTabId(), kind: 'page', pageId: t.pageId, title: t.title || '' }));
    const activeOk = S.tabs.some((t) => t.tabId === saved?.active);
    S.activeTabId = activeOk ? saved!.active : S.tabs[0].tabId;
    renderTabs();
    const active = activeTab();
    if (active?.pageId) {
      const { doSelect } = await import('./views');
      await doSelect(active.pageId);
    }
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
    const closeId = t.dataset.close;
    if (closeId) { e.stopPropagation(); void closeTab(closeId); return; }
    const row = t.closest<HTMLElement>('.memola-tab');
    if (row?.dataset.tabId) void activateTab(row.dataset.tabId);
  });
  document.getElementById('memola-tab-new')?.addEventListener('click', () => newTab());
}
