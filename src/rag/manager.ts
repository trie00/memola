// スコープ別インデックス管理。
//   - org : 共有 SP ストア (SpVectorStore + manifest 差分DL + リース)。
//   - user: ローカル専用 (IndexedDB がストア本体。個人ベクトルは SP に置かない =
//           秘匿性が高く ACL 不要。端末ごとに再埋め込みするコストと引き換え)。
//
// init() でキャッシュ適用 → (org のみ) SP 差分DL。refresh() で writer だけが
// 差分スイープ → 永続化 (org=SP+manifest CAS、user=ローカル manifest)。

import { ORG_PAGES_LIST, getMyPagesList } from '../api/pages';
import { SegmentCache } from './cache';
import { VectorDb, type DbHit } from './store';
import { SpVectorStore, updateManifestWithCas } from './sp-store';
import { getLease } from './lease';
import { loadScopeDocs, computeDelta, type SweepProgress } from './sweep';
import {
  emptyManifest, missingSealed, nextSegmentIndex, segmentId, nowIso,
  type Manifest, type Segment, type DocRecord,
} from './segments';

export type RagScope = 'org' | 'user';

export class ScopeIndex {
  readonly db = new VectorDb();
  private readonly cache: SegmentCache;
  private readonly store: SpVectorStore | null;
  private inited = false;

  constructor(
    readonly scope: RagScope,
    private readonly listTitle: string,
    remote: boolean,
  ) {
    this.cache = new SegmentCache(scope === 'org' ? 'org' : 'user');
    this.store = remote ? new SpVectorStore('org') : null;
  }

  get size(): number { return this.db.size; }

  /** キャッシュ適用 → (org) SP 差分DL。検索可能になるまで。冪等。 */
  async init(): Promise<void> {
    if (this.inited) return;
    this.inited = true;
    const cachedIds = await this.cache.allIds().catch(() => []);
    const have = new Set<string>();
    for (const id of cachedIds) {
      const seg = await this.cache.get(id).catch(() => null);
      if (seg) { this.db.applySegment(seg); have.add(id); }
    }
    if (this.store) await this.syncFromSp(have);
  }

  /** SP の manifest を見て未取得の封印 + 変化した open を DL・適用・キャッシュ。 */
  private async syncFromSp(have: Set<string>): Promise<void> {
    if (!this.store) return;
    const manifest = await this.store.readManifest().catch(() => null);
    if (!manifest) return; // origin 未作成 → キャッシュ分のみ
    const toFetch = missingSealed(manifest, have);
    const prev = await this.cache.getManifest().catch(() => null);
    if (manifest.open && this.openChanged(manifest, prev, have)) toFetch.push(manifest.open.id);
    for (const id of toFetch) {
      const seg = await this.store.readSegment(id).catch(() => null);
      if (seg) { this.db.applySegment(seg); await this.cache.put(id, seg).catch(() => undefined); }
    }
    await this.pruneOrphans(manifest);
    await this.cache.setManifest(manifest).catch(() => undefined);
  }

  private openChanged(m: Manifest, prev: Manifest | null, have: ReadonlySet<string>): boolean {
    if (!m.open) return false;
    if (!have.has(m.open.id)) return true;
    if (!prev?.open || prev.open.id !== m.open.id) return true;
    return prev.open.hash !== m.open.hash;
  }

  private async pruneOrphans(manifest: Manifest): Promise<void> {
    const valid = new Set<string>(manifest.sealed);
    if (manifest.open) valid.add(manifest.open.id);
    for (const id of await this.cache.allIds().catch(() => [])) {
      if (!valid.has(id)) await this.cache.delete(id).catch(() => undefined);
    }
  }

  /** writer だけが差分を取り込む。返り値で結果を報告。 */
  async refresh(signal?: AbortSignal, onProgress?: SweepProgress): Promise<{ changed: number; skipped?: string }> {
    await this.init();
    // org は writer のときだけ埋め込む。先にリースを確認し、非writer なら
    // 埋め込み API を一切呼ばない (computeDelta すら走らせない)。
    if (this.store) {
      const ok = await getLease().ensureWriter();
      if (!ok) return { changed: 0, skipped: 'not-writer' };
    }
    const docs = await loadScopeDocs(this.listTitle, this.scope);
    const recs = await computeDelta(this.db, docs, signal, onProgress);
    if (recs.length === 0) return { changed: 0 };
    if (this.store) await this.persistRemote(recs);
    else await this.persistLocal(recs);
    return { changed: recs.length };
  }

  private async persistRemote(recs: DocRecord[]): Promise<void> {
    if (!this.store) return;
    await this.store.ensure();
    const mf = (await this.store.readManifest().catch(() => null)) ?? emptyManifest();
    const baseSeq = mf.maxSeq;
    recs.forEach((r, i) => { r.seq = baseSeq + i + 1; });
    const idx = nextSegmentIndex(mf.sealed);
    const seg: Segment = { id: segmentId(idx), generation: mf.generation, records: recs };
    const written = await this.store.writeSegmentNoOverwrite(seg, idx);
    const finalSeg: Segment = { ...seg, id: written.id };
    await updateManifestWithCas(this.store, (cur) => ({
      version: cur.version + 1,
      generation: cur.generation,
      maxSeq: Math.max(cur.maxSeq, baseSeq + recs.length),
      sealed: cur.sealed.includes(written.id) ? cur.sealed : [...cur.sealed, written.id],
      open: cur.open,
      updatedAt: nowIso(),
    }));
    this.db.applySegment(finalSeg);
    await this.cache.put(written.id, finalSeg).catch(() => undefined);
  }

  private async persistLocal(recs: DocRecord[]): Promise<void> {
    const mf = (await this.cache.getManifest().catch(() => null)) ?? emptyManifest();
    const baseSeq = mf.maxSeq;
    recs.forEach((r, i) => { r.seq = baseSeq + i + 1; });
    const idx = nextSegmentIndex(mf.sealed);
    const id = segmentId(idx);
    const seg: Segment = { id, generation: mf.generation, records: recs };
    this.db.applySegment(seg);
    await this.cache.put(id, seg);
    mf.sealed.push(id);
    mf.maxSeq = baseSeq + recs.length;
    mf.version += 1;
    mf.updatedAt = nowIso();
    await this.cache.setManifest(mf);
  }

  search(qvec: Float32Array, topK: number, queryText: string, keywordWeight: number): DbHit[] {
    return this.db.search(qvec, topK, queryText, keywordWeight);
  }
}

// ─── スコープ別シングルトン ──────────────────────────────────────────────
let _org: ScopeIndex | null = null;
let _user: ScopeIndex | null = null;

export function orgIndex(): ScopeIndex {
  if (!_org) _org = new ScopeIndex('org', ORG_PAGES_LIST, /* remote */ true);
  return _org;
}
export function userIndex(): ScopeIndex {
  if (!_user) _user = new ScopeIndex('user', getMyPagesList(), /* remote */ false);
  return _user;
}
/** ワークスペース切替時に破棄 (次回アクセスで作り直し)。 */
export function resetIndexes(): void { _org = null; _user = null; }

/** 完全リセット用: org の SP ベクトルファイルを削除し、両スコープの IndexedDB
 *  キャッシュを空にして、シングルトンを破棄する。best-effort。 */
export async function ragHardReset(): Promise<void> {
  try { await new SpVectorStore('org').deleteAll(); } catch { /* best-effort */ }
  try { await new SegmentCache('org').clearAll(); } catch { /* best-effort */ }
  try { await new SegmentCache('user').clearAll(); } catch { /* best-effort */ }
  resetIndexes();
}
