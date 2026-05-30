// SharePoint list / field / item REST helpers backing the memola-pages list and
// every per-DB list. Higher-level page semantics live in api/pages.ts; this
// module only deals with raw list mechanics.

import { SITE, SP_VERSION_LIMIT } from '../config';
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

/** Look up the SP role definition id for a role.
 *
 *  Resolution order:
 *    1. By `RoleTypeKind` (language-independent SP enum). This is the
 *       canonical / stable way: 5 = Administrator (= Full Control),
 *       4 = Editor (= Edit), 3 = Contributor (= Contribute),
 *       2 = Reader (= Read). The display Name is localized per
 *       tenant ("フル コントロール" on Japanese SP), so name matching
 *       fails on non-English tenants — we hit RoleTypeKind first.
 *    2. By Name across a list of candidate strings (= per-language
 *       aliases). Tenants with custom roles whose RoleTypeKind is 0
 *       (= None) fall through to this branch.
 *
 *  Cached per-session by the resolved role id. */
const _roleDefCache: Record<string, number> = {};

/** Mapping from canonical role token → SP `RoleTypeKind` enum value
 *  + per-language candidate display names. The `kind` field is what
 *  makes this work on Japanese / French / etc. tenants. */
const ROLE_SPEC: Record<string, { kind: number; names: string[] }> = {
  'Full Control': { kind: 5, names: ['Full Control', 'フル コントロール', 'フルコントロール'] },
  'Edit':         { kind: 4, names: ['Edit', '編集'] },
  'Contribute':   { kind: 3, names: ['Contribute', '投稿', 'コントリビュート'] },
  'Read':         { kind: 2, names: ['Read', '読み取り', '読取り'] },
};

export async function resolveRoleDefId(name: string): Promise<number> {
  if (_roleDefCache[name]) return _roleDefCache[name];
  const spec = ROLE_SPEC[name];

  // Path 1: RoleTypeKind lookup (language-independent).
  if (spec) {
    const url = SITE + "/_api/web/roledefinitions?$select=Id,Name,RoleTypeKind&$filter=" +
      encodeURIComponent('RoleTypeKind eq ' + spec.kind);
    try {
      const d = await spGetD<{ results: Array<{ Id: number; Name: string; RoleTypeKind: number }> }>(url);
      const id = d?.results?.[0]?.Id;
      if (id) {
        _roleDefCache[name] = id;
        return id;
      }
    } catch { /* fall through to name lookup */ }
  }

  // Path 2: name lookup, trying each candidate (= per-language alias).
  const candidates = spec?.names ?? [name];
  for (const candidate of candidates) {
    const url = SITE + "/_api/web/roledefinitions?$select=Id,Name&$filter=" +
      encodeURIComponent("Name eq '" + candidate.replace(/'/g, "''") + "'");
    try {
      const d = await spGetD<{ results: Array<{ Id: number; Name: string }> }>(url);
      const id = d?.results?.[0]?.Id;
      if (id) {
        _roleDefCache[name] = id;
        return id;
      }
    } catch { /* try the next candidate */ }
  }

  throw new Error('ロール定義が見つかりません: ' + name +
    ' (試した候補: RoleTypeKind=' + (spec?.kind ?? 'なし') +
    ', Name=' + candidates.join(' / ') + ')');
}

/** Lock down a list so only one principal (= the given SP user id)
 *  can read or write it. Used by the per-user pages list to enforce
 *  Phase 3 privacy at the SP layer (defence-in-depth on top of the
 *  client-side `filterVisiblePages` filter).
 *
 *  Sequence:
 *    1. `breakroleinheritance(false, true)` — clear inherited perms,
 *       AND clear sub-scope perms so item-level inheritance also
 *       starts fresh. `false` = don't copy the parent's role
 *       assignments, so the list starts with NO permissions.
 *    2. Grant `principalId` Full Control via
 *       `roleassignments/addroleassignment`.
 *
 *  Idempotent: if the list already has broken inheritance and the
 *  principal already has the role assignment, both calls succeed
 *  with no-op semantics on SP. */
export async function applyOwnerOnlyAcl(
  listTitle: string,
  principalId: number,
): Promise<void> {
  if (!principalId) throw new Error('principalId が解決できません — ACL 設定中止');
  const fullControlId = await resolveRoleDefId('Full Control');
  // Codex review PS3: pre-flight check. If the list already has
  // unique role assignments AND `principalId` already has Full
  // Control, both API calls would no-op; skip them entirely. Keeps
  // the per-ensure-pass call count low without sacrificing safety
  // (= when something is off, we still re-apply).
  const verified = await isOwnerOnlyAclApplied(listTitle, principalId, fullControlId)
    .catch(() => false);
  if (verified) return;
  const d = await getDigest();
  // Step 1: break inheritance, clearing copies and sub-scopes.
  // copyRoleAssignments=false → start with empty ACL
  // clearSubscopes=true → cascade to any item-level perms
  const breakUrl = spListUrl(listTitle,
    '/breakroleinheritance(copyRoleAssignments=false,clearSubscopes=true)');
  const breakRes = await fetch(breakUrl, {
    method: 'POST',
    headers: { ...ODATA_POST_HEADERS, 'X-RequestDigest': d },
    credentials: 'include',
  });
  // 200/204 are OK; 400 with "already broken" is also fine — SP
  // returns 400 when called twice. Surface other failures so the
  // caller can retry on the next ensure pass.
  if (!breakRes.ok && breakRes.status !== 400) {
    throw new Error('権限継承の切断に失敗: ' + breakRes.status);
  }
  // Step 2: grant the principal Full Control. We want the user to
  // be able to add items / edit fields / etc., not just read.
  const grantUrl = spListUrl(listTitle,
    '/roleassignments/addroleassignment(principalid=' + principalId +
    ',roledefid=' + fullControlId + ')');
  const grantRes = await fetch(grantUrl, {
    method: 'POST',
    headers: { ...ODATA_POST_HEADERS, 'X-RequestDigest': d },
    credentials: 'include',
  });
  if (!grantRes.ok) {
    // If the principal already has this role, SP returns 200 with
    // no body. A 4xx here means something genuine went wrong.
    throw new Error('権限付与に失敗: ' + grantRes.status);
  }
}

/** Codex review PS3: read SP and decide whether the list already has
 *  the desired ACL. Returns true iff:
 *    - the list has unique (= broken) role assignments, AND
 *    - the principal already holds the given role definition.
 *  Any other state (inherited perms, missing principal, principal
 *  with a different role, extra role assignments) returns false so
 *  the caller re-applies. Throws on REST errors so the caller can
 *  treat the verification as "unknown" and re-apply. */
async function isOwnerOnlyAclApplied(
  listTitle: string,
  principalId: number,
  fullControlRoleDefId: number,
): Promise<boolean> {
  // Fetch list-level uniqueness flag.
  const listInfo = await spGetD<{ HasUniqueRoleAssignments?: boolean }>(
    spListUrl(listTitle, '?$select=HasUniqueRoleAssignments'),
  );
  if (!listInfo?.HasUniqueRoleAssignments) return false;
  // Fetch the existing role assignments and their role-def ids. If the
  // principal has Full Control AND no other principal has any role,
  // we're aligned.
  const ras = await spGetD<{ results: Array<{
    PrincipalId: number;
    RoleDefinitionBindings: { results: Array<{ Id: number }> };
  }> }>(
    spListUrl(listTitle,
      '/roleassignments?$expand=RoleDefinitionBindings&$select=PrincipalId,RoleDefinitionBindings/Id'),
  );
  const entries = ras?.results ?? [];
  if (entries.length === 0) return false;
  // The owner principal needs Full Control. No other principal should
  // have a role assignment — defence in depth.
  let principalHasFc = false;
  for (const ra of entries) {
    const ids = ra.RoleDefinitionBindings?.results?.map((r) => r.Id) ?? [];
    if (ra.PrincipalId === principalId) {
      if (ids.includes(fullControlRoleDefId)) principalHasFc = true;
      else return false;
    } else {
      // Some other principal has access — must re-apply.
      return false;
    }
  }
  return principalHasFc;
}

/** Field spec used by ensureList. `kind` matches SP's FieldTypeKind:
 *  2 = single-line text, 3 = multi-line note, 4 = DateTime,
 *  6 = Choice, 9 = Boolean (yes/no integer in practice). */
export interface FieldSpec {
  name: string;
  kind: number;
  choices?: string[];
  /** When true, mark the column indexed after creation (best effort).
   *  Use for high-cardinality filter targets (e.g. dates, ids) so the
   *  list can scale past the 5,000-row LVT. */
  indexed?: boolean;
}

export interface ListSpec {
  /** Title of the SP list. Doubles as the URL identifier. */
  title: string;
  /** Required column specs. ensureList adds any missing ones idempotently
   *  and tolerates failures (silent .catch) — so a partial pre-existing
   *  list still gets the missing fields filled in on next boot. */
  fields: FieldSpec[];
}

/** Soft-delete a row by setting Trashed (ms timestamp) + TrashedBy
 *  (SP user id). Idempotent — calling twice produces a stable
 *  Trashed value (the second call's `now` simply overrides the first,
 *  with no observable effect on the trash UI). Failures are silently
 *  swallowed because the legacy callers all wrapped this with `.catch`;
 *  callers that care can drop the catch and the helper will throw. */
export async function softDelete(
  listTitle: string,
  itemId: number,
  byUserId: number,
  ts: number = Date.now(),
): Promise<void> {
  await updateListItem(listTitle, itemId, { Trashed: ts, TrashedBy: byUserId });
}

/** Restore a soft-deleted row by clearing Trashed/TrashedBy. */
export async function restoreSoftDelete(
  listTitle: string,
  itemId: number,
): Promise<void> {
  await updateListItem(listTitle, itemId, { Trashed: 0, TrashedBy: 0 });
}

/** Idempotently ensure that an SP list exists with the given fields.
 *  Replaces the four hand-written ensureXxxList helpers (pages, daily,
 *  presence, per-DB) and the dozens of `try { addListField ... } catch`
 *  boilerplate scattered across the API layer.
 *
 *  Returns true if the list was newly created, false if it already
 *  existed. Callers usually don't care, but the daily-DB seed path
 *  uses this to know whether the new list needs a "first row" template. */
export async function ensureList(spec: ListSpec): Promise<boolean> {
  const exists = (await spGetD<unknown>(spListUrl(spec.title))) != null;
  if (!exists) {
    await createList(spec.title);
  }
  for (const f of spec.fields) {
    try {
      await addListField(spec.title, f.name, f.kind, f.choices);
    } catch {
      /* idempotent: probably already exists, or first save raced. */
    }
    if (f.indexed) {
      await setColumnIndexed(spec.title, f.name).catch(() => undefined);
    }
  }
  // Bound version retention so per-DB / daily writes don't pile up SP
  // versions forever (best-effort).
  await setListVersionLimit(spec.title, SP_VERSION_LIMIT).catch(() => undefined);
  return !exists;
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

export async function getListItems(listTitle: string, select?: string): Promise<ListItem[]> {
  // SP /items returns at most 5000 (default ~100/500) per response. Follow
  // the `__next` link until exhausted so callers always see the full list —
  // truncating silently would drop pages from the tree and orphan row-body
  // entries on DB delete.
  //
  // `select` (optional) restricts the columns SP returns via `$select`. Pass
  // it on read paths that don't need every column — notably the startup page
  // load, which only needs metadata (title / parent / scope / flags) for the
  // tree+search and must NOT pull each page's `Body_blocks` body (potentially
  // hundreds of KB per row). Omitting `select` returns all columns (the DB-row
  // read paths rely on that to get user-defined columns).
  const all: ListItem[] = [];
  const selPart = select ? '&$select=' + encodeURIComponent(select) : '';
  let next: string | undefined = spListUrl(listTitle, '/items?$orderby=Id&$top=500' + selPart);
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

/** Enable list versioning with a retention cap so SharePoint prunes old
 *  versions automatically. Every item write mints a version; without a
 *  cap they grow unbounded (storage + the "hundreds of versions per page"
 *  problem from frequent autosaves). Idempotent and best-effort — failures
 *  are swallowed by callers (the app works fine without the cap; versions
 *  just accumulate). `MajorVersionLimit` 0 would mean "unlimited", so we
 *  require limit >= 1.
 *
 *  Note: shrinking the limit on an already-huge list doesn't retroactively
 *  hard-delete every excess version in one call — SP trims on subsequent
 *  writes — but new churn stays bounded from here on. */
export async function setListVersionLimit(listTitle: string, limit: number): Promise<void> {
  if (!(limit >= 1)) return;
  const d = await getDigest();
  await fetch(spListUrl(listTitle), {
    method: 'POST',
    headers: {
      ...ODATA_POST_HEADERS,
      'X-RequestDigest': d,
      'X-HTTP-Method': 'MERGE',
      'IF-MATCH': '*',
    },
    credentials: 'include',
    body: JSON.stringify({
      __metadata: { type: 'SP.List' },
      EnableVersioning: true,
      MajorVersionLimit: limit,
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

/** Atomic optimistic-concurrency update via MERGE + `If-Match: <etag>`.
 *
 *  Unlike `updateListItem` (validateUpdateListItem, which ignores the
 *  ETag and always overwrites), this lets SharePoint reject the write
 *  *atomically* when the row advanced since `etag` was read — closing
 *  the read-then-compare TOCTOU window that could silently clobber a
 *  concurrent save. Returns `{ ok: false, reason: 'conflict' }` on a
 *  412 Precondition Failed; throws on any other failure.
 *
 *  MERGE uses the entity-type schema, so `data` keys must be canonical
 *  InternalNames. Intended for the body-save path (Title / Body_blocks /
 *  PublishedDirty — all ASCII names), NOT for Japanese-named DB columns
 *  (those keep using validateUpdateListItem). `_`-prefixed (encoded
 *  non-ASCII) keys are OData_-prefixed to match `createListItem`. */
export async function updateListItemIfMatch(
  listTitle: string,
  itemId: number,
  data: Record<string, unknown>,
  etag: string,
): Promise<{ ok: true } | { ok: false; reason: 'conflict' }> {
  const et = await getListEntityType(listTitle);
  const d = await getDigest();
  const payload: Record<string, unknown> = { __metadata: { type: et } };
  for (const k of Object.keys(data)) {
    if (k === '__metadata') continue;
    const outKey = k.startsWith('_') ? 'OData_' + k : k;
    payload[outKey] = data[k];
  }
  const r = await fetch(spListUrl(listTitle, '/items(' + itemId + ')'), {
    method: 'POST',
    headers: {
      ...ODATA_POST_HEADERS,
      'X-RequestDigest': d,
      'X-HTTP-Method': 'MERGE',
      'IF-MATCH': etag,
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (r.ok) return { ok: true };
  if (r.status === 412) return { ok: false, reason: 'conflict' };
  const txt = await r.text().catch(() => '');
  const detail = extractSpErrorDetail(txt);
  throw new Error('更新失敗(If-Match): ' + r.status + (detail ? ' — ' + detail : ''));
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

