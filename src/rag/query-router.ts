// ユーザの質問を LLM が解析し、検索戦略 (ベクトル文 / 必須キーワード) を返す。
// 外部ベクトル の src/rag/queryRouter.ts を memola のプロバイダ層へ移植。
// 例: 「申請番号 APP-2026-1234 の承認状況は?」
//   → vectorQuery: "申請の承認状況", keywords: ["APP-2026-1234"]
// ID/固有名詞のような distinctive な文字列は完全一致で必須にしつつ、意味の文脈は
// ベクトル検索に任せて両者の良いとこ取り。さらに直前会話を踏まえてフォローアップ
// 質問(指示語・省略)を standalone な vectorQuery に再構築する。

import { getProvider, getClaudeModel, getCorpAiModel, getLocalAiModel } from '../api/ai-settings';

export interface QueryPlan {
  /** ベクトル検索に使う再構成済みクエリ。元の質問でも可。 */
  vectorQuery: string;
  /** これらをすべて (大文字小文字無視で) 含むレコードに絞る。空なら絞らない。 */
  keywords: string[];
  /** 検索の性格 (UI 表示/ログ用)。 */
  mode: 'keyword' | 'semantic' | 'mixed';
}

export interface RouterHistoryMsg { role: 'user' | 'assistant'; content: string }

const ROUTER_SYSTEM = [
  'あなたは社内ドキュメント RAG 検索のクエリルータです。ユーザの質問を解析し、',
  '次の JSON を 1 行で返してください (それ以外の出力は禁止):',
  '',
  '{"mode":"keyword|semantic|mixed","vectorQuery":"<意味検索用のクエリ>","keywords":["<必須完全一致>", ...]}',
  '',
  'ルール:',
  '- keywords には「チケットID / プロジェクトコード / 製品名 / 固有名詞 / 型番 / 日付指定」等の',
  '  必ず含まれるべき文字列だけを入れる (2 文字以上、最大 4 個まで)。',
  '- 数字単体 (例: "2026" "100") やよくある単語 (例: "メモ" "件" "について" "とは") は keywords に入れない。',
  '- vectorQuery には質問の「意味的な主題」を 1 文で表す。元の文がそのまま使えるならそれでよい。',
  '  ID/固有名詞は keywords 側に出すので vectorQuery には含めなくてもよい。',
  '- 純粋に ID/コード/固有名詞だけで探す質問 → mode="keyword"。意味で探す → "semantic"。両方混在 → "mixed"。',
  '',
  '★ フォローアップ質問 (直前会話を踏まえた省略表現) の解決 ★',
  '- 「直前の会話」が与えられた場合、質問に含まれる指示語 (それ/あれ/この/上記 等) や、',
  '  「要約して」「もっと詳しく」「続きは?」のような前提が省略された質問は、',
  '  直前会話から主題を補って vectorQuery を組み立てること。',
  '  例: 直前 user="BERT とは?" / 今回 user="その欠点は?"',
  '      → vectorQuery="BERT の欠点", keywords=["BERT"]',
  '- 直前会話と無関係な新規質問の場合は、履歴を無視してその質問だけを解析する。',
  '',
  '- 出力は厳密に有効な JSON。前後に説明文や ``` 等の装飾は付けない。',
].join('\n');

const FALLBACK = (q: string): QueryPlan => ({ vectorQuery: q, keywords: [], mode: 'semantic' });

function parsePlan(text: string): QueryPlan | null {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    const obj = JSON.parse(m[0]) as Partial<QueryPlan>;
    const vectorQuery = typeof obj.vectorQuery === 'string' ? obj.vectorQuery.trim() : '';
    const keywords = Array.isArray(obj.keywords)
      ? obj.keywords.filter((k): k is string => typeof k === 'string' && k.trim().length >= 2).map((k) => k.trim()).slice(0, 4)
      : [];
    const mode = obj.mode === 'keyword' || obj.mode === 'mixed' || obj.mode === 'semantic'
      ? obj.mode : (keywords.length > 0 ? 'mixed' : 'semantic');
    if (!vectorQuery && keywords.length === 0) return null;
    return { vectorQuery: vectorQuery || keywords.join(' '), keywords, mode };
  } catch { return null; }
}

/** 直近会話を ROUTER 用に短く整形 (直近 4 メッセージ。assistant は冒頭 300 字)。 */
function formatHistory(history?: RouterHistoryMsg[]): string {
  if (!history || history.length === 0) return '';
  return history.slice(-4).map((mm) => {
    const tag = mm.role === 'user' ? 'ユーザ' : 'アシスタント';
    const max = mm.role === 'assistant' ? 300 : 500;
    const c = mm.content.length > max ? mm.content.slice(0, max) + '…' : mm.content;
    return `${tag}: ${c}`;
  }).join('\n');
}

/** tools 無しで provider にチャット要求し、本文テキストを返す (非ストリーム)。 */
async function routerComplete(system: string, userPrompt: string, signal?: AbortSignal): Promise<string> {
  const provider = getProvider();
  const common = { messages: [{ role: 'user' as const, content: userPrompt }], system, tools: [], signal };
  let res;
  if (provider === 'corp') {
    const { corpAiChatRaw } = await import('../api/openai-corp');
    res = await corpAiChatRaw({ ...common, model: getCorpAiModel() });
  } else if (provider === 'local') {
    const { localAiChatRaw } = await import('../api/openai-local');
    res = await localAiChatRaw({ ...common, model: getLocalAiModel() });
  } else {
    const { callClaudeRaw } = await import('../api/anthropic');
    res = await callClaudeRaw({ ...common, model: getClaudeModel() });
  }
  return res.content.filter((b) => b.type === 'text').map((b) => (b as { text: string }).text).join('');
}

/** 質問を LLM に投げて検索プランを得る。失敗時は安全なフォールバック (元クエリ)。
 *  history を渡すとフォローアップ質問の指示語・省略を解決した vectorQuery を組む。 */
export async function classifyQuery(
  question: string,
  history?: RouterHistoryMsg[],
  signal?: AbortSignal,
): Promise<QueryPlan> {
  const q = question.trim();
  if (!q) return FALLBACK(q);
  const histBlock = formatHistory(history);
  const userPrompt = histBlock
    ? `直前の会話 (古い順):\n${histBlock}\n\n---\n\n今回の質問:\n${q}`
    : `質問:\n${q}`;
  try {
    const text = await routerComplete(ROUTER_SYSTEM, userPrompt, signal);
    return parsePlan(text) ?? FALLBACK(q);
  } catch {
    return FALLBACK(q);
  }
}
