// 差分スイープ: 文書集合と現在のインデックス状態を突き合わせ、変更分だけを
// 埋め込み直して「差分レコード (upsert/delete)」の列を作る。これが doc-keyed
// snapshot+delta の中核。writer (org=リース保持者 / user=本人) だけが呼ぶ。

import { getListItems } from '../api/sp-list';
import { parseBlocksJson } from '../api/pages';
import { blocksToMd } from '../lib/blocks-md';
import { splitIntoChunks } from './chunk';
import { encodeEmbedding } from './float16';
import { embedTexts } from './embed';
import { hashString, type DocRecord } from './segments';
import type { VectorDb } from './store';

export interface DocInput {
  docKey: string;          // `${listTitle}:${itemId}` (= pageCommentKey 形式)
  scope: 'org' | 'user';
  title: string;
  bodyJson: string;        // Body_blocks の生 JSON 文字列
}

const EMBED_BATCH = 64;

/** 指定リストから「埋め込み対象の文書」を読み込む。
 *  除外: DBや行メタ (PageType='row'/'database')、ゴミ箱、テンプレ、下書き複製。 */
export async function loadScopeDocs(listTitle: string, scope: 'org' | 'user'): Promise<DocInput[]> {
  const sel = '$select=Id,Title,Body_blocks,PageType,Trashed,IsTemplate,OriginPageId&$top=5000';
  const items = await getListItems(listTitle, sel).catch(() => []);
  const out: DocInput[] = [];
  for (const it of items) {
    const pt = String((it as Record<string, unknown>).PageType ?? '');
    if (pt === 'row' || pt === 'database') continue;
    if (Number((it as Record<string, unknown>).Trashed ?? 0) > 0) continue;
    if ((it as Record<string, unknown>).IsTemplate) continue;
    if ((it as Record<string, unknown>).OriginPageId) continue; // 下書き複製は原本と重複
    out.push({
      docKey: `${listTitle}:${it.Id}`,
      scope,
      title: String(it.Title ?? '(無題)'),
      bodyJson: String((it as Record<string, unknown>).Body_blocks ?? ''),
    });
  }
  return out;
}

async function embedInBatches(texts: string[], signal?: AbortSignal): Promise<Float32Array[]> {
  const out: Float32Array[] = [];
  for (let i = 0; i < texts.length; i += EMBED_BATCH) {
    const batch = texts.slice(i, i + EMBED_BATCH);
    const vecs = await embedTexts(batch, signal);
    for (const v of vecs) out.push(v);
  }
  return out;
}

/** 文書集合と db を突き合わせ、差分レコード列 (seq 未割当 = 0) を返す。
 *  - 内容ハッシュが一致する文書はスキップ (再埋め込みしない)。
 *  - 変更文書は全チャンクを upsert、余剰チャンクを delete。
 *  - 消えた文書 (db にあるが docs に無い) は全チャンクを delete。 */
export async function computeDelta(db: VectorDb, docs: DocInput[], signal?: AbortSignal): Promise<DocRecord[]> {
  const out: DocRecord[] = [];
  const current = new Set(docs.map((d) => d.docKey));

  // 1) 消えた文書 → tombstone
  for (const dk of db.allDocKeys()) {
    if (current.has(dk)) continue;
    const st = db.docState(dk);
    const n = st?.chunkCount ?? 0;
    for (let i = 0; i < n; i++) out.push({ seq: 0, op: 'delete', key: `${dk}#${i}` });
  }

  // 2) 変更文書を抽出してチャンク化
  const changed: Array<{ doc: DocInput; chunks: { text: string; heading?: string }[]; hash: string; prevCount: number }> = [];
  for (const doc of docs) {
    const hash = hashString(doc.bodyJson || '');
    const prev = db.docState(doc.docKey);
    const prevCount = prev?.chunkCount ?? 0;
    if (prev && prev.docHash === hash) continue; // 無変更
    const text = blocksToMd(parseBlocksJson(doc.bodyJson)).trim();
    if (!text) { // 空文書 → 既存チャンク全削除
      for (let i = 0; i < prevCount; i++) out.push({ seq: 0, op: 'delete', key: `${doc.docKey}#${i}` });
      continue;
    }
    const chunks = splitIntoChunks(`# ${doc.title}\n\n${text}`);
    changed.push({ doc, chunks, hash, prevCount });
  }

  // 3) 変更チャンクを一括埋め込み
  const texts: string[] = [];
  for (const c of changed) for (const ch of c.chunks) texts.push(ch.text);
  if (texts.length === 0) return out;
  const vecs = await embedInBatches(texts, signal);

  // 4) upsert + 余剰チャンク delete
  let vi = 0;
  for (const c of changed) {
    const newCount = c.chunks.length;
    for (let i = 0; i < newCount; i++) {
      const v = vecs[vi++];
      out.push({
        seq: 0, op: 'upsert', key: `${c.doc.docKey}#${i}`,
        docKey: c.doc.docKey, scope: c.doc.scope, title: c.doc.title,
        chunkIdx: i, chunkCount: newCount, heading: c.chunks[i].heading,
        text: c.chunks[i].text, docHash: c.hash, emb: encodeEmbedding(v),
      });
    }
    for (let i = newCount; i < c.prevCount; i++) out.push({ seq: 0, op: 'delete', key: `${c.doc.docKey}#${i}` });
  }
  return out;
}
