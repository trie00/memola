// AI chat panel: right-side slide-out powered by direct Claude API calls.

import { S } from '../state';
import { g, getEd } from './dom';
import { toast } from './ui-helpers';
import { getApiKey, setApiKey, type ApiMessage, type ContentBlock, type TextBlock, type ToolUseBlock } from '../api/anthropic';
import { runAgent } from '../ai/run-agent';
import { htmlToMd } from '../lib/markdown';

const HISTORY_KEY = 'n365.ai.history';
const MAX_HISTORY = 20;

interface AiSession {
  id: string;
  title: string;
  created: number;
  messages: ApiMessage[];
  /** True once the title has been replaced by the AI-generated summary so we
   *  don't regenerate it on every persist. */
  aiTitled?: boolean;
}

function loadHistory(): AiSession[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AiSession[];
  } catch { return []; }
}

function saveHistory(sessions: AiSession[]): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(sessions.slice(0, MAX_HISTORY)));
}

let _currentSessionId: string | null = null;

function firstUserText(messages: ApiMessage[]): string {
  for (const m of messages) {
    if (m.role !== 'user') continue;
    if (typeof m.content === 'string') return m.content;
    // Skip tool_result-only user messages
  }
  return '会話';
}

function persistCurrentSession(): void {
  if (S.ai.messages.length === 0) return;
  const sessions = loadHistory();
  const fallbackTitle = firstUserText(S.ai.messages).slice(0, 24) || '会話';
  if (!_currentSessionId) {
    _currentSessionId = 'sess-' + Date.now();
    sessions.unshift({ id: _currentSessionId, title: fallbackTitle, created: Date.now(), messages: [...S.ai.messages] });
  } else {
    const existing = sessions.find((s) => s.id === _currentSessionId);
    if (existing) {
      existing.messages = [...S.ai.messages];
      // Don't clobber an AI-generated title; only refresh the fallback while pending.
      if (!existing.aiTitled) existing.title = fallbackTitle;
    } else {
      sessions.unshift({ id: _currentSessionId, title: fallbackTitle, created: Date.now(), messages: [...S.ai.messages] });
    }
  }
  saveHistory(sessions);
  // Kick off AI title generation once the conversation has at least one
  // assistant reply. Fire-and-forget; the dropdown re-renders when done.
  maybeGenerateTitle();
}

/** Generate a short (~20 char) Japanese title from the first user prompt and
 *  the first assistant reply. No-op if already generated or API key missing. */
async function maybeGenerateTitle(): Promise<void> {
  if (!_currentSessionId) return;
  if (!getApiKey()) return;
  const sessions = loadHistory();
  const sess = sessions.find((s) => s.id === _currentSessionId);
  if (!sess || sess.aiTitled) return;
  // Need at least 1 user msg + 1 assistant text msg
  const hasAssistantReply = sess.messages.some((m) => {
    if (m.role !== 'assistant') return false;
    if (typeof m.content === 'string') return m.content.trim().length > 0;
    return m.content.some((b) => b.type === 'text' && b.text.trim().length > 0);
  });
  if (!hasAssistantReply) return;
  const userMsg = firstUserText(sess.messages).slice(0, 240);
  if (!userMsg) return;
  try {
    const { callClaudeRaw } = await import('../api/anthropic');
    const res = await callClaudeRaw({
      messages: [{
        role: 'user',
        content:
          'ユーザーの会話の最初の発話から、20文字以内の簡潔な日本語タイトルを 1 つだけ返してください。' +
          '記号・引用符・「」は不要、タイトル本体のみ。語尾の句点も不要。\n\n' +
          '発話: ' + userMsg,
      }],
      maxTokens: 60,
    });
    const text = res.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { text: string }).text)
      .join('')
      .trim()
      .replace(/^["'「『]|["'」』]$/g, '')
      .slice(0, 30);
    if (!text) return;
    // Re-load in case other sessions have been added/changed in the meantime
    const fresh = loadHistory();
    const cur = fresh.find((s) => s.id === _currentSessionId);
    if (!cur) return;
    cur.title = text;
    cur.aiTitled = true;
    saveHistory(fresh);
    renderHistoryDropdown();
  } catch { /* keep fallback title silently */ }
}

export function loadAiSession(id: string): void {
  const sess = loadHistory().find((s) => s.id === id);
  if (!sess) return;
  _currentSessionId = id;
  S.ai.messages = [...sess.messages];
  renderAiMessages();
  renderHistoryDropdown();
}

export function newAiSession(): void {
  _currentSessionId = null;
  S.ai.messages = [];
  renderAiMessages();
  renderHistoryDropdown();
}

export function renderHistoryDropdown(): void {
  const dd = document.getElementById('n365-ai-hist');
  if (!dd) return;
  const sessions = loadHistory();
  dd.innerHTML = '<option value="__new__">+ 新しい会話</option>' +
    sessions.map((s) =>
      '<option value="' + s.id + '"' + (s.id === _currentSessionId ? ' selected' : '') + '>' +
        escapeAttr(s.title || '会話') +
      '</option>',
    ).join('');
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const QUICK_PROMPTS: Array<{ label: string; prompt: string }> = [
  { label: '要約', prompt: 'このページの内容を3行で要約してください。' },
  { label: '改稿', prompt: 'このページの本文をより読みやすく、自然な日本語に書き直してください。' },
  { label: '翻訳', prompt: 'このページの本文を英語に翻訳してください。' },
  { label: 'アクション抽出', prompt: 'このページの内容から、ToDo・アクションアイテムを箇条書きで抽出してください。' },
];

/** Current JST date/time, day-of-week. Lets the AI resolve "今日" / "明日" /
 *  "来週末" etc. into concrete YYYY-MM-DD values. */
function nowContext(): string {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 3600 * 1000);
  const y = jst.getUTCFullYear();
  const mo = String(jst.getUTCMonth() + 1).padStart(2, '0');
  const d = String(jst.getUTCDate()).padStart(2, '0');
  const hh = String(jst.getUTCHours()).padStart(2, '0');
  const mm = String(jst.getUTCMinutes()).padStart(2, '0');
  const dow = ['日', '月', '火', '水', '木', '金', '土'][jst.getUTCDay()];
  return `現在の日時 (JST): ${y}-${mo}-${d} ${hh}:${mm} (${dow}曜日)`;
}

function pageContext(): string {
  const id = S.currentId || '';
  const ed = getEd();
  const titleEl = g('ttl') as HTMLTextAreaElement | null;
  const title = (titleEl && titleEl.value) || '';
  if (!id) return '';
  const md = ed && ed.innerHTML.trim() ? htmlToMd(ed.innerHTML) : '';
  const lines = [
    '── 現在開いているページ ──',
    `id: ${id}`,
    `title: ${title}`,
  ];
  if (md.trim()) {
    lines.push('', 'body (markdown):', md);
  }
  return lines.join('\n');
}

/** Build the system prompt as an array of blocks. The static base block is
 *  marked cache_control so its tokens cost ~10% on subsequent turns; the
 *  volatile context (current date/time, open page) is appended without caching. */
function systemPromptBlocks(): import('../api/anthropic').SystemBlock[] {
  const blocks: import('../api/anthropic').SystemBlock[] = [
    { type: 'text', text: STATIC_SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } },
  ];
  const dynamic: string[] = [nowContext()];
  const page = pageContext();
  if (page) { dynamic.push(''); dynamic.push(page); }
  blocks.push({ type: 'text', text: dynamic.join('\n') });
  return blocks;
}

const STATIC_SYSTEM_PROMPT = `あなたは n365 (Notion風 SharePoint連携ノートアプリ) の AI アシスタントです。
簡潔で親しみやすい日本語で回答してください。

⚠️ ページの作成・更新・削除は必ずツールで実行すること:
- 「内容を追加した」「○○を記録した」と発言する場合、その前に必ず該当する
  ツール (create_page / update_page / trash_page) を呼び出していること。
- ツールを呼ばずに「やりました」と返すのは禁止（user が実害を受ける）。

⚠️ 現在開いているページを編集する場合:
- system プロンプト末尾の「現在開いているページ」ブロックの id を update_page
  の id 引数に渡すこと。改めて search_pages で検索する必要は無い。
- 既存ページ修正は: ① body 全文を組み立て → ② update_page を呼ぶ。
- 部分修正でも update_page には新しい完全な markdown 全文を渡すこと。

⚠️ create_page / update_page の body 引数:
- user が内容を指定した場合、必ず body に完全な markdown を渡すこと。
- 会話メッセージで内容を説明するだけで body を省略するのは絶対禁止。
- body は見出し・箇条書き等で構造化された完成された文書にする。

⚠️ データベース (DB) 操作:
- DB の行を追加/更新/参照する前に、必ず read_db_schema で列構成を取得すること。
  AI が知らない列名を勝手に使うと unknown_fields エラーになる。
- 列の追加は add_db_field で行える。create_db 直後に必要な列を順次追加すること。
  user が「○○ DB を作って」と言った場合、用途に合った列構成を提案 → user 確認
  → create_db → add_db_field を順に呼んで完成させる。
- 行作成は create_db_row。fields に列名→値のマップを渡す（必ず Title を含める）。
- 行更新は update_db_row。変更したい列だけ fields に入れる。
- 行削除は delete_db_row。確認ダイアログが出る。
- DB 自体の削除は trash_page (PageType=database のページとして扱う)。
- 日付は **必ず "YYYY-MM-DD" 形式** で渡すこと（例: "2026-05-15"）。
  「今週末」「未定」等の自然言語や空文字を渡すと SP が拒否する。
  日付未指定の場合は fields からそのキー自体を省くこと（null/空文字を入れない）。
- user が「今日」「明日」「来週末」等の相対日付を言った場合、system プロンプト
  末尾の「現在の日時」ブロックを基準に YYYY-MM-DD に変換すること。

その他:
- create_page の前に search_pages で重複確認すること
- 削除や更新の前に user に意図を確認すること（ホスト側でも確認モーダルが出る）`;

const AI_PANEL_KEY = 'n365.page.aiPane';

export function openAiPanel(): void {
  S.ai.panelOpen = true;
  g('ai-panel').classList.add('on');
  document.getElementById('n365-ai-btn')?.classList.add('on');
  try { localStorage.setItem(AI_PANEL_KEY, '1'); } catch { /* ignore */ }
  ensureApiKey();
  renderAiMessages();
  setTimeout(() => (g('ai-input') as HTMLTextAreaElement).focus(), 50);
}

export function closeAiPanel(): void {
  S.ai.panelOpen = false;
  g('ai-panel').classList.remove('on');
  document.getElementById('n365-ai-btn')?.classList.remove('on');
  try { localStorage.setItem(AI_PANEL_KEY, '0'); } catch { /* ignore */ }
}

export function applyAiPanelState(): void {
  try {
    if (localStorage.getItem(AI_PANEL_KEY) === '1') openAiPanel();
  } catch { /* ignore */ }
}

export function toggleAiPanel(): void {
  if (S.ai.panelOpen) closeAiPanel();
  else openAiPanel();
}

function ensureApiKey(): boolean {
  if (getApiKey()) return true;
  const key = prompt(
    'Anthropic APIキーを入力してください\n(sk-ant-... で始まる文字列。https://console.anthropic.com/settings/keys から取得)',
  );
  if (key && key.trim()) {
    setApiKey(key.trim());
    toast('APIキーを保存しました');
    return true;
  }
  return false;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function mdLineToHtml(line: string): string {
  // very small inline markdown for chat bubbles
  return escapeHtml(line)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function renderMessageBody(text: string): string {
  return text.split(/\r?\n/).map(mdLineToHtml).join('<br>');
}

/** Extract a displayable summary from a message. tool_result messages → null (skip). */
function summarizeMessage(m: ApiMessage): { text: string; toolNames: string[] } | null {
  if (typeof m.content === 'string') {
    if (m.role === 'user') return { text: m.content, toolNames: [] };
    return { text: m.content, toolNames: [] };
  }
  // Array of blocks
  const blocks = m.content as ContentBlock[];
  // If purely tool_result → skip (intermediate)
  const allToolResults = blocks.every((b) => b.type === 'tool_result');
  if (allToolResults) return null;
  const text = blocks
    .filter((b): b is TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n');
  const toolNames = blocks
    .filter((b): b is ToolUseBlock => b.type === 'tool_use')
    .map((b) => b.name);
  return { text, toolNames };
}

export function renderAiMessages(): void {
  const list = g('ai-messages');
  list.innerHTML = '';
  if (S.ai.messages.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'n365-ai-empty';
    empty.innerHTML =
      '<div class="n365-ai-empty-title">このページについて質問できます</div>' +
      '<div class="n365-ai-empty-sub">下のチップから始めるか、自由に入力してください</div>';
    list.appendChild(empty);
  }
  for (const m of S.ai.messages) {
    const summary = summarizeMessage(m);
    if (!summary) continue;        // skip tool_result-only frames
    if (!summary.text && summary.toolNames.length === 0) continue;
    const wrap = document.createElement('div');
    wrap.className = 'n365-ai-row';
    const label = document.createElement('div');
    label.className = 'n365-ai-label';
    label.textContent = m.role === 'user' ? 'あなた' : 'AI';
    const card = document.createElement('div');
    card.className = 'n365-ai-msg n365-ai-' + m.role;
    let html = summary.text ? renderMessageBody(summary.text) : '';
    if (summary.toolNames.length > 0) {
      const trace = '<div class="n365-ai-trace">— 実行: ' +
        summary.toolNames.map((n) => '🔧 ' + escapeHtml(n)).join(' / ') + '</div>';
      html += trace;
    }
    card.innerHTML = html;
    wrap.append(label, card);
    list.appendChild(wrap);
  }
  if (S.ai.loading) {
    const wrap = document.createElement('div');
    wrap.className = 'n365-ai-row';
    const label = document.createElement('div');
    label.className = 'n365-ai-label';
    label.textContent = 'AI';
    const card = document.createElement('div');
    card.className = 'n365-ai-msg n365-ai-assistant n365-ai-loading';
    card.textContent = '考え中…';
    wrap.append(label, card);
    list.appendChild(wrap);
  }
  list.scrollTop = list.scrollHeight;
}

// Module-level abort handle so the user can cancel mid-flight via the stop button.
let _activeAbort: AbortController | null = null;

/** Cancel the current in-flight AI request, if any. */
export function cancelAiMessage(): void {
  if (_activeAbort) {
    _activeAbort.abort();
    _activeAbort = null;
  }
}

export async function sendAiMessage(text: string): Promise<void> {
  // If a request is already running, treat a second invocation as cancel.
  if (_activeAbort) { cancelAiMessage(); return; }

  const trimmed = text.trim();
  if (!trimmed) return;
  if (!ensureApiKey()) return;

  S.ai.messages.push({ role: 'user', content: trimmed });
  S.ai.loading = true;
  renderAiMessages();
  updateSendButton();
  const aiInp = g('ai-input') as HTMLTextAreaElement;
  aiInp.value = '';
  aiInp.style.height = '';                            // collapse back to min-height

  // Live streaming buffer rendered into a placeholder bubble before the agent
  // turn finalises. Each text_delta appends to this string and refreshes the
  // bubble; once the full message arrives we clear it and re-render with the
  // final structured messages (which include tool_use markers etc.).
  let streamText = '';
  function onTextDelta(delta: string): void {
    streamText += delta;
    updateStreamingBubble(streamText);
  }

  const ctrl = new AbortController();
  _activeAbort = ctrl;
  try {
    const result = await runAgent(S.ai.messages, systemPromptBlocks(), onTextDelta, ctrl.signal);
    S.ai.messages.push(...result.newMessages);
  } catch (err) {
    const e = err as Error;
    if (e.name === 'AbortError' || e.message === 'aborted') {
      S.ai.messages.push({ role: 'assistant', content: '（中断しました）' });
    } else {
      toast('AI失敗: ' + e.message, 'err');
      S.ai.messages.push({ role: 'assistant', content: '⚠️ ' + e.message });
    }
  } finally {
    _activeAbort = null;
    S.ai.loading = false;
    renderAiMessages();
    updateSendButton();
    persistCurrentSession();
    renderHistoryDropdown();
  }
}

/** Render the streaming-text-only placeholder. Called per text delta. */
function updateStreamingBubble(text: string): void {
  const list = g('ai-messages');
  let bubble = document.getElementById('n365-ai-streaming') as HTMLElement | null;
  if (!bubble) {
    // Replace the existing 「考え中…」 loading bubble with a real text bubble
    const wrap = document.createElement('div');
    wrap.className = 'n365-ai-row';
    wrap.id = 'n365-ai-streaming-row';
    const label = document.createElement('div');
    label.className = 'n365-ai-label';
    label.textContent = 'AI';
    bubble = document.createElement('div');
    bubble.className = 'n365-ai-msg n365-ai-assistant';
    bubble.id = 'n365-ai-streaming';
    wrap.append(label, bubble);
    // Remove existing loading row if present
    list.querySelectorAll('.n365-ai-loading').forEach((el) => el.parentElement?.remove());
    list.appendChild(wrap);
  }
  bubble.innerHTML = renderMessageBody(text);
  list.scrollTop = list.scrollHeight;
}

/** Switch the send button between "send" and "stop" appearance based on loading. */
function updateSendButton(): void {
  const btn = document.getElementById('n365-ai-send');
  if (!btn) return;
  const loading = S.ai.loading;
  btn.classList.toggle('stop', loading);
  btn.title = loading ? '中断' : '送信 (⌘↵)';
  // Lazy-load icons via the icons module
  void import('../icons').then(({ ICONS }) => {
    btn.innerHTML = loading ? ICONS.stop : ICONS.send;
  });
}

export function clearAiHistory(): void {
  if (S.ai.messages.length === 0) return;
  if (!confirm('現在の会話をクリアしますか？(履歴からも削除されます)')) return;
  if (_currentSessionId) {
    const sessions = loadHistory().filter((s) => s.id !== _currentSessionId);
    saveHistory(sessions);
  }
  _currentSessionId = null;
  S.ai.messages = [];
  renderAiMessages();
  renderHistoryDropdown();
}

export function configureApiKey(): void {
  const cur = getApiKey() || '';
  const next = prompt('Anthropic APIキー (空欄で削除):', cur);
  if (next === null) return;
  setApiKey(next.trim());
  toast(next.trim() ? 'APIキーを更新しました' : 'APIキーを削除しました');
}

export function getQuickPrompts(): typeof QUICK_PROMPTS {
  return QUICK_PROMPTS;
}
