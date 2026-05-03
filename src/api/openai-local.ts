// Local AI client (OpenAI ネイティブ Chat Completions 形式)。
//
// 想定サーバ:
//   - Ollama         (http://localhost:11434/v1)
//   - LM Studio      (http://localhost:1234/v1)
//   - llama.cpp server (http://localhost:8080/v1)
//   - vLLM           (http://localhost:8000/v1)
//   - その他 OpenAI Chat Completions 互換のもの
//
// Azure OpenAI 互換 API (openai-corp.ts) との違い:
//   - URL: `{baseUrl}/chat/completions` (deployment path 無し)
//   - 認証: `Authorization: Bearer {key}` (api-key ヘッダではなく)
//   - モデル選択: リクエストボディの `model` フィールド (URL ではない)
//   - 認証キーは多くのローカルサーバで任意 (空でも通る)
//
// リクエスト/レスポンスのボディ形式 (toOAMessages, toOATools, parse〜) は
// 共通なので openai-corp.ts から再利用する。

import {
  getLocalAiBaseUrl, getLocalAiKey, getLocalAiModel,
  isLocalReasoningModel,
} from './ai-settings';
import type {
  ApiMessage, ToolDef, SystemBlock, ClaudeResponse, StreamHandlers,
} from './anthropic';
import {
  toOAMessages, toOATools, flattenSystem, parseOAResponseToClaudeShape,
  type OAFullMessage, type OAMessage,
} from './openai-corp';

export interface LocalChatOpts {
  messages: OAMessage[];
  /** Falls back to current setting when omitted. */
  model?: string;
  maxTokens?: number;
  signal?: AbortSignal;
  /** When set, the response is streamed and `onText` is called per chunk. */
  stream?: { onText?: (delta: string) => void };
}

function chatUrl(): string {
  const base = getLocalAiBaseUrl();
  if (!base) throw new Error('ローカル AI ベース URL が未設定です (例: http://localhost:11434/v1)');
  return base + '/chat/completions';
}

function headers(): Record<string, string> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  const key = getLocalAiKey();
  // Most local servers accept any value (or none); some proxy setups
  // require Bearer auth. Send the key when present, omit when blank to
  // avoid spurious 401s on bare-bones servers.
  if (key) h['Authorization'] = 'Bearer ' + key;
  return h;
}

function formatLocalError(status: number, body: string): string {
  const sliced = body ? ' — ' + body.slice(0, 240) : '';
  if (status === 0) return 'ローカル AI 失敗: サーバに接続できません (URL とサーバ起動を確認)';
  if (status === 401) return 'ローカル AI 失敗: 401 認証エラー (API キー確認)' + sliced;
  if (status === 404) return 'ローカル AI 失敗: 404 エンドポイントが見つかりません (URL 末尾の /v1 を確認)' + sliced;
  if (status === 400) return 'ローカル AI 失敗: 400 リクエスト不正 (モデル名 / JSON 確認)' + sliced;
  return 'ローカル AI 失敗: ' + status + sliced;
}

/** Plain (non-streaming) chat — mirrors corpAiChatText shape. */
export async function localAiChatText(opts: LocalChatOpts): Promise<string> {
  const modelId = opts.model || getLocalAiModel();
  if (!modelId) throw new Error('ローカル AI のモデル名が未設定です');

  const body: Record<string, unknown> = {
    model: modelId,
    messages: opts.messages,
  };
  if (opts.maxTokens) {
    if (isLocalReasoningModel(modelId)) body.max_completion_tokens = opts.maxTokens;
    else body.max_tokens = opts.maxTokens;
  }
  if (opts.stream?.onText) {
    body.stream = true;
    return streamChat(body, opts.stream.onText, opts.signal);
  }

  const r = await fetchOrZero(chatUrl(), {
    method: 'POST', headers: headers(),
    body: JSON.stringify(body), signal: opts.signal,
  });
  if (!r.ok) throw new Error(formatLocalError(r.status, await r.text().catch(() => '')));
  const j = await r.json() as { choices?: Array<{ message?: { content?: string } }> };
  return j.choices?.[0]?.message?.content || '';
}

async function streamChat(
  body: Record<string, unknown>, onText: (delta: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  const r = await fetchOrZero(chatUrl(), {
    method: 'POST',
    headers: { ...headers(), Accept: 'text/event-stream' },
    body: JSON.stringify(body), signal,
  });
  if (!r.ok) throw new Error(formatLocalError(r.status, await r.text().catch(() => '')));
  if (!r.body) throw new Error('ストリーミング応答を取得できませんでした');

  const reader = r.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  let full = '';
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
            choices?: Array<{ delta?: { content?: string } }>;
          };
          const piece = j.choices?.[0]?.delta?.content;
          if (piece) { full += piece; onText(piece); }
        } catch { /* ignore partial */ }
      }
    }
  }
  return full;
}

export interface LocalRawOpts {
  messages: ApiMessage[];
  system?: string | SystemBlock[];
  tools?: ToolDef[];
  model?: string;
  maxTokens?: number;
  signal?: AbortSignal;
  stream?: StreamHandlers;
}

/** Claude-shaped Tool Use entry point — same envelope as corpAiChatRaw. */
export async function localAiChatRaw(opts: LocalRawOpts): Promise<ClaudeResponse> {
  const modelId = opts.model || getLocalAiModel();
  if (!modelId) throw new Error('ローカル AI のモデル名が未設定です');

  const sysText = flattenSystem(opts.system);
  const oaMsgs: OAFullMessage[] = sysText
    ? [{ role: 'system', content: sysText }, ...toOAMessages(opts.messages)]
    : toOAMessages(opts.messages);

  const body: Record<string, unknown> = { model: modelId, messages: oaMsgs };
  if (opts.tools && opts.tools.length > 0) {
    body.tools = toOATools(opts.tools);
    body.tool_choice = 'auto';
  }
  if (opts.maxTokens) {
    if (isLocalReasoningModel(modelId)) body.max_completion_tokens = opts.maxTokens;
    else body.max_tokens = opts.maxTokens;
  }
  if (opts.stream) body.stream = true;

  if (opts.stream) {
    return streamChatRaw(body, opts.stream, opts.signal);
  }

  const r = await fetchOrZero(chatUrl(), {
    method: 'POST', headers: headers(),
    body: JSON.stringify(body), signal: opts.signal,
  });
  if (!r.ok) throw new Error(formatLocalError(r.status, await r.text().catch(() => '')));
  const j = await r.json() as {
    choices?: Array<{ message?: OAFullMessage; finish_reason?: string }>;
  };
  const ch = j.choices?.[0];
  return parseOAResponseToClaudeShape(ch?.message, ch?.finish_reason);
}

/** Streaming variant — mirrors openai-corp.streamChatRaw. */
async function streamChatRaw(
  body: Record<string, unknown>, handlers: StreamHandlers,
  signal?: AbortSignal,
): Promise<ClaudeResponse> {
  const r = await fetchOrZero(chatUrl(), {
    method: 'POST',
    headers: { ...headers(), Accept: 'text/event-stream' },
    body: JSON.stringify(body), signal,
  });
  if (!r.ok) throw new Error(formatLocalError(r.status, await r.text().catch(() => '')));
  if (!r.body) throw new Error('ストリーミング応答を取得できませんでした');

  const reader = r.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  let textAcc = '';
  let finish: string | undefined;
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
              finish_reason?: string;
            }>;
          };
          const ch = j.choices?.[0];
          const piece = ch?.delta?.content;
          if (piece) { textAcc += piece; handlers.onText?.(piece); }
          const tcs = ch?.delta?.tool_calls;
          if (tcs) {
            for (const tc of tcs) {
              const cur = tcAcc.get(tc.index) || { id: '', name: '', args: '' };
              if (tc.id) cur.id = tc.id;
              if (tc.function?.name) cur.name = tc.function.name;
              if (tc.function?.arguments) cur.args += tc.function.arguments;
              tcAcc.set(tc.index, cur);
            }
          }
          if (ch?.finish_reason) finish = ch.finish_reason;
        } catch { /* ignore */ }
      }
    }
  }
  // Build the final ClaudeResponse from the accumulated state
  const msg: OAFullMessage = { role: 'assistant', content: textAcc || null };
  if (tcAcc.size > 0) {
    msg.tool_calls = Array.from(tcAcc.entries())
      .sort(([a], [b]) => a - b)
      .map(([, v]) => ({
        id: v.id,
        type: 'function' as const,
        function: { name: v.name, arguments: v.args },
      }));
  }
  if (msg.tool_calls && msg.tool_calls.length > 0 && handlers.onToolUse) {
    for (const tc of msg.tool_calls) {
      let input: Record<string, unknown> = {};
      try { input = JSON.parse(tc.function.arguments || '{}'); } catch { /* ignore */ }
      handlers.onToolUse({ type: 'tool_use', id: tc.id, name: tc.function.name, input });
    }
  }
  return parseOAResponseToClaudeShape(msg, finish);
}

/** fetch wrapper that converts NetworkError (server unreachable) into a
 *  fake `{ ok: false, status: 0 }` so the caller's status-code switch can
 *  surface a friendly message instead of a stack trace. */
async function fetchOrZero(url: string, init: RequestInit): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch (e) {
    // Synthesize a "status 0" response object for the error path.
    const msg = (e as Error).message || 'network error';
    return new Response(msg, { status: 0, statusText: msg });
  }
}
