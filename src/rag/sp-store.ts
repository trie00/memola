// ベクトルセグメント群の SharePoint 配置。
// /<site>/Shared Documents/memola-rag/<scope>/ 配下に manifest.json と seg-*.json。
// scope = 'org' (共有) または 'user-<id>' (個人。ACL は親 Document Library に従う —
// 個人ベクトルは IndexedDB ローカルのみで運用し SP には置かない設計のため、
// SpVectorStore は基本的に org 用)。

import { SITE_REL } from '../config';
import {
  ensureFolder, readFileText, readFileTextWithEtag, uploadFileText,
  uploadFileTextCas, uploadFileTextNoOverwrite, listFolderFileNames, deleteFile,
  CasConflictError,
} from './sp-files';
import {
  type Manifest, type Segment,
  emptyManifest, serializeManifest, parseManifest, serializeSegment, parseSegment, segmentId, nowIso,
} from './segments';

const MANIFEST_NAME = 'manifest.json';
const RAG_ROOT = 'Shared Documents/memola-rag';

export class SpVectorStore {
  /** site 込み server-relative なフォルダ (例: /sites/x/Shared Documents/memola-rag/org)。 */
  private readonly folder: string;

  constructor(private readonly scope: string /* 'org' など */) {
    this.folder = `${SITE_REL}/${RAG_ROOT}/${scope}`;
  }

  /** 配置フォルダを親から順に作成 (冪等)。 */
  async ensure(): Promise<void> {
    await ensureFolder(`${SITE_REL}/Shared Documents/memola-rag`);
    await ensureFolder(this.folder);
  }

  async readManifest(): Promise<Manifest | null> {
    const text = await readFileText(`${this.folder}/${MANIFEST_NAME}`);
    return text == null ? null : parseManifest(text);
  }

  async readManifestWithEtag(): Promise<{ manifest: Manifest; etag: string } | null> {
    const r = await readFileTextWithEtag(`${this.folder}/${MANIFEST_NAME}`);
    if (!r) return null;
    return { manifest: parseManifest(r.text), etag: r.etag };
  }

  async writeManifest(m: Manifest): Promise<void> {
    await uploadFileText(this.folder, MANIFEST_NAME, serializeManifest(m));
  }

  async writeManifestCas(m: Manifest, etag: string): Promise<void> {
    if (!etag) { await this.writeManifest(m); return; }
    await uploadFileTextCas(`${this.folder}/${MANIFEST_NAME}`, serializeManifest(m), etag);
  }

  async readSegment(id: string): Promise<Segment | null> {
    const text = await readFileText(`${this.folder}/${id}.json`);
    return text == null ? null : parseSegment(text);
  }

  async writeSegment(seg: Segment): Promise<void> {
    await uploadFileText(this.folder, `${seg.id}.json`, serializeSegment(seg));
  }

  /** 既存があれば idx を bump して衝突回避しながら書く。確定 id を返す。 */
  async writeSegmentNoOverwrite(seg: Segment, startIdx: number, maxAttempts = 50): Promise<{ id: string; idx: number }> {
    let idx = startIdx;
    for (let i = 0; i < maxAttempts; i++) {
      const id = segmentId(idx);
      const ok = await uploadFileTextNoOverwrite(this.folder, `${id}.json`, serializeSegment({ ...seg, id }));
      if (ok) return { id, idx };
      idx++;
    }
    throw new Error('segment id 衝突が ' + maxAttempts + ' 回連続');
  }

  async listSegmentIds(): Promise<string[]> {
    const names = await listFolderFileNames(this.folder);
    return names.filter((n) => n.startsWith('seg-') && n.endsWith('.json')).map((n) => n.slice(0, -5));
  }

  /** manifest + 全セグメントを削除 (リセット用)。フォルダ自体は残す。 */
  async deleteAll(): Promise<void> {
    const names = await listFolderFileNames(this.folder);
    for (const name of names) {
      if (name === MANIFEST_NAME || (name.startsWith('seg-') && name.endsWith('.json'))) {
        await deleteFile(`${this.folder}/${name}`).catch(() => { /* best-effort */ });
      }
    }
  }
}

/** 最新 manifest を受け取り、自分の変更を適用した新 manifest を返す patcher。
 *  CAS 失敗時に再読込された最新で再呼出されるため、毎回 idempotent に動くこと。 */
export type ManifestPatcher = (current: Manifest) => Manifest;

/** Manifest を CAS で更新。412 競合時は最新を再読込して patcher を再適用しリトライ。 */
export async function updateManifestWithCas(
  store: SpVectorStore,
  patcher: ManifestPatcher,
  maxRetries = 5,
): Promise<Manifest> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const cur = await store.readManifestWithEtag();
    const base = cur?.manifest ?? emptyManifest();
    const etag = cur?.etag ?? '';
    const next = patcher(base);
    next.updatedAt = nowIso();
    try {
      await store.writeManifestCas(next, etag);
      return next;
    } catch (e) {
      if (!(e instanceof CasConflictError) || attempt === maxRetries) throw e;
      // jittered backoff。Math.random はビルド制約があるため attempt ベースに固定。
      await new Promise((r) => setTimeout(r, 50 + attempt * 60));
    }
  }
  throw new Error('manifest CAS: max retries exceeded');
}
