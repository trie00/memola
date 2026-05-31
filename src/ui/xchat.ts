// 横断チャット (cross-document RAG chat) の UI ロジック。
//
// レイアウト (外部ベクトル 準拠): [履歴(セッション一覧)] | [スレッド + コンポーザ]。
// 送信 → ragSearch (org+user 横断) → 取得チャンクを文脈に AI 回答 (ストリーム) →
// 出典カード (クリックでソース文書へ遷移)。セッションは localStorage に保存し、
// 左ペインの右側の履歴一覧から再表示できる。

import { ICONS } from '../icons';
import { prefXChatHistory, prefXChatOpen } from '../lib/prefs';
import { ragInit, ragRefresh, ragSearch, type RagHit } from '../rag/search';
import { canEmbed } from '../rag/embed';
import { getProvider, getClaudeModel, getCorpAiModel, getLocalAiModel } from '../api/ai-settings';

interface XSource {
  docKey: string; appPageId: string; scope: 'org' | 'user';
  title: string; heading?: string; snippet: string; chunkIdx: number; score: number;
}
interface XTurn { q: string; a: string; sources: XSource[] }
interface XSession { id: string; title: string; created: number; turns: XTurn[] }

const MAX_SESSIONS = 50;

let sessions: XSession[] = [];
let currentId = '';
let abort: AbortController | null = null;
let busy = false;
let loaded = false;

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

async function primeIndex(): Promise<void> {
  const idx = $('memola-xchat-idx');
  if (!canEmbed()) {
    if (idx) idx.textContent = 'AI設定が必要 (埋め込み未設定)';
    return;
  }
  try {
    if (idx) idx.textContent = 'インデックス確認中…';
    await ragInit();
    const r = await ragRefresh();
    if (idx) idx.textContent = (r.org + r.user) > 0 ? `インデックス更新: +${r.org + r.user}` : 'インデックス最新';
  } catch (e) {
    if (idx) idx.textContent = '索引エラー: ' + (e as Error).message;
  }
}

// ─── render: history list ─────────────────────────────────────────────
function renderHistory(): void {
  const host = $('memola-xchat-hist-list');
  if (!host) return;
  host.textContent = '';
  if (sessions.length === 0) {
    const e = document.createElement('div');
    e.className = 'memola-xchat-sess';
    e.style.color = 'var(--ink-4,#9a9a94)';
    e.style.cursor = 'default';
    e.textContent = 'まだチャットはありません';
    host.appendChild(e);
    return;
  }
  for (const s of sessions) {
    const row = document.createElement('div');
    row.className = 'memola-xchat-sess' + (s.id === currentId ? ' on' : '');
    row.dataset.sid = s.id;
    const nm = document.createElement('div');
    nm.className = 'nm';
    nm.textContent = s.title || '(無題のチャット)';
    const t = document.createElement('div');
    t.className = 't';
    t.textContent = new Date(s.created).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) + ` · ${s.turns.length}件`;
    const del = document.createElement('button');
    del.className = 'del';
    del.textContent = '×';
    del.title = 'このチャットを削除';
    del.dataset.del = s.id;
    row.append(nm, t, del);
    host.appendChild(row);
  }
}

// ─── render: thread ───────────────────────────────────────────────────
function renderThread(): void {
  const host = $('memola-xchat-thread');
  if (!host) return;
  host.textContent = '';
  const sess = current();
  if (!sess || sess.turns.length === 0) {
    const e = document.createElement('div');
    e.className = 'memola-xchat-empty';
    e.innerHTML = '<div style="font-size:30px;margin-bottom:8px">💬</div>'
      + 'memola 内の全ドキュメント (組織 + 自分のプライベート) を横断して質問できます。<br>'
      + '回答には参照したソース文書が表示され、クリックでその文書へ移動できます。';
    host.appendChild(e);
    return;
  }
  for (const turn of sess.turns) appendTurnEls(host, turn);
  host.scrollTop = host.scrollHeight;
}

function appendTurnEls(host: HTMLElement, turn: XTurn): { aEl: HTMLElement; srcHost: HTMLElement } {
  const q = document.createElement('div');
  q.className = 'memola-xchat-q';
  q.textContent = turn.q;
  const a = document.createElement('div');
  a.className = 'memola-xchat-a';
  a.textContent = turn.a;
  host.append(q, a);
  const srcHost = document.createElement('div');
  srcHost.className = 'memola-xchat-srcs';
  host.appendChild(srcHost);
  if (turn.sources.length) renderSources(srcHost, turn.sources);
  return { aEl: a, srcHost };
}

function renderSources(host: HTMLElement, sources: XSource[]): void {
  host.textContent = '';
  const lbl = document.createElement('div');
  lbl.className = 'memola-xchat-srcs-lbl';
  lbl.textContent = '出典';
  host.appendChild(lbl);
  sources.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'memola-xchat-src';
    const h = document.createElement('div');
    h.className = 'h';
    const ref = document.createElement('span');
    ref.className = 'ref';
    ref.textContent = `[${i + 1}]`;
    const nm = document.createElement('span');
    nm.textContent = s.title;
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = s.scope === 'org' ? '組織' : 'プライベート';
    h.append(ref, nm, badge);
    if (s.heading) {
      const hd = document.createElement('span');
      hd.className = 'badge';
      hd.textContent = s.heading.slice(0, 24);
      h.appendChild(hd);
    }
    const sn = document.createElement('div');
    sn.className = 'sn';
    sn.textContent = s.snippet;
    card.append(h, sn);
    if (s.appPageId) {
      card.addEventListener('click', () => { void navigateToSource(s.appPageId); });
    } else {
      card.style.cursor = 'default';
    }
    host.appendChild(card);
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
  if (!canEmbed()) { flashError(host, '横断チャットには埋め込み設定が必要です。設定 → AI で「Azure OpenAI 互換」または「ローカル AI」を選んでください。'); return; }

  ta.value = '';
  autoGrow(ta);
  busy = true;
  setSendDisabled(true);
  abort = new AbortController();

  // empty-state を消し、質問バブル + thinking を出す
  if (!current() || current()!.turns.length === 0) host.textContent = '';
  const qEl = document.createElement('div');
  qEl.className = 'memola-xchat-q';
  qEl.textContent = q;
  const aEl = document.createElement('div');
  aEl.className = 'memola-xchat-a';
  const thinking = document.createElement('div');
  thinking.className = 'memola-xchat-thinking';
  thinking.textContent = '関連文書を検索中…';
  host.append(qEl, thinking);
  host.scrollTop = host.scrollHeight;

  try {
    const hits = await ragSearch(q, { signal: abort.signal });
    thinking.remove();
    host.appendChild(aEl);
    const srcHost = document.createElement('div');
    srcHost.className = 'memola-xchat-srcs';
    host.appendChild(srcHost);

    // 会話履歴 (これまでの turn) を messages に展開 + 今回の質問
    const sess = ensureCurrentSession(q);
    const msgs: Array<{ role: 'user' | 'assistant'; content: string }> = [];
    for (const t of sess.turns) { msgs.push({ role: 'user', content: t.q }, { role: 'assistant', content: t.a }); }
    msgs.push({ role: 'user', content: q });

    let acc = '';
    const onDelta = (d: string): void => { acc += d; aEl.textContent = acc; host.scrollTop = host.scrollHeight; };
    const finalText = await answer(msgs, buildSystemPrompt(hits), onDelta, abort.signal);
    const text = (finalText || acc).trim() || '(空の応答)';
    aEl.textContent = text;

    const sources: XSource[] = hits.map((h) => ({
      docKey: h.docKey, appPageId: h.appPageId, scope: h.scope,
      title: h.title, heading: h.heading, snippet: h.snippet, chunkIdx: h.chunkIdx, score: h.score,
    }));
    renderSources(srcHost, sources);

    // 永続化
    sess.turns.push({ q, a: text, sources });
    if (!sess.title) sess.title = q.slice(0, 40);
    save();
    renderHistory();
  } catch (e) {
    thinking.remove();
    if ((e as Error).name === 'AbortError') { /* キャンセル */ }
    else flashError(host, 'エラー: ' + (e as Error).message);
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
  const e = document.createElement('div');
  e.className = 'memola-xchat-err';
  e.textContent = msg;
  host.appendChild(e);
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
    const row = t.closest<HTMLElement>('.memola-xchat-sess');
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
