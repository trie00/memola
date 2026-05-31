// ベクトルDB の配布フォーマット (doc-keyed)。外部ベクトル の mail-keyed セグメント設計を
// memola の「文書(ページ)単位」へ作り替えたもの。
//
//   - 1 レコード = 1 チャンク。key = `${docKey}#${chunkIdx}`。
//   - docKey = `${listTitle}:${itemId}` (= pageCommentKey と同一形式。
//     appIdForCommentKey で アプリ内 pageId に復元でき、ソース文書へ遷移可)。
//   - セグメントは封印後は不変。更新/削除は後続セグメントに新レコード (op) を
//     追記し、seq 昇順・key 単位 last-writer-wins でローカルに収束 (冪等)。
//   - 文書が変わったら writer が「変更チャンクを upsert + 余剰チャンクを delete」
//     する差分 (delta) を追記する。これが doc-keyed snapshot+delta の実体。

export type SegmentOp = 'upsert' | 'delete';

export interface DocRecord {
  /** 全体で単調増加する適用順。key 単位で最大 seq が勝つ。 */
  seq: number;
  op: SegmentOp;
  /** チャンクの一意キー = `${docKey}#${chunkIdx}`。 */
  key: string;
  // op='upsert' のときのみ以下を持つ (delete は key だけの tombstone)。
  /** 文書キー = `${listTitle}:${itemId}` (pageCommentKey 形式)。 */
  docKey?: string;
  /** 'org' | 'user'。検索結果の出所表示・フィルタ用。 */
  scope?: 'org' | 'user';
  /** 文書タイトル (検索結果の見出し用)。 */
  title?: string;
  /** 文書内のチャンク番号 (0 始まり)。 */
  chunkIdx?: number;
  /** 文書の総チャンク数。 */
  chunkCount?: number;
  /** 直近の見出し (チャンクが属する節)。 */
  heading?: string;
  /** チャンク本文 (表示スニペット + キーワード索引に使用)。 */
  text?: string;
  /** 文書内容ハッシュ (本文 JSON の FNV-1a)。差分判定用。 */
  docHash?: string;
  /** 埋め込みベクトル (Base64 Float16, rag/float16.ts)。 */
  emb?: string;
}

export interface Segment {
  id: string;
  generation: number;
  records: DocRecord[];
}

export interface ManifestOpen {
  id: string;
  hash: string;
  count: number;
}

export interface Manifest {
  version: number;
  generation: number;
  maxSeq: number;
  sealed: string[];
  open: ManifestOpen | null;
  updatedAt: string;
}

export const SEGMENT_CAP = 1000;

export function emptyManifest(): Manifest {
  return { version: 0, generation: 1, maxSeq: 0, sealed: [], open: null, updatedAt: nowIso() };
}

/** new Date() は build/テストで固定したい場面があるのでラップ。 */
export function nowIso(): string { return new Date().toISOString(); }

export function nextSegmentIndex(sealed: string[]): number {
  let max = 0;
  for (const id of sealed) {
    const m = /(\d+)$/.exec(id);
    if (m) max = Math.max(max, Number(m[1]));
  }
  return max + 1;
}

export function segmentId(index: number): string {
  return 'seg-' + String(index).padStart(5, '0');
}

export function serializeSegment(seg: Segment): string { return JSON.stringify(seg); }
export function parseSegment(text: string): Segment {
  const o = JSON.parse(text) as Segment;
  if (!o || !Array.isArray(o.records)) throw new Error('壊れたセグメント');
  return o;
}
export function serializeManifest(m: Manifest): string { return JSON.stringify(m); }
export function parseManifest(text: string): Manifest {
  const o = JSON.parse(text) as Manifest;
  if (!o || !Array.isArray(o.sealed)) throw new Error('壊れた manifest');
  return o;
}

/** 変化検知用の軽量ハッシュ (FNV-1a 32bit)。docHash / open.hash に共用。 */
export function hashString(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

/** 手元に無い封印セグメント id を返す (差分DL対象)。 */
export function missingSealed(manifest: Manifest, haveIds: ReadonlySet<string>): string[] {
  return manifest.sealed.filter((id) => !haveIds.has(id));
}
