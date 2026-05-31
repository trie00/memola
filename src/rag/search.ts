// 横断 RAG 検索の入口。クエリを埋め込み、org + user の両インデックスを検索して
// 上位を統合し、ソース文書へ遷移できる形に整形して返す。

import { appIdForCommentKey } from '../api/pages';
import { getRagTopK, getRagMinScore } from '../api/ai-settings';
import { embedOne, canEmbed } from './embed';
import { orgIndex, userIndex } from './manager';
import type { DbHit } from './store';

export interface RagHit {
  /** 安定文書キー `${listTitle}:${itemId}`。 */
  docKey: string;
  /** このユーザのアプリ内 pageId (遷移用)。解決不能なら ''。 */
  appPageId: string;
  scope: 'org' | 'user';
  title: string;
  heading?: string;
  /** 該当チャンクのスニペット。 */
  snippet: string;
  chunkIdx: number;
  score: number;
}

const KEYWORD_WEIGHT = 0.25; // ハイブリッド検索の文字bigram 重み

/** 両スコープのインデックスを起動 (キャッシュ適用 + org の SP 差分DL)。 */
export async function ragInit(): Promise<void> {
  await Promise.all([orgIndex().init(), userIndex().init()]);
}

/** 現在ベクトル化済みの件数 (文書数 / チャンク数) をスコープ別に返す。 */
export function ragStats(): { org: { docs: number; chunks: number }; user: { docs: number; chunks: number } } {
  return { org: orgIndex().stats(), user: userIndex().stats() };
}

export interface RagRefreshResult {
  org: number; user: number;
  /** org が他者のリース保持中で更新できなかった (= 自分は writer でない)。 */
  orgSkipped: boolean;
  /** 読み込んだソース文書数 (org + user)。0 ならそもそも文書が拾えていない。 */
  docsSeen: number;
  /** スコープ別に読み込んだソース文書数(診断用)。 */
  orgDocs: number; userDocs: number;
  /** 失敗した場合のエラーメッセージ (握りつぶさず UI へ surface する)。 */
  errors: string[];
}
export type RagProgress = (p: { scope: 'org' | 'user'; done: number; total: number }) => void;

/** writer だけが差分を取り込む (org=リース保持者 / user=本人)。
 *  org→user の順で直列実行 (Voyage のレート制限と進捗表示を分かりやすく)。 */
export async function ragRefresh(signal?: AbortSignal, onProgress?: RagProgress): Promise<RagRefreshResult> {
  const errors: string[] = [];
  const org = await orgIndex().refresh(signal, (d, t) => onProgress?.({ scope: 'org', done: d, total: t }))
    .catch((e) => { const m = (e as Error).message; console.warn('[rag] org refresh:', m); errors.push('組織: ' + m); return { changed: 0, skipped: undefined as string | undefined, docs: 0 }; });
  const user = await userIndex().refresh(signal, (d, t) => onProgress?.({ scope: 'user', done: d, total: t }))
    .catch((e) => { const m = (e as Error).message; console.warn('[rag] user refresh:', m); errors.push('個人: ' + m); return { changed: 0, docs: 0 }; });
  const orgDocs = (org as { docs?: number }).docs ?? 0;
  const userDocs = (user as { docs?: number }).docs ?? 0;
  return {
    org: org.changed, user: user.changed,
    orgSkipped: (org as { skipped?: string }).skipped === 'not-writer',
    docsSeen: orgDocs + userDocs, orgDocs, userDocs,
    errors,
  };
}

/** 横断検索。topK / minScore は AI 設定から (引数で上書き可)。 */
export async function ragSearch(
  query: string,
  opts: { topK?: number; minScore?: number; signal?: AbortSignal } = {},
): Promise<RagHit[]> {
  if (!query.trim()) return [];
  if (!canEmbed()) throw new Error('RAG 未設定: AI 設定で OpenAI 互換 / ローカル AI を選んでください');
  await ragInit();
  const topK = opts.topK ?? getRagTopK();
  const minScore = opts.minScore ?? getRagMinScore();
  const qvec = await embedOne(query, opts.signal);

  // 各スコープで topK*2 取って統合 → 上位 topK。
  const raw: DbHit[] = [
    ...orgIndex().search(qvec, topK * 2, query, KEYWORD_WEIGHT),
    ...userIndex().search(qvec, topK * 2, query, KEYWORD_WEIGHT),
  ];
  raw.sort((a, b) => b.score - a.score);

  const hits: RagHit[] = [];
  for (const h of raw) {
    if (h.score < minScore) continue;
    hits.push({
      docKey: h.record.docKey,
      appPageId: appIdForCommentKey(h.record.docKey),
      scope: h.record.scope,
      title: h.record.title,
      heading: h.record.heading,
      snippet: h.record.text.slice(0, 280),
      chunkIdx: h.record.chunkIdx,
      score: h.score,
    });
    if (hits.length >= topK) break;
  }
  return hits;
}
