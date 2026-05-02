// Corporate AI gateway client (Azure OpenAI 互換 / Function Calling 対応)。
//
// ベース URL とデプロイ ID 命名規則は組織ごとに違うため、コードに固有値を
// 持たず ai-settings.ts からユーザー設定値を取得して動的に組み立てる。
//
// 提供:
//  - corpAiChatText  ... プレーンチャット (text only)
//  - corpAiChatRaw   ... Claude 互換 (Tool Use / Function Calling 対応)
//                        run-agent.ts の agent loop を Claude / 企業AI 両対応
//                        にするための統一インターフェース。
//
// ストリーミングは SSE (data: {...}\n\n) で OpenAI 互換。

import {
  findCorpAiModel, getCorpAiKey, getCorpAiModel,
  getCorpAiBaseUrl, deploymentIdFor,
} from './ai-settings';
import type {
  ApiMessage, ContentBlock, TextBlock, ToolUseBlock, ToolResultBlock,
  ToolDef, SystemBlock, ClaudeResponse, StreamHandlers,
} from './anthropic';

/** OpenAI message shape — superset of what we send. Only role + content for
 *  the basic chat path. The SDK uses `image_url` parts for vision but n365's
 *  in-app chat is text-only at the moment. */
export interface OAMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface CorpChatHandlers {
  /** Cumulative-text delta — fired per text chunk during streaming. */
  onText?: (delta: string) => void;
}

export interface CorpChatOpts {
  messages: OAMessage[];
  /** Falls back to current setting when omitted. */
  model?: string;
  /** Caps the output. Mapped to `max_completion_tokens` automatically for
   *  reasoning models (GPT-5系 / o3 / o4-mini). */
  maxTokens?: number;
  signal?: AbortSignal;
  stream?: CorpChatHandlers;
}

/** Choose the api-version a given model requires. Reasoning models (GPT-5
 *  series, o3, o4-mini) need the preview version. */
function apiVersionFor(modelId: string): string {
  const m = findCorpAiModel(modelId);
  return m?.reasoning ? '2024-12-01-preview' : '2024-06-01';
}

/** Construct the chat completions endpoint URL. */
function chatUrlFor(modelId: string): string {
  const m = findCorpAiModel(modelId);
  if (!m) throw new Error('未知のモデル: ' + modelId);
  const baseUrl = getCorpAiBaseUrl();
  if (!baseUrl) throw new Error('企業AI API ベース URL が未設定です (設定で構成)');
  const deploymentId = deploymentIdFor(modelId);
  if (!deploymentId) throw new Error('企業AI API デプロイ名が未設定です (設定でプレフィックスを構成)');
  const apiVersion = apiVersionFor(modelId);
  return baseUrl + '/' + apiVersion +
    '/openai/deployments/' + deploymentId + '/chat/completions?api-version=' + apiVersion;
}

/** Plain (non-streaming) chat completion. Returns the assistant's reply. */
export async function corpAiChatText(opts: CorpChatOpts): Promise<string> {
  const apiKey = getCorpAiKey();
  if (!apiKey) throw new Error('企業AI API キーが未設定です');
  const modelId = opts.model || getCorpAiModel();
  const m = findCorpAiModel(modelId);
  if (!m) throw new Error('未知のモデル: ' + modelId);

  const body: Record<string, unknown> = {
    messages: opts.messages,
  };
  // Reasoning models reject `max_tokens` and require `max_completion_tokens`
  // instead. Non-reasoning models accept the legacy form.
  if (opts.maxTokens) {
    if (m.reasoning) body.max_completion_tokens = opts.maxTokens;
    else body.max_tokens = opts.maxTokens;
  }

  if (opts.stream?.onText) {
    body.stream = true;
    return streamChat(chatUrlFor(modelId), apiKey, body, opts.stream.onText, opts.signal);
  }

  const r = await fetch(chatUrlFor(modelId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(body),
    signal: opts.signal,
  });
  if (!r.ok) {
    const txt = await r.text().catch(() => '');
    throw new Error(formatCorpError(r.status, txt));
  }
  const j = await r.json() as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return j.choices?.[0]?.message?.content || '';
}

async function streamChat(
  url: string, apiKey: string, body: Record<string, unknown>,
  onText: (delta: string) => void, signal?: AbortSignal,
): Promise<string> {
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
      Accept: 'text/event-stream',
    },
    body: JSON.stringify(body),
    signal,
  });
  if (!r.ok) {
    const txt = await r.text().catch(() => '');
    throw new Error(formatCorpError(r.status, txt));
  }
  if (!r.body) throw new Error('ストリーミング応答を取得できませんでした');

  const reader = r.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  let full = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    // Process all complete SSE events in the buffer.
    let idx;
    while ((idx = buf.indexOf('\n\n')) !== -1) {
      const evt = buf.slice(0, idx);
      buf = buf.slice(idx + 2);
      // Each event is one or more `data: …` lines.
      for (const line of evt.split('\n')) {
        const m = line.match(/^data:\s*(.*)$/);
        if (!m) continue;
        const payload = m[1].trim();
        if (!payload || payload === '[DONE]') continue;
        try {
          const j = JSON.parse(payload) as {
            choices?: Array<{ delta?: { content?: string } }>;
          };
          const piece = j.choices?.[0]?.delta?.content;
          if (piece) { full += piece; onText(piece); }
        } catch { /* ignore parse errors on partial data */ }
      }
    }
  }
  return full;
}

/** Map gateway status codes to friendlier Japanese messages. Falls through
 *  to the raw response text otherwise. */
function formatCorpError(status: number, body: string): string {
  const sliced = body ? ' — ' + body.slice(0, 240) : '';
  if (status === 401) return '企業AI 失敗: 401 サブスクリプションキーが無効/未指定' + sliced;
  if (status === 403) return '企業AI 失敗: 403 接続元 IP が許可されていません (社内ネットワーク接続を確認)' + sliced;
  if (status === 429) return '企業AI 失敗: 429 トークン上限超過 (1分後に再試行)' + sliced;
  if (status === 400) return '企業AI 失敗: 400 リクエスト不正 (モデル/JSON を確認)' + sliced;
  return '企業AI 失敗: ' + status + sliced;
}

// ─── Tool Use bridge: Claude format ↔ OpenAI Function Calling format ───────

interface OAToolCall {
  id: string;
  type: 'function';
  function: { name: string; arguments: string };
}
interface OAFullMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content?: string | null;
  tool_calls?: OAToolCall[];
  tool_call_id?: string;
}

/** Convert Claude's structured ApiMessage[] to OpenAI Chat Completions message
 *  shape. Each Claude `tool_use` block becomes an OpenAI `tool_calls` entry on
 *  the same assistant turn; each `tool_result` block becomes a separate
 *  message with `role: 'tool'` (OpenAI's convention). */
function toOAMessages(msgs: ApiMessage[]): OAFullMessage[] {
  const out: OAFullMessage[] = [];
  for (const m of msgs) {
    if (typeof m.content === 'string') {
      out.push({ role: m.role, content: m.content });
      continue;
    }
    const blocks = m.content as ContentBlock[];
    if (m.role === 'assistant') {
      // Group text + tool_use into one assistant message
      const text = blocks.filter((b) => b.type === 'text')
        .map((b) => (b as TextBlock).text).join('');
      const toolUses = blocks.filter((b) => b.type === 'tool_use') as ToolUseBlock[];
      const tool_calls = toolUses.length > 0 ? toolUses.map((u) => ({
        id: u.id,
        type: 'function' as const,
        function: { name: u.name, arguments: JSON.stringify(u.input || {}) },
      })) : undefined;
      out.push({
        role: 'assistant',
        content: text || (tool_calls ? null : ''),
        ...(tool_calls ? { tool_calls } : {}),
      });
    } else {
      // user role with tool_result blocks → emit one `role: 'tool'` per result
      const toolResults = blocks.filter((b) => b.type === 'tool_result') as ToolResultBlock[];
      const userText = blocks.filter((b) => b.type === 'text')
        .map((b) => (b as TextBlock).text).join('');
      if (userText) out.push({ role: 'user', content: userText });
      for (const tr of toolResults) {
        out.push({
          role: 'tool',
          tool_call_id: tr.tool_use_id,
          content: tr.content,
        });
      }
    }
  }
  return out;
}

interface OAToolDef {
  type: 'function';
  function: { name: string; description: string; parameters: Record<string, unknown> };
}

/** Convert Claude ToolDef[] to OpenAI's `tools` request param. Claude's
 *  `cache_control` is not transferable; the corporate gateway doesn't expose
 *  prompt-caching here, so we drop it. */
function toOATools(tools: ToolDef[]): OAToolDef[] {
  return tools.map((t) => ({
    type: 'function',
    function: {
      name: t.name,
      description: t.description,
      parameters: t.input_schema,
    },
  }));
}

/** Flatten a SystemBlock[] (with cache_control hints) to a single string —
 *  OpenAI accepts a `role: 'system'` message body without the structured
 *  per-block format. */
function flattenSystem(s: string | SystemBlock[] | undefined): string {
  if (!s) return '';
  if (typeof s === 'string') return s;
  return s.map((b) => b.text).join('\n\n');
}

interface CorpRawOpts {
  messages: ApiMessage[];
  system?: string | SystemBlock[];
  tools?: ToolDef[];
  model?: string;
  maxTokens?: number;
  signal?: AbortSignal;
  stream?: StreamHandlers;
}

/** Claude-shaped agent-loop entry point implemented against the corporate AI
 *  gateway. Returns the same `ClaudeResponse` envelope so run-agent.ts
 *  can dispatch on provider without conditional branching downstream. */
export async function corpAiChatRaw(opts: CorpRawOpts): Promise<ClaudeResponse> {
  const apiKey = getCorpAiKey();
  if (!apiKey) throw new Error('企業AI API キーが未設定です');
  const modelId = opts.model || getCorpAiModel();
  const m = findCorpAiModel(modelId);
  if (!m) throw new Error('未知のモデル: ' + modelId);

  const sysText = flattenSystem(opts.system);
  const oaMsgs: OAFullMessage[] = sysText
    ? [{ role: 'system', content: sysText }, ...toOAMessages(opts.messages)]
    : toOAMessages(opts.messages);

  const body: Record<string, unknown> = { messages: oaMsgs };
  if (opts.tools && opts.tools.length > 0) {
    body.tools = toOATools(opts.tools);
    body.tool_choice = 'auto';
  }
  if (opts.maxTokens) {
    if (m.reasoning) body.max_completion_tokens = opts.maxTokens;
    else body.max_tokens = opts.maxTokens;
  }
  if (opts.stream) body.stream = true;

  const url = chatUrlFor(modelId);
  if (opts.stream) {
    return streamChatRaw(url, apiKey, body, opts.stream, opts.signal);
  }

  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
    body: JSON.stringify(body),
    signal: opts.signal,
  });
  if (!r.ok) throw new Error(formatCorpError(r.status, await r.text().catch(() => '')));
  const j = await r.json() as {
    choices?: Array<{
      message?: OAFullMessage;
      finish_reason?: string;
    }>;
  };
  const ch = j.choices?.[0];
  return parseOAResponseToClaudeShape(ch?.message, ch?.finish_reason);
}

/** Convert an OpenAI message + finish_reason into Claude's content[] /
 *  stop_reason shape so the agent loop can stay provider-agnostic. */
function parseOAResponseToClaudeShape(
  msg: OAFullMessage | undefined,
  finish: string | undefined,
): ClaudeResponse {
  const content: ContentBlock[] = [];
  const text = (msg?.content as string | null | undefined) || '';
  if (text) content.push({ type: 'text', text });
  if (msg?.tool_calls) {
    for (const tc of msg.tool_calls) {
      let input: Record<string, unknown> = {};
      try { input = JSON.parse(tc.function.arguments || '{}'); }
      catch { /* OpenAI sometimes sends partial json; pass empty */ }
      content.push({ type: 'tool_use', id: tc.id, name: tc.function.name, input });
    }
  }
  let stop: ClaudeResponse['stop_reason'] = 'end_turn';
  if (finish === 'tool_calls') stop = 'tool_use';
  else if (finish === 'length') stop = 'max_tokens';
  else if (finish === 'stop') stop = 'end_turn';
  return { content, stop_reason: stop };
}

/** Streaming variant — accumulates incremental text + tool_call args until
 *  the SSE stream terminates, then returns the assembled ClaudeResponse.
 *  Calls `stream.onText` per content delta so the chat UI can render text
 *  as it arrives; tool_calls are emitted only at end-of-stream so callers
 *  see fully-formed JSON arguments. */
async function streamChatRaw(
  url: string, apiKey: string, body: Record<string, unknown>,
  handlers: StreamHandlers, signal?: AbortSignal,
): Promise<ClaudeResponse> {
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
      Accept: 'text/event-stream',
    },
    body: JSON.stringify(body),
    signal,
  });
  if (!r.ok) throw new Error(formatCorpError(r.status, await r.text().catch(() => '')));
  if (!r.body) throw new Error('ストリーミング応答を取得できませんでした');

  const reader = r.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  let textAcc = '';
  let finish: string | undefined;
  // tool_calls are streamed as a fragmented array; index → fields
  const tcAcc = new Map<number, { id: string; name: string; args: string }>();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let idx;
    while ((idx = buf.indexOf('\n\n')) !== -1) {
      const evt = buf.slice(0, idx);
      buf = buf.slice(idx + 2);
      for (const line of evt.split('\n')) {
        const m = line.match(/^data:\s*(.*)$/);
        if (!m) continue;
        const payload = m[1].trim();
        if (!payload || payload === '[DONE]') continue;
        try {
          const j = JSON.parse(payload) as {
            choices?: Array<{
              delta?: {
                content?: string;
                tool_calls?: Array<{
                  index: number; id?: string; type?: string;
                  function?: { name?: string; arguments?: string };
                }>;
              };
              finish_reason?: string | null;
            }>;
          };
          const ch = j.choices?.[0];
          if (!ch) continue;
          const piece = ch.delta?.content;
          if (piece) {
            textAcc += piece;
            handlers.onText?.(piece);
          }
          if (ch.delta?.tool_calls) {
            for (const tc of ch.delta.tool_calls) {
              const cur = tcAcc.get(tc.index) || { id: '', name: '', args: '' };
              if (tc.id) cur.id = tc.id;
              if (tc.function?.name) cur.name = tc.function.name;
              if (tc.function?.arguments) cur.args += tc.function.arguments;
              tcAcc.set(tc.index, cur);
            }
          }
          if (ch.finish_reason) finish = ch.finish_reason;
        } catch { /* tolerate partial chunks */ }
      }
    }
  }

  const content: ContentBlock[] = [];
  if (textAcc) content.push({ type: 'text', text: textAcc });
  for (const cur of tcAcc.values()) {
    let input: Record<string, unknown> = {};
    try { input = JSON.parse(cur.args || '{}'); } catch { /* partial */ }
    content.push({ type: 'tool_use', id: cur.id, name: cur.name, input });
    handlers.onToolUse?.({ type: 'tool_use', id: cur.id, name: cur.name, input });
  }
  let stop: ClaudeResponse['stop_reason'] = 'end_turn';
  if (finish === 'tool_calls' || tcAcc.size > 0) stop = 'tool_use';
  else if (finish === 'length') stop = 'max_tokens';
  return { content, stop_reason: stop };
}
