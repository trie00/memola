// AI provider / model selection state.
//
// n365 supports two AI back-ends:
//   - Anthropic Claude API (default; full Tool Use agent)
//   - 企業AI API (Azure OpenAI 互換ゲートウェイ。Function Calling 経由で
//     Tool Use もサポート)
//
// User picks the provider + model from the settings modal. Choices persist
// in localStorage; everything is keyed off `getProvider()` / `getModel()`.
// Each provider stores its own API key separately so switching back and
// forth doesn't lose either.
//
// 企業AI API は組織ごとに base URL や deployment ID 命名規則が異なるため、
// すべて localStorage の設定で可変化している（コードに固有名詞は持たない）。

export type Provider = 'claude' | 'corp';

export interface CorpAiModel {
  /** Canonical OpenAI model id (e.g. 'gpt-4.1-mini'). */
  id: string;
  /** True when this is a "reasoning" model that requires
   *  `max_completion_tokens` in place of `max_tokens` and the
   *  `2024-12-01-preview` (or newer) api-version. */
  reasoning: boolean;
  /** True when the deployment accepts vision (image_url) inputs. */
  vision: boolean;
}

/** Catalog of widely-deployed OpenAI model ids. The deployment-side name
 *  is computed at request time from the user-configurable prefix. */
export const CORP_AI_MODELS: CorpAiModel[] = [
  { id: 'gpt-5',           reasoning: true,  vision: true },
  { id: 'gpt-5-mini',      reasoning: true,  vision: true },
  { id: 'gpt-5-nano',      reasoning: true,  vision: true },
  { id: 'o3',              reasoning: true,  vision: true },
  { id: 'o4-mini',         reasoning: true,  vision: true },
  { id: 'gpt-4.1',         reasoning: false, vision: true },
  { id: 'gpt-4.1-mini',    reasoning: false, vision: true },
  { id: 'gpt-4.1-nano',    reasoning: false, vision: true },
  { id: 'gpt-4o',          reasoning: false, vision: true },
  { id: 'gpt-4o-mini',     reasoning: false, vision: true },
];

/** Catalog of Claude models the AI panel exposes. Kept in sync with the
 *  current Anthropic public lineup; default is the most capable Sonnet. */
export const CLAUDE_MODELS: Array<{ id: string; label: string }> = [
  { id: 'claude-opus-4-5',          label: 'Claude Opus 4.5' },
  { id: 'claude-sonnet-4-5',        label: 'Claude Sonnet 4.5' },
  { id: 'claude-haiku-4-5',         label: 'Claude Haiku 4.5' },
];

const KEY_PROVIDER         = 'n365.ai.provider';
const KEY_CLAUDE_MODEL     = 'n365.ai.claudeModel';
const KEY_CORP_MODEL       = 'n365.ai.corpModel';
const KEY_CORP_APIKEY      = 'n365.ai.corpKey';
const KEY_CORP_BASE_URL    = 'n365.ai.corpBaseUrl';
const KEY_CORP_DEPLOY_PREF = 'n365.ai.corpDeployPrefix';
const KEY_CORP_OVERRIDES   = 'n365.ai.corpOverrides';

const DEFAULT_PROVIDER: Provider = 'claude';
const DEFAULT_CLAUDE_MODEL = 'claude-sonnet-4-5';
const DEFAULT_CORP_MODEL = 'gpt-4.1-mini';

function readLS(key: string): string {
  try { return localStorage.getItem(key) || ''; } catch { return ''; }
}
function writeLS(key: string, value: string): void {
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch { /* ignore */ }
}

export function getProvider(): Provider {
  const v = readLS(KEY_PROVIDER);
  return v === 'corp' ? 'corp' : DEFAULT_PROVIDER;
}
export function setProvider(p: Provider): void {
  writeLS(KEY_PROVIDER, p);
}

export function getClaudeModel(): string {
  return readLS(KEY_CLAUDE_MODEL) || DEFAULT_CLAUDE_MODEL;
}
export function setClaudeModel(model: string): void {
  writeLS(KEY_CLAUDE_MODEL, model);
}

export function getCorpAiModel(): string {
  const stored = readLS(KEY_CORP_MODEL);
  if (stored && CORP_AI_MODELS.some((m) => m.id === stored)) return stored;
  return DEFAULT_CORP_MODEL;
}
export function setCorpAiModel(model: string): void {
  writeLS(KEY_CORP_MODEL, model);
}

export function getCorpAiKey(): string {
  return readLS(KEY_CORP_APIKEY);
}
export function setCorpAiKey(key: string): void {
  writeLS(KEY_CORP_APIKEY, key);
}

/** Base URL of the corporate AI gateway, up to (and including) the path
 *  prefix that precedes the api-version segment. Example shape:
 *      https://gateway.example.com/myapi
 *  The full chat-completions URL is built as:
 *      {baseUrl}/{api-version}/openai/deployments/{deployment-id}
 *        /chat/completions?api-version={api-version}
 *  Empty when not yet configured — request helpers throw a clear error. */
export function getCorpAiBaseUrl(): string {
  return readLS(KEY_CORP_BASE_URL).replace(/\/$/, '');
}
export function setCorpAiBaseUrl(url: string): void {
  writeLS(KEY_CORP_BASE_URL, url.trim());
}

/** Prefix used to build the deployment id for each model. Many gateways
 *  follow a `<prefix><modelname>` pattern (with `.` removed from the model
 *  name, e.g. `gpt-4.1` → `gpt-41`). */
export function getCorpAiDeploymentPrefix(): string {
  return readLS(KEY_CORP_DEPLOY_PREF);
}
export function setCorpAiDeploymentPrefix(prefix: string): void {
  writeLS(KEY_CORP_DEPLOY_PREF, prefix.trim());
}

/** Compute the deployment id for a given model id by combining the
 *  user-configured prefix with the model name (dots stripped to match the
 *  conventional naming rule used by Azure OpenAI deployments). */
export function deploymentIdFor(modelId: string): string {
  const prefix = getCorpAiDeploymentPrefix();
  const tail = modelId.replace(/\./g, '');
  return prefix + tail;
}

// ─── Per-model overrides ──────────────────────────────────────────────────
//
// Some gateways host different model families on different endpoints (e.g.
// GPT-5 系 may be served by a separate host or require a different
// api-version than gpt-4.1 系). Users can paste a small JSON map into the
// settings to override `baseUrl` / `apiVersion` / `deploymentId` per model.
//
//   {
//     "gpt-5": {
//       "baseUrl": "https://other-gateway.example.com/customapi",
//       "apiVersion": "2025-01-01-preview"
//     },
//     "gpt-5-mini": { "apiVersion": "2025-01-01-preview" }
//   }
//
// Any field omitted falls back to the corresponding global setting.

export interface CorpAiOverride {
  baseUrl?: string;
  apiVersion?: string;
  deploymentId?: string;
}

export function getCorpAiOverridesRaw(): string {
  return readLS(KEY_CORP_OVERRIDES);
}

export function setCorpAiOverridesRaw(json: string): void {
  writeLS(KEY_CORP_OVERRIDES, json.trim());
}

/** Parse the JSON overrides safely. Invalid JSON returns an empty map so
 *  the rest of the app keeps working with the global defaults. */
export function getCorpAiOverrides(): Record<string, CorpAiOverride> {
  const raw = getCorpAiOverridesRaw();
  if (!raw) return {};
  try {
    const obj = JSON.parse(raw);
    if (obj && typeof obj === 'object') return obj as Record<string, CorpAiOverride>;
  } catch { /* ignore */ }
  return {};
}

/** Resolve the effective endpoint config for a model — applies any
 *  user-supplied override on top of the global defaults. */
export function resolveCorpAiEndpoint(modelId: string): {
  baseUrl: string;
  apiVersion: string;
  deploymentId: string;
} {
  const m = findCorpAiModel(modelId);
  const defaultApiVersion = m?.reasoning ? '2024-12-01-preview' : '2024-06-01';
  const ov = getCorpAiOverrides()[modelId] || {};
  return {
    baseUrl: (ov.baseUrl || getCorpAiBaseUrl() || '').replace(/\/$/, ''),
    apiVersion: ov.apiVersion || defaultApiVersion,
    deploymentId: ov.deploymentId || deploymentIdFor(modelId),
  };
}

/** The model id currently in effect for the active provider. */
export function getActiveModel(): string {
  return getProvider() === 'corp' ? getCorpAiModel() : getClaudeModel();
}

/** Look up the deployment metadata for a corporate-AI model id. */
export function findCorpAiModel(modelId: string): CorpAiModel | null {
  return CORP_AI_MODELS.find((m) => m.id === modelId) || null;
}
