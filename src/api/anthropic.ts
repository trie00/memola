// Direct browser-side Claude API client. Temporary implementation; production
// use should route through the corporate API gateway to keep API keys server-side.

const KEY_STORAGE = 'n365.anthropic.apiKey';
const DEFAULT_MODEL = 'claude-sonnet-4-6';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AnthropicResponse {
  content: Array<{ type: string; text: string }>;
  stop_reason: string;
}

export function getApiKey(): string | null {
  return localStorage.getItem(KEY_STORAGE);
}

export function setApiKey(key: string): void {
  if (key) localStorage.setItem(KEY_STORAGE, key);
  else localStorage.removeItem(KEY_STORAGE);
}

export async function callClaude(
  messages: ChatMessage[],
  systemPrompt?: string,
  opts: { model?: string; maxTokens?: number } = {},
): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('APIキーが未設定です');

  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: opts.model || DEFAULT_MODEL,
      max_tokens: opts.maxTokens || 2048,
      ...(systemPrompt ? { system: systemPrompt } : {}),
      messages,
    }),
  });

  if (!r.ok) {
    let detail = '';
    try {
      const j = await r.json() as { error?: { message?: string } };
      if (j.error?.message) detail = ' — ' + j.error.message;
    } catch { /* ignore */ }
    throw new Error('Claude API失敗: ' + r.status + detail);
  }

  const json = (await r.json()) as AnthropicResponse;
  const text = json.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n');
  return text;
}
