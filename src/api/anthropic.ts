// Direct browser-side Claude API client. Temporary implementation; production
// use should route through the corporate API gateway to keep API keys server-side.
//
// Supports plain text chat (callClaudeText) and the structured Tool Use API
// (callClaudeRaw) used by the AI agent loop in src/ai/.

const KEY_STORAGE = 'n365.anthropic.apiKey';
const DEFAULT_MODEL = 'claude-sonnet-4-5';

export type TextBlock = { type: 'text'; text: string };
export type ToolUseBlock = { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> };
export type ToolResultBlock = { type: 'tool_result'; tool_use_id: string; content: string; is_error?: boolean };
export type ContentBlock = TextBlock | ToolUseBlock | ToolResultBlock;

export interface ApiMessage {
  role: 'user' | 'assistant';
  content: string | ContentBlock[];
}

export type CacheControl = { type: 'ephemeral' };

export interface ToolDef {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
  /** Place on the *last* tool to mark all preceding tools as cacheable. */
  cache_control?: CacheControl;
}

/** System prompt as a structured array — supports per-block cache_control. */
export type SystemBlock = { type: 'text'; text: string; cache_control?: CacheControl };

export interface ClaudeResponse {
  content: ContentBlock[];
  stop_reason: 'end_turn' | 'tool_use' | 'max_tokens' | 'stop_sequence' | string;
}

export function getApiKey(): string | null {
  return localStorage.getItem(KEY_STORAGE);
}

export function setApiKey(key: string): void {
  if (key) localStorage.setItem(KEY_STORAGE, key);
  else localStorage.removeItem(KEY_STORAGE);
}

export interface StreamHandlers {
  /** Fired whenever a new chunk of assistant text arrives (cumulative is the
   *  full text up to this point of the *current* text block). */
  onText?: (delta: string) => void;
  /** Fired when a tool_use block is fully assembled and ready to execute. */
  onToolUse?: (block: ToolUseBlock) => void;
}

interface CallOpts {
  messages: ApiMessage[];
  /** String for plain prompt, or array of blocks to use cache_control. */
  system?: string | SystemBlock[];
  tools?: ToolDef[];
  model?: string;
  maxTokens?: number;
  /** When set, fetch is aborted if the signal fires. */
  signal?: AbortSignal;
  /** When set, request `stream: true` and call back per delta. */
  stream?: StreamHandlers;
}

/** Low-level call returning the full structured response. Used by the agent loop.
 *  Supports streaming (incremental text deltas) and AbortSignal cancellation. */
export async function callClaudeRaw(opts: CallOpts): Promise<ClaudeResponse> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('APIキーが未設定です');

  const body: Record<string, unknown> = {
    model: opts.model || DEFAULT_MODEL,
    max_tokens: opts.maxTokens || 4096,
    messages: opts.messages,
  };
  if (opts.system) body.system = opts.system;
  if (opts.tools && opts.tools.length > 0) body.tools = opts.tools;
  if (opts.stream) body.stream = true;

  // Retry on 429 (rate limit) with exponential backoff.
  let attempt = 0;
  while (true) {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: opts.signal,
    });

    if (r.ok) {
      if (opts.stream && r.body) return await consumeStream(r.body, opts.stream);
      return (await r.json()) as ClaudeResponse;
    }

    // 429 → respect retry-after header if present, else exponential
    if (r.status === 429 && attempt < 3) {
      const retryAfter = parseFloat(r.headers.get('retry-after') || '0');
      const waitMs = retryAfter > 0 ? retryAfter * 1000 : Math.min(8000, 1000 * Math.pow(2, attempt));
      await new Promise((res) => setTimeout(res, waitMs));
      attempt++;
      continue;
    }

    let detail = '';
    try {
      const j = (await r.json()) as { error?: { message?: string } };
      if (j.error?.message) detail = ' — ' + j.error.message;
    } catch { /* ignore */ }
    throw new Error('Claude API失敗: ' + r.status + detail);
  }
}

/** Parse Anthropic's SSE message stream into a structured ClaudeResponse,
 *  surfacing text deltas to the caller's onText handler in real time. */
async function consumeStream(
  body: ReadableStream<Uint8Array>,
  handlers: StreamHandlers,
): Promise<ClaudeResponse> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  // Index → block under construction
  const blocks: ContentBlock[] = [];
  const partialJson: Record<number, string> = {};
  let stopReason = 'end_turn';

  function flushEvent(name: string, data: string): void {
    if (!data) return;
    let payload: unknown;
    try { payload = JSON.parse(data); } catch { return; }
    const ev = payload as Record<string, unknown>;
    if (name === 'content_block_start') {
      const idx = ev.index as number;
      const cb = ev.content_block as ContentBlock;
      blocks[idx] = cb.type === 'text' ? { type: 'text', text: '' } : { ...cb };
      if (cb.type === 'tool_use') partialJson[idx] = '';
    } else if (name === 'content_block_delta') {
      const idx = ev.index as number;
      const delta = ev.delta as { type: string; text?: string; partial_json?: string };
      const block = blocks[idx];
      if (delta.type === 'text_delta' && block && block.type === 'text') {
        block.text += delta.text || '';
        if (handlers.onText) handlers.onText(delta.text || '');
      } else if (delta.type === 'input_json_delta') {
        partialJson[idx] = (partialJson[idx] || '') + (delta.partial_json || '');
      }
    } else if (name === 'content_block_stop') {
      const idx = ev.index as number;
      const block = blocks[idx];
      if (block && block.type === 'tool_use') {
        try { block.input = partialJson[idx] ? JSON.parse(partialJson[idx]) : {}; }
        catch { block.input = {}; }
        if (handlers.onToolUse) handlers.onToolUse(block);
      }
    } else if (name === 'message_delta') {
      const delta = ev.delta as { stop_reason?: string };
      if (delta?.stop_reason) stopReason = delta.stop_reason;
    }
  }

  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    // SSE: events separated by blank lines; lines are `event: name` / `data: json`
    let nl: number;
    while ((nl = buf.indexOf('\n\n')) >= 0) {
      const chunk = buf.slice(0, nl);
      buf = buf.slice(nl + 2);
      let evName = '';
      let evData = '';
      for (const line of chunk.split('\n')) {
        if (line.startsWith('event:')) evName = line.slice(6).trim();
        else if (line.startsWith('data:')) evData += line.slice(5).trim();
      }
      flushEvent(evName, evData);
    }
  }
  return { content: blocks.filter(Boolean), stop_reason: stopReason };
}

/** Convenience: text-only chat. Returns concatenated assistant text. */
export async function callClaudeText(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  systemPrompt?: string,
  opts: { model?: string; maxTokens?: number } = {},
): Promise<string> {
  const res = await callClaudeRaw({
    messages: messages as ApiMessage[],
    system: systemPrompt,
    model: opts.model,
    maxTokens: opts.maxTokens,
  });
  return res.content
    .filter((b): b is TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n');
}

// Back-compat aliases for the older non-tool callers (ai-block etc.).
export type ChatMessage = { role: 'user' | 'assistant'; content: string };
export const callClaude = callClaudeText;
