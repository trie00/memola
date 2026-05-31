// 埋め込みクライアント。#4 で追加した resolveEmbeddingEndpoint() を使い、
// チャットと同じ provider の OpenAI 互換エンドポイントへ投げる。
//   corp  : Azure 形式 deployments/embeddings (api-key ヘッダ)
//   local : /embeddings (Authorization: Bearer)
// 429 / 5xx は指数バックオフで自動リトライ。Retry-After / 本文ヒントを尊重。

import { resolveEmbeddingEndpoint } from '../api/ai-settings';

function inferRetryDelayMs(res: Response, bodyText: string, attempt: number): number {
  const ra = res.headers.get('Retry-After');
  if (ra) {
    const n = Number(ra);
    if (!isNaN(n) && n >= 0) return Math.min(n * 1000, 120_000);
    const d = Date.parse(ra);
    if (!isNaN(d)) return Math.max(0, Math.min(d - Date.now(), 120_000));
  }
  const m = bodyText.match(/(?:try again in|retry (?:after|in))\s+(\d+)\s*(?:s|sec|seconds)?/i);
  if (m) return Math.min(Number(m[1]) * 1000, 120_000);
  return Math.min(2000 * Math.pow(2, attempt), 30_000);
}

async function sleepRespectingAbort(ms: number, signal?: AbortSignal): Promise<void> {
  if (ms <= 0) return;
  if (signal?.aborted) throw new DOMException('aborted', 'AbortError');
  await new Promise<void>((resolve, reject) => {
    const t = setTimeout(() => { signal?.removeEventListener('abort', onAbort); resolve(); }, ms);
    const onAbort = (): void => { clearTimeout(t); reject(new DOMException('aborted', 'AbortError')); };
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

/** RAG が設定的に利用可能か (= 埋め込みエンドポイントが解決できるか)。 */
export function canEmbed(): boolean { return resolveEmbeddingEndpoint() !== null; }

/** 複数テキストをまとめて埋め込み、Float32Array[] を返す。入出力順は data[].index で対応。 */
export async function embedTexts(texts: string[], signal?: AbortSignal, maxRetries = 5): Promise<Float32Array[]> {
  if (texts.length === 0) return [];
  const ep = resolveEmbeddingEndpoint();
  if (!ep) throw new Error('埋め込み未設定: AI 設定で Azure OpenAI 互換 または ローカル AI を選んでください');

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (ep.authStyle === 'azure') {
    if (ep.apiKey) headers['api-key'] = ep.apiKey;
  } else {
    if (ep.apiKey) headers['Authorization'] = ep.apiKey.startsWith('Bearer ') ? ep.apiKey : `Bearer ${ep.apiKey}`;
  }
  const bodyObj: Record<string, unknown> = { input: texts, model: ep.model };
  if (ep.dimensions) bodyObj.dimensions = ep.dimensions;
  const body = JSON.stringify(bodyObj);

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (signal?.aborted) throw new DOMException('aborted', 'AbortError');
    const res = await fetch(ep.url, { method: 'POST', headers, credentials: 'omit', signal, body });
    if (res.ok) {
      const json = (await res.json()) as { data: { index: number; embedding: number[] }[] };
      const out: Float32Array[] = new Array(texts.length);
      for (const d of json.data) out[d.index] = Float32Array.from(d.embedding);
      return out;
    }
    const errBody = await res.text().catch(() => '');
    const retriable = res.status === 429 || (res.status >= 500 && res.status < 600);
    if (!retriable || attempt === maxRetries) {
      throw new Error(`embed failed: HTTP ${res.status} ${errBody.slice(0, 300)}`);
    }
    const waitMs = inferRetryDelayMs(res, errBody, attempt);
    console.warn(`[rag/embed] HTTP ${res.status}; retry in ${Math.round(waitMs / 1000)}s (${attempt + 1}/${maxRetries})`);
    await sleepRespectingAbort(waitMs, signal);
  }
  throw new Error('embed failed: max retries exceeded');
}

/** 1 件だけ埋め込む簡易版 (クエリ用)。 */
export async function embedOne(text: string, signal?: AbortSignal): Promise<Float32Array> {
  const [v] = await embedTexts([text], signal);
  return v;
}
