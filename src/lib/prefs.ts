// Single typed entry point for every Memola localStorage key.
//
// Before this module, 70+ call sites scattered across UI/api modules all
// did raw `localStorage.getItem('memola.foo')` / `setItem(...)` with the
// key string inlined. That made it easy for two modules to drift on the
// SAME key (the Claude API key bug — settings UI wrote to one name, the
// HTTP client read from another) and hard to find every consumer of a
// given pref.
//
// Each pref lives here as a small `{ get, set, key }` triple. Callers
// import the specific accessor they need; new prefs just add a new entry.
//
// Storage failures (private mode, full quota) are swallowed silently —
// every accessor must remain non-throwing so a stuck localStorage
// doesn't take down the editor.

function safeGet(key: string): string {
  try { return localStorage.getItem(key) || ''; } catch { return ''; }
}

function safeSet(key: string, value: string): void {
  try {
    if (value === '' || value == null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch { /* ignore — storage may be unavailable */ }
}

function safeRemove(key: string): void {
  try { localStorage.removeItem(key); } catch { /* ignore */ }
}

function jsonGet<T>(key: string, fallback: T): T {
  const raw = safeGet(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

function jsonSet(key: string, value: unknown): void {
  try { safeSet(key, JSON.stringify(value)); } catch { /* ignore */ }
}

/** Build a string-typed pref accessor. */
function strPref(key: string, fallback = '') {
  return {
    key,
    get: (): string => safeGet(key) || fallback,
    set: (v: string): void => safeSet(key, v),
    clear: (): void => safeRemove(key),
  };
}

/** Build a JSON pref accessor with a default. */
function jsonPref<T>(key: string, fallback: T) {
  return {
    key,
    get: (): T => jsonGet<T>(key, fallback),
    set: (v: T): void => jsonSet(key, v),
    clear: (): void => safeRemove(key),
  };
}

// ── DB view-level colours ──────────────────────────────────────────────
// Manual highlight overlay stored PER DB LIST (not on the row data, so the
// structured data stays clean). Shape: { [listTitle]: { rows: {rowId:color},
// cols: {internalName:color} } }. Applied at render time only.
export interface DbColorMap { rows?: Record<string, string>; cols?: Record<string, string> }
export const prefDbViewColors = jsonPref<Record<string, DbColorMap>>('memola.dbViewColors', {});

// ── DB ビュー(リスト単位で複数保持) ──────────────────────────────────
// 既定はテーブル1つ。ユーザーが「＋」で追加でき、名前/タイプ変更・削除可。
// フィルター/ソート/手動行色/条件付き行色はビューごとに独立保存。
export type DbViewType = 'table' | 'board' | 'list' | 'gallery' | 'calendar' | 'gantt';
export type DbFilterOp = 'contains' | 'equals' | 'not_empty' | 'empty';
export interface DbFilterCond { field: string; op: DbFilterOp; value: string }
/** 条件付き行色: 条件に合致した行に color を適用。 */
export interface DbColorRule { id: string; field: string; op: DbFilterOp; value: string; color: string }
export interface DbViewDef {
  id: string;
  name: string;
  type: DbViewType;
  filters: DbFilterCond[];
  sort: { field: string | null; asc: boolean };
  colors: DbColorMap;        // 手動の行色(既定ビューでは未使用)
  rules: DbColorRule[];      // 条件付き行色(既定ビューでは未使用)
}
export interface DbViewsState { activeId: string; views: DbViewDef[] }
export const prefDbViews = jsonPref<Record<string, DbViewsState>>('memola.dbViews', {});

// ── AI ────────────────────────────────────────────────────────────────
// (The body of these prefs is wrapped by api/ai-settings.ts which adds
//  per-pref validation. UI code should prefer api/ai-settings exports.)
export const prefAiProvider         = strPref('memola.ai.provider', 'claude');
export const prefAiClaudeModel      = strPref('memola.ai.claudeModel');
export const prefAiClaudeKey        = strPref('memola.anthropic.apiKey');
export const prefAiCorpModel        = strPref('memola.ai.corpModel');
export const prefAiCorpKey          = strPref('memola.ai.corpKey');
export const prefAiCorpBaseUrl      = strPref('memola.ai.corpBaseUrl');
export const prefAiCorpDeployPrefix = strPref('memola.ai.corpDeployPrefix');
export const prefAiCorpOverrides    = strPref('memola.ai.corpOverrides');
export const prefAiHistory          = strPref('memola.ai.history');     // raw JSON; ai-chat parses

// Local AI (Ollama / LM Studio / llama.cpp / vLLM 等 — OpenAI ネイティブ形式)
export const prefAiLocalBaseUrl         = strPref('memola.ai.localBaseUrl');
export const prefAiLocalKey             = strPref('memola.ai.localKey');
export const prefAiLocalModel           = strPref('memola.ai.localModel');
export const prefAiLocalModels          = strPref('memola.ai.localModels');           // raw JSON array
export const prefAiLocalReasoningModels = strPref('memola.ai.localReasoningModels');  // CSV / whitespace-separated

// ── 埋め込み / 横断 RAG (cross-document chat) ──────────────────────────
// Embeddings always go through the OpenAI-compatible endpoint of the active
// chat provider (corp = Azure-style deployments path; local = /embeddings).
// Claude has no embeddings API, so RAG is disabled when provider='claude'.
// 埋め込みプロバイダ: 'auto' = チャットと同じ provider (corp/local) を使う、
// 'voyage' = Voyage AI 直叩き (CORS対応・中継不要。Claude チャットと併用できる)。
export const prefAiEmbedProvider    = strPref('memola.ai.embedProvider', 'voyage');
export const prefAiVoyageKey        = strPref('memola.ai.voyageKey');
export const prefAiVoyageModel      = strPref('memola.ai.voyageModel', 'voyage-3.5-lite');
export const prefAiEmbedModel       = strPref('memola.ai.embedModel', 'text-embedding-3-small');
export const prefAiEmbedApiVersion  = strPref('memola.ai.embedApiVersion', '2024-02-01');
export const prefAiEmbedDimensions  = strPref('memola.ai.embedDimensions', '');   // '' = サーバ既定
export const prefRagTopK            = strPref('memola.rag.topK', '8');
export const prefRagMinScore        = strPref('memola.rag.minScore', '0.2');
// 開発者モード: バンドル(本体JS)の取得元。ローダ(build.js 生成)が起動時に
// この localStorage キーを直接読む。キー名はローダと完全一致させること。
//   'local' = ローカルリレー(dist 配信)から読む / それ以外 = SharePoint(本番)
export const prefDevBundleSource = strPref('memola.dev.bundle-source', '');
export const prefDevLocalBase    = strPref('memola.dev.local-base', 'http://127.0.0.1:18080/memola');

// 選択肢(Choice)列のタグ色の上書き。{listTitle: {fieldInternal: {optionValue: color}}}。
// 未設定の選択肢はプリセット(memola-sc-N)のまま。
export const prefDbTagColors = jsonPref<Record<string, Record<string, Record<string, string>>>>('memola.dbTagColors', {});

// 外部ベクトル が収集したベクトルを横断検索で「横から読む」設定。
// folder: サイト相対のフォルダ(例 'Shared Documents/外部ベクトル')。空 = 無効。
export const prefRag外部ベクトルFolder    = strPref('memola.rag.extvecFolder', '');
// 検索対象に含める kind(CSV)。既定は全種。
export const prefRag外部ベクトルKinds     = strPref('memola.rag.extvecKinds', 'mail,onenote,pptx,doc,transcript');
// 横断チャット (cross-document chat)
export const prefXChatHistory       = strPref('memola.xchat.history');   // raw JSON sessions
export const prefXChatOpen          = strPref('memola.xchat.open');       // '1' / ''

// ── Workspace ─────────────────────────────────────────────────────────
export const prefWorkspaces       = strPref('memola.workspaces');        // raw JSON
export const prefCurrentWsName    = strPref('memola.workspace.current');
export const prefCurrentWsUrl     = strPref('memola.workspace.currentUrl');

// ── Display ───────────────────────────────────────────────────────────
export const prefDensity          = strPref('memola.density', 'regular');
export const prefTheme            = strPref('memola.theme', 'light');

// ── Save / sync / presence ────────────────────────────────────────────
// Stored as numeric strings so the existing strPref machinery works.
// `prefSaveDelayMs` of '0' means "manual save only" (Cmd/Ctrl+S still works,
// but autosave won't fire). Default 2000ms preserves prior behaviour.
export const prefSaveDelayMs      = strPref('memola.save.delayMs', '2000');
// `prefSyncPollMs` of '0' means "don't poll" — useful for solo users who
// don't need the "別タブで更新" banner. Default 30000ms preserves prior.
export const prefSyncPollMs       = strPref('memola.sync.pollMs', '30000');
// `prefPresenceEnabled` '1' = on, '0' = off. Off skips both sending pings
// (no SP writes from this tab) and reading the avatar list.
export const prefPresenceEnabled  = strPref('memola.presence.enabled', '1');

// ── Editor / pages ────────────────────────────────────────────────────
export const prefLastOpenedPages  = jsonPref<Record<string, string>>('memola.lastOpenedPage', {});
// 開いているタブ構成 (ワークスペース毎)。{ tabs: Tab[]; active: tabId } を保存し、
// アプリ再起動時に直前のタブ状態を復元する。
export const prefTabs             = jsonPref<Record<string, { tabs: unknown[]; active: string | null }>>('memola.tabs', {});

// ── Sidebar layout ───────────────────────────────────────────────────
// Use string for legacy compatibility — older versions may have stored
// it as a non-JSON value. Callers parse as needed.
export const prefSidebarOpen      = strPref('memola.sb.open');
export const prefSidebarWidth     = strPref('memola.sb.width');
export const prefOutlineOpen      = strPref('memola.outline.open');
export const prefOutlineWidth     = strPref('memola.outline.width');
export const prefAiPanelOpen      = strPref('memola.ai.panelOpen');
export const prefAiPanelWidth     = strPref('memola.ai.panelWidth');
export const prefPropsPanelOpen   = strPref('memola.props.open');
export const prefPropsPanelWidth  = strPref('memola.props.width');
export const prefFocusMode        = strPref('memola.focus');

// ── Sidebar / panel state (legacy keys actually used by the UI) ─────
// These mirror the "open"/width prefs above but live under the keys the
// UI modules have always written to. Kept separate from the canonical
// prefs above so we don't change the values stored on user machines.
export const prefSidebarState     = strPref('memola.sidebar');           // 'collapsed' | 'expanded'
export const prefPropertiesOpen   = strPref('memola.properties.open');   // '1' or empty
export const prefAiPaneOpen       = strPref('memola.page.aiPane');       // '1' / '0'
export const prefPaneSbWidth      = strPref('memola.pane.sb');
export const prefPaneOutlineWidth = strPref('memola.pane.outline');
export const prefPanePropsWidth   = strPref('memola.pane.props');
export const prefPaneAiWidth      = strPref('memola.pane.ai');


// ── Misc ─────────────────────────────────────────────────────────────
// Per-DB ordering / configs — these are PREFIX-keyed (one entry per list),
// so we expose helpers rather than fixed-string accessors.
const COL_ORDER_PREFIX = 'memola.db.colOrder.';
const ROW_ORDER_PREFIX = 'memola.db.rowOrder.';
// Legacy lowercase prefixes — kept because existing user data was written
// under these names. New code should use prefDbColOrderLegacy / RowOrderLegacy.
const COL_ORDER_LEGACY_PREFIX = 'memola.db.colorder.';
const ROW_ORDER_LEGACY_PREFIX = 'memola.db.roworder.';
const GANTT_CONFIG_PREFIX = 'memola.db.gantt.';
const COL_WIDTHS_PREFIX = 'memola.db.colWidths.';
const SIBLING_ORDER_PREFIX = 'memola.tree.sib.';
const CAL_DATE_FIELD_PREFIX = 'memola.cal.dateField.';
const SAVED_BY_PREFIX = 'memola.lastSavedBy.';
// Single-key per-parent map of sibling orders (legacy layout used by
// lib/page-tree.ts — one localStorage key holding {parentId: ids[]}).
export const prefTreeOrder = jsonPref<Record<string, string[]>>('memola.tree.order', {});

export function prefDbColOrder(listTitle: string) {
  return jsonPref<string[]>(COL_ORDER_PREFIX + listTitle, []);
}
export function prefDbRowOrder(listTitle: string) {
  return jsonPref<number[]>(ROW_ORDER_PREFIX + listTitle, []);
}
/** Legacy lowercase-keyed col order ("memola.db.colorder.<list>"). The
 *  UI has stored this for a long time; switching to camelCase would
 *  silently lose every user's saved order. */
export function prefDbColOrderLegacy(listTitle: string) {
  return jsonPref<string[]>(COL_ORDER_LEGACY_PREFIX + listTitle, []);
}
export function prefDbRowOrderLegacy(listTitle: string) {
  return jsonPref<number[]>(ROW_ORDER_LEGACY_PREFIX + listTitle, []);
}
export function prefDbGanttConfig<T>(listTitle: string, fallback: T) {
  return jsonPref<T>(GANTT_CONFIG_PREFIX + listTitle, fallback);
}
export function prefDbColWidths(listTitle: string) {
  return jsonPref<Record<string, number>>(COL_WIDTHS_PREFIX + listTitle, {});
}
export function prefSiblingOrder(parentId: string) {
  return jsonPref<string[]>(SIBLING_ORDER_PREFIX + (parentId || '_root'), []);
}
export function prefCalDateField(listTitle: string) {
  return strPref(CAL_DATE_FIELD_PREFIX + listTitle);
}
export function prefLastSavedBy(pageId: string) {
  return strPref(SAVED_BY_PREFIX + pageId);
}

/** Per-page "etag the user last viewed" — written every time doSelect
 *  finishes loading a page. On the NEXT open, the freshly-loaded etag
 *  is compared to this value: if different, a passive "前回見た時から
 *  更新されました" notification appears at the top so silent remote
 *  edits aren't missed. */
const LAST_SEEN_ETAG_PREFIX = 'memola.lastSeenEtag.';
export function prefLastSeenEtag(pageId: string) {
  return strPref(LAST_SEEN_ETAG_PREFIX + pageId);
}

// ── Drafts (the local-store one in ui/draft-store) ───────────────────
// Prefix-keyed; ui/draft-store keeps its own scan/cleanup helpers.
export const DRAFT_KEY_PREFIX = 'memola.draft.';
