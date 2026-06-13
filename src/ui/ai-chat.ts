// AI chat panel: right-side slide-out powered by direct Claude API calls.

import { S } from '../state';
import { g } from './dom';
import { toast } from './ui-helpers';
import { getApiKey, type ApiMessage, type ContentBlock, type TextBlock, type ToolUseBlock } from '../api/anthropic';
import { runAgent } from '../ai/run-agent';
import { blocksToMd } from '../lib/blocks-md';
import { fetchEmailParsed, emailBodyText } from '../lib/email-parse';
import { getBlocks } from './editor2/editor2-bridge';
import { escapeHtml } from '../lib/html-escape';
import { nowJSTContext } from '../lib/date-utils';
import { metaById } from '../lib/page-store';
import { currentCommentsContext } from './comments-ui';
import { prefAiHistory, prefAiPaneOpen } from '../lib/prefs';

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
  const raw = prefAiHistory.get();
  if (!raw) return [];
  try { return JSON.parse(raw) as AiSession[]; }
  catch { return []; }
}

function saveHistory(sessions: AiSession[]): void {
  prefAiHistory.set(JSON.stringify(sessions.slice(0, MAX_HISTORY)));
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
    const ai = await import('../api/ai-settings');
    const prompt = 'ユーザーの会話の最初の発話から、20文字以内の簡潔な日本語タイトルを 1 つだけ返してください。' +
      '記号・引用符・「」は不要、タイトル本体のみ。語尾の句点も不要。\n\n' +
      '発話: ' + userMsg;
    let raw = '';
    const provider = ai.getProvider();
    if (provider === 'corp') {
      // Skip silently if no key — title generation is non-critical.
      if (!ai.getCorpAiKey()) return;
      const corp = await import('../api/openai-corp');
      raw = await corp.corpAiChatText({
        messages: [{ role: 'user', content: prompt }],
        maxTokens: 60,
      }).catch(() => '');
    } else if (provider === 'local') {
      // Local AI: skip if base URL or model isn't set.
      if (!ai.getLocalAiBaseUrl() || !ai.getLocalAiModel()) return;
      const local = await import('../api/openai-local');
      raw = await local.localAiChatText({
        messages: [{ role: 'user', content: prompt }],
        maxTokens: 60,
      }).catch(() => '');
    } else {
      const { callClaudeRaw } = await import('../api/anthropic');
      const res = await callClaudeRaw({
        messages: [{ role: 'user', content: prompt }],
        model: ai.getClaudeModel(),
        maxTokens: 60,
      });
      raw = res.content
        .filter((b) => b.type === 'text')
        .map((b) => (b as { text: string }).text)
        .join('');
    }
    const text = raw
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
  const dd = document.getElementById('memola-ai-hist');
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

// Current JST date/time line — `nowJSTContext` lives in lib/date-utils
// so the editor's saved-time label and AI prompt context share the
// exact same formatting.

function pageContext(): string {
  const id = S.currentId || '';
  if (!id) return '';
  // DB list view: the editor isn't mounted (getBlocks would be empty), so
  // describe the database itself — columns + rows — instead. This is what
  // the user is looking at, and lets the AI answer about / operate on it.
  if (S.currentType === 'database' && !S.currentRow) return dbContext(id);
  const titleEl = g('ttl') as HTMLTextAreaElement | null;
  const title = (titleEl && titleEl.value) || '';
  // Pull body from editor2's canonical block state, not the live DOM.
  const md = blocksToMd(getBlocks());
  const lines = [
    '── 現在開いているページ ──',
    `id: ${id}`,
    `title: ${title}`,
  ];
  if (md.trim()) {
    lines.push('', 'body (markdown):', md);
  }
  if (_emailCtx) { lines.push('', _emailCtx); }
  const comments = currentCommentsContext();
  if (comments) { lines.push('', comments); }
  return lines.join('\n');
}

// ── 添付メール本文の取り込み(AIコンテキスト) ──────────────────────────────
// メールブロックは本文をページに持たず .eml/.msg ファイルに保持しているため、
// 送信直前にファイルを取得・解析して本文を systemPrompt に同梱する。
// 仕様: 1通あたり最大 5000 字(引用履歴・署名も範囲内で含む)。超過分は切り、
// 何字省略したかを AI に明記する。
const EMAIL_BODY_CAP = 5000;
let _emailCtx = '';

async function prefetchEmailContext(): Promise<void> {
  _emailCtx = '';
  let blocks;
  try { blocks = getBlocks(); } catch { return; }
  const emails = blocks.filter((b): b is Extract<typeof b, { kind: 'email' }> => b.kind === 'email');
  if (!emails.length) return;
  const parts: string[] = [];
  for (const b of emails) {
    if (!b.fileUrl) continue;
    const parsed = await fetchEmailParsed(b.fileUrl, b.filename || '');
    const subject = (parsed?.subject || b.subject || '(件名なし)');
    const from = parsed ? [parsed.fromName, parsed.fromEmail].filter(Boolean).join(' ') : b.from;
    const date = parsed?.dateISO || b.date || '';
    const full = parsed ? emailBodyText(parsed) : '';
    let body = full;
    let note = '';
    if (full.length > EMAIL_BODY_CAP) {
      body = full.slice(0, EMAIL_BODY_CAP);
      note = `（注: このメール本文は先頭 ${EMAIL_BODY_CAP} 字のみ。元は約 ${full.length} 字で、残り ${full.length - EMAIL_BODY_CAP} 字を省略しています）`;
    } else if (!full) {
      note = '（注: 本文を取得できませんでした。件名・差出人のみ）';
    }
    const seg = ['── 添付メール ──', `件名: ${subject}`];
    if (from) seg.push(`差出人: ${from}`);
    if (date) seg.push(`日時: ${date}`);
    seg.push('本文:', body);
    if (note) seg.push(note);
    parts.push(seg.join('\n'));
  }
  _emailCtx = parts.join('\n\n');
}

/** Markdown-table snapshot of the currently-open database (columns + rows
 *  from S.dbFields / S.dbItems). Rows are capped so a huge DB doesn't blow
 *  the prompt; the cap is disclosed so the AI knows the view is partial. */
function dbContext(id: string): string {
  const title = metaById(id)?.title || '';
  const fields = S.dbFields;
  const cols = ['Title', ...fields.map((f) => f.Title)];
  const cell = (v: unknown): string =>
    String(v ?? '').replace(/\r?\n/g, ' ').replace(/\|/g, '\\|');
  const ROW_CAP = 60;
  const lines = [
    '── 現在開いているデータベース (一覧) ──',
    `id: ${id}`,
    `title: ${title}`,
    `列: ${cols.join(', ')}`,
    `行数: ${S.dbItems.length}`,
    '',
    '行 (markdown table):',
    '| ' + cols.join(' | ') + ' |',
    '| ' + cols.map(() => '---').join(' | ') + ' |',
  ];
  for (const it of S.dbItems.slice(0, ROW_CAP)) {
    const r = it as unknown as Record<string, unknown>;
    const cells = cols.map((c) => {
      if (c === 'Title') return cell(r.Title);
      const f = fields.find((x) => x.Title === c);
      return cell(f ? (r[f.InternalName] ?? r[f.Title]) : '');
    });
    lines.push('| ' + cells.join(' | ') + ' |');
  }
  if (S.dbItems.length > ROW_CAP) {
    lines.push(`… 他 ${S.dbItems.length - ROW_CAP} 行(表示上限のため省略)`);
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
  const dynamic: string[] = [nowJSTContext()];
  const page = pageContext();
  if (page) { dynamic.push(''); dynamic.push(page); }
  blocks.push({ type: 'text', text: dynamic.join('\n') });
  return blocks;
}

const STATIC_SYSTEM_PROMPT = `あなたは Memola (Notion風 SharePoint連携ノートアプリ) の AI アシスタントです。
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
- 列の追加は add_db_field で行える(text/multiline/date/choice/bool/number)。create_db 直後に
  必要な列を順次追加すること。unique:true で重複禁止(ユニーク)列にできる — マスターDBの
  キー列(例: プロジェクト名)に指定すると重複を防げ、参照のキーにも使える。
- ★リレーション/ロールアップも作れる(「無い」と答えてはいけない)。これらは SP の素の列では
  なくクライアント計算列なので専用ツールを使う:
  ・リレーション(他DBへのリンク列) → add_relation_column。子DBに「親の名前(Title)」を入れる
    列(text/choice)を作り、それを key_field に、親DBを target_db_id に指定する。
  ・ロールアップ(子の集計値を親に表示) → add_rollup_column。child_db_id/child_foreign_field(子の
    親Title列)/agg(count|sum|avg|min|max|join)/target_field を指定。既存DBへ後付けも可能。
- 複数DB+リレーション+ロールアップ+ビューを一式まとめて作るなら scaffold_workspace(プレビュー
  確認付き)。「請求管理を作って」等の一括設計はこれを使う。
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

export function openAiPanel(): void {
  S.ai.panelOpen = true;
  g('ai-panel').classList.add('on');
  document.getElementById('memola-ai-btn')?.classList.add('on');
  prefAiPaneOpen.set('1');
  syncProviderBadge();
  void ensureApiKey();
  renderAiMessages();
  setTimeout(() => (g('ai-input') as HTMLTextAreaElement).focus(), 50);
}

export function closeAiPanel(): void {
  S.ai.panelOpen = false;
  g('ai-panel').classList.remove('on');
  document.getElementById('memola-ai-btn')?.classList.remove('on');
  prefAiPaneOpen.set('0');
}

export function applyAiPanelState(): void {
  if (prefAiPaneOpen.get() === '1') openAiPanel();
}

export function toggleAiPanel(): void {
  if (S.ai.panelOpen) closeAiPanel();
  else openAiPanel();
}

async function ensureApiKey(): Promise<boolean> {
  const ai = await import('../api/ai-settings');
  const provider = ai.getProvider();
  if (provider === 'corp') {
    if (ai.getCorpAiKey()) return true;
    toast('Azure OpenAI 互換 API キーが未設定です。サイドバーの「⚙ 設定」から設定してください', 'err');
    return false;
  }
  if (provider === 'local') {
    // Local AI usually accepts any key (or none); only the base URL
    // and a model name are mandatory. Everything else is enforced inside
    // localAiChatRaw, which throws a friendly error.
    if (!ai.getLocalAiBaseUrl()) {
      toast('ローカル AI のベース URL が未設定です。サイドバーの「⚙ 設定」から設定してください', 'err');
      return false;
    }
    if (!ai.getLocalAiModel()) {
      toast('ローカル AI のモデル名が未設定です。サイドバーの「⚙ 設定」から指定してください', 'err');
      return false;
    }
    return true;
  }
  // Claude
  if (getApiKey()) return true;
  toast('Claude API キーが未設定です。サイドバーの「⚙ 設定」から設定してください', 'err');
  return false;
}

/** Populate / refresh the model picker dropdown next to the chat input.
 *  Each <option> encodes "<provider>:<modelId>" so a single change handler
 *  can apply both provider and model in one shot. Exposed so the settings
 *  modal can refresh after edits there. */
export function syncProviderBadge(): void {
  const sel = document.getElementById('memola-ai-model-pick') as HTMLSelectElement | null;
  if (!sel) return;
  void import('../api/ai-settings').then((ai) => {
    const provider = ai.getProvider();
    const claudeModel = ai.getClaudeModel();
    const corpModel = ai.getCorpAiModel();
    const localModel = ai.getLocalAiModel();
    const cur = provider + ':' + (
      provider === 'corp' ? corpModel :
      provider === 'local' ? localModel :
      claudeModel
    );
    sel.innerHTML = '';
    const claudeGroup = document.createElement('optgroup');
    claudeGroup.label = 'Claude';
    for (const m of ai.CLAUDE_MODELS) {
      const o = document.createElement('option');
      o.value = 'claude:' + m.id;
      o.textContent = m.label;
      claudeGroup.appendChild(o);
    }
    sel.appendChild(claudeGroup);
    const corpGroup = document.createElement('optgroup');
    corpGroup.label = 'Azure OpenAI 互換';
    for (const m of ai.CORP_AI_MODELS) {
      const o = document.createElement('option');
      o.value = 'corp:' + m.id;
      o.textContent = m.id;
      corpGroup.appendChild(o);
    }
    sel.appendChild(corpGroup);
    const localModels = ai.getLocalAiModels();
    if (localModels.length > 0 || localModel) {
      const localGroup = document.createElement('optgroup');
      localGroup.label = 'ローカル AI';
      // Combine: explicit list + currently-selected (in case it's not in the list yet)
      const seen = new Set<string>();
      for (const m of [localModel, ...localModels]) {
        if (!m || seen.has(m)) continue;
        seen.add(m);
        const o = document.createElement('option');
        o.value = 'local:' + m;
        o.textContent = m;
        localGroup.appendChild(o);
      }
      sel.appendChild(localGroup);
    }
    sel.value = cur;
  });
}

/** Apply a "provider:modelId" picker selection. Used by the chat-input
 *  model dropdown's change handler. */
export async function applyModelPick(value: string): Promise<void> {
  const colonIdx = value.indexOf(':');
  if (colonIdx < 0) return;
  const provider = value.substring(0, colonIdx);
  const modelId = value.substring(colonIdx + 1);
  if (provider !== 'claude' && provider !== 'corp' && provider !== 'local') return;
  const ai = await import('../api/ai-settings');
  ai.setProvider(provider);
  if (provider === 'claude') ai.setClaudeModel(modelId);
  else if (provider === 'corp') ai.setCorpAiModel(modelId);
  else if (provider === 'local') ai.setLocalAiModel(modelId);
  syncProviderBadge();
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
    empty.className = 'memola-ai-empty';
    empty.innerHTML =
      '<div class="memola-ai-empty-title">このページについて質問できます</div>' +
      '<div class="memola-ai-empty-sub">下のチップから始めるか、自由に入力してください</div>';
    list.appendChild(empty);
  }
  for (const m of S.ai.messages) {
    const summary = summarizeMessage(m);
    if (!summary) continue;        // skip tool_result-only frames
    if (!summary.text && summary.toolNames.length === 0) continue;
    const wrap = document.createElement('div');
    wrap.className = 'memola-ai-row';
    const label = document.createElement('div');
    label.className = 'memola-ai-label';
    label.textContent = m.role === 'user' ? 'あなた' : 'AI';
    const card = document.createElement('div');
    card.className = 'memola-ai-msg memola-ai-' + m.role;
    let html = summary.text ? renderMessageBody(summary.text) : '';
    if (summary.toolNames.length > 0) {
      const trace = '<div class="memola-ai-trace">— 実行: ' +
        summary.toolNames.map((n) => '🔧 ' + escapeHtml(n)).join(' / ') + '</div>';
      html += trace;
    }
    card.innerHTML = html;
    wrap.append(label, card);
    list.appendChild(wrap);
  }
  if (S.ai.loading) {
    const wrap = document.createElement('div');
    wrap.className = 'memola-ai-row';
    const label = document.createElement('div');
    label.className = 'memola-ai-label';
    label.textContent = 'AI';
    const card = document.createElement('div');
    card.className = 'memola-ai-msg memola-ai-assistant memola-ai-loading';
    card.textContent = '考え中';
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
  if (!(await ensureApiKey())) return;

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
    // 添付メールの本文を取得して systemPrompt に同梱(無ければ即返る)。
    await prefetchEmailContext();
    // Provider routing happens inside runAgent → callClaudeRaw / corpAiChatRaw.
    // Both speak the same ClaudeResponse shape so tool execution, history,
    // and streaming all work uniformly here.
    const result = await runAgent(S.ai.messages, systemPromptBlocks(), onTextDelta, ctrl.signal, updateLoadingActivity);
    S.ai.messages.push(...result.newMessages);
    // ツール失敗を黙らせない: 失敗があればまとめてトースト表示(詳細はコンソール)。
    const failed = result.toolTrace.filter((t) => !t.ok);
    if (failed.length > 0) {
      const first = failed[0];
      toast('⚠ AIツール失敗 ' + failed.length + '件: ' + first.name +
        (first.error ? ' — ' + first.error.slice(0, 120) : ''), 'err');
    }
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

/** ローディング吹き出しの文言を「いま何をしているか」で更新する(runAgent の
 *  onActivity)。文言が変わる+CSSのドットが動き続けるので、ハングと区別できる。 */
function updateLoadingActivity(label: string): void {
  const list = g('ai-messages');
  // ストリーミング中(テキスト受信中)はそちらの吹き出しが進捗そのものなので不要。
  if (document.getElementById('memola-ai-streaming')) {
    // ツール実行に移ったらストリーミング吹き出しを確定し、ローディングへ戻す。
    if (!label.startsWith('🔧')) return;
    document.getElementById('memola-ai-streaming-row')?.remove();
  }
  let bubble = list.querySelector<HTMLElement>('.memola-ai-loading');
  if (!bubble) {
    const wrap = document.createElement('div');
    wrap.className = 'memola-ai-row';
    const lb = document.createElement('div');
    lb.className = 'memola-ai-label';
    lb.textContent = 'AI';
    bubble = document.createElement('div');
    bubble.className = 'memola-ai-msg memola-ai-assistant memola-ai-loading';
    wrap.append(lb, bubble);
    list.appendChild(wrap);
  }
  bubble.textContent = label;
  list.scrollTop = list.scrollHeight;
}

/** Render the streaming-text-only placeholder. Called per text delta. */
function updateStreamingBubble(text: string): void {
  const list = g('ai-messages');
  let bubble = document.getElementById('memola-ai-streaming') as HTMLElement | null;
  if (!bubble) {
    // Replace the existing 「考え中…」 loading bubble with a real text bubble
    const wrap = document.createElement('div');
    wrap.className = 'memola-ai-row';
    wrap.id = 'memola-ai-streaming-row';
    const label = document.createElement('div');
    label.className = 'memola-ai-label';
    label.textContent = 'AI';
    bubble = document.createElement('div');
    bubble.className = 'memola-ai-msg memola-ai-assistant';
    bubble.id = 'memola-ai-streaming';
    wrap.append(label, bubble);
    // Remove existing loading row if present
    list.querySelectorAll('.memola-ai-loading').forEach((el) => el.parentElement?.remove());
    list.appendChild(wrap);
  }
  bubble.innerHTML = renderMessageBody(text);
  list.scrollTop = list.scrollHeight;
}

/** Switch the send button between "send" and "stop" appearance based on loading. */
function updateSendButton(): void {
  const btn = document.getElementById('memola-ai-send');
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

/** Deprecated — API キーはサイドバー「⚙ 設定」一本化。残骸 (export 互換) */
export function configureApiKey(): void {
  toast('API キーは「⚙ 設定」 (サイドバー) から設定してください');
}

export function getQuickPrompts(): typeof QUICK_PROMPTS {
  return QUICK_PROMPTS;
}
