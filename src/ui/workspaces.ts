// Multi-workspace switcher: lets the user maintain a list of SharePoint
// site URLs and quickly jump between them. Each workspace is a separate
// SharePoint site with its own n365-pages folder.

import { toast } from './ui-helpers';

const WS_KEY = 'n365.workspaces';
const CURRENT_KEY = 'n365.workspace.current';

export interface Workspace {
  url: string;     // SP site URL (e.g. https://contoso.sharepoint.com/sites/team)
  name: string;    // Display name
}

export function loadWorkspaces(): Workspace[] {
  try {
    const raw = localStorage.getItem(WS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Workspace[];
  } catch {
    return [];
  }
}

export function saveWorkspaces(ws: Workspace[]): void {
  localStorage.setItem(WS_KEY, JSON.stringify(ws));
}

export function getCurrentWorkspaceName(): string {
  return localStorage.getItem(CURRENT_KEY) || '';
}

export function setCurrentWorkspaceName(name: string): void {
  localStorage.setItem(CURRENT_KEY, name);
}

export function showWorkspaceMenu(anchor: HTMLElement): void {
  const list = loadWorkspaces();
  const cur = getCurrentWorkspaceName();
  const menu = document.createElement('div');
  menu.id = 'n365-ws-menu';
  menu.className = 'n365-ws-menu';

  if (list.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'n365-ws-empty';
    empty.textContent = 'まだワークスペースが登録されていません';
    menu.appendChild(empty);
  } else {
    list.forEach((ws) => {
      const item = document.createElement('div');
      item.className = 'n365-ws-item' + (ws.name === cur ? ' on' : '');
      item.innerHTML =
        '<div class="n365-ws-item-name">' + escapeHtml(ws.name) + '</div>' +
        '<div class="n365-ws-item-url">' + escapeHtml(ws.url) + '</div>';
      item.addEventListener('click', () => {
        setCurrentWorkspaceName(ws.name);
        // Open SP site in same tab — user re-clicks the bookmarklet on the new site
        window.location.href = ws.url;
      });
      menu.appendChild(item);
    });
  }

  const sep = document.createElement('div'); sep.className = 'n365-ws-sep';
  menu.appendChild(sep);

  const addBtn = document.createElement('div');
  addBtn.className = 'n365-ws-add';
  addBtn.textContent = '+ ワークスペースを追加';
  addBtn.addEventListener('click', () => {
    const name = prompt('ワークスペース名 (例: 営業チーム):');
    if (!name || !name.trim()) return;
    const url = prompt('SharePoint サイトURL (例: https://contoso.sharepoint.com/sites/sales):');
    if (!url || !url.trim()) return;
    const ws = loadWorkspaces();
    ws.push({ name: name.trim(), url: url.trim() });
    saveWorkspaces(ws);
    toast('ワークスペース「' + name + '」を追加しました');
    closeMenu();
  });
  menu.appendChild(addBtn);

  if (list.length > 0) {
    const removeBtn = document.createElement('div');
    removeBtn.className = 'n365-ws-add';
    removeBtn.style.color = 'var(--danger)';
    removeBtn.textContent = '× リストから削除';
    removeBtn.addEventListener('click', () => {
      const name = prompt('削除するワークスペース名を入力:');
      if (!name) return;
      saveWorkspaces(loadWorkspaces().filter((w) => w.name !== name));
      toast('削除しました');
      closeMenu();
    });
    menu.appendChild(removeBtn);
  }

  // Position relative to anchor
  const rect = anchor.getBoundingClientRect();
  menu.style.position = 'fixed';
  menu.style.top = (rect.bottom + 4) + 'px';
  menu.style.left = rect.left + 'px';

  document.getElementById('n365-overlay')?.appendChild(menu);

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

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
