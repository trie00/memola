// 横断 RAG 検索の入口。クエリを埋め込み、org + user の両インデックスを検索して
// 上位を統合し、ソース文書へ遷移できる形に整形して返す。

import { appIdForCommentKey } from '../api/pages';
import { getRagTopK, getRagMinScore } from '../api/ai-settings';
import { embedOne, canEmbed } from './embed';
import { orgIndex, userIndex } from './manager';
import { classifyQuery, type RouterHistoryMsg } from './query-router';
import type { DbHit } from './store';
import { load外部ベクトルIndex, extvecSearch, extvecStats, EXTVEC_KINDS, type 外部ベクトルKind } from './extvec-scope';
import { prefRag外部ベクトルKinds } from '../lib/prefs';

export interface RagHit {
  /** 安定文書キー `${listTitle}:${itemId}` (extvec は `extvec:<messageId>`)。 */
  docKey: string;
  /** このユーザのアプリ内 pageId (遷移用)。解決不能 / extvec なら ''。 */
  appPageId: string;
  scope: 'org' | 'user' | 'extvec';
  title: string;
  heading?: string;
  /** 該当チャンクのスニペット。 */
  snippet: string;
  chunkIdx: number;
  score: number;
  // ── 外部ベクトル 由来 (scope==='extvec') の出典メタ ──
  kind?: 外部ベクトルKind;
  from?: string;
  date?: string;
  imid?: string;
  /** 外部ベクトル はセグメントに本文を持つので、回答生成にはこちらを使う(snippet は表示用)。 */
  body?: string;
}

/** 横断検索で含める 外部ベクトル の kind(設定 CSV)。 */
function enabled外部ベクトルKinds(): Set<外部ベクトルKind> {
  const raw = prefRag外部ベクトルKinds.get().split(',').map((s) => s.trim()).filter(Boolean);
  const set = new Set<外部ベクトルKind>(raw.filter((k): k is 外部ベクトルKind => (EXTVEC_KINDS as string[]).includes(k)));
  return set;
}

const KEYWORD_WEIGHT = 0.25; // ハイブリッド検索の文字bigram 重み

/** 両スコープのインデックスを起動 (キャッシュ適用 + org の SP 差分DL)。 */
export async function ragInit(): Promise<void> {
  await Promise.all([orgIndex().init(), userIndex().init(), load外部ベクトルIndex().catch(() => 0)]);
}

/** 現在ベクトル化済みの件数 (文書数 / チャンク数) をスコープ別に返す。 */
export function ragStats(): { org: { docs: number; chunks: number }; user: { docs: number; chunks: number }; extvec: { docs: number; enabled: boolean } } {
  const t = extvecStats();
  return { org: orgIndex().stats(), user: userIndex().stats(), extvec: { docs: t.total, enabled: t.enabled } };
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

/** 横断検索。topK / minScore は AI 設定から (引数で上書き可)。
 *  history を渡すと、まず queryRouter でフォローアップ質問を standalone な
 *  vectorQuery に再構築し、必須キーワードを抽出してハイブリッド検索する
 *  (外部ベクトル と同じ流れ)。 */
export async function ragSearch(
  query: string,
  opts: { topK?: number; minScore?: number; signal?: AbortSignal; history?: RouterHistoryMsg[] } = {},
): Promise<RagHit[]> {
  if (!query.trim()) return [];
  if (!canEmbed()) throw new Error('RAG 未設定: AI 設定で OpenAI 互換 / ローカル AI を選んでください');
  await ragInit();
  const topK = opts.topK ?? getRagTopK();
  const minScore = opts.minScore ?? getRagMinScore();

  // ① クエリルータ: 会話を踏まえて vectorQuery を再構築 + 必須キーワード抽出。
  const plan = await classifyQuery(query, opts.history, opts.signal);
  const searchText = plan.vectorQuery || query;
  // ② vectorQuery を埋め込み、bigram テキスト + 必須キーワードでハイブリッド検索。
  const qvec = await embedOne(searchText, opts.signal);
  const raw: DbHit[] = [
    ...orgIndex().search(qvec, topK * 2, searchText, KEYWORD_WEIGHT, plan.keywords),
    ...userIndex().search(qvec, topK * 2, searchText, KEYWORD_WEIGHT, plan.keywords),
  ];

  // memola(org/user) の候補を RagHit 化。
  const candidates: RagHit[] = raw.map((h) => ({
    docKey: h.record.docKey,
    appPageId: appIdForCommentKey(h.record.docKey),
    scope: h.record.scope,
    title: h.record.title,
    heading: h.record.heading,
    snippet: h.record.text.slice(0, 280),
    chunkIdx: h.record.chunkIdx,
    score: h.score,
  }));

  // 外部ベクトル スコープ(横から読む)。kind トグルで対象を絞る。本文はセグメント内に
  // あるので body をそのまま回答生成に使える(中継サーバ不要)。
  const kinds = enabled外部ベクトルKinds();
  if (kinds.size) {
    for (const th of extvecSearch(qvec, topK * 2, kinds, searchText, KEYWORD_WEIGHT)) {
      const d = th.doc;
      const title = d.subject || d.pptxFile || d.slideTitle || d.docPath || '(無題)';
      candidates.push({
        docKey: 'extvec:' + d.messageId,
        appPageId: '',
        scope: 'extvec',
        title,
        heading: d.kind === 'pptx' && d.slideNo ? `スライド ${d.slideNo}` : undefined,
        snippet: (d.body || '').slice(0, 280),
        chunkIdx: 0,
        score: th.score,
        kind: d.kind,
        from: d.from,
        date: d.date,
        imid: d.internetMessageId,
        body: d.body,
      });
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates.filter((h) => h.score >= minScore).slice(0, topK);
}
