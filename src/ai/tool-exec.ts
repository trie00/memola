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
  apiSetTitle,
} from '../api/pages';
import { mdToHtml } from '../lib/markdown';
import { renderTree } from '../ui/tree';
import { confirmPageUpdate } from '../ui/diff-modal';
import { collectDescendantIds } from '../lib/page-tree';
import { g, getEd } from '../ui/dom';
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
  const items = (includeTrashed ? S.meta.pages : S.meta.pages.filter((p) => !p.trashed))
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

  const page = await apiCreatePage(title, parentId);
  S.pages.push(page);

  if (input.body) {
    // Save markdown directly — round-tripping through mdToHtml/htmlToMd is lossy.
    await apiSavePageMd(page.Id, title, input.body);
  }
  if (parentId) S.expanded.add(parentId);
  renderTree();
  return ok({ id: page.Id, title: page.Title });
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
  if (input.body != null) {
    oldBody = await apiLoadRawBody(id);
    newBody = input.body;
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
    await apiSavePageMd(id, newTitle, newBody || '');
  } else if (newTitle !== oldTitle) {
    await apiSetTitle(id, newTitle);
  }
  page.Title = newTitle;
  renderTree();

  // If the user is currently viewing this page in the editor, refresh it so
  // the change is visible without manual reload.
  if (S.currentId === id && !S.currentRow) {
    if (input.body != null) {
      const ed = getEd();
      if (ed) ed.innerHTML = mdToHtml(newBody || '');
    }
    if (newTitle !== oldTitle) {
      const titleEl = g('ttl') as HTMLTextAreaElement | null;
      if (titleEl) { titleEl.value = newTitle; autoR(titleEl); }
    }
    S.dirty = false;
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
  S.pages = S.pages.filter((p) => !ids.includes(p.Id));
  if (S.currentId !== null && ids.includes(S.currentId)) {
    S.currentId = null;
  }
  renderTree();
  return ok({ trashed_ids: ids });
}

// ── Dispatcher ──────────────────────────────────────────

export async function executeTool(name: string, input: Record<string, unknown>): Promise<string> {
  // Debug log — prints what Claude actually sent. Useful for diagnosing
  // "Claude said it added body but the page is empty" type issues.
  // Remove or gate behind a debug flag once stable.
  // eslint-disable-next-line no-console
  console.log('[n365 tool]', name, input);
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
      case 'create_db_row':  result = await db.handleCreateDbRow(input as { db_id: string; fields: Record<string, unknown>; body?: string }); break;
      case 'update_db_row':  result = await db.handleUpdateDbRow(input as { db_id: string; row_id: number; fields?: Record<string, unknown>; body?: string }); break;
      case 'delete_db_row':  result = await db.handleDeleteDbRow(input as { db_id: string; row_id: number }); break;
      default:               result = err('unknown_tool: ' + name);
    }
  } catch (e) {
    result = err((e as Error).message || 'unknown_error');
  }
  return JSON.stringify(result);
}
