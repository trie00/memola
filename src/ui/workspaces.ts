// Multi-workspace switcher: lets the user maintain a list of SharePoint
// site URLs and quickly jump between them. Each workspace is a separate
// SharePoint site with its own memola-pages list.
//
// Switching is done in-place: we update the SITE config + clear all caches
// and re-fetch from the new site WITHOUT reloading the SP page underneath.
// The bookmarklet stays open across switches.

import { S, resetAppState } from '../state';
import { setSite, SITE } from '../config';
import { ICONS } from '../icons';
import { toast, setLoad } from './ui-helpers';
import { clearDigestCache } from '../api/digest';
import { clearListCaches } from '../api/sp-list';
import { clearPagesCache, apiGetPages } from '../api/pages';
import { escapeHtml } from '../lib/html-escape';
import { clearDailyCache } from '../api/daily';
import { clearPresenceCache } from '../api/presence';
import { spGetD } from '../api/sp-rest';
import { prefWorkspaces, prefCurrentWsName, prefCurrentWsUrl } from '../lib/prefs';

export interface Workspace {
  url: string;     // SP site URL (e.g. https://contoso.sharepoint.com/sites/team)
  name: string;    // Display name
}

export function loadWorkspaces(): Workspace[] {
  const raw = prefWorkspaces.get();
  if (!raw) return [];
  try { return JSON.parse(raw) as Workspace[]; }
  catch { return []; }
}

export function saveWorkspaces(ws: Workspace[]): void {
  prefWorkspaces.set(JSON.stringify(ws));
}

export function getCurrentWorkspaceName(): string {
  const stored = prefCurrentWsName.get();
  if (!stored) return '';
  // If the named workspace was deleted from the list, drop the stale name
  // so the title bar doesn't keep showing a workspace that no longer exists.
  const list = loadWorkspaces();
  if (!list.some((w) => w.name === stored)) {
    prefCurrentWsName.clear();
    prefCurrentWsUrl.clear();
    return '';
  }
  return stored;
}

export function setCurrentWorkspace(name: string, url: string): void {
  prefCurrentWsName.set(name);
  prefCurrentWsUrl.set(url);
}

export function clearCurrentWorkspace(): void {
  prefCurrentWsName.clear();
  prefCurrentWsUrl.clear();
}

/** Validate a SharePoint site URL — basic shape check + reachability probe.
 *  Returns null on OK or an error message on failure. The probe hits
 *  `<url>/_api/web?$select=Title` which doesn't require digest. */
export async function validateWorkspaceUrl(url: string): Promise<string | null> {
  const trimmed = url.trim().replace(/\/$/, '');
  if (!/^https:\/\//.test(trimmed)) {
    return 'URL は https:// で始めてください';
  }
  if (!/\/sites\/[^/]+/.test(trimmed) && !/^https:\/\/[^/]+$/.test(trimmed)) {
    return 'SharePoint サイト URL の形式ではありません (例: https://contoso.sharepoint.com/sites/team)';
  }
  try {
    const r = await fetch(trimmed + '/_api/web?$select=Title', {
      headers: { Accept: 'application/json;odata=verbose' },
      credentials: 'include',
    });
    if (r.status === 404) return 'サイトが見つかりません (404)';
    if (r.status === 403) return 'サイトへのアクセス権がありません (403)';
    if (r.status === 401) return 'SharePoint にログインしていない、または認証が切れています (401)';
    if (!r.ok) return 'サイト確認に失敗しました (' + r.status + ')';
    return null;
  } catch (e) {
    return '接続できませんでした: ' + (e as Error).message;
  }
}

/** Switch the live SP context without reloading the page. Resets all
 *  in-memory state and caches, points at the new site, and re-renders the
 *  tree from its memola-pages list. */
export async function switchWorkspace(ws: Workspace): Promise<void> {
  setLoad(true, 'ワークスペースを切替中…');
  try {
    // 1. Persist the choice so the next bookmarklet boot lands here too
    setCurrentWorkspace(ws.name, ws.url);
    // 2. Re-aim the SP REST plumbing
    setSite(ws.url);
    clearDigestCache();
    clearListCaches();
    clearPagesCache();
    clearDailyCache();
    clearPresenceCache();
    // 3. Reset app state and re-fetch from the new site
    resetAppState();
    const { renderTree } = await import('./tree');
    const { showView } = await import('./views');
    const { stopWatching } = await import('./sync-watch');
    stopWatching();
    showView('empty');
    renderTree();
    S.pages = await apiGetPages();
    renderTree();
    // Update the workspace label in the top bar
    const lbl = document.getElementById('memola-ws-name');
    if (lbl) lbl.textContent = ws.name;
    // Refresh drafts badge — drafts are localStorage-only so they survive,
    // but the count display may need updating after the re-render.
    void import('./drafts-modal').then((m) => m.refreshDraftsBadge?.());
    // Auto-open the last-opened page for this workspace, falling back to
    // the first non-draft page (mirrors boot behavior).
    const v = await import('./views');
    const lastId = v.loadLastOpenedPage();
    const lastPage = lastId
      ? S.pages.find((p) => p.Id === lastId && !p.IsDraft)
      : null;
    const target = lastPage || S.pages.find((p) => !p.IsDraft) || null;
    if (target) await v.doSelect(target.Id);
    toast('「' + ws.name + '」 に切り替えました');
  } catch (e) {
    toast('ワークスペース切替失敗: ' + (e as Error).message, 'err');
  } finally {
    setLoad(false);
  }
}

/** Detect-and-recover on boot: if we have a current workspace name but
 *  it's been deleted from the list, prompt the user to pick another. */
export async function ensureWorkspaceSelected(): Promise<void> {
  const list = loadWorkspaces();
  // Empty workspace list — nothing to verify, run with the bookmarklet's
  // detected SITE.
  if (list.length === 0) return;
  const stored = prefCurrentWsName.get();
  if (stored && list.some((w) => w.name === stored)) return;     // ok

  // Stale or missing — pick first match by URL or first overall
  clearCurrentWorkspace();
  // If the bookmarklet's detected SITE matches one of the workspaces,
  // adopt it silently.
  const detected = list.find((w) => w.url.replace(/\/$/, '') === SITE);
  if (detected) {
    setCurrentWorkspace(detected.name, detected.url);
    return;
  }
  // Otherwise prompt the user to pick.
  toast('現在のワークスペースが削除されています — 一覧から選択してください', 'err');
}

// ── Menu UI ────────────────────────────────────────────────────────────

export function showWorkspaceMenu(anchor: HTMLElement): void {
  // Close any existing menu first (idempotent)
  document.getElementById('memola-ws-menu')?.remove();

  const list = loadWorkspaces();
  const cur = getCurrentWorkspaceName();
  const menu = document.createElement('div');
  menu.id = 'memola-ws-menu';
  menu.className = 'memola-ws-menu';

  if (list.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'memola-ws-empty';
    empty.textContent = 'まだワークスペースが登録されていません';
    menu.appendChild(empty);
  } else {
    list.forEach((ws) => {
      const item = document.createElement('div');
      item.className = 'memola-ws-item' + (ws.name === cur ? ' on' : '');
      item.innerHTML =
        '<div class="memola-ws-item-body">' +
          '<div class="memola-ws-item-name">' + escapeHtml(ws.name) + '</div>' +
          '<div class="memola-ws-item-url">' + escapeHtml(ws.url) + '</div>' +
        '</div>' +
        '<button class="memola-ws-item-rn" title="名称変更">' + ICONS.edit + '</button>' +
        '<button class="memola-ws-item-rm" title="一覧から削除">' + ICONS.trash + '</button>';
      // Click on the body → switch
      item.querySelector<HTMLElement>('.memola-ws-item-body')?.addEventListener('click', () => {
        closeMenu();
        if (ws.name === cur) return;     // already here
        void switchWorkspace(ws);
      });
      // Rename button
      item.querySelector<HTMLElement>('.memola-ws-item-rn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const next = prompt('新しい名称:', ws.name);
        if (next == null) return;
        const trimmed = next.trim();
        if (!trimmed) return;
        if (trimmed === ws.name) return;
        const list2 = loadWorkspaces();
        if (list2.some((w) => w.name === trimmed)) {
          toast('同じ名称のワークスペースが既にあります', 'err');
          return;
        }
        const updated = list2.map((w) => w.name === ws.name ? { ...w, name: trimmed } : w);
        saveWorkspaces(updated);
        if (cur === ws.name) {
          setCurrentWorkspace(trimmed, ws.url);
          const lbl = document.getElementById('memola-ws-name');
          if (lbl) lbl.textContent = trimmed;
        }
        toast('名称を変更しました');
        closeMenu();
        showWorkspaceMenu(anchor);
      });
      // Remove button
      item.querySelector<HTMLElement>('.memola-ws-item-rm')?.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (!confirm('「' + ws.name + '」 を一覧から削除します。SharePoint 上のデータには影響しません。よろしいですか?')) return;
        const remaining = loadWorkspaces().filter((w) => w.name !== ws.name);
        saveWorkspaces(remaining);
        toast('削除しました');
        // If the deleted workspace was the active one, move the user
        // somewhere sane: another workspace if available, else clear the label.
        if (cur === ws.name) {
          if (remaining.length > 0) {
            closeMenu();
            // Auto-pick the first remaining workspace and switch to it.
            // (Prompting via select would be friendlier but `prompt` can only
            // return strings; the popup menu reopen below lets the user pick.)
            const lbl = document.getElementById('memola-ws-name');
            if (lbl) lbl.textContent = remaining[0].name;
            await switchWorkspace(remaining[0]);
            // Reopen so the user sees the new selection / can pick another
            showWorkspaceMenu(anchor);
            return;
          }
          // No remaining workspaces — clear current marker.
          clearCurrentWorkspace();
          const lbl = document.getElementById('memola-ws-name');
          if (lbl) lbl.textContent = 'Memola';
        }
        closeMenu();
        showWorkspaceMenu(anchor);
      });
      menu.appendChild(item);
    });
  }

  const sep = document.createElement('div'); sep.className = 'memola-ws-sep';
  menu.appendChild(sep);

  const addBtn = document.createElement('div');
  addBtn.className = 'memola-ws-add';
  addBtn.textContent = '+ ワークスペースを追加';
  addBtn.addEventListener('click', async () => {
    const name = prompt('ワークスペース名 (例: 営業チーム):');
    if (!name || !name.trim()) return;
    const url = prompt('SharePoint サイト URL (例: https://contoso.sharepoint.com/sites/sales):');
    if (!url || !url.trim()) return;
    const trimmedName = name.trim();
    const trimmedUrl = url.trim().replace(/\/$/, '');
    // Pre-check: name uniqueness
    const list2 = loadWorkspaces();
    if (list2.some((w) => w.name === trimmedName)) {
      toast('同じ名称のワークスペースが既にあります', 'err');
      return;
    }
    // Validate URL with a real SP probe before persisting — saves the user
    // from a useless entry that would 404 on every switch attempt.
    setLoad(true, 'URL を確認中…');
    let err: string | null = null;
    try { err = await validateWorkspaceUrl(trimmedUrl); }
    finally { setLoad(false); }
    if (err) {
      toast('追加できません: ' + err, 'err');
      return;
    }
    list2.push({ name: trimmedName, url: trimmedUrl });
    saveWorkspaces(list2);
    toast('ワークスペース「' + trimmedName + '」 を追加しました');
    closeMenu();
    showWorkspaceMenu(anchor);
  });
  menu.appendChild(addBtn);

  // Position relative to anchor
  const rect = anchor.getBoundingClientRect();
  menu.style.position = 'fixed';
  menu.style.top = (rect.bottom + 4) + 'px';
  menu.style.left = rect.left + 'px';

  document.getElementById('memola-overlay')?.appendChild(menu);

  setTimeout(() => {
    document.addEventListener('click', closeMenuOnOutside);
  }, 0);

  function closeMenu(): void {
    menu.remove();
    document.removeEventListener('click', closeMenuOnOutside);
  }
  function closeMenuOnOutside(e: MouseEvent): void {
    if (!menu.contains(e.target as Node) && e.target !== anchor) closeMenu();
  }
}

