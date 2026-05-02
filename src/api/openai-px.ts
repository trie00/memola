// 企業AI client — Panasonic 委託先で利用可能な Azure OpenAI ゲートウェイ。
//
// ベース URL は /corpapi/{api-version}/openai/deployments/{deployment-id}/...
// 認証は `api-key: <key>` ヘッダ。Claude API と違って Tool Use は本実装では
// 未対応 (chat completions only)。
//
// ストリーミングは SSE (data: {...}\n\n) で OpenAI 互換。

import {
  findCorpAiModel, getCorpAiKey, getCorpAiModel,
} from './ai-settings';

const BASE_HOST = 'https://pisc-newsol-openai-uat-mgd.azure-api.net/corpapi';

/** OpenAI message shape — superset of what we send. Only role + content for
 *  the basic chat path. The SDK uses `image_url` parts for vision but n365's
 *  in-app chat is text-only at the moment. */
export interface OAMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface PxChatHandlers {
  /** Cumulative-text delta — fired per text chunk during streaming. */
  onText?: (delta: string) => void;
}

export interface PxChatOpts {
  messages: OAMessage[];
  /** Falls back to current setting when omitted. */
  model?: string;
  /** Caps the output. Mapped to `max_completion_tokens` automatically for
   *  reasoning models (GPT-5系 / o3 / o4-mini). */
  maxTokens?: number;
  signal?: AbortSignal;
  stream?: PxChatHandlers;
}

/** Choose the api-version a given model requires. Reasoning models (GPT-5
 *  series, o3, o4-mini) need the preview version per the spec deck. */
function apiVersionFor(modelId: string): string {
  const m = findCorpAiModel(modelId);
  return m?.reasoning ? '2024-12-01-preview' : '2024-06-01';
}

/** Construct the chat completions endpoint URL. */
function chatUrlFor(modelId: string): string {
  const m = findCorpAiModel(modelId);
  if (!m) throw new Error('未知のモデル: ' + modelId);
  const apiVersion = apiVersionFor(modelId);
  return BASE_HOST + '/' + apiVersion +
    '/openai/deployments/' + m.deploymentId + '/chat/completions?api-version=' + apiVersion;
}

/** Plain (non-streaming) chat completion. Returns the assistant's reply. */
export async function corpaiChatText(opts: PxChatOpts): Promise<string> {
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
    throw new Error(formatPxError(r.status, txt));
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
    throw new Error(formatPxError(r.status, txt));
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

/** Map the SP-side status codes to friendlier Japanese messages — the spec
 *  deck enumerates these. Falls through to the raw response text otherwise. */
function formatPxError(status: number, body: string): string {
  const sliced = body ? ' — ' + body.slice(0, 240) : '';
  if (status === 401) return '企業AI 失敗: 401 サブスクリプションキーが無効/未指定' + sliced;
  if (status === 403) return '企業AI 失敗: 403 接続元 IP が許可されていません (WARP 未接続?)' + sliced;
  if (status === 429) return '企業AI 失敗: 429 トークン上限超過 (1分後に再試行)' + sliced;
  if (status === 400) return '企業AI 失敗: 400 リクエスト不正 (モデル/JSON を確認)' + sliced;
  return '企業AI 失敗: ' + status + sliced;
}
