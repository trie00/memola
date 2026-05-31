// ブラウザ内ベクトルDB (検索エンジン本体・doc-keyed)。
// 同期したセグメントを適用してメモリ上にチャンクレコードを構築し、総当たり cosine
// (+ 文字bigram キーワード) で検索する。1 チャンク = 1 レコード。
//
// 適用規則: seq 昇順・key 単位 last-writer-wins。
//   upsert: そのベクトル/本文で置換。delete(tombstone): レコード削除。
//   再適用は seq 比較で no-op になり冪等。

import { decodeEmbedding, normalize } from './float16';
import type { Segment, DocRecord } from './segments';

function bigrams(text: string): Set<string> {
  const t = (text || '').toLowerCase().replace(/\s+/g, ' ').trim();
  const out = new Set<string>();
  for (let i = 0; i < t.length - 1; i++) out.add(t.slice(i, i + 2));
  return out;
}
function keywordCoverage(query: Set<string>, doc: Set<string>): number {
  if (query.size === 0) return 0;
  let hit = 0;
  for (const g of query) if (doc.has(g)) hit++;
  return hit / query.size;
}

export interface ChunkRecord {
  key: string;
  docKey: string;
  scope: 'org' | 'user';
  title: string;
  chunkIdx: number;
  chunkCount: number;
  heading?: string;
  text: string;
  docHash: string;
  vec: Float32Array; // L2 正規化済み
}

export interface DbHit {
  record: ChunkRecord;
  score: number;
}

export class VectorDb {
  private records = new Map<string, ChunkRecord>();
  private appliedSeq = new Map<string, number>();
  private maxSeq = 0;
  private kwCache = new Map<string, Set<string>>();

  get size(): number { return this.records.size; }
  get watermark(): number { return this.maxSeq; }

  applySegment(seg: Segment): void {
    const recs = [...seg.records].sort((a, b) => a.seq - b.seq);
    for (const r of recs) this.applyRecord(r);
  }

  applyRecord(r: DocRecord): void {
    const prev = this.appliedSeq.get(r.key) ?? 0;
    if (r.seq <= prev) return; // 古い → LWW で無視 (冪等)
    this.kwCache.delete(r.key);
    if (r.op === 'delete') {
      this.records.delete(r.key);
    } else {
      if (!r.emb) return; // upsert は埋め込み必須
      this.records.set(r.key, {
        key: r.key,
        docKey: r.docKey ?? r.key.split('#')[0],
        scope: r.scope ?? 'user',
        title: r.title ?? '(無題)',
        chunkIdx: r.chunkIdx ?? 0,
        chunkCount: r.chunkCount ?? 1,
        heading: r.heading,
        text: r.text ?? '',
        docHash: r.docHash ?? '',
        vec: normalize(decodeEmbedding(r.emb)),
      });
    }
    this.appliedSeq.set(r.key, r.seq);
    if (r.seq > this.maxSeq) this.maxSeq = r.seq;
  }

  /** docKey 単位の現在の (docHash, チャンク数)。差分判定で writer が参照。 */
  docState(docKey: string): { docHash: string; chunkCount: number } | null {
    let hash = '';
    let count = 0;
    for (const r of this.records.values()) {
      if (r.docKey === docKey) { count++; if (!hash) hash = r.docHash; }
    }
    return count > 0 ? { docHash: hash, chunkCount: count } : null;
  }

  /** 現在インデックスに存在する docKey 集合 (削除検知用)。 */
  allDocKeys(): Set<string> {
    const s = new Set<string>();
    for (const r of this.records.values()) s.add(r.docKey);
    return s;
  }

  /** Top-K 検索。keywordWeight>0 でハイブリッド (ベクトル + 文字bigram)。
   *  `mustKeywords` を渡すと、それらを **すべて含む** レコードに絞る(外部ベクトル 流の
   *  完全一致必須キーワード)。絞った結果が 0 件なら絞らずにフォールバック(過剰
   *  抽出で検索が死なないように)。score は 0..1。 */
  search(qvec: Float32Array, topK: number, queryText = '', keywordWeight = 0, mustKeywords: string[] = []): DbHit[] {
    const q = normalize(qvec);
    const dim = q.length;
    const useKw = keywordWeight > 0 && queryText.trim().length > 0;
    const qbi = useKw ? bigrams(queryText) : null;
    const w = Math.min(1, Math.max(0, keywordWeight));
    const kws = mustKeywords.map((k) => k.toLowerCase()).filter(Boolean);

    const scored: DbHit[] = [];
    for (const r of this.records.values()) {
      let dot = 0;
      if (r.vec.length === dim) for (let i = 0; i < dim; i++) dot += q[i] * r.vec[i];
      const vcos = Math.max(0, dot);
      const score = qbi
        ? (1 - w) * vcos + w * keywordCoverage(qbi, this.kwIndex(r))
        : vcos;
      scored.push({ record: r, score });
    }
    let pool = scored;
    if (kws.length) {
      const hay = (r: ChunkRecord): string => `${r.title} ${r.heading ?? ''} ${r.text}`.toLowerCase();
      const filtered = scored.filter((x) => kws.every((k) => hay(x.record).includes(k)));
      if (filtered.length) pool = filtered; // 0件なら絞らずフォールバック
    }
    pool.sort((a, b) => b.score - a.score);
    return pool.slice(0, topK);
  }

  private kwIndex(r: ChunkRecord): Set<string> {
    let s = this.kwCache.get(r.key);
    if (!s) { s = bigrams(`${r.title} ${r.heading ?? ''} ${r.text}`); this.kwCache.set(r.key, s); }
    return s;
  }

  clear(): void {
    this.records.clear();
    this.appliedSeq.clear();
    this.kwCache.clear();
    this.maxSeq = 0;
  }
}
