// 長文ドキュメントを RAG 用にチャンク (断片) 分割するユーティリティ (外部ベクトル より移植)。
// 戦略: 見出し → 段落 → 文 → 固定長 の順に再帰的に試して、目標サイズに近づける。
// 日本語混在を前提とした文字数ベース。

export interface ChunkOptions {
  /** 目標チャンクサイズ (文字)。デフォルト 800。 */
  maxChars?: number;
  /** チャンク間の重複文字数 (境界の文脈消失を防ぐ)。デフォルト 80。 */
  overlap?: number;
  /** これ未満は分割せず 1 チャンクとして返す。デフォルト 200。 */
  minChars?: number;
}

export interface Chunk {
  text: string;
  /** 直近の見出し (Markdown # / ## / ### を拾った場合に設定)。 */
  heading?: string;
}

/** ドキュメント本文を Chunk[] に分割。空文字なら空配列。 */
export function splitIntoChunks(text: string, opts: ChunkOptions = {}): Chunk[] {
  const maxChars = opts.maxChars ?? 800;
  const overlap = Math.max(0, opts.overlap ?? 80);
  const minChars = opts.minChars ?? 200;
  const t = (text ?? '').replace(/\r\n?/g, '\n').trim();
  if (!t) return [];
  if (t.length <= maxChars) return [{ text: t }];

  const blocks = splitByHeadings(t);
  const chunks: Chunk[] = [];
  for (const b of blocks) {
    const segs = splitByParagraphs(b.body, maxChars, minChars);
    for (const s of segs) {
      let chunkText = s;
      if (overlap > 0 && chunks.length > 0) {
        const prev = chunks[chunks.length - 1].text;
        const tail = prev.slice(Math.max(0, prev.length - overlap));
        chunkText = tail + '\n' + s;
      }
      chunks.push({ text: chunkText, heading: b.heading });
    }
  }
  return chunks.length ? chunks : [{ text: t }];
}

function splitByHeadings(text: string): Array<{ heading?: string; body: string }> {
  const lines = text.split('\n');
  const out: Array<{ heading?: string; body: string }> = [];
  let cur: { heading?: string; body: string } = { body: '' };
  for (const line of lines) {
    const m = /^(#{1,6})\s+(.+)$/.exec(line);
    if (m) {
      if (cur.body.trim()) out.push({ ...cur, body: cur.body.trim() });
      cur = { heading: m[2].trim(), body: '' };
    } else {
      cur.body += (cur.body ? '\n' : '') + line;
    }
  }
  if (cur.body.trim()) out.push({ ...cur, body: cur.body.trim() });
  return out.length ? out : [{ body: text }];
}

function splitByParagraphs(text: string, maxChars: number, _minChars: number): string[] {
  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const out: string[] = [];
  let buf = '';
  for (const p of paragraphs) {
    const next = buf ? buf + '\n\n' + p : p;
    if (next.length <= maxChars) { buf = next; continue; }
    if (buf) { out.push(buf); buf = ''; }
    if (p.length <= maxChars) { buf = p; }
    else {
      for (const piece of splitBySentences(p, maxChars)) {
        if (buf && (buf + '\n' + piece).length > maxChars) { out.push(buf); buf = ''; }
        buf = buf ? buf + '\n' + piece : piece;
      }
    }
  }
  if (buf) out.push(buf);
  return out.length ? out : [text];
}

function splitBySentences(text: string, maxChars: number): string[] {
  const sentences = text.split(/(?<=[。!?！？\n])/).map((s) => s.trim()).filter(Boolean);
  const out: string[] = [];
  let buf = '';
  for (const s of sentences) {
    if (s.length > maxChars) {
      if (buf) { out.push(buf); buf = ''; }
      for (let i = 0; i < s.length; i += maxChars) out.push(s.slice(i, i + maxChars));
      continue;
    }
    if ((buf + s).length > maxChars) { out.push(buf); buf = ''; }
    buf += s;
  }
  if (buf) out.push(buf);
  return out;
}
