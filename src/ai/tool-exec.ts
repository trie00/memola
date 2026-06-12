// Dispatcher for the Tool Use schemas defined in tool-defs.ts.
//
// Each handler returns a JSON-serialisable result; the loop in run-agent.ts
// stringifies it before returning to Claude. Destructive operations request
// user confirmation via UI modals — the AI's "rule memory" alone is not a
// safety boundary.

import { S } from '../state';
import {
  apiCreatePage,
  apiSavePageMd,
  apiTrashPage,
  apiLoadRawBody,
  apiLoadFileMeta,
  apiSetTitle,
} from '../api/pages';
import { mdToBlocks } from '../lib/blocks-md';
import { setLogSource } from '../api/oplog';
import { renderTree } from '../ui/tree';
import { confirmPageUpdate } from '../ui/diff-modal';
import { collectDescendantIds } from '../lib/page-tree';
import { addPage, removePages, setPageTitle, metaById } from '../lib/page-store';
import { g } from '../ui/dom';
import { autoR } from '../ui/ui-helpers';
import * as db from './db-tool-exec';

interface ToolResult { ok: boolean; [k: string]: unknown }

function ok<T extends Record<string, unknown>>(extra: T = {} as T): ToolResult {
  return { ok: true, ...extra };
}

function err(message: string): ToolResult {
  return { ok: false, error: message };
}

// ── Handlers ────────────────────────────────────────────

function handleListPages(input: { include_trashed?: boolean }): ToolResult {
  const includeTrashed = !!input.include_trashed;
  // Drafts are personal scratch; don't expose them to AI tooling either.
  const items = S.meta.pages
    .filter((p) => !p.originPageId)
    .filter((p) => includeTrashed || !p.trashed)
    .map((p) => ({
      id: p.id,
      title: p.title,
      parent_id: p.parent || '',
      type: p.type || 'page',
      ...(p.trashed ? { trashed: true } : {}),
    }));
  return ok({ pages: items });
}

function handleSearchPages(input: { query: string }): ToolResult {
  const q = (input.query || '').toLowerCase();
  if (!q) return ok({ pages: [] });
  const hits = S.pages
    .filter((p) => !p.IsDraft)
    .filter((p) => (p.Title || '').toLowerCase().includes(q))
    .map((p) => ({
      id: p.Id,
      title: p.Title,
      parent_id: p.ParentId || '',
      type: p.Type || 'page',
    }));
  return ok({ pages: hits });
}

async function handleReadPage(input: { id: string }): Promise<ToolResult> {
  const id = String(input.id || '');
  const page = S.pages.find((p) => p.Id === id);
  if (!page) return err('page_not_found');
  if (page.Type === 'database') return err('cannot_read_database_body');
  const body = await apiLoadRawBody(id);
  return ok({ id, title: page.Title || '', body });
}

async function handleCreatePage(input: { title: string; parent_id?: string; body?: string }): Promise<ToolResult> {
  const title = (input.title || '').trim();
  if (!title) return err('title_required');
  const parentId = input.parent_id || '';
  if (parentId && !S.pages.some((p) => p.Id === parentId)) {
    return err('parent_id_not_found');
  }

  // 手動の doNew と完全に同じ作成手順にする(AI 経路だけ独自にしない):
  //   1. 親スコープを継承して「無題」の空ページを作る (doNew と同一呼び出し)。
  //   2. その後にタイトル・本文を「更新」する(手動編集と同じ経路)。
  // 以前は apiCreatePage(title, parent) に scope を渡さず常に 'user' で作り、直後に
  // apiSavePageMd を重ねていた。これがスコープ取り違え/行取り違えの温床だった。
  const scope = parentId ? (metaById(parentId)?.scope || 'user') : 'user';
  const page = await apiCreatePage('無題', parentId, scope);
  addPage(page);

  // 作成後にタイトル + 本文を変更(= 手動でページを開いて編集するのと同じ)。
  if (input.body != null && input.body !== '') {
    // apiSavePageMd は Title も書くので、本文ありならこれ一回でタイトルも確定。
    await apiSavePageMd(page.Id, title, input.body);
  } else {
    await apiSetTitle(page.Id, title);
  }
  setPageTitle(page.Id, title);
  if (parentId) S.expanded.add(parentId);
  renderTree();
  return ok({ id: page.Id, title });
}

async function handleUpdatePage(input: { id: string; title?: string; body?: string }): Promise<ToolResult> {
  const id = String(input.id || '');
  const page = S.pages.find((p) => p.Id === id);
  if (!page) return err('page_not_found');
  if (page.Type === 'database') return err('cannot_update_database_body');

  const oldTitle = page.Title || '';
  const newTitle = input.title != null ? input.title : oldTitle;
  let oldBody: string | undefined;
  let newBody: string | undefined;
  // Capture the ETag we read this version against so the save can detect
  // concurrent edits. Without this the AI path silently overwrites whatever
  // another user (or this user in another tab) wrote between read & save.
  let expectedEtag: string | undefined;
  if (input.body != null) {
    oldBody = await apiLoadRawBody(id);
    newBody = input.body;
    const fm = await apiLoadFileMeta(id);
    expectedEtag = fm?.etag || undefined;
  }

  // Diff preview + confirmation
  const approved = await confirmPageUpdate({
    pageId: id,
    pageTitle: oldTitle,
    oldTitle,
    newTitle: input.title != null ? newTitle : undefined,
    oldBody,
    newBody,
  });
  if (!approved) return err('user_cancelled');

  // No changes — short-circuit
  if (newTitle === oldTitle && newBody === oldBody) {
    return ok({ id, no_changes: true });
  }

  if (input.body != null) {
    const result = await apiSavePageMd(id, newTitle, newBody || '', expectedEtag);
    if (!result.ok) {
      return err('conflict_other_user_updated_page');
    }
  } else if (newTitle !== oldTitle) {
    await apiSetTitle(id, newTitle);
  }
  setPageTitle(id, newTitle);
  renderTree();

  // If the user is currently viewing this page in the editor, refresh it so
  // the change is visible without manual reload. Push through editor2's
  // controlled-rendering bridge so the slash menu / hover handles / etc.
  // re-bind correctly — the legacy `ed.innerHTML = mdToHtml(...)` path
  // bypassed editor2 and left the rendered DOM disconnected from state.
  if (S.currentId === id && !S.currentRow) {
    if (input.body != null) {
      const { loadBlocks } = await import('../ui/editor2/editor2-bridge');
      loadBlocks(mdToBlocks(newBody || ''));
    }
    if (newTitle !== oldTitle) {
      const titleEl = g('ttl') as HTMLTextAreaElement | null;
      if (titleEl) { titleEl.value = newTitle; autoR(titleEl); }
    }
    // Editor was just refreshed from a successful AI write — re-establish
    // the Saver's baseline so the editor mirrors 'idle' (no unsaved diff).
    const fm = await apiLoadFileMeta(id).catch(() => null);
    if (fm) {
      const { saver } = await import('../lib/saver');
      saver.loadPage({
        pageId: id,
        body: newBody || '',
        title: newTitle,
        etag: fm.etag,
        modified: fm.modified,
      });
    }
  }
  return ok({ id, title: newTitle });
}

async function handleTrashPage(input: { id: string }): Promise<ToolResult> {
  const id = String(input.id || '');
  const page = S.pages.find((p) => p.Id === id);
  if (!page) return err('page_not_found');

  const ids = collectDescendantIds(S.pages, id);
  const childCount = ids.length - 1;
  const msg = childCount > 0
    ? `「${page.Title || '無題'}」と子ページ ${childCount} 件をゴミ箱に移動しますか？`
    : `「${page.Title || '無題'}」をゴミ箱に移動しますか？`;
  if (!confirm(msg)) return err('user_cancelled');

  await apiTrashPage(id);
  removePages(ids);
  if (S.currentId !== null && ids.includes(S.currentId)) {
    S.currentId = null;
  }
  renderTree();
  return ok({ trashed_ids: ids });
}

/** 複数DB構成の雛形を提案 → プレビュー確認画面を出す(即作成はしない)。 */
async function handleScaffold(input: Record<string, unknown>): Promise<ToolResult> {
  const spec = input as unknown as import('../ui/scaffold').WorkspaceSpec;
  if (!Array.isArray(spec.dbs) || spec.dbs.length === 0) return err('no_dbs');
  const { openScaffoldPreview } = await import('../ui/scaffold');
  // 現在開いているのが通常ページならその配下、そうでなければルートに作る。
  const parentId = (S.currentType === 'page' && !S.currentRow && S.currentId) ? S.currentId : '';
  openScaffoldPreview(spec, parentId);
  return ok({ presented: true, dbs: spec.dbs.map((d) => d.name), note: 'プレビューを表示しました。ユーザーが「作成する」を押すと生成されます。' });
}

// ── Dispatcher ──────────────────────────────────────────

export async function executeTool(name: string, input: Record<string, unknown>): Promise<string> {
  // Debug log — prints what Claude actually sent. Useful for diagnosing
  // "Claude said it added body but the page is empty" type issues.
  // Remove or gate behind a debug flag once stable.
  // eslint-disable-next-line no-console
  console.log('[Memola tool]', name, input);
  // 変更系ツール実行中は操作ログの発生源を 'ai' にする(ページ作成/削除が
  // AI 由来として記録される)。終了時に 'user' へ戻す。
  setLogSource('ai');
  let result: ToolResult;
  try {
    switch (name) {
      // Page tools
      case 'list_pages':     result = handleListPages(input as { include_trashed?: boolean }); break;
      case 'search_pages':   result = handleSearchPages(input as { query: string }); break;
      case 'read_page':      result = await handleReadPage(input as { id: string }); break;
      case 'create_page':    result = await handleCreatePage(input as { title: string; parent_id?: string; body?: string }); break;
      case 'update_page':    result = await handleUpdatePage(input as { id: string; title?: string; body?: string }); break;
      case 'trash_page':     result = await handleTrashPage(input as { id: string }); break;
      // DB tools
      case 'read_db_schema': result = await db.handleReadDbSchema(input as { db_id: string }); break;
      case 'list_db_rows':   result = await db.handleListDbRows(input as { db_id: string; limit?: number }); break;
      case 'read_db_row':    result = await db.handleReadDbRow(input as { db_id: string; row_id: number }); break;
      case 'create_db':      result = await db.handleCreateDb(input as { title: string; parent_id?: string }); break;
      case 'add_db_field':   result = await db.handleAddDbField(input as { db_id: string; name: string; type: string; choices?: string[] }); break;
      case 'add_relation_column': result = await db.handleAddRelationColumn(input as { db_id: string; name: string; key_field: string; target_db_id: string; target_key_field?: string; display_field?: string }); break;
      case 'add_rollup_column':   result = await db.handleAddRollupColumn(input as { db_id: string; name: string; child_db_id: string; child_foreign_field: string; agg: string; target_field?: string }); break;
      case 'create_db_row':  result = await db.handleCreateDbRow(input as { db_id: string; fields: Record<string, unknown>; body?: string }); break;
      case 'update_db_row':  result = await db.handleUpdateDbRow(input as { db_id: string; row_id: number; fields?: Record<string, unknown>; body?: string }); break;
      case 'delete_db_row':  result = await db.handleDeleteDbRow(input as { db_id: string; row_id: number }); break;
      case 'scaffold_workspace': result = await handleScaffold(input as Record<string, unknown>); break;
      default:               result = err('unknown_tool: ' + name);
    }
  } catch (e) {
    result = err((e as Error).message || 'unknown_error');
  } finally {
    setLogSource('user');
  }
  return JSON.stringify(result);
}
