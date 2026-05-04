// SharePoint list / field / item REST helpers backing the memola-pages list and
// every per-DB list. Higher-level page semantics live in api/pages.ts; this
// module only deals with raw list mechanics.

import { SITE } from '../config';
import { getDigest } from './digest';
import { spListUrl, spGetD, ODATA_POST_HEADERS } from './sp-rest';
import type { ListField, ListItem } from '../state';

interface SPField {
  Title: string;
  InternalName: string;
  FieldTypeKind: number;
  Choices?: { results: string[] };
}

const _etCache: Record<string, string> = {};

/** Pull a human-readable detail out of a SharePoint REST error body.
 *
 *  SP returns errors as either:
 *    {"error":{"code":"...","message":{"lang":"ja-JP","value":"..."}}}
 *  or sometimes as a charset-misdeclared JSON where non-ASCII chars come
 *  through as literal `\u…` escape sequences. The previous regex-based
 *  extraction captured them verbatim, so the user saw garbage like
 *  `列 '優先度'` instead of `列 '優先度'`.
 *
 *  Strategy:
 *    1. Try JSON.parse on the whole body (handles \u escapes natively).
 *    2. If that fails, regex-extract the value string and JSON-decode it
 *       in isolation by wrapping in quotes and re-parsing.
 *    3. Last resort: return the raw match. */
function extractSpErrorDetail(txt: string): string {
  try {
    const j = JSON.parse(txt) as { error?: { message?: { value?: string } } };
    const v = j?.error?.message?.value;
    if (v) return v;
  } catch { /* fall through */ }
  const m = txt.match(/"value"\s*:\s*"((?:\\.|[^"\\])*)"/);
  if (!m) return '';
  try { return JSON.parse('"' + m[1] + '"') as string; }
  catch { return m[1]; }
}

/** Drop all cached entity-type lookups. Called when switching workspaces
 *  (lists in the new site have different entity types). */
export function clearListCaches(): void {
  for (const k of Object.keys(_etCache)) delete _etCache[k];
}

export async function createList(listTitle: string): Promise<void> {
  const d = await getDigest();
  const r = await fetch(SITE + '/_api/web/lists', {
    method: 'POST',
    headers: { ...ODATA_POST_HEADERS, 'X-RequestDigest': d },
    credentials: 'include',
    body: JSON.stringify({
      __metadata: { type: 'SP.List' },
      BaseTemplate: 100,
      Title: listTitle,
      Description: 'Memola',
    }),
  });
  if (!r.ok) throw new Error('リスト作成失敗: ' + r.status);
}

export async function deleteList(listTitle: string): Promise<void> {
  const d = await getDigest();
  await fetch(spListUrl(listTitle), {
    method: 'POST',
    headers: { 'X-RequestDigest': d, 'X-HTTP-Method': 'DELETE', 'IF-MATCH': '*' },
    credentials: 'include',
  });
}

export async function getListEntityType(listTitle: string): Promise<string> {
  if (_etCache[listTitle]) return _etCache[listTitle];
  const d = await spGetD<{ ListItemEntityTypeFullName: string }>(
    spListUrl(listTitle, '?$select=ListItemEntityTypeFullName'),
  );
  if (!d) throw new Error('エンティティタイプ取得失敗');
  _etCache[listTitle] = d.ListItemEntityTypeFullName;
  return _etCache[listTitle];
}

export async function getListFields(listTitle: string): Promise<ListField[]> {
  const d = await spGetD<{ results: SPField[] }>(
    spListUrl(listTitle,
      "/fields?$filter=Hidden eq false and ReadOnlyField eq false&$select=Title,InternalName,FieldTypeKind,Choices"),
  );
  if (!d) throw new Error('スキーマ取得失敗');
  return d.results
    .filter((f) => [2, 3, 4, 6, 8, 9].indexOf(f.FieldTypeKind) >= 0)
    .map((f) => {
      const field: ListField = {
        Title: f.Title,
        InternalName: f.InternalName,
        FieldTypeKind: f.FieldTypeKind,
      };
      if (f.FieldTypeKind === 6 && f.Choices && f.Choices.results) {
        field.Choices = f.Choices.results;
      }
      return field;
    });
}

/** SharePoint REST prefixes internal names that start with `_` (including
 *  encoded non-ASCII like `_x3042_…`) with `OData_` in the response. Mirror
 *  each such property under its non-prefixed name so callers can look up
 *  values by the field's actual InternalName. */
function unwrapODataPrefix(item: ListItem): ListItem {
  const fixed: ListItem = item;
  for (const k of Object.keys(item)) {
    if (k.startsWith('OData_')) {
      const bare = k.substring(6);
      if (!(bare in fixed)) fixed[bare] = item[k];
    }
  }
  return fixed;
}

export async function getListItems(listTitle: string): Promise<ListItem[]> {
  // SP /items returns at most 5000 (default ~100/500) per response. Follow
  // the `__next` link until exhausted so callers always see the full list —
  // truncating silently would drop pages from the tree and orphan row-body
  // entries on DB delete.
  const all: ListItem[] = [];
  let next: string | undefined = spListUrl(listTitle, '/items?$orderby=Id&$top=500');
  // Hard cap to prevent runaway loops if the server lies about __next
  for (let safety = 0; next && safety < 200; safety++) {
    const r = await fetch(next, {
      headers: { Accept: 'application/json;odata=verbose' },
      credentials: 'include',
    });
    if (!r.ok) throw new Error('データ取得失敗');
    const j = (await r.json()) as { d: { results?: ListItem[]; __next?: string } };
    const batch = j.d?.results || [];
    for (const item of batch) all.push(unwrapODataPrefix(item));
    next = j.d?.__next;
  }
  return all;
}

/** Fetch a single list item by its numeric Id from the *target* list. Use
 *  this in undo/redo / cross-list paths instead of grovelling through the
 *  active-DB cache `S.dbItems` — Id is per-list, so the cached value can
 *  belong to a totally different DB. */
export async function getListItemById(
  listTitle: string,
  itemId: number,
): Promise<ListItem | null> {
  const d = await spGetD<ListItem>(spListUrl(listTitle, '/items(' + itemId + ')'));
  return d ? unwrapODataPrefix(d) : null;
}

export async function createListItem(
  listTitle: string,
  data: Record<string, unknown>,
): Promise<ListItem> {
  const et = await getListEntityType(listTitle);
  const d = await getDigest();
  // SP REST entity types prefix any property whose InternalName begins with
  // `_` (including encoded non-ASCII names like `_x30b9_...` for ステータス)
  // with `OData_`. Without this, SP returns 400 「property does not exist on
  // type」for Japanese-named columns. The read side (getListItems) mirrors
  // this in reverse.
  const payload: Record<string, unknown> = { __metadata: { type: et } };
  for (const k of Object.keys(data)) {
    if (k === '__metadata') continue;
    const outKey = k.startsWith('_') ? 'OData_' + k : k;
    payload[outKey] = data[k];
  }
  const r = await fetch(spListUrl(listTitle, '/items'), {
    method: 'POST',
    headers: { ...ODATA_POST_HEADERS, 'X-RequestDigest': d },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (!r.ok) {
    const txt = await r.text().catch(() => '');
    let detail = extractSpErrorDetail(txt);
    if (!detail && txt && txt.length < 300) detail = txt;
    // If digest expired or schema changed, retry once after invalidating caches
    if (r.status === 403 || r.status === 401) {
      delete _etCache[listTitle];
    }
    throw new Error('行追加失敗: ' + r.status + (detail ? ' — ' + detail : ''));
  }
  const j = (await r.json()) as { d: ListItem };
  return j.d;
}

export async function deleteListItem(listTitle: string, itemId: number): Promise<void> {
  const d = await getDigest();
  const r = await fetch(spListUrl(listTitle, '/items(' + itemId + ')'), {
    method: 'POST',
    headers: { 'X-RequestDigest': d, 'X-HTTP-Method': 'DELETE', 'If-Match': '*' },
    credentials: 'include',
  });
  // 404 = already gone — treat as success (idempotent delete). This avoids
  // spurious failures during undo/redo when a row was deleted by another path.
  if (r.status === 404) return;
  if (!r.ok) throw new Error('削除失敗: ' + r.status);
}

export async function addListField(
  listTitle: string,
  name: string,
  typeKind: number | string,
  choices?: string[],
): Promise<unknown> {
  const typeMap: Record<number, string> = {
    2: 'SP.FieldText', 3: 'SP.FieldMultiLineText', 4: 'SP.FieldDateTime',
    8: 'SP.FieldBoolean', 9: 'SP.FieldNumber', 6: 'SP.FieldChoice',
  };
  const d = await getDigest();
  const kindNum = typeof typeKind === 'string' ? parseInt(typeKind, 10) : typeKind;
  let body: unknown;
  if (kindNum === 6) {
    body = {
      __metadata: { type: 'SP.FieldChoice' },
      FieldTypeKind: 6,
      Title: name,
      Choices: { __metadata: { type: 'Collection(Edm.String)' }, results: choices || [] },
    };
  } else if (kindNum === 3) {
    // Multiple lines of text (Note) — prefer plain text + multi-line input
    body = {
      __metadata: { type: 'SP.FieldMultiLineText' },
      FieldTypeKind: 3,
      Title: name,
      NumberOfLines: 6,
      RichText: false,
      AppendOnly: false,
    };
  } else if (kindNum === 4) {
    // DateTime — explicit calendar / display props avoid 400s on tenants
    // that reject the bare {FieldTypeKind, Title} payload.
    //   DisplayFormat 0 = DateOnly, 1 = DateTime
    //   FriendlyDisplayFormat 0 = Disabled (= raw "YYYY/MM/DD")
    //   DateTimeCalendarType 1 = Gregorian
    body = {
      __metadata: { type: 'SP.FieldDateTime' },
      FieldTypeKind: 4,
      Title: name,
      DisplayFormat: 0,
      FriendlyDisplayFormat: 0,
      DateTimeCalendarType: 1,
    };
  } else {
    body = {
      __metadata: { type: typeMap[kindNum] || 'SP.FieldText' },
      FieldTypeKind: kindNum,
      Title: name,
    };
  }
  // Invalidate any cached entity-type/field schema so the next update picks up the new field.
  delete _etCache[listTitle];
  const r = await fetch(spListUrl(listTitle, '/fields'), {
    method: 'POST',
    headers: { ...ODATA_POST_HEADERS, 'X-RequestDigest': d },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const txt = await r.text().catch(() => '');
    let detail = extractSpErrorDetail(txt);
    if (!detail && txt && txt.length < 200) detail = txt;
    throw new Error('列追加失敗: ' + r.status + (detail ? ' — ' + detail : ''));
  }
  const j = (await r.json()) as { d: unknown };
  return j.d;
}

/** Hard-delete a column from an SP list. Used to dedupe columns that
 *  past code paths added more than once (the SP REST `/fields` POST does
 *  not enforce display-name uniqueness — duplicates get auto-numbered
 *  internal names like `NoteTag1`, `NoteTag2`, …). The display name is
 *  not unique, so we resolve via the unique InternalName. Best-effort —
 *  failures throw so the caller can decide whether to ignore. */
export async function deleteListField(
  listTitle: string,
  fieldInternalName: string,
): Promise<void> {
  const d = await getDigest();
  const url = spListUrl(
    listTitle,
    "/fields/getbyinternalnameortitle('" + fieldInternalName + "')",
  );
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'X-RequestDigest': d,
      'X-HTTP-Method': 'DELETE',
      'IF-MATCH': '*',
    },
    credentials: 'include',
  });
  if (!r.ok && r.status !== 404) {
    throw new Error('列削除失敗: ' + r.status);
  }
}

/** Mark an SP list column as indexed (`Indexed=true`). SP then maintains a
 *  B+Tree index for that column transactionally with every write, which
 *  lets `$filter` queries on that column scale beyond the 5,000-row List
 *  View Threshold.
 *
 *  Idempotent: setting `Indexed=true` on an already-indexed column is a
 *  no-op. Adding it to a column that doesn't exist yet returns 4xx — we
 *  swallow that with `.catch` because indexing is best-effort (the app
 *  still works at <5K rows without it).
 *
 *  Note column types (multi-line text) cannot be indexed; only Text /
 *  Number / DateTime / Choice / Person / Yes-No / Lookup are supported.
 *  Trying to index a Note column returns 4xx and is silently ignored. */
export async function setColumnIndexed(
  listTitle: string,
  columnInternalName: string,
): Promise<void> {
  const d = await getDigest();
  const url = spListUrl(
    listTitle,
    "/fields/getbyinternalnameortitle('" + columnInternalName + "')",
  );
  await fetch(url, {
    method: 'POST',
    headers: {
      ...ODATA_POST_HEADERS,
      'X-RequestDigest': d,
      'X-HTTP-Method': 'MERGE',
      'IF-MATCH': '*',
    },
    credentials: 'include',
    body: JSON.stringify({
      __metadata: { type: 'SP.Field' },
      Indexed: true,
    }),
  }).catch(() => undefined);
}

/** True if the SP error message indicates that one of the fields we sent
 *  is unknown to SP. Used to decide whether to refresh schema + retry. */
function looksLikeFieldNotFound(detail: string): boolean {
  // Japanese SP: 「列 'X' が存在しません」  English SP: "Column 'X' does not exist"
  return /存在しません|does not exist/i.test(detail);
}

/** Fetch the current SP-side field schema and rewrite any FieldName in
 *  `data` that doesn't match a current field. We try both directions:
 *    - cached InternalName → canonical InternalName (column might have
 *      been recreated under a different encoded form)
 *    - cached Title → canonical InternalName (covers the case where
 *      SP's validateUpdateListItem doesn't accept display-name FieldNames
 *      on this tenant for non-ASCII columns)
 *
 *  Fields that still can't be matched after the lookup are dropped from
 *  the retry — better to let the unknown field fail loudly with a clear
 *  message than to silently retry something that obviously won't work. */
async function rewriteFieldNamesFromSchema(
  listTitle: string,
  data: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const fields = await getListFields(listTitle).catch(() => [] as ListField[]);
  if (fields.length === 0) return data;
  // Build lookup tables in both directions
  const byInternal = new Map(fields.map((f) => [f.InternalName, f]));
  const byTitle = new Map(fields.map((f) => [f.Title, f]));
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(data)) {
    if (k === '__metadata') { out[k] = data[k]; continue; }
    const f = byInternal.get(k) || byTitle.get(k);
    out[f ? f.InternalName : k] = data[k];
  }
  return out;
}

export async function updateListItem(
  listTitle: string,
  itemId: number,
  data: Record<string, unknown>,
): Promise<void> {
  // Use validateUpdateListItem instead of MERGE — it accepts both display and
  // internal names and bypasses the entity-type schema cache, which otherwise
  // rejects non-ASCII field names added in the same session.
  await callValidateUpdate(listTitle, itemId, data, /* allowRetry */ true);
}

async function callValidateUpdate(
  listTitle: string,
  itemId: number,
  data: Record<string, unknown>,
  allowRetry: boolean,
): Promise<void> {
  const d = await getDigest();
  const formValues = Object.entries(data)
    .filter(([k]) => k !== '__metadata')
    .map(([k, v]) => ({ FieldName: k, FieldValue: v == null ? '' : String(v) }));
  const r = await fetch(
    spListUrl(listTitle, '/items(' + itemId + ')/validateUpdateListItem'),
    {
      method: 'POST',
      headers: { ...ODATA_POST_HEADERS, 'X-RequestDigest': d },
      credentials: 'include',
      body: JSON.stringify({ formValues, bNewDocumentUpdate: false }),
    },
  );
  if (!r.ok) {
    const txt = await r.text().catch(() => '');
    const detail = extractSpErrorDetail(txt);
    // Field-not-found → SP's schema doesn't match what we cached. Refresh
    // and retry once with canonical InternalNames before failing loudly.
    if (allowRetry && looksLikeFieldNotFound(detail)) {
      const remapped = await rewriteFieldNamesFromSchema(listTitle, data);
      // Retry only if at least one field name actually changed — otherwise
      // we'd just make the same failing call again.
      const changed = Object.keys(remapped).some((k) => !(k in data));
      if (changed) {
        await callValidateUpdate(listTitle, itemId, remapped, /* allowRetry */ false);
        return;
      }
    }
    throw new Error('更新失敗: ' + r.status + (detail ? ' — ' + detail : ''));
  }
  const json = (await r.json()) as {
    d: { ValidateUpdateListItem: { results: Array<{ ErrorMessage: string | null; FieldName: string }> } };
  };
  const errs = json.d.ValidateUpdateListItem.results.filter((x) => x.ErrorMessage);
  if (errs.length === 0) return;
  // Per-field validation errors. If any of them looks like field-not-found,
  // do the same schema-refresh retry.
  const anyFieldMissing = errs.some((e) => looksLikeFieldNotFound(e.ErrorMessage || ''));
  if (allowRetry && anyFieldMissing) {
    const remapped = await rewriteFieldNamesFromSchema(listTitle, data);
    const changed = Object.keys(remapped).some((k) => !(k in data));
    if (changed) {
      await callValidateUpdate(listTitle, itemId, remapped, /* allowRetry */ false);
      return;
    }
  }
  throw new Error('更新失敗: ' + errs.map((e) => e.FieldName + ': ' + e.ErrorMessage).join(', '));
}

