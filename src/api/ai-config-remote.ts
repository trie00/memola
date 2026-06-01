// env 集約された AI 設定を relay から取得し、起動時にローカル設定へ反映する。
//
// 設計 (外部ベクトル 流: AI 設定は env に集約):
//   - relay が `GET /memola/ai-config` で env の MEMOLA_AI_* / MEMOLA_EMBED_* /
//     MEMOLA_RAG_* を JSON 配信する (api キー類は含まない)。
//   - ブラウザは起動時に 1 度だけこれを取得し、対応する localStorage pref に
//     書き込む。これで各メンバーは「API キーだけ」をブラウザで入力すれば、
//     モデル/デプロイ/埋め込み等は全員 env で統一される。
//   - relay が起動していない / 応答が無い場合は何もしない (既存設定を温存)。
//   - API キー (claude/corp/local/voyage) は一切触らない。

import {
  prefAiProvider, prefAiCorpModel, prefAiCorpBaseUrl, prefAiCorpDeployPrefix,
  prefAiCorpOverrides, prefAiEmbedProvider, prefAiVoyageModel, prefAiEmbedModel,
  prefAiEmbedApiVersion, prefAiEmbedDimensions, prefRagTopK, prefRagMinScore,
} from '../lib/prefs';

interface StrPref { get(): string; set(v: string): void }

// config フィールド名 → 反映先 pref。API キー系は意図的に含めない。
// このリレーは corp 専用。Claude(Anthropic 直叩き)/ローカル LLM はリレーを
// 経由しないため env では扱わず、ここでも対象外 (ブラウザ設定のまま)。
const FIELD_MAP: Array<[string, StrPref]> = [
  ['provider',         prefAiProvider],
  ['corpModel',        prefAiCorpModel],
  ['corpBaseUrl',      prefAiCorpBaseUrl],
  ['corpDeployPrefix', prefAiCorpDeployPrefix],
  ['corpOverrides',    prefAiCorpOverrides],
  ['embedProvider',    prefAiEmbedProvider],
  ['voyageModel',      prefAiVoyageModel],
  ['embedModel',       prefAiEmbedModel],
  ['embedApiVersion',  prefAiEmbedApiVersion],
  ['embedDimensions',  prefAiEmbedDimensions],
  ['ragTopK',          prefRagTopK],
  ['ragMinScore',      prefRagMinScore],
];

/** config を取りに行く relay の origin 候補。既定ポート 18080 を必ず含める。 */
function probeOrigins(): string[] {
  const out: string[] = [];
  const cur = prefAiCorpBaseUrl.get();
  if (cur) { try { out.push(new URL(cur).origin); } catch { /* ignore */ } }
  if (!out.includes('http://localhost:18080')) out.push('http://localhost:18080');
  return out;
}

/** relay から AI 設定を取得して反映。反映できたら true。 */
export async function loadRemoteAiConfig(): Promise<boolean> {
  for (const origin of probeOrigins()) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 1500);
      let res: Response;
      try {
        res = await fetch(origin + '/memola/ai-config', { signal: ctrl.signal });
      } finally { clearTimeout(timer); }
      if (!res.ok) continue;
      const json = await res.json().catch(() => null) as { config?: Record<string, unknown> } | null;
      const cfg = json?.config;
      if (!cfg || typeof cfg !== 'object') continue;
      const applied: string[] = [];
      for (const [field, pref] of FIELD_MAP) {
        const v = cfg[field];
        if (v !== undefined && v !== null && String(v) !== '') {
          pref.set(String(v));
          applied.push(`${field}=${String(v)}`);
        }
      }
      if (applied.length) {
        // eslint-disable-next-line no-console
        console.info(`[memola] AI 設定を relay (${origin}) から ${applied.length} 件反映: ${applied.join(', ')}`);
        return true;
      }
    } catch { /* relay 未起動 → 次の候補へ */ }
  }
  return false;
}
