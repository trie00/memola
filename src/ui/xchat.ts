// 横断チャット (cross-document RAG chat) の UI ロジック。
//
// レイアウト (ExtVec 準拠): [履歴(セッション一覧)] | [スレッド + コンポーザ]。
// 送信 → ragSearch (org+user 横断) → 取得チャンクを文脈に AI 回答 (ストリーム) →
// 出典カード (クリックでソース文書へ遷移)。セッションは localStorage に保存し、
// 左ペインの右側の履歴一覧から再表示できる。

import { S } from '../state';
import { mdToHtml } from '../lib/blocks-html';
import { prefXChatHistory, prefXChatOpen } from '../lib/prefs';
import { ragInit, ragRefresh, ragSearch, ragStats, type RagHit } from '../rag/search';
import { canEmbed } from '../rag/embed';

interface XSource {
  docKey: string; appPageId: string; scope: 'org' | 'user' | 'extVec';
  title: string; heading?: string; snippet: string; chunkIdx: number; score: number;
  // ExtVec 由来 (scope==='extVec')
  kind?: string; from?: string; date?: string; body?: string;
}

/** 出典バッジ/ラベル。extVec は kind 別に表示。 */
function scopeLabel(s: { scope: string; kind?: string }): string {
  if (s.scope === 'org') return '組織';
  if (s.scope === 'user') return 'プライベート';
  switch (s.kind) {
    case 'mail': return 'メール';
    case 'onenote': return 'OneNote';
    case 'pptx': return 'PPTX';
    case 'transcript': return '文字起こし';
    case 'doc': return '文書';
    default: return '外部';
  }
}
interface XTurn { q: string; a: string; sources: XSource[]; at?: number }
interface XSession { id: string; title: string; created: number; turns: XTurn[] }

const MAX_SESSIONS = 50;

let sessions: XSession[] = [];
let currentId = '';
let abort: AbortController | null = null;
let busy = false;
let loaded = false;
// 初回(または再構築中)のインデックス構築 Promise。send() はこれを待ってから検索する。
let priming: Promise<void> | null = null;

// ─── persistence ──────────────────────────────────────────────────────
function load(): void {
  if (loaded) return;
  loaded = true;
  try {
    const raw = prefXChatHistory.get();
    const arr = raw ? (JSON.parse(raw) as XSession[]) : [];
    sessions = Array.isArray(arr) ? arr : [];
  } catch { sessions = []; }
}
function save(): void {
  try { prefXChatHistory.set(JSON.stringify(sessions.slice(0, MAX_SESSIONS))); } catch { /* quota */ }
}
function genId(): string { return 'x-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
function current(): XSession | null { return sessions.find((s) => s.id === currentId) ?? null; }

function newSession(): void {
  currentId = genId();
  // 空セッションは送信されるまで配列に積まない (履歴を汚さない)。
  renderThread();
  updateTitle();
  closeMenu();
  focusInput();
}

// ─── DOM helpers ──────────────────────────────────────────────────────
function $(id: string): HTMLElement | null { return document.getElementById(id); }

function focusInput(): void {
  const ta = $('memola-xchat-input') as HTMLTextAreaElement | null;
  ta?.focus();
}

// ─── open / close ─────────────────────────────────────────────────────
export function isXChatOpen(): boolean { return $('memola-xchat')?.classList.contains('on') ?? false; }

export function openXChat(): void {
  load();
  const panel = $('memola-xchat');
  if (!panel) return;
  // 左ペインの右端に合わせて配置 (折りたたみ / リサイズ追従)。
  positionPanel();
  panel.classList.add('on');
  panel.setAttribute('aria-hidden', 'false');
  prefXChatOpen.set('1');
  if (!currentId) newSession(); else { renderThread(); updateTitle(); }
  focusInput();
  // バックグラウンドでインデックスを起動 + 差分取込 (writer のみ実際に再ベクトル化)。
  void primeIndex();
  window.addEventListener('resize', positionPanel);
}

export function closeXChat(): void {
  const panel = $('memola-xchat');
  if (!panel) return;
  panel.classList.remove('on');
  panel.setAttribute('aria-hidden', 'true');
  prefXChatOpen.set('');
  window.removeEventListener('resize', positionPanel);
}

export function toggleXChat(): void { isXChatOpen() ? closeXChat() : openXChat(); }

function positionPanel(): void {
  const panel = $('memola-xchat');
  if (!panel) return;
  // タブのコンテンツ扱い: 2段トップバーの下・左ペインの右(= #memola-content-row)に
  // ぴったり重ねる。これでタブ列/パンくずは見えたまま、本文領域だけを覆う。
  const cr = $('memola-content-row');
  if (cr) {
    const r = cr.getBoundingClientRect();
    panel.style.top = r.top + 'px';
    panel.style.left = r.left + 'px';
    panel.style.right = '0';
    panel.style.bottom = '0';
  } else {
    const sb = $('memola-sb');
    panel.style.left = Math.max(0, sb ? sb.getBoundingClientRect().right : 280) + 'px';
  }
}

// ─── タブ統合 (横断検索を1タブ扱いに) ───────────────────────────────────
/** 新しいチャットセッション用の id を採番(タブの searchId に使う)。 */
export function newSearchId(): string { return genId(); }

/** タブのラベル用: セッションのタイトル(未送信なら既定)。 */
export function searchSessionTitle(sessionId: string): string {
  load();
  const s = sessions.find((x) => x.id === sessionId);
  return (s && s.turns.length) ? (s.title || '横断チャット') : '横断チャット';
}

/** 指定セッションを「アクティブな検索タブの中身」として表示する。 */
export function showSearchTab(sessionId: string): void {
  load();
  const panel = $('memola-xchat');
  if (!panel) return;
  currentId = sessionId;
  // 先に .on を付けて #memola-top / #memola-tb を隠してから位置採寸する
  // (content-row が上に詰まるので、その後の getBoundingClientRect が正しい)。
  panel.classList.add('on');
  panel.setAttribute('aria-hidden', 'false');
  positionPanel();
  renderThread();
  updateTitle();
  focusInput();
  void primeIndex();
  window.removeEventListener('resize', positionPanel);
  window.addEventListener('resize', positionPanel);
}

/** 検索タブから離れる(パネルを隠す)。タブ表示状態は tabs 側が管理。 */
export function hideSearchTab(): void {
  const panel = $('memola-xchat');
  if (!panel) return;
  panel.classList.remove('on');
  panel.setAttribute('aria-hidden', 'true');
  window.removeEventListener('resize', positionPanel);
}

function setIdx(text: string): void { const idx = $('memola-xchat-idx'); if (idx) idx.textContent = text; }

/** 現在のベクトル化件数を常時表示 (確認用)。prefix で前置きメッセージを足せる。 */
function showStats(prefix = ''): void {
  const { org, user, extVec } = ragStats();
  const total = org.chunks + user.chunks;
  if (total === 0 && !extVec.docs && !prefix) { setIdx('未ベクトル化 — 「文書を読み込み」を押してください'); return; }
  let msg = `${prefix}ベクトル化済: 組織 ${org.docs}文書 / 個人 ${user.docs}文書 ・計 ${total} チャンク`;
  if (extVec.enabled) msg += ` ・外部 ${extVec.docs}件`;
  setIdx(msg);
}

/** インデックスを構築 (キャッシュ適用 + SP差分DL + writer なら差分ベクトル化)。
 *  進捗を見出しに表示。多重起動はしない (既存 Promise を共有)。 */
function primeIndex(force = false): Promise<void> {
  if (priming && !force) return priming;
  const btn = $('memola-xchat-rebuild');
  priming = (async () => {
    if (!canEmbed()) {
      setIdx('⚠ 埋め込み未設定 — 設定→AIで構成');
      return;
    }
    btn?.classList.add('spin');
    try {
      setIdx('インデックス読込中…');
      await ragInit();
      showStats('現在の');
      const r = await ragRefresh(undefined, (p) => {
        const who = p.scope === 'org' ? '組織' : 'プライベート';
        setIdx(`${who}をベクトル化中… ${p.done}/${p.total} チャンク`);
      });
      console.log('[xchat] refresh result', r, ragStats());
      const added = r.org + r.user;
      // 失敗・空を握りつぶさず明示する。
      if (r.errors.length) { setIdx('エラー: ' + r.errors.join(' / ')); return; }
      const st = ragStats();
      const chunks = st.org.chunks + st.user.chunks;
      // 診断: 読み込んだ文書数(対象) と ベクトル化済チャンク数 の両方を必ず出す。
      // 対象>0 かつ chunks=0 なら「本文が空 or DB行で対象外」が判別できる。
      const base = `対象 組織${r.orgDocs}/個人${r.userDocs}文書 ・ ベクトル化済 ${chunks}チャンク`;
      if (r.docsSeen === 0) { setIdx('対象文書0件 — ' + base + ' (ページ無し/権限/リスト名を確認)'); return; }
      if (added > 0) { setIdx(`今回 +${added}チャンク ・ ` + base); return; }
      if (r.orgSkipped) { setIdx('組織は別利用者が更新担当 ・ ' + base); return; }
      // 対象はあるが追加0 = 既に最新 or 本文が空(空ページはベクトル化されない)。
      setIdx((chunks === 0 ? '本文のある文書が無い(空ページは対象外) ・ ' : '変更なし ・ ') + base);
    } catch (e) {
      setIdx('索引エラー: ' + (e as Error).message);
    } finally {
      btn?.classList.remove('spin');
    }
  })();
  return priming;
}

/** 検索前に「少なくとも1回はインデックス構築が走り終えている」ことを保証する。 */
async function ensureReady(): Promise<void> {
  if (!priming) primeIndex();
  try { await priming; } catch { /* primeIndex 内で表示済み */ }
}

// ─── render: history list ─────────────────────────────────────────────
/** 作成時刻から表示グループを決める (Notion 形式: 今日/過去30日間/古い)。 */
function groupOf(created: number): '今日' | '過去30日間' | '古い' {
  const d = new Date(created); const now = new Date();
  const sameDay = d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  if (sameDay) return '今日';
  if (now.getTime() - created < 30 * 86400000) return '過去30日間';
  return '古い';
}

/** 履歴ドロップダウン (タイトル横の ▾) の中身を日付グループで描画。 */
function renderHistory(): void {
  const host = $('memola-xchat-hist-list');
  if (!host) return;
  host.textContent = '';
  if (sessions.length === 0) {
    const e = document.createElement('div');
    e.className = 'tdr-hist-empty';
    e.textContent = '履歴はまだありません';
    host.appendChild(e);
    return;
  }
  for (const g of ['今日', '過去30日間', '古い'] as const) {
    const items = sessions.filter((s) => groupOf(s.created) === g);
    if (!items.length) continue;
    const lbl = document.createElement('div');
    lbl.className = 'tdr-hist-group';
    lbl.textContent = g;
    host.appendChild(lbl);
    for (const s of items) {
      const row = document.createElement('div');
      row.className = 'tdr-hist-item' + (s.id === currentId ? ' is-active' : '');
      row.dataset.sid = s.id;
      const chk = document.createElement('span'); chk.className = 'chk'; chk.textContent = '✓';
      const nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = s.title || '(無題のチャット)';
      const del = document.createElement('button'); del.className = 'del'; del.textContent = '×'; del.title = '削除'; del.dataset.del = s.id;
      row.append(chk, nm, del);
      host.appendChild(row);
    }
  }
}

/** トップバーのタイトル表示を現在のセッションに合わせる。 */
function updateTitle(): void {
  const t = $('memola-xchat-title');
  if (!t) return;
  const s = current();
  t.textContent = (s && s.turns.length) ? (s.title || '(無題のチャット)') : '新規チャット';
}

function closeMenu(): void { $('memola-xchat-histmenu')?.classList.remove('on'); }
function toggleMenu(): void {
  const m = $('memola-xchat-histmenu');
  if (!m) return;
  if (!m.classList.contains('on')) renderHistory();
  m.classList.toggle('on');
}

// ─── render: thread (ExtVec レイアウト) ───────────────────────────────
const CHEVRON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

function fmtTime(ms: number): string {
  const d = new Date(ms);
  const hm = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  const now = new Date();
  const sameDay = d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  return sameDay ? hm : `${d.getMonth() + 1}/${d.getDate()} ${hm}`;
}

function renderThread(): void {
  const host = $('memola-xchat-thread');
  if (!host) return;
  host.textContent = '';
  const sess = current();
  if (!sess || sess.turns.length === 0) {
    const e = document.createElement('div');
    e.className = 'tdr-empty';
    e.innerHTML = '<div class="big">横断チャット</div>'
      + '<p>memola 内の全ドキュメント (組織 + 自分のプライベート) を横断して質問できます。</p>'
      + '<p style="color:var(--ink-4)">回答の下に参照したソース文書が出典として表示され、クリックでその文書へ移動できます。</p>';
    host.appendChild(e);
    return;
  }
  for (const turn of sess.turns) {
    const { body } = buildTurnSkeleton(host, turn.q);
    fillAnswer(body, turn.a, turn.sources, turn.at);
  }
  host.scrollTop = host.scrollHeight;
}

/** 質問バブル + アシスタント枠 (アバター + 本文コンテナ) を作る。本文コンテナを返す。 */
function buildTurnSkeleton(host: HTMLElement, q: string): { turnEl: HTMLElement; body: HTMLElement } {
  const turnEl = document.createElement('div');
  turnEl.className = 'tdr-turn';
  const qEl = document.createElement('div');
  qEl.className = 'tdr-q';
  qEl.textContent = q;
  const avatar = document.createElement('div');
  avatar.className = 'tdr-a-avatar';
  avatar.textContent = 'AI';
  const body = document.createElement('div');
  body.className = 'tdr-a-body';
  const a = document.createElement('div');
  a.className = 'tdr-a';
  a.append(avatar, body);
  turnEl.append(qEl, a);
  host.appendChild(turnEl);
  return { turnEl, body };
}

/** 本文コンテナに meta + 回答(markdown+引用) + 出典カードを描画。 */
function fillAnswer(body: HTMLElement, answerMd: string, sources: XSource[], at?: number): void {
  body.textContent = '';
  const meta = document.createElement('div');
  meta.className = 'tdr-a-meta';
  if (at) { const t = document.createElement('span'); t.className = 'tdr-turn-time'; t.textContent = fmtTime(at); meta.appendChild(t); }
  if (sources.length) { const s = document.createElement('span'); s.textContent = `${sources.length} 件参照`; meta.appendChild(s); }
  const ans = document.createElement('div');
  ans.className = 'tdr-answer';
  ans.innerHTML = mdToHtml(answerMd).replace(/\[(\d+)\]/g, (_, n) => `<span class="cite" data-n="${n}">[${n}]</span>`);
  body.append(meta, ans);
  if (sources.length) {
    const cited = new Set<number>();
    for (const m of answerMd.matchAll(/\[(\d+)\]/g)) cited.add(Number(m[1]));
    const list = buildSources(body, sources, cited);
    wireCite(ans, list);
  }
}

/** 出典セクション。検索はチャンク単位だが、表示は **文書単位に集約** する
 *  (同一文書の複数セクションが別カードに割れないように)。引用番号 [n] は
 *  チャンク順のまま LLM に渡しているので、各カードは自分が含むチャンク番号を
 *  data-ns に保持し、[n] クリックでその文書カードへジャンプできるようにする。 */
function buildSources(body: HTMLElement, sources: XSource[], cited: Set<number>): HTMLElement {
  // docKey ごとに集約(初出順を保持)。各チャンクの引用番号 n(=index+1) を覚える。
  const groups = new Map<string, { items: Array<{ s: XSource; n: number }> }>();
  sources.forEach((s, i) => {
    let g = groups.get(s.docKey);
    if (!g) { g = { items: [] }; groups.set(s.docKey, g); }
    g.items.push({ s, n: i + 1 });
  });
  const collapsed = cited.size > 0; // 引用があれば既定で畳む
  const hdr = document.createElement('div');
  hdr.className = 'tdr-sources-h' + (collapsed ? ' collapsed' : '');
  hdr.innerHTML = CHEVRON + `<span>参照した文書 ${groups.size} 件</span>`;
  const list = document.createElement('div');
  list.className = 'tdr-sources' + (collapsed ? ' collapsed' : '');
  hdr.addEventListener('click', () => { hdr.classList.toggle('collapsed'); list.classList.toggle('collapsed'); });
  for (const g of groups.values()) list.appendChild(buildDocCard(g.items));
  body.append(hdr, list);
  return list;
}

/** 1文書ぶんの出典カード。含むチャンク(該当箇所)をまとめて表示。 */
function buildDocCard(items: Array<{ s: XSource; n: number }>): HTMLElement {
  // スコア最大のチャンクを代表に。
  const best = items.reduce((a, b) => (b.s.score > a.s.score ? b : a));
  const s = best.s;
  const ns = items.map((i) => i.n);
  const card = document.createElement('div');
  card.className = 'tdr-hit';
  card.dataset.ns = ns.join(' '); // [n] クリックの照合用(空白区切り→ [data-ns~="n"])
  const head = document.createElement('div');
  head.className = 'tdr-hit-head';
  // 引用番号チップ(この文書が対応する [n] を列挙)
  const num = document.createElement('span'); num.className = 'tdr-hit-num';
  num.textContent = ns.length === 1 ? String(ns[0]) : ns.join(',');
  const subj = document.createElement('span'); subj.className = 'tdr-hit-subject'; subj.textContent = s.title;
  const badge = document.createElement('span'); badge.className = 'tdr-hit-badge'; badge.textContent = scopeLabel(s);
  head.append(num, subj, badge);
  if (s.score != null) { const sc = document.createElement('span'); sc.className = 'tdr-hit-score'; sc.textContent = s.score.toFixed(2); head.appendChild(sc); }
  const snip = document.createElement('div'); snip.className = 'tdr-hit-snippet';
  const more = items.length > 1 ? `（他 ${items.length - 1} 箇所が該当）` : '';
  snip.textContent = (s.heading ? `${s.heading} — ` : '') + s.snippet + more;
  card.append(head, snip);
  if (s.appPageId) card.addEventListener('click', () => { void navigateToSource(s.appPageId); });
  else card.style.cursor = 'default';
  return card;
}

/** 回答中の [n] クリックで、その番号を含む文書カードへスクロール + 展開 + フラッシュ。 */
function wireCite(ans: HTMLElement, list: HTMLElement): void {
  ans.querySelectorAll<HTMLElement>('.cite').forEach((c) => {
    c.addEventListener('click', (e) => {
      e.stopPropagation();
      const n = c.dataset.n; if (!n) return;
      const card = list.querySelector<HTMLElement>(`.tdr-hit[data-ns~="${n}"]`);
      if (!card) return;
      list.classList.remove('collapsed');
      (list.previousElementSibling as HTMLElement | null)?.classList.remove('collapsed');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('is-flash');
      setTimeout(() => card.classList.remove('is-flash'), 1200);
    });
  });
}

async function navigateToSource(appPageId: string): Promise<void> {
  closeXChat();
  const { doSelect } = await import('./views');
  await doSelect(appPageId);
}

// ─── send ─────────────────────────────────────────────────────────────
function buildSystemPrompt(hits: RagHit[]): string {
  const ctx = hits.map((h, i) => {
    const label = scopeLabel(h);
    // ExtVec はセグメントに本文があるので body をそのまま根拠に使う(中継不要)。
    // 1出典あたり最大 2000 字(topK 件分入れても文脈が膨れすぎないように)。
    const text = (h.scope === 'extVec' && h.body) ? h.body.slice(0, 2000) : h.snippet;
    const meta = (h.from || h.date) ? `\n(${[h.from, h.date].filter(Boolean).join(' / ')})` : '';
    return `[${i + 1}] 文書「${h.title}」${h.heading ? ` / ${h.heading}` : ''} (${label})${meta}\n${text}`;
  }).join('\n\n');
  return [
    'あなたは社内ドキュメントアシスタントです。以下の「抜粋」だけを根拠に、日本語で簡潔かつ正確に回答してください。',
    '抜粋に答えが無い場合は推測せず「該当する記載が見つかりませんでした」と述べてください。',
    '回答中で参照した抜粋は [1] のように番号で引用してください。',
    '',
    '=== 抜粋 ===',
    ctx || '(該当する文書が見つかりませんでした)',
  ].join('\n');
}

/** tools 無しで provider にチャット要求 (dispatchChat に集約)。 */
async function answer(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  system: string,
  onDelta: (d: string) => void,
  signal: AbortSignal,
): Promise<string> {
  const { dispatchChat, textOf } = await import('../ai/dispatch');
  const res = await dispatchChat({ messages, system, tools: [], signal, stream: { onText: onDelta } });
  return textOf(res);
}

async function send(): Promise<void> {
  if (busy) return;
  const ta = $('memola-xchat-input') as HTMLTextAreaElement | null;
  const host = $('memola-xchat-thread');
  if (!ta || !host) return;
  const q = ta.value.trim();
  if (!q) return;
  if (!canEmbed()) { flashError(host, '横断チャットには埋め込み設定が必要です。設定 → AI → 埋め込みプロバイダで「Voyage AI」(中継不要・Claude併用の推奨) を選んで API キーを入れてください。'); return; }

  ta.value = '';
  autoGrow(ta);
  busy = true;
  setSendDisabled(true);
  abort = new AbortController();

  // empty-state を消し、質問バブル + アシスタント枠 (thinking) を出す
  if (!current() || current()!.turns.length === 0) host.textContent = '';
  const { body } = buildTurnSkeleton(host, q);
  const thinking = document.createElement('div');
  thinking.className = 'tdr-thinking';
  thinking.innerHTML = 'インデックス準備中<span class="tdr-dot"></span><span class="tdr-dot"></span><span class="tdr-dot"></span>';
  body.appendChild(thinking);
  host.scrollTop = host.scrollHeight;

  try {
    // 初回ビルドが終わるまで検索しない (空インデックスへの誤検索を防ぐ)。
    await ensureReady();
    // 会話履歴 (これまでの turn) を messages に展開。検索ルータにも渡して
    // フォローアップ質問を standalone クエリへ再構築させる。
    const sess = ensureCurrentSession(q);
    const history: Array<{ role: 'user' | 'assistant'; content: string }> = [];
    for (const t of sess.turns) { history.push({ role: 'user', content: t.q }, { role: 'assistant', content: t.a }); }
    thinking.firstChild!.textContent = 'クエリ解析・関連文書を検索中';
    const hits = await ragSearch(q, { signal: abort.signal, history });
    const msgs = [...history, { role: 'user' as const, content: q }];

    // ストリーム中はプレーンテキストで流し込み、確定時に markdown 描画。
    body.textContent = '';
    const live = document.createElement('div');
    live.className = 'tdr-answer';
    body.appendChild(live);
    let acc = '';
    const onDelta = (d: string): void => { acc += d; live.textContent = acc; host.scrollTop = host.scrollHeight; };
    const finalText = await answer(msgs, buildSystemPrompt(hits), onDelta, abort.signal);
    const text = (finalText || acc).trim() || '(空の応答)';

    const sources: XSource[] = hits.map((h) => ({
      docKey: h.docKey, appPageId: h.appPageId, scope: h.scope,
      title: h.title, heading: h.heading, snippet: h.snippet, chunkIdx: h.chunkIdx, score: h.score,
      kind: h.kind, from: h.from, date: h.date, body: h.body,
    }));
    const at = Date.now();
    fillAnswer(body, text, sources, at);   // markdown + 引用 + 出典カードに置換

    // 永続化
    sess.turns.push({ q, a: text, sources, at });
    if (!sess.title) sess.title = q.slice(0, 40);
    void import('./tabs').then((m) => m.updateActiveSearchTitle(sess.title));
    save();
    updateTitle();
  } catch (e) {
    if ((e as Error).name === 'AbortError') { body.textContent = ''; }
    else { body.textContent = ''; const er = document.createElement('div'); er.className = 'tdr-err'; er.textContent = 'エラー: ' + (e as Error).message; body.appendChild(er); }
  } finally {
    busy = false;
    abort = null;
    setSendDisabled(false);
    host.scrollTop = host.scrollHeight;
    focusInput();
  }
}

function ensureCurrentSession(firstQ: string): XSession {
  let sess = current();
  if (!sess) {
    sess = { id: currentId || genId(), title: firstQ.slice(0, 40), created: Date.now(), turns: [] };
    currentId = sess.id;
    sessions.unshift(sess);
  }
  return sess;
}

function flashError(host: HTMLElement, msg: string): void {
  const wrap = document.createElement('div');
  wrap.className = 'tdr-turn';
  const e = document.createElement('div');
  e.className = 'tdr-err';
  e.textContent = msg;
  wrap.appendChild(e);
  host.appendChild(wrap);
  host.scrollTop = host.scrollHeight;
}

function setSendDisabled(d: boolean): void {
  const b = $('memola-xchat-send') as HTMLButtonElement | null;
  if (b) b.disabled = d;
}

function autoGrow(ta: HTMLTextAreaElement): void {
  ta.style.height = 'auto';
  ta.style.height = Math.min(160, ta.scrollHeight) + 'px';
}

// ─── wiring ───────────────────────────────────────────────────────────
export function attachXChat(): void {
  load();
  // 💬 / 「新規チャット」 → 横断検索を新規タブで開く(複数可)。
  $('memola-xchat-launch')?.addEventListener('click', () => { void import('./tabs').then((m) => m.newSearchTab()); });
  $('memola-xchat-new')?.addEventListener('click', () => { void import('./tabs').then((m) => m.newSearchTab()); });
  // 検索パネルの × → アクティブなタブ(=この検索タブ)を閉じる。
  $('memola-xchat-close')?.addEventListener('click', () => {
    void import('./tabs').then((m) => { if (S.activeTabId) void m.closeTab(S.activeTabId); });
  });
  $('memola-xchat-rebuild')?.addEventListener('click', () => { void primeIndex(true); });
  $('memola-xchat-send')?.addEventListener('click', () => { void send(); });

  const ta = $('memola-xchat-input') as HTMLTextAreaElement | null;
  ta?.addEventListener('input', () => autoGrow(ta));
  ta?.addEventListener('keydown', (ke: KeyboardEvent) => {
    // IME 変換中の Enter では送信しない (確定キー)。
    if (ke.key === 'Enter' && !ke.shiftKey && !ke.isComposing && ke.keyCode !== 229) {
      ke.preventDefault();
      void send();
    }
  });

  // タイトル横の ▾ で履歴ドロップダウンを開閉。
  $('memola-xchat-titlebtn')?.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
  // ドロップダウン外クリックで閉じる。
  document.addEventListener('click', (e) => {
    const m = $('memola-xchat-histmenu');
    if (!m || !m.classList.contains('on')) return;
    const t = e.target as HTMLElement;
    if (m.contains(t) || $('memola-xchat-titlebtn')?.contains(t)) return;
    closeMenu();
  });

  // 履歴ドロップダウン: クリックで読込 / × で削除 (イベント委譲)。
  $('memola-xchat-hist-list')?.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const delId = t.dataset.del;
    if (delId) {
      e.stopPropagation();
      sessions = sessions.filter((s) => s.id !== delId);
      if (currentId === delId) { currentId = ''; newSession(); }
      save();
      renderHistory();
      renderThread();
      updateTitle();
      return;
    }
    const row = t.closest<HTMLElement>('.tdr-hist-item');
    const sid = row?.dataset.sid;
    if (sid) { currentId = sid; renderThread(); updateTitle(); closeMenu(); focusInput(); void import('./tabs').then((m) => m.openSearchSessionInActiveTab(sid)); }
  });

  // ESC で閉じる: メニューが開いていればメニューだけ閉じる。
  document.addEventListener('keydown', (ke: KeyboardEvent) => {
    if (ke.key === 'Escape' && isXChatOpen() && $('memola-xchat-histmenu')?.classList.contains('on')) {
      ke.stopPropagation(); closeMenu(); return;
    }
  }, true);

  // ESC: 生成中なら中断のみ(パネルはタブなので閉じない=他タブとの整合)。
  document.addEventListener('keydown', (ke: KeyboardEvent) => {
    if (ke.key === 'Escape' && isXChatOpen() && busy && abort) {
      ke.stopPropagation();
      abort.abort();
    }
  }, true);
}
