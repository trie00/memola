// SharePoint REST mock for the local dev shell.
//
// Wraps `window.fetch` and intercepts requests targeting SP REST
// endpoints (`/_api/...`, list URLs). Returns canned responses
// shaped like SP verbose-OData. Anything we don't recognise falls
// through to the real network so static asset fetches still work.
//
// The goal is "the editor mounts and renders, basic CRUD works on
// in-memory state". Not bit-for-bit SP fidelity. SP-integration
// bugs (etag handling, ACL specifics) still need the real
// bookmarklet against SP.

interface MockListItem {
  Id: number;
  __metadata?: { etag?: string };
  [key: string]: unknown;
}

interface MockList {
  Id: string;
  Title: string;
  HasUniqueRoleAssignments?: boolean;
  Fields?: { results: Array<{ Title: string; InternalName?: string; FieldTypeKind?: number; Choices?: { results: string[] } }> };
  Items?: MockListItem[];
}

interface MockState {
  lists: Map<string, MockList>;
  nextItemId: number;
  /** Counter that masquerades as an etag — bumped on every write. */
  etag: number;
}

const STATE: MockState = {
  lists: new Map(),
  nextItemId: 1,
  etag: 1,
};

/** Initial fixture data: an empty `memola-pages` list with the
 *  required columns. The user can create pages, edit, delete in the
 *  running shell — state persists in-memory until reload. */
function seed(): void {
  if (STATE.lists.has('memola-pages')) return;
  const fields = [
    'ParentId', 'PageType', 'Icon', 'Pinned', 'Trashed',
    'ListTitle', 'DbRowId', 'Body_blocks',
    'Published', 'PublishedUrl', 'PublishedPageId', 'PublishedDirty',
    'OriginDailyDate', 'OriginPageId', 'Scope', 'TrashedBy', 'AuthorId',
  ].map((Title) => ({ Title, InternalName: Title }));
  const seedItem: MockListItem = {
    Id: 1,
    Title: 'Welcome',
    PageType: 'page',
    ParentId: '',
    Icon: '',
    Pinned: 0,
    Trashed: 0,
    Body_blocks: '[]',
    Scope: 'org',
    AuthorId: 1,
    __metadata: { etag: '"1"' },
  };
  STATE.lists.set('memola-pages', {
    Id: 'list-memola-pages',
    Title: 'memola-pages',
    HasUniqueRoleAssignments: false,
    Fields: { results: fields },
    Items: [seedItem],
  });
  STATE.nextItemId = 2;
}

const verbose = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify({ d: data }), {
    status,
    headers: { 'Content-Type': 'application/json;odata=verbose' },
  });

const ok = (status = 200): Response => new Response('', { status });

function parseListUrl(url: string): { list: string; suffix: string } | null {
  const m = url.match(/\/_api\/web\/lists\/getbytitle\('([^']+)'\)(.*)$/);
  if (!m) return null;
  return { list: decodeURIComponent(m[1]), suffix: m[2] };
}

async function handle(input: RequestInfo | URL, init?: RequestInit): Promise<Response | null> {
  seed();
  const url = typeof input === 'string' ? input
    : input instanceof URL ? input.toString()
    : input.url;
  const method = (init?.method || (input instanceof Request ? input.method : 'GET')).toUpperCase();

  // Context-info digest endpoint
  if (url.includes('/_api/contextinfo')) {
    return verbose({ GetContextWebInformation: { FormDigestValue: 'mock-digest', WebFullUrl: location.origin } });
  }
  // Current user
  if (url.includes('/_api/web/currentuser')) {
    return verbose({ Id: 1, Title: 'Dev User', LoginName: 'i:0#.f|membership|dev@local' });
  }
  // List by GUID — resolveListTitleById が使う(ロールアップの子DB解決)。未対応だと
  // 例外で集計が空になる。Id 一致のリストの Title を返す。
  const byId = url.match(/\/_api\/web\/lists\(guid'([^']+)'\)/);
  if (byId) {
    const wantId = decodeURIComponent(byId[1]);
    for (const l of STATE.lists.values()) {
      if (l.Id === wantId) return verbose({ Id: l.Id, Title: l.Title });
    }
    return new Response('', { status: 404 });
  }
  // Role definitions (PS3 path uses RoleTypeKind)
  if (url.includes('/_api/web/roledefinitions')) {
    return verbose({ results: [
      { Id: 1073741829, Name: 'Full Control', RoleTypeKind: 5 },
    ] });
  }
  // List creation — POST to /_api/web/lists
  if (url.match(/\/_api\/web\/lists\/?(\?|$)/) && method === 'POST') {
    const body = init?.body ? JSON.parse(init.body as string) : {};
    const title = body.Title || 'mock-list';
    if (!STATE.lists.has(title)) {
      STATE.lists.set(title, {
        Id: 'list-' + title,
        Title: title,
        // 実 SP のリストは必ず既定の Title 列を持つ。これが無いと scaffold 生成 DB に
        // タイトル列が無く「unknown」列+空タイトルになる。
        Fields: { results: [{ Title: 'タイトル', InternalName: 'Title', FieldTypeKind: 2 }] },
        Items: [],
      });
    }
    return verbose({ Id: 'list-' + title, Title: title }, 201);
  }
  // Field-add (POST to .../fields/add*) — register the field on the
  // mock list so the subsequent verifyFields pass passes.
  if (url.includes('/fields') && method === 'POST') {
    const m = url.match(/getbytitle\('([^']+)'\)/);
    if (m) {
      const list = STATE.lists.get(decodeURIComponent(m[1]));
      if (list) {
        const body = init?.body ? JSON.parse(init.body as string) : {};
        const title = body.Title || body.parameters?.Title || '';
        list.Fields = list.Fields ?? { results: [] };
        if (title && !list.Fields.results.some((f) => f.Title === title)) {
          // FieldTypeKind / Choices も保持しないと、DB表が型不明の列を落として
          // 「列が出ない」状態になる(scaffold で作った DB が空に見える原因)。
          const fld: { Title: string; InternalName: string; FieldTypeKind?: number; Choices?: { results: string[] } } =
            { Title: title, InternalName: title, FieldTypeKind: body.FieldTypeKind ?? 2 };
          if (body.Choices?.results) fld.Choices = { results: body.Choices.results };
          list.Fields.results.push(fld);
        }
      }
    }
    return verbose({ Id: 'mock-field' });
  }
  // Indexed-column toggle — succeed silently
  if (url.includes('SetIndexed')) return ok();

  const listMatch = parseListUrl(url);
  if (!listMatch) return null;     // not an SP REST URL we know about
  const list = STATE.lists.get(listMatch.list);

  // List exists check — GET on the list root.
  if (listMatch.suffix === '' || listMatch.suffix.startsWith('?')) {
    if (!list) return new Response('', { status: 404 });
    return verbose({
      Id: list.Id,
      Title: list.Title,
      HasUniqueRoleAssignments: !!list.HasUniqueRoleAssignments,
    });
  }
  // List creation — POST to /web/lists
  // (handled below as a separate URL pattern)

  // Fields list — GET .../fields
  if (listMatch.suffix.startsWith('/fields')) {
    if (!list) return verbose({ results: [] });
    return verbose(list.Fields ?? { results: [] });
  }
  // Items collection
  if (listMatch.suffix.startsWith('/items')) {
    if (!list) {
      // Lazily create the list (= ensurePagesList ran but list wasn't seeded).
      const fields = [
        'ParentId', 'PageType', 'Icon', 'Pinned', 'Trashed',
        'ListTitle', 'DbRowId', 'Body_blocks',
        'Published', 'PublishedUrl', 'PublishedPageId', 'PublishedDirty',
        'OriginDailyDate', 'OriginPageId', 'Scope', 'TrashedBy', 'AuthorId',
      ].map((Title) => ({ Title, InternalName: Title }));
      STATE.lists.set(listMatch.list, {
        Id: 'list-' + listMatch.list,
        Title: listMatch.list,
        Fields: { results: fields },
        Items: [],
      });
    }
    const fresh = STATE.lists.get(listMatch.list)!;
    // GET items collection
    if (method === 'GET') {
      // Item-by-id: /items(123)
      const idMatch = listMatch.suffix.match(/^\/items\((\d+)\)/);
      if (idMatch) {
        const id = parseInt(idMatch[1], 10);
        const item = fresh.Items?.find((it) => it.Id === id);
        if (!item) return new Response('', { status: 404 });
        return verbose(item);
      }
      return verbose({ results: fresh.Items ?? [] });
    }
    // POST = create
    if (method === 'POST' && /^\/items(\?.*)?$/.test(listMatch.suffix)) {
      const body = init?.body ? JSON.parse(init.body as string) : {};
      const id = STATE.nextItemId++;
      STATE.etag++;
      const item: MockListItem = {
        Id: id,
        ...body,
        __metadata: { etag: '"' + STATE.etag + '"' },
        AuthorId: 1,
        Modified: new Date().toISOString(),
      };
      fresh.Items = (fresh.Items ?? []).concat(item);
      return verbose(item, 201);
    }
    // validateUpdateListItem — 表示名/内部名どちらの FieldName でも値を反映する
    // 本番経路(updateListItem)。これが無いと DB セル編集 / スキャフォールドの初期行が
    // 「Title だけ入って他フィールドが空」になる。
    const vMatch = listMatch.suffix.match(/^\/items\((\d+)\)\/validateupdatelistitem/i);
    if (vMatch && method === 'POST') {
      const id = parseInt(vMatch[1], 10);
      const items = fresh.Items ?? [];
      const idx = items.findIndex((it) => it.Id === id);
      if (idx < 0) return new Response('', { status: 404 });
      const body = init?.body ? JSON.parse(init.body as string) : {};
      const fvs: Array<{ FieldName: string; FieldValue: unknown }> = body.formValues || [];
      for (const fv of fvs) items[idx][fv.FieldName] = fv.FieldValue;
      STATE.etag++;
      items[idx].__metadata = { etag: '"' + STATE.etag + '"' };
      items[idx].Modified = new Date().toISOString();
      return verbose({ ValidateUpdateListItem: { results: fvs.map((fv) => ({ FieldName: fv.FieldName, ErrorMessage: null, HasException: false })) } });
    }
    // POST to /items(123) with X-HTTP-Method header = update / delete
    const itemIdMatch = listMatch.suffix.match(/^\/items\((\d+)\)/);
    if (itemIdMatch && method === 'POST') {
      const id = parseInt(itemIdMatch[1], 10);
      const items = fresh.Items ?? [];
      const idx = items.findIndex((it) => it.Id === id);
      if (idx < 0) return new Response('', { status: 404 });
      const xMethod = (init?.headers as Record<string, string> | undefined)?.['X-HTTP-Method']
        ?? (init?.headers instanceof Headers ? init.headers.get('X-HTTP-Method') : null);
      if (xMethod === 'DELETE') {
        items.splice(idx, 1);
        return ok();
      }
      if (xMethod === 'MERGE' || xMethod === 'PATCH') {
        // Honour If-Match for optimistic concurrency so the dev shell can
        // exercise the 412 conflict path (A1). `If-Match: *` (or absent)
        // = unconditional. Otherwise compare against the item's etag.
        const ifMatch = (init?.headers as Record<string, string> | undefined)?.['IF-MATCH']
          ?? (init?.headers as Record<string, string> | undefined)?.['If-Match']
          ?? (init?.headers instanceof Headers
            ? (init.headers.get('IF-MATCH') ?? init.headers.get('If-Match'))
            : null);
        const curEtag = (items[idx].__metadata as { etag?: string } | undefined)?.etag;
        if (ifMatch && ifMatch !== '*' && curEtag && ifMatch !== curEtag) {
          return new Response('', { status: 412 });
        }
        const body = init?.body ? JSON.parse(init.body as string) : {};
        STATE.etag++;
        items[idx] = {
          ...items[idx], ...body,
          __metadata: { etag: '"' + STATE.etag + '"' },
          Modified: new Date().toISOString(),
        };
        return ok();
      }
    }
  }
  // Inheritance / role-assignment ops — succeed silently (tests for
  // these are out of scope for the dev shell).
  if (listMatch.suffix.includes('breakroleinheritance')
    || listMatch.suffix.includes('roleassignments')) {
    return ok();
  }
  return null;
}

/** Patch `window.fetch`. Returns a restore fn. */
export function installSpMock(): () => void {
  const orig = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    try {
      const r = await handle(input, init);
      if (r) return r;
    } catch (e) {
      console.error('[sp-mock] error:', e);
    }
    return orig(input, init);
  };
  console.log('[sp-mock] installed');
  return () => { window.fetch = orig; };
}
