// Tool Use handlers for database (DB) operations.
//
// A "DB" in n365 is an SP custom list backing per-row data, paired with a
// PageType='database' row in n365-pages. Row body markdown lives in
// n365-pages keyed by (ListTitle, DbRowId). See api/pages.ts for those.

import { S, type ListField, type ListItem } from '../state';
import {
  getListFields,
  getListItems,
  addListField,
} from '../api/sp-list';
import { apiCreateDb, apiUpdateDbRow } from '../api/db';
import { getRowBody, setRowBody } from '../api/pages';
import { renderTree } from '../ui/tree';
import { confirmDbRowUpdate } from '../ui/diff-modal';
import { addRowWithUndo, deleteRowWithUndo, recordRowFieldsUpdate } from '../ui/db-history';

export interface ToolResult { ok: boolean; [k: string]: unknown }

const ok = <T extends Record<string, unknown>>(extra: T = {} as T): ToolResult =>
  ({ ok: true, ...extra });
const err = (m: string): ToolResult => ({ ok: false, error: m });

function lookupDb(dbId: string): { listTitle: string; title: string } | null {
  const meta = S.meta.pages.find((p) => p.id === dbId && p.type === 'database');
  if (!meta || !meta.list) return null;
  return { listTitle: meta.list, title: meta.title };
}

/** Re-fetch rows + re-render the DB table when the user is currently viewing
 *  this DB. Called after any row-level mutation so AI changes show immediately. */
async function refreshDbViewIfActive(listTitle: string): Promise<void> {
  if (S.dbList !== listTitle) return;
  S.dbItems = await getListItems(listTitle);
  const m = await import('../ui/views');
  m.renderDbTable();
}

const KIND_LABEL: Record<number, string> = {
  2: 'text', 3: 'multiline', 4: 'date', 6: 'choice', 8: 'bool', 9: 'number',
};

function publicSchema(fields: ListField[]): Array<Record<string, unknown>> {
  return fields.map((f) => {
    const out: Record<string, unknown> = {
      name: f.Title,
      internal: f.InternalName,
      type: KIND_LABEL[f.FieldTypeKind] || 'text',
    };
    if (f.Choices) out.choices = f.Choices;
    return out;
  });
}

function pickRowFields(item: ListItem, fields: ListField[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    const v = item[f.InternalName];
    if (v !== undefined) out[f.InternalName] = v;
  }
  return out;
}

/** Resolve an AI-supplied field key (display Title or InternalName) to InternalName. */
function resolveField(fields: ListField[], key: string): ListField | null {
  return fields.find((f) => f.InternalName === key)
      || fields.find((f) => f.Title === key)
      || null;
}

/** Coerce a value to the SP-friendly string form for validateUpdateListItem.
 *  Throws for invalid date inputs so the AI gets a clear error rather than
 *  SP's generic out-of-range rejection. */
function coerceFieldValue(field: ListField, raw: unknown): string {
  if (raw == null) return '';
  switch (field.FieldTypeKind) {
    case 8: { // Bool
      const truthy = raw === true || raw === 1 || raw === '1' || raw === 'true' || raw === 'yes';
      return truthy ? '1' : '0';
    }
    case 4: { // Date — send plain YYYY-MM-DD (validateUpdateListItem with the
              // ja-JP site locale rejects full ISO timestamps; the SP UI itself
              // sends YYYY/MM/DD style. YYYY-MM-DD is locale-tolerant.)
      const s = String(raw).trim();
      if (!s) return '';
      const m = s.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
      if (m) {
        const y = m[1];
        const mo = m[2].padStart(2, '0');
        const d = m[3].padStart(2, '0');
        return `${y}-${mo}-${d}`;
      }
      // Last-resort: parseable date (e.g. ISO) → format JST as YYYY-MM-DD
      const t = new Date(s);
      if (!isNaN(t.getTime())) {
        const jst = new Date(t.getTime() + 9 * 3600 * 1000);
        return jst.getUTCFullYear() +
          '-' + String(jst.getUTCMonth() + 1).padStart(2, '0') +
          '-' + String(jst.getUTCDate()).padStart(2, '0');
      }
      throw new Error(
        `日付フィールド "${field.Title}" の値 "${s}" を解釈できません。` +
        ' YYYY-MM-DD 形式 (例: 2026-05-15) で渡してください。',
      );
    }
    case 9: { // Number
      const n = Number(raw);
      return isNaN(n) ? '' : String(n);
    }
    default:
      return String(raw);
  }
}

/** Build a SP write payload from AI fields, normalising keys to InternalName. */
function buildPayload(
  fields: ListField[],
  aiFields: Record<string, unknown>,
): { payload: Record<string, unknown>; unknownKeys: string[] } {
  const payload: Record<string, unknown> = {};
  const unknownKeys: string[] = [];
  for (const k of Object.keys(aiFields)) {
    if (k === 'Title') {              // built-in; pass through
      payload.Title = String(aiFields[k] ?? '');
      continue;
    }
    const f = resolveField(fields, k);
    if (!f) { unknownKeys.push(k); continue; }
    payload[f.InternalName] = coerceFieldValue(f, aiFields[k]);
  }
  return { payload, unknownKeys };
}

// ── Handlers ────────────────────────────────────────────

export async function handleReadDbSchema(input: { db_id: string }): Promise<ToolResult> {
  const db = lookupDb(input.db_id);
  if (!db) return err('db_not_found');
  const fields = await getListFields(db.listTitle);
  return ok({ id: input.db_id, title: db.title, fields: publicSchema(fields) });
}

export async function handleListDbRows(input: { db_id: string; limit?: number }): Promise<ToolResult> {
  const db = lookupDb(input.db_id);
  if (!db) return err('db_not_found');
  const limit = Math.min(Math.max(input.limit || 100, 1), 500);
  const [fields, items] = await Promise.all([
    getListFields(db.listTitle),
    getListItems(db.listTitle),
  ]);
  const rows = items.slice(0, limit).map((it) => ({
    id: it.Id,
    title: it.Title || '',
    fields: pickRowFields(it, fields),
  }));
  return ok({ db_id: input.db_id, total: items.length, returned: rows.length, rows });
}

export async function handleReadDbRow(input: { db_id: string; row_id: number }): Promise<ToolResult> {
  const db = lookupDb(input.db_id);
  if (!db) return err('db_not_found');
  const [fields, items] = await Promise.all([
    getListFields(db.listTitle),
    getListItems(db.listTitle),
  ]);
  const item = items.find((i) => i.Id === input.row_id);
  if (!item) return err('row_not_found');
  const body = await getRowBody(db.listTitle, input.row_id);
  return ok({
    db_id: input.db_id,
    row_id: input.row_id,
    title: item.Title || '',
    fields: pickRowFields(item, fields),
    body,
  });
}

export async function handleCreateDb(input: { title: string; parent_id?: string }): Promise<ToolResult> {
  const title = (input.title || '').trim();
  if (!title) return err('title_required');
  const parentId = input.parent_id || '';
  if (parentId && !S.pages.some((p) => p.Id === parentId)) {
    return err('parent_id_not_found');
  }
  const page = await apiCreateDb(title, parentId);
  S.pages.push({ Id: page.Id, Title: page.Title, ParentId: page.ParentId, Type: 'database' });
  if (parentId) S.expanded.add(parentId);
  renderTree();
  return ok({ id: page.Id, title: page.Title });
}

const TYPE_TO_KIND: Record<string, number> = {
  text: 2, multiline: 3, date: 4, choice: 6, bool: 8, number: 9,
};

export async function handleAddDbField(input: {
  db_id: string; name: string; type: string; choices?: string[];
}): Promise<ToolResult> {
  const db = lookupDb(input.db_id);
  if (!db) return err('db_not_found');
  const kind = TYPE_TO_KIND[input.type];
  if (!kind) return err('invalid_type: ' + input.type);
  if (kind === 6 && (!input.choices || input.choices.length === 0)) {
    return err('choices_required_for_choice_type');
  }
  // Reject duplicates by display name (case-sensitive — SP itself is case-insensitive
  // but we keep the strict comparison so AI gets a clear error).
  const existing = await getListFields(db.listTitle);
  if (existing.some((f) => f.Title === input.name || f.InternalName === input.name)) {
    return err('field_already_exists: ' + input.name);
  }
  await addListField(db.listTitle, input.name, kind, input.choices);
  // If the user is currently viewing this DB, refresh its schema cache so the
  // new column shows up without reload.
  if (S.dbList === db.listTitle) {
    S.dbFields = await getListFields(db.listTitle);
    void import('../ui/views').then((m) => m.renderDbTable());
  }
  return ok({ db_id: input.db_id, name: input.name, type: input.type });
}

export async function handleCreateDbRow(input: {
  db_id: string; fields: Record<string, unknown>; body?: string;
}): Promise<ToolResult> {
  const db = lookupDb(input.db_id);
  if (!db) return err('db_not_found');
  const fields = await getListFields(db.listTitle);
  const { payload, unknownKeys } = buildPayload(fields, input.fields || {});
  if (unknownKeys.length > 0) {
    return err('unknown_fields: ' + unknownKeys.join(', '));
  }
  // Record undo via shared helper (also handles cascade body)
  const created = await addRowWithUndo(db.listTitle, payload, input.body);
  // Don't unconditionally push into S.dbItems — that's the *active* DB cache.
  // If the AI is mutating a different DB, pushing here pollutes the open
  // view with foreign rows. refreshDbViewIfActive() re-fetches when the
  // target *is* active, which is the only case where we should mutate cache.
  await refreshDbViewIfActive(db.listTitle);
  return ok({ db_id: input.db_id, row_id: created.Id, title: payload.Title || '' });
}

export async function handleUpdateDbRow(input: {
  db_id: string; row_id: number; fields?: Record<string, unknown>; body?: string;
}): Promise<ToolResult> {
  const db = lookupDb(input.db_id);
  if (!db) return err('db_not_found');
  const fields = await getListFields(db.listTitle);
  const items = await getListItems(db.listTitle);
  const cur = items.find((i) => i.Id === input.row_id);
  if (!cur) return err('row_not_found');

  // Build payload from supplied fields, ignoring no-ops
  const { payload, unknownKeys } = buildPayload(fields, input.fields || {});
  if (unknownKeys.length > 0) return err('unknown_fields: ' + unknownKeys.join(', '));

  // Compute field-level diff for the modal
  const changes: Array<{ name: string; oldValue: string; newValue: string }> = [];
  for (const k of Object.keys(payload)) {
    const newVal = String(payload[k] ?? '');
    const oldRaw = k === 'Title' ? cur.Title : cur[k];
    const oldVal = oldRaw == null ? '' : String(oldRaw);
    if (newVal !== oldVal) {
      const f = fields.find((x) => x.InternalName === k);
      changes.push({ name: f?.Title || k, oldValue: oldVal, newValue: newVal });
    }
  }

  let oldBody: string | undefined;
  if (input.body != null) {
    oldBody = await getRowBody(db.listTitle, input.row_id);
  }

  // No-op short circuit
  if (changes.length === 0 && (input.body == null || input.body === oldBody)) {
    return ok({ no_changes: true });
  }

  const approved = await confirmDbRowUpdate({
    dbTitle: db.title,
    rowId: input.row_id,
    rowTitle: cur.Title || '',
    fieldChanges: changes,
    oldBody,
    newBody: input.body,
  });
  if (!approved) return err('user_cancelled');

  // Apply (capture old values first for undo)
  const onlyChangedPayload: Record<string, unknown> = {};
  const oldChangedPayload: Record<string, unknown> = {};
  for (const k of Object.keys(payload)) {
    const newVal = String(payload[k] ?? '');
    const oldRaw = k === 'Title' ? cur.Title : cur[k];
    const oldVal = oldRaw == null ? '' : String(oldRaw);
    if (newVal !== oldVal) {
      onlyChangedPayload[k] = payload[k];
      oldChangedPayload[k] = oldRaw == null ? '' : oldRaw;
    }
  }
  if (Object.keys(onlyChangedPayload).length > 0) {
    await apiUpdateDbRow(db.listTitle, input.row_id, onlyChangedPayload);
    // Mirror into local cache so subsequent reads are accurate
    for (const k of Object.keys(onlyChangedPayload)) cur[k] = onlyChangedPayload[k];
  }
  const bodyChanged = input.body != null && input.body !== oldBody;
  if (bodyChanged) {
    await setRowBody(db.listTitle, input.row_id, input.db_id, cur.Title || '', input.body!);
  }
  await refreshDbViewIfActive(db.listTitle);
  // Record undo entry covering both field changes and body change
  recordRowFieldsUpdate(
    db.listTitle,
    input.row_id,
    oldChangedPayload,
    onlyChangedPayload,
    bodyChanged ? oldBody : undefined,
    bodyChanged ? input.body : undefined,
    input.db_id,
  );
  return ok({ db_id: input.db_id, row_id: input.row_id, changed: changes.map((c) => c.name) });
}

export async function handleDeleteDbRow(input: { db_id: string; row_id: number }): Promise<ToolResult> {
  const db = lookupDb(input.db_id);
  if (!db) return err('db_not_found');
  if (!confirm(`${db.title} の行 #${input.row_id} を削除しますか？`)) {
    return err('user_cancelled');
  }
  await deleteRowWithUndo(db.listTitle, input.row_id);
  await refreshDbViewIfActive(db.listTitle);
  return ok({ db_id: input.db_id, row_id: input.row_id });
}
