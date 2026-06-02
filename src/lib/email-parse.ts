// メールファイル(.eml / .msg)から表示用メタを取り出す薄いアダプタ。
//
// 実体の解析は 別アプリ から移植した堅牢な lib/eml-parser.ts に委譲する:
//   - .eml = RFC822(MIME encoded-word / 折り返し / quoted-printable 等に対応)
//   - .msg = Outlook バイナリ(@kenjiuno/msgreader が CFB をデコード)
//
// memola のメール参照ブロックは imid/件名/差出人/日付だけ使うが、parseEml/
// parseMsgFile は本文(body/bodyHtml)や To/Cc も返すので Phase 2(AI がメール本文
// を参照)でそのまま使える。

import { parseEml, parseMsgFile, type ParsedEml } from './eml-parser';

export interface EmailMeta {
  /** Internet Message-Id(山括弧なし)。Outlook で開く際の検索キー。 */
  imid: string;
  subject: string;
  from: string;
  /** ISO 8601(取得できた場合)。 */
  date: string;
}

function toMeta(p: ParsedEml): EmailMeta {
  const from = [p.fromName, p.fromEmail && p.fromEmail !== p.fromName ? '<' + p.fromEmail + '>' : '']
    .filter(Boolean).join(' ').trim() || p.fromEmail || '';
  return {
    // Outlook は PR_INTERNET_MESSAGE_ID を山括弧付き <...> で保持するため、
    // ヘッダの Message-ID をそのまま(山括弧付きで)保持する。リレー側でも
    // 山括弧あり/なし両方を検索するので取りこぼさない。
    imid: (p.internetMessageId || '').trim(),
    subject: p.subject || '',
    from,
    date: p.dateISO || '',
  };
}

/** ファイルが .eml/.msg か。 */
export function isEmailFile(file: File): boolean {
  const n = file.name.toLowerCase();
  return n.endsWith('.eml') || n.endsWith('.msg');
}

/** ライブラリ上の .eml/.msg(fileUrl)を取得し、本文込みで解析(AIコンテキスト用)。 */
export async function fetchEmailParsed(fileUrl: string, filename: string): Promise<ParsedEml | null> {
  try {
    const r = await fetch(fileUrl, { credentials: 'include' });
    if (!r.ok) return null;
    const name = filename.toLowerCase();
    if (name.endsWith('.eml')) return parseEml(await r.text());
    if (name.endsWith('.msg')) return parseMsgFile(new File([await r.blob()], filename));
    return null;
  } catch { return null; }
}

/** ParsedEml から AI に渡す本文テキストを取り出す(text 優先、無ければ HTML をタグ除去)。 */
export function emailBodyText(p: ParsedEml): string {
  if (p.body && p.body.trim()) return p.body;
  if (p.bodyHtml) {
    return p.bodyHtml
      .replace(/<\s*(script|style)[^>]*>[\s\S]*?<\/\s*\1\s*>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }
  return '';
}

/** .eml/.msg を解析してメタを返す。解析不能なら null。 */
export async function parseEmailFile(file: File): Promise<EmailMeta | null> {
  const name = file.name.toLowerCase();
  try {
    if (name.endsWith('.eml')) {
      const meta = toMeta(parseEml(await file.text()));
      return (meta.imid || meta.subject) ? meta : null;
    }
    if (name.endsWith('.msg')) {
      const meta = toMeta(await parseMsgFile(file));
      return (meta.imid || meta.subject) ? meta : null;
    }
  } catch { /* 解析失敗 */ }
  return null;
}
