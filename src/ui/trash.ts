// Trash modal: list soft-deleted pages, DBs, AND DB rows. Each entry
// shows who deleted it (= TrashedBy display name). Restore returns the
// item to its original location. Purge ("完全削除") permanently removes
// from SP — but **only items the current user themselves deleted**;
// other people's trash is left alone, so empty-trash is safe in shared
// workspaces.

import { S } from '../state';
import { g } from './dom';
import {
  getTrashedPages, apiRestorePage, apiPurgePage, apiGetPages,
} from '../api/pages';
import {
  getTrashedRows, apiRestoreRow, apiPurgeRow,
  type TrashedRow,
} from '../api/db';
import { getUserNameById } from '../api/sync';
import { renderTree } from './tree';
import { toast, setLoad } from './ui-helpers';
import { escapeHtml } from '../lib/html-escape';

interface TrashEntry {
  kind: 'page' | 'database' | 'row';
  /** For page/database: the memola-pages id; for row: bodyId (= memola-pages id) */
  bodyId: string;
  title: string;
  /** ms timestamp */
  trashedAt: number;
  /** SP user id of the deleter (0 = unknown) */
  trashedBy: number;
  /** For 'row' kind: the parent DB's SP list title and the DB row id */
  rowListTitle?: string;
  rowDbRowId?: number;
  /** For row's purpose, parent DB display title */
  rowParentDbTitle?: string;
}

export function openTrash(): void {
  const md = g('trash-md');
  md.classList.add('on');
  void renderTrashList();
  // Wire the empty-trash button (idempotent — uses dataset flag so we
  // don't pile up handlers on each open).
  const emptyBtn = document.getElementById('memola-trash-empty');
  if (emptyBtn && !emptyBtn.dataset.wired) {
    emptyBtn.dataset.wired = '1';
    emptyBtn.addEventListener('click', () => { void emptyTrash(); });
  }
}

export function closeTrash(): void {
  g('trash-md').classList.remove('on');
}

/** Combine page-level + DB-row-level trash into a single sorted list. */
async function loadAllTrashEntries(): Promise<TrashEntry[]> {
  const myId = S.meta.myUserId || 0;
  // Privacy rule: hide 'user'-scope items that aren't ours. The check
  // requires a known myId AND a known item authorId; if either is
  // unknown (= 0), default to "visible" so we don't accidentally hide
  // legitimate trash from the user.
  const isHiddenForPrivacy = (scope: string | undefined, authorId: number): boolean => {
    if (scope !== 'user') return false;       // org / legacy → visible to all
    if (!myId) return false;                  // can't resolve self → don't hide
    if (!authorId) return false;              // legacy row, no AuthorId → visible
    return authorId !== myId;
  };
  const out: TrashEntry[] = [];

  // 1. Pages + DBs (from S.meta.pages)
  for (const p of getTrashedPages()) {
    const meta = S.meta.pages.find((m) => m.id === p.id);
    if (isHiddenForPrivacy(meta?.scope, meta?.authorId || 0)) continue;
    out.push({
      kind: p.type === 'database' ? 'database' : 'page',
      bodyId: p.id,
      title: p.title,
      trashedAt: p.trashed,
      trashedBy: meta?.trashedBy || 0,
    });
  }

  // 2. DB rows (from a separate SP query — they aren't in S.meta.pages)
  let trashedRows: TrashedRow[] = [];
  try {
    trashedRows = await getTrashedRows();
  } catch { /* tolerate */ }
  for (const r of trashedRows) {
    if (isHiddenForPrivacy(r.scope, r.authorId)) continue;
    // Find parent DB title from S.meta.pages (ListTitle → DB page).
    const parentDb = S.meta.pages.find(
      (m) => m.type === 'database' && m.list === r.listTitle,
    );
    // If parent DB itself is private and not ours, hide the row.
    if (parentDb && isHiddenForPrivacy(parentDb.scope, parentDb.authorId || 0)) continue;
    out.push({
      kind: 'row',
      bodyId: String(r.bodyId),
      title: r.title || '(無題の行)',
      trashedAt: r.trashedAt,
      trashedBy: r.trashedBy,
      rowListTitle: r.listTitle,
      rowDbRowId: r.dbRowId,
      rowParentDbTitle: parentDb?.title || '(削除済みDB)',
    });
  }

  // Sort newest-first
  out.sort((a, b) => b.trashedAt - a.trashedAt);
  return out;
}

/** Re-fetch + re-render the active DB view if the supplied list title
 *  matches what the user is currently looking at. Used after restore /
 *  purge so the table reflects the new state without the user needing
 *  to navigate away and back. No-op when the user is on a different DB,
 *  a regular page, or the empty view. */
async function refreshActiveDbIfMatches(listTitle: string): Promise<void> {
  if (S.dbList !== listTitle) return;
  try {
    const { getListItems } = await import('../api/sp-list');
    const allItems = await getListItems(listTitle);
    S.dbItems = allItems.filter(
      (i) => !(typeof i.Trashed === 'number' && i.Trashed > 0),
    );
    const { renderDbTable } = await import('./views');
    renderDbTable();
  } catch { /* tolerate — the user can always force a reload */ }
}

/** Permanently delete EVERY trashed entry the **current user** deleted.
 *  Other users' entries are skipped — empty-trash should never destroy
 *  data the current user can't see/own in the first place. */
async function emptyTrash(): Promise<void> {
  const items = await loadAllTrashEntries();
  const myId = S.meta.myUserId || 0;
  const own = items.filter((it) => it.trashedBy === myId);
  const others = items.filter((it) => it.trashedBy !== myId);
  if (own.length === 0) {
    if (others.length > 0) {
      toast(`他のユーザの ${others.length} 件はあなたが完全削除できません`);
    } else {
      toast('ゴミ箱は空です');
    }
    return;
  }
  const msg = `${own.length} 件をすべて完全削除します。元に戻せません。\n` +
    (others.length > 0
      ? `(他のユーザの ${others.length} 件は対象外で残ります)\n`
      : '') +
    'よろしいですか?';
  if (!confirm(msg)) return;
  setLoad(true, '完全削除中...');
  let ok = 0, ng = 0;
  // Track which DB lists were touched so we can refresh the active DB
  // view once at the end (deduped) rather than on each iteration.
  const touchedDbLists = new Set<string>();
  for (const it of own) {
    try {
      if (it.kind === 'row' && it.rowListTitle && it.rowDbRowId) {
        await apiPurgeRow(it.rowListTitle, it.rowDbRowId);
        touchedDbLists.add(it.rowListTitle);
      } else {
        await apiPurgePage(it.bodyId);
      }
      ok++;
    } catch { ng++; }
  }
  // Re-fetch memola-pages so S.pages / S.meta.pages match SP truth.
  try { await apiGetPages(); } catch { /* tolerate */ }
  // Refresh the currently-open DB view if any of the purged rows
  // belonged to it.
  for (const lt of touchedDbLists) {
    await refreshActiveDbIfMatches(lt);
  }
  setLoad(false);
  renderTree();
  void renderTrashList();
  let summary = `${ok} 件削除しました`;
  if (ng > 0) summary += ` (失敗 ${ng} 件)`;
  if (others.length > 0) summary += ` / 他のユーザの ${others.length} 件は残っています`;
  toast(summary);
}

async function renderTrashList(): Promise<void> {
  const list = g('trash-list');
  list.innerHTML = '<div class="memola-trash-empty">読み込み中…</div>';
  const items = await loadAllTrashEntries();
  list.innerHTML = '';
  if (items.length === 0) {
    list.innerHTML = '<div class="memola-trash-empty">ゴミ箱は空です</div>';
    return;
  }
  // Pre-fetch deleter names in parallel.
  const uniqIds = Array.from(new Set(items.map((it) => it.trashedBy).filter((n) => n > 0)));
  const nameMap = new Map<number, string>();
  await Promise.all(uniqIds.map(async (uid) => {
    const name = await getUserNameById(uid);
    if (name) nameMap.set(uid, name);
  }));

  const myId = S.meta.myUserId || 0;
  items.forEach((it) => {
    const row = document.createElement('div');
    row.className = 'memola-trash-row';
    const time = new Date(it.trashedAt).toLocaleString('ja-JP');
    const deleterName = it.trashedBy === myId
      ? 'あなた'
      : (nameMap.get(it.trashedBy) || '不明');
    const isOwn = it.trashedBy === myId;
    const kindIcon = it.kind === 'database' ? '🗃 DB' :
                     it.kind === 'row' ? '📋 行' : '📄 ページ';
    const parentDb = it.kind === 'row' && it.rowParentDbTitle
      ? ` · ${escapeHtml(it.rowParentDbTitle)} 内`
      : '';
    row.innerHTML =
      '<div class="memola-trash-info">' +
        '<div class="memola-trash-title">' + escapeHtml(it.title || '(無題)') + '</div>' +
        '<div class="memola-trash-meta">' +
          kindIcon + parentDb + ' · ' +
          '<b>' + escapeHtml(deleterName) + '</b> が ' + time + ' に削除' +
        '</div>' +
      '</div>' +
      '<button class="memola-trash-btn memola-trash-restore" title="復元">↺</button>' +
      // Purge is enabled only for items the current user deleted.
      '<button class="memola-trash-btn memola-trash-purge" ' +
        (isOwn ? 'title="完全削除"' : 'title="他のユーザが削除した項目は完全削除できません" disabled') +
        '>🗑</button>';
    row.querySelector('.memola-trash-restore')!.addEventListener('click', async () => {
      try {
        setLoad(true, '復元中...');
        if (it.kind === 'row' && it.rowListTitle && it.rowDbRowId) {
          await apiRestoreRow(it.rowListTitle, it.rowDbRowId);
          // If the user is currently viewing the parent DB, the table
          // view (`S.dbItems` + DOM) doesn't auto-refresh and the
          // restored row would stay invisible until they navigate away
          // and back. Re-fetch + re-render so the row reappears
          // immediately.
          await refreshActiveDbIfMatches(it.rowListTitle);
        } else {
          await apiRestorePage(it.bodyId);
        }
        await apiGetPages();
        renderTree();
        await renderTrashList();
        toast('復元しました');
      } catch (e) { toast('復元失敗: ' + (e as Error).message, 'err'); }
      finally { setLoad(false); }
    });
    if (isOwn) {
      row.querySelector('.memola-trash-purge')!.addEventListener('click', async () => {
        if (!confirm('完全に削除します。元に戻せません。')) return;
        try {
          setLoad(true, '削除中...');
          if (it.kind === 'row' && it.rowListTitle && it.rowDbRowId) {
            await apiPurgeRow(it.rowListTitle, it.rowDbRowId);
            // Refresh the DB view if user is in it (mostly a no-op
            // since the row was already filtered out, but keeps caches
            // honest if any were holding the trashed entry).
            await refreshActiveDbIfMatches(it.rowListTitle);
          } else {
            await apiPurgePage(it.bodyId);
          }
          try { await apiGetPages(); } catch { /* tolerate */ }
          renderTree();
          await renderTrashList();
          toast('完全に削除しました');
        } catch (e) { toast('削除失敗: ' + (e as Error).message, 'err'); }
        finally { setLoad(false); }
      });
    }
    list.appendChild(row);
  });
}
