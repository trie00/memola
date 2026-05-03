// AI provider / model selection state.
//
// Memola supports three AI back-ends:
//   - Anthropic Claude API (default; full Tool Use agent)
//   - Azure OpenAI 互換 API (Azure OpenAI Service / 社内 API ゲートウェイ
//     等。Function Calling 経由で Tool Use もサポート)
//   - ローカル AI (OpenAI ネイティブ形式: Ollama / LM Studio / llama.cpp
//     server / vLLM / その他 OpenAI Chat Completions 互換のもの)
//
// User picks the provider + model from the settings modal. Choices persist
// in localStorage; everything is keyed off `getProvider()` / `getModel()`.
// Each provider stores its own API key separately so switching back and
// forth doesn't lose either.
//
// Azure OpenAI 互換 API はインスタンスごとに base URL や deployment ID
// 命名規則が異なるため、全て localStorage の設定で可変化している (コード
// に固有名詞・固有ホストは持たない)。

export type Provider = 'claude' | 'corp' | 'local';

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

// All AI prefs live in lib/prefs.ts — this file adds the per-pref
// validation / defaults that the raw accessors don't enforce.

import {
  prefAiProvider, prefAiClaudeModel, prefAiClaudeKey,
  prefAiCorpModel, prefAiCorpKey, prefAiCorpBaseUrl,
  prefAiCorpDeployPrefix, prefAiCorpOverrides,
  prefAiLocalBaseUrl, prefAiLocalKey, prefAiLocalModel, prefAiLocalModels,
  prefAiLocalReasoningModels,
} from '../lib/prefs';

const DEFAULT_PROVIDER: Provider = 'claude';
const DEFAULT_CLAUDE_MODEL = 'claude-sonnet-4-5';
const DEFAULT_CORP_MODEL = 'gpt-4.1-mini';

export function getProvider(): Provider {
  const v = prefAiProvider.get();
  if (v === 'corp' || v === 'local') return v;
  return DEFAULT_PROVIDER;
}
export function setProvider(p: Provider): void {
  prefAiProvider.set(p);
}

export function getClaudeModel(): string {
  return prefAiClaudeModel.get() || DEFAULT_CLAUDE_MODEL;
}
export function setClaudeModel(model: string): void {
  prefAiClaudeModel.set(model);
}

/** Anthropic API key. Single source of truth — `api/anthropic.ts`'s
 *  `getApiKey` / `setApiKey` are thin re-exports. */
export function getClaudeApiKey(): string {
  return prefAiClaudeKey.get();
}
export function setClaudeApiKey(key: string): void {
  prefAiClaudeKey.set(key.trim());
}

export function getCorpAiModel(): string {
  const stored = prefAiCorpModel.get();
  if (stored && CORP_AI_MODELS.some((m) => m.id === stored)) return stored;
  return DEFAULT_CORP_MODEL;
}
export function setCorpAiModel(model: string): void {
  prefAiCorpModel.set(model);
}

export function getCorpAiKey(): string {
  return prefAiCorpKey.get();
}
export function setCorpAiKey(key: string): void {
  prefAiCorpKey.set(key);
}

/** Base URL of the corporate AI gateway, up to (and including) the path
 *  prefix that precedes the api-version segment. Example shape:
 *      https://gateway.example.com/myapi
 *  The full chat-completions URL is built as:
 *      {baseUrl}/{api-version}/openai/deployments/{deployment-id}
 *        /chat/completions?api-version={api-version}
 *  Empty when not yet configured — request helpers throw a clear error. */
export function getCorpAiBaseUrl(): string {
  return prefAiCorpBaseUrl.get().replace(/\/$/, '');
}
export function setCorpAiBaseUrl(url: string): void {
  prefAiCorpBaseUrl.set(url.trim());
}

/** Prefix used to build the deployment id for each model. Many gateways
 *  follow a `<prefix><modelname>` pattern (with `.` removed from the model
 *  name, e.g. `gpt-4.1` → `gpt-41`). */
export function getCorpAiDeploymentPrefix(): string {
  return prefAiCorpDeployPrefix.get();
}
export function setCorpAiDeploymentPrefix(prefix: string): void {
  prefAiCorpDeployPrefix.set(prefix.trim());
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
  return prefAiCorpOverrides.get();
}

export function setCorpAiOverridesRaw(json: string): void {
  prefAiCorpOverrides.set(json.trim());
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
  const p = getProvider();
  if (p === 'corp') return getCorpAiModel();
  if (p === 'local') return getLocalAiModel();
  return getClaudeModel();
}

/** Look up the deployment metadata for a corporate-AI model id. */
export function findCorpAiModel(modelId: string): CorpAiModel | null {
  return CORP_AI_MODELS.find((m) => m.id === modelId) || null;
}

// ─── Local AI (OpenAI ネイティブ形式 — Ollama / LM Studio / llama.cpp …) ─

/** Base URL of the local OpenAI-compatible server.
 *  Examples:
 *    - Ollama:    http://localhost:11434/v1
 *    - LM Studio: http://localhost:1234/v1
 *    - llama.cpp: http://localhost:8080/v1
 *  The full chat URL is built as `{baseUrl}/chat/completions`. */
export function getLocalAiBaseUrl(): string {
  return prefAiLocalBaseUrl.get().replace(/\/$/, '');
}
export function setLocalAiBaseUrl(url: string): void {
  prefAiLocalBaseUrl.set(url.trim());
}

/** API key for the local server. Most local LLMs accept any string (or
 *  none); kept here for OpenAI-proxy setups that DO require a key. */
export function getLocalAiKey(): string {
  return prefAiLocalKey.get();
}
export function setLocalAiKey(key: string): void {
  prefAiLocalKey.set(key.trim());
}

/** Currently-selected local model name (free text). */
export function getLocalAiModel(): string {
  return prefAiLocalModel.get();
}
export function setLocalAiModel(model: string): void {
  prefAiLocalModel.set(model.trim());
}

/** User-defined list of local model names that should appear in the
 *  picker. One per line in the settings UI; persisted as JSON. */
export function getLocalAiModels(): string[] {
  const raw = prefAiLocalModels.get();
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr.filter((s) => typeof s === 'string' && s.trim());
  } catch { /* ignore */ }
  return [];
}
export function setLocalAiModels(models: string[]): void {
  prefAiLocalModels.set(JSON.stringify(models.filter((s) => s.trim())));
}

/** Names (lowercased) of local models that should be treated as
 *  reasoning models — they need `max_completion_tokens` instead of
 *  `max_tokens`. Most local models DON'T need this; opt-in via settings. */
export function getLocalAiReasoningModels(): string[] {
  const raw = prefAiLocalReasoningModels.get();
  if (!raw) return [];
  return raw.split(/[\s,]+/).map((s) => s.trim().toLowerCase()).filter(Boolean);
}
export function setLocalAiReasoningModels(csv: string): void {
  prefAiLocalReasoningModels.set(csv.trim());
}

/** Heuristic: does the named local model want `max_completion_tokens`? */
export function isLocalReasoningModel(modelId: string): boolean {
  const lc = modelId.toLowerCase();
  return getLocalAiReasoningModels().some((r) => lc.includes(r));
}
