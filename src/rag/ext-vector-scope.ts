// ExtVec が収集したベクトルを「横から読む」読み取り専用スコープ。
//
// ExtVec は /<site>/<library>/ExtVec/ に manifest.json + seg-*.json を置き、
// 各レコードに emb(Base64 Float16)と本文(body)・kind(mail/onenote/pptx/doc/
// transcript)等のメタを持つ。memola とエンベロープ(manifest/segment)が同形式
// なので素の JSON として読める。本文がセグメント内にあるため、横断検索は中継
// サーバ無し・セグメントだけで本文まで使える。
//
// 制約: クエリ埋め込みは ExtVec と同じモデル/次元である必要がある。次元が一致
// しないベクトルは検索からスキップする(誤検出防止)。

import { decodeEmbedding, normalize } from './float16';
import { readFileText } from './sp-files';
import { SITE_REL } from '../config';
import { prefRagExtVecFolder } from '../lib/prefs';

export type ExtVecKind = 'mail' | 'onenote' | 'doc' | 'pptx' | 'transcript';
export const EXTVEC_KINDS: ExtVecKind[] = ['mail', 'onenote', 'doc', 'pptx', 'transcript'];

export interface ExtVecDoc {
  key: string;
  messageId: string;
  kind: ExtVecKind;
  subject: string;
  from: string;
  date: string;
  body: string;
  internetMessageId?: string;
  docPath?: string;
  pptxFile?: string;
  pptxServerRelUrl?: string;
  slideNo?: number;
  slideTitle?: string;
  vec: Float32Array;     // L2 正規化済み
}

interface RawRecord {
  seq: number; op?: 'upsert' | 'delete'; messageId: string;
  kind?: ExtVecKind; internetMessageId?: string; conversationId?: string;
  subject?: string; from?: string; date?: string; body?: string;
  docPath?: string; pptxFile?: string; pptxServerRelUrl?: string;
  slideNo?: number; slideTitle?: string;
  chunkIdx?: number; emb?: string;
}

let _docs = new Map<string, ExtVecDoc>();
let _loadedFolder: string | null = null;     // どの folder で読み込み済みか
let _dimSkipped = 0;                          // 次元不一致でスキップした件数(最新検索時)

function bigrams(text: string): Set<string> {
  const t = (text || '').toLowerCase().replace(/\s+/g, ' ').trim();
  const out = new Set<string>();
  for (let i = 0; i < t.length - 1; i++) out.add(t.slice(i, i + 2));
  return out;
}
function coverage(q: Set<string>, d: Set<string>): number {
  if (q.size === 0) return 0;
  let hit = 0; for (const g of q) if (d.has(g)) hit++;
  return hit / q.size;
}

function extVecFolderServerRel(): string | null {
  const f = prefRagExtVecFolder.get().trim().replace(/^\/+|\/+$/g, '');
  if (!f) return null;
  return SITE_REL.replace(/\/+$/, '') + '/' + f;
}

/** ExtVec のセグメントを読み込んでメモリ上に生存文書を構築。冪等(同 folder は再利用)。
 *  force=true で再読み込み。返り値は文書数。 */
export async function loadExtVecIndex(force = false): Promise<number> {
  const base = extVecFolderServerRel();
  if (!base) { _docs = new Map(); _loadedFolder = null; return 0; }
  if (!force && _loadedFolder === base) return _docs.size;

  const manText = await readFileText(base + '/manifest.json').catch(() => null);
  if (!manText) { _docs = new Map(); _loadedFolder = base; return 0; }
  let manifest: { sealed?: string[]; open?: { id: string } | null };
  try { manifest = JSON.parse(manText); } catch { return 0; }
  const segIds = [...(manifest.sealed || [])];
  if (manifest.open?.id) segIds.push(manifest.open.id);

  // 全レコードを集めて seq 昇順 LWW (key = messageId#chunkIdx)。
  const all: RawRecord[] = [];
  for (const id of segIds) {
    const text = await readFileText(base + '/' + id + '.json').catch(() => null);
    if (!text) continue;
    try {
      const seg = JSON.parse(text) as { records?: RawRecord[] };
      if (Array.isArray(seg.records)) all.push(...seg.records);
    } catch { /* 壊れたセグメントは無視 */ }
  }
  all.sort((a, b) => a.seq - b.seq);

  const docs = new Map<string, ExtVecDoc>();
  const appliedSeq = new Map<string, number>();
  for (const r of all) {
    if (!r.messageId) continue;
    const key = r.messageId + '#' + (r.chunkIdx ?? 0);
    if ((appliedSeq.get(key) ?? 0) >= r.seq) continue;
    appliedSeq.set(key, r.seq);
    if (r.op === 'delete') { docs.delete(key); continue; }
    if (!r.emb) continue;
    docs.set(key, {
      key,
      messageId: r.messageId,
      kind: (r.kind || 'mail') as ExtVecKind,
      subject: r.subject || '',
      from: r.from || '',
      date: r.date || '',
      body: r.body || '',
      internetMessageId: r.internetMessageId,
      docPath: r.docPath,
      pptxFile: r.pptxFile,
      pptxServerRelUrl: r.pptxServerRelUrl,
      slideNo: r.slideNo,
      slideTitle: r.slideTitle,
      vec: normalize(decodeEmbedding(r.emb)),
    });
  }
  _docs = docs;
  _loadedFolder = base;
  return docs.size;
}

/** kind 別の件数(設定 UI / 件数表示用)。 */
export function extVecStats(): { total: number; byKind: Record<ExtVecKind, number>; enabled: boolean } {
  const byKind = { mail: 0, onenote: 0, doc: 0, pptx: 0, transcript: 0 } as Record<ExtVecKind, number>;
  for (const d of _docs.values()) byKind[d.kind] = (byKind[d.kind] || 0) + 1;
  return { total: _docs.size, byKind, enabled: !!extVecFolderServerRel() };
}

/** 直近検索で次元不一致のためスキップした件数(0 でなければモデル不一致の警告に使う)。 */
export function extVecDimSkipped(): number { return _dimSkipped; }

export interface ExtVecHit { doc: ExtVecDoc; score: number }

/** ExtVec スコープを cosine(+bigram)検索。enabledKinds に無い kind と、qvec と
 *  次元が違うベクトルは除外する。 */
export function extVecSearch(
  qvec: Float32Array, topK: number, enabledKinds: Set<ExtVecKind>,
  queryText = '', keywordWeight = 0,
): ExtVecHit[] {
  _dimSkipped = 0;
  if (_docs.size === 0 || enabledKinds.size === 0) return [];
  const q = normalize(qvec);
  const dim = q.length;
  const useKw = keywordWeight > 0 && queryText.trim().length > 0;
  const qbi = useKw ? bigrams(queryText) : null;
  const w = Math.min(1, Math.max(0, keywordWeight));

  const hits: ExtVecHit[] = [];
  for (const d of _docs.values()) {
    if (!enabledKinds.has(d.kind)) continue;
    if (d.vec.length !== dim) { _dimSkipped++; continue; }
    let dot = 0;
    for (let i = 0; i < dim; i++) dot += q[i] * d.vec[i];
    const vcos = Math.max(0, dot);
    const score = qbi ? (1 - w) * vcos + w * coverage(qbi, bigrams(`${d.subject} ${d.body}`)) : vcos;
    hits.push({ doc: d, score });
  }
  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, topK);
}
