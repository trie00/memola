// 横断チャット (cross-document RAG chat) の UI ロジック。
//
// レイアウト (外部ベクトル 準拠): [履歴(セッション一覧)] | [スレッド + コンポーザ]。
// 送信 → ragSearch (org+user 横断) → 取得チャンクを文脈に AI 回答 (ストリーム) →
// 出典カード (クリックでソース文書へ遷移)。セッションは localStorage に保存し、
// 左ペインの右側の履歴一覧から再表示できる。

import { ICONS } from '../icons';
import { mdToHtml } from '../lib/blocks-html';
import { prefXChatHistory, prefXChatOpen } from '../lib/prefs';
import { ragInit, ragRefresh, ragSearch, ragStats, type RagHit } from '../rag/search';
import { canEmbed } from '../rag/embed';
import { getProvider, getClaudeModel, getCorpAiModel, getLocalAiModel } from '../api/ai-settings';

interface XSource {
  docKey: string; appPageId: string; scope: 'org' | 'user';
  title: string; heading?: string; snippet: string; chunkIdx: number; score: number;
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
  renderHistory();
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
  if (!currentId) newSession(); else { renderHistory(); renderThread(); }
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
  const sb = $('memola-sb');
  if (!panel) return;
  const right = sb ? sb.getBoundingClientRect().right : 280;
  panel.style.left = Math.max(0, right) + 'px';
}

function setIdx(text: string): void { const idx = $('memola-xchat-idx'); if (idx) idx.textContent = text; }

/** 現在のベクトル化件数を常時表示 (確認用)。prefix で前置きメッセージを足せる。 */
function showStats(prefix = ''): void {
  const { org, user } = ragStats();
  const total = org.chunks + user.chunks;
  if (total === 0 && !prefix) { setIdx('未ベクトル化 — 「文書を読み込み」を押してください'); return; }
  setIdx(`${prefix}ベクトル化済: 組織 ${org.docs}文書 / 個人 ${user.docs}文書 ・計 ${total} チャンク`);
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
      const added = r.org + r.user;
      // 完了後は常に「現在の総件数」を出す。今回追加分があれば前置き。
      let prefix = '';
      if (added > 0) prefix = `今回 +${added}チャンク ・ `;
      else if (r.orgSkipped) prefix = '組織は別利用者が更新担当 ・ ';
      showStats(prefix);
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
function renderHistory(): void {
  const host = $('memola-xchat-hist-list');
  if (!host) return;
  host.textContent = '';
  if (sessions.length === 0) {
    const e = document.createElement('div');
    e.className = 'tdr-session-empty';
    e.textContent = '履歴はまだありません';
    host.appendChild(e);
    return;
  }
  for (const s of sessions) {
    const row = document.createElement('div');
    row.className = 'tdr-session' + (s.id === currentId ? ' is-active' : '');
    row.dataset.sid = s.id;
    const ic = document.createElement('span');
    ic.className = 'tdr-session-ic';
    ic.innerHTML = ICONS.chat;
    const title = document.createElement('span');
    title.className = 'tdr-session-title';
    title.textContent = s.title || '(無題のチャット)';
    const del = document.createElement('button');
    del.className = 'tdr-session-del';
    del.textContent = '×';
    del.title = 'このチャットを削除';
    del.dataset.del = s.id;
    row.append(ic, title, del);
    host.appendChild(row);
  }
}

// ─── render: thread (外部ベクトル レイアウト) ───────────────────────────────
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

/** 出典セクション (折りたたみヘッダ + .tdr-hit カード) を body に追加し、list 要素を返す。 */
function buildSources(body: HTMLElement, sources: XSource[], cited: Set<number>): HTMLElement {
  const collapsed = cited.size > 0; // 引用があれば既定で畳む (外部ベクトル 流)
  const hdr = document.createElement('div');
  hdr.className = 'tdr-sources-h' + (collapsed ? ' collapsed' : '');
  hdr.innerHTML = CHEVRON + `<span>参照した文書 ${sources.length} 件</span>`;
  const list = document.createElement('div');
  list.className = 'tdr-sources' + (collapsed ? ' collapsed' : '');
  hdr.addEventListener('click', () => { hdr.classList.toggle('collapsed'); list.classList.toggle('collapsed'); });
  sources.forEach((s, i) => list.appendChild(buildHitCard(s, i + 1)));
  body.append(hdr, list);
  return list;
}

function buildHitCard(s: XSource, n: number): HTMLElement {
  const card = document.createElement('div');
  card.className = 'tdr-hit';
  card.dataset.n = String(n);
  const head = document.createElement('div');
  head.className = 'tdr-hit-head';
  const num = document.createElement('span'); num.className = 'tdr-hit-num'; num.textContent = String(n);
  const subj = document.createElement('span'); subj.className = 'tdr-hit-subject'; subj.textContent = s.title;
  const badge = document.createElement('span'); badge.className = 'tdr-hit-badge'; badge.textContent = s.scope === 'org' ? '組織' : 'プライベート';
  head.append(num, subj, badge);
  if (s.score != null) { const sc = document.createElement('span'); sc.className = 'tdr-hit-score'; sc.textContent = s.score.toFixed(2); head.appendChild(sc); }
  const snip = document.createElement('div'); snip.className = 'tdr-hit-snippet';
  snip.textContent = (s.heading ? `${s.heading} — ` : '') + s.snippet;
  card.append(head, snip);
  if (s.appPageId) card.addEventListener('click', () => { void navigateToSource(s.appPageId); });
  else card.style.cursor = 'default';
  return card;
}

/** 回答中の [n] クリックで該当カードへスクロール + 展開 + フラッシュ。 */
function wireCite(ans: HTMLElement, list: HTMLElement): void {
  ans.querySelectorAll<HTMLElement>('.cite').forEach((c) => {
    c.addEventListener('click', (e) => {
      e.stopPropagation();
      const n = c.dataset.n; if (!n) return;
      const card = list.querySelector<HTMLElement>(`.tdr-hit[data-n="${n}"]`);
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
  const ctx = hits.map((h, i) =>
    `[${i + 1}] 文書「${h.title}」${h.heading ? ` / ${h.heading}` : ''} (${h.scope === 'org' ? '組織' : 'プライベート'})\n${h.snippet}`
  ).join('\n\n');
  return [
    'あなたは社内ドキュメントアシスタントです。以下の「抜粋」だけを根拠に、日本語で簡潔かつ正確に回答してください。',
    '抜粋に答えが無い場合は推測せず「該当する記載が見つかりませんでした」と述べてください。',
    '回答中で参照した抜粋は [1] のように番号で引用してください。',
    '',
    '=== 抜粋 ===',
    ctx || '(該当する文書が見つかりませんでした)',
  ].join('\n');
}

/** tools 無しで provider にチャット要求 (run-agent の dispatch を流用、ツールは渡さない)。 */
async function answer(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  system: string,
  onDelta: (d: string) => void,
  signal: AbortSignal,
): Promise<string> {
  const provider = getProvider();
  const common = { messages, system, tools: [], signal, stream: { onText: onDelta } };
  let res;
  if (provider === 'corp') {
    const { corpAiChatRaw } = await import('../api/openai-corp');
    res = await corpAiChatRaw({ ...common, model: getCorpAiModel() });
  } else if (provider === 'local') {
    const { localAiChatRaw } = await import('../api/openai-local');
    res = await localAiChatRaw({ ...common, model: getLocalAiModel() });
  } else {
    const { callClaudeRaw } = await import('../api/anthropic');
    res = await callClaudeRaw({ ...common, model: getClaudeModel() });
  }
  return res.content.filter((b) => b.type === 'text').map((b) => (b as { text: string }).text).join('');
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
    thinking.firstChild!.textContent = '関連文書を検索中';
    const hits = await ragSearch(q, { signal: abort.signal });

    // 会話履歴 (これまでの turn) を messages に展開 + 今回の質問
    const sess = ensureCurrentSession(q);
    const msgs: Array<{ role: 'user' | 'assistant'; content: string }> = [];
    for (const t of sess.turns) { msgs.push({ role: 'user', content: t.q }, { role: 'assistant', content: t.a }); }
    msgs.push({ role: 'user', content: q });

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
    }));
    const at = Date.now();
    fillAnswer(body, text, sources, at);   // markdown + 引用 + 出典カードに置換

    // 永続化
    sess.turns.push({ q, a: text, sources, at });
    if (!sess.title) sess.title = q.slice(0, 40);
    save();
    renderHistory();
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
  $('memola-xchat-launch')?.addEventListener('click', () => toggleXChat());
  $('memola-xchat-close')?.addEventListener('click', () => closeXChat());
  $('memola-xchat-new')?.addEventListener('click', () => newSession());
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

  // 履歴一覧: クリックで読込 / × で削除 (イベント委譲)。
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
      return;
    }
    const row = t.closest<HTMLElement>('.tdr-session');
    const sid = row?.dataset.sid;
    if (sid) { currentId = sid; renderHistory(); renderThread(); focusInput(); }
  });

  // ESC で閉じる (横断チャットが開いているときのみ、他の ESC 処理に優先)。
  document.addEventListener('keydown', (ke: KeyboardEvent) => {
    if (ke.key === 'Escape' && isXChatOpen()) {
      // 生成中は中断のみ、開いたまま。
      if (busy && abort) { abort.abort(); return; }
      ke.stopPropagation();
      closeXChat();
    }
  }, true);
}
