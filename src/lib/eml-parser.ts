// Minimal RFC 822 / RFC 2822 parser for `.eml` files dragged from Outlook
// onto the new-ticket modal. We only care about a few headers (Subject,
// From, Date) plus the first text/plain body part — enough to pre-fill the
// ticket form. We deliberately avoid a full MIME parser; Outlook for Mac
// and Outlook for Windows both emit reasonably clean .eml files for drag
// operations and the parts we need live near the top.
//
// .msg files (Outlook for Windows binary format) are also supported via
// @kenjiuno/msgreader — see parseMsgFile() below.
//
// Edge cases we handle:
//   - MIME encoded-words in headers:  =?UTF-8?B?...?= and =?UTF-8?Q?...?=
//     (Japanese subjects are commonly base64-encoded UTF-8).
//   - Header folding (continuation lines starting with space/tab).
//   - quoted-printable / base64 transfer encoding on the body.
//   - multipart/alternative — pick the first text/plain part.
//
// What we do NOT handle (out of scope for drag-prefill):
//   - Nested multipart, attachments, signed/encrypted blobs.
//   - Non-UTF-8 / non-ISO-2022-JP charsets are decoded best-effort with
//     TextDecoder; if the charset is unknown we fall back to UTF-8.

export interface ParsedEml {
  subject?: string;
  fromName?: string;
  fromEmail?: string;
  /** ISO 8601 date string (UTC). Undefined when Date header is missing/invalid. */
  dateISO?: string;
  /** Plain-text body (decoded). Newlines normalised to \n. */
  body?: string;
  /** Raw HTML body when the source mail had `text/html` content. UI 側で
   *  「HTML 形式で取り込むかどうか」の判断に使う。 */
  bodyHtml?: string;
  /** RFC 5322 Message-ID (`<...@host>`)。.eml / .msg から取れた場合に設定。
   *  返信メール作成時に relay が Outlook 内の元メールを一意検索する最優先キー。
   *  Outlook drag テキスト経由 (ヘッダのみ) では取得できないので undefined。 */
  internetMessageId?: string;
  /** 元メールの To 受信者一覧 (email アドレスのみ)。Reply-All で Cc に回す用。
   *  取れなかった場合は undefined (空配列でなく)。 */
  toEmails?: string[];
  /** 元メールの Cc 一覧。Reply-All で Cc に回す用。 */
  ccEmails?: string[];
}

/** Outlook for Windows のメール drag テキスト判定。
 *  Windows 版 Outlook はドラッグ時に .eml ファイルではなく、以下の形式の
 *  text/plain だけを渡してくる:
 *
 *    From: 田中太郎 <tanaka@x.com>           (or 差出人:)
 *    Sent: 2026年5月17日 10:30              (or 送信日時:)
 *    To: someone@y.com                       (or 宛先:)
 *    Subject: テストメール                   (or 件名:)
 *
 *    (本文)
 *
 *  RFC 822 (.eml) ほど厳密でなく、locale により日本語キー or 英語キー混在。
 *  「From: または 差出人:」「Subject: または 件名:」の両方が見つかれば
 *  Outlook drag と判定する。 */
export function looksLikeOutlookDrag(text: string): boolean {
  if (!text) return false;
  const head = text.slice(0, 2000);
  const hasFrom = /(^|\n)\s*(From|差出人|送信者)\s*[::]\s*\S/i.test(head);
  const hasSubject = /(^|\n)\s*(Subject|件名)\s*[::]\s*\S/i.test(head);
  return hasFrom && hasSubject;
}

/** Best-effort detect: does this string look like an .eml file?
 *  Cheap and tolerant — we just look for an obvious mail header at the top. */
export function looksLikeEml(text: string): boolean {
  if (!text) return false;
  const head = text.slice(0, 4096);
  return /(^|\r?\n)(Subject|From|To|Date|Message-ID|MIME-Version):/i.test(head);
}

/** Decode a MIME encoded-word `=?charset?encoding?text?=` to plain text.
 *  Handles a single token; the caller is responsible for handling whitespace
 *  between multiple consecutive encoded-words (which per RFC must be removed). */
function decodeEncodedWord(token: string): string | null {
  const m = token.match(/^=\?([^?]+)\?([BbQq])\?([^?]*)\?=$/);
  if (!m) return null;
  const charset = m[1]!.toLowerCase();
  const enc = m[2]!.toUpperCase();
  const data = m[3]!;
  try {
    let bytes: Uint8Array;
    if (enc === 'B') {
      const bin = atob(data);
      bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    } else {
      // Q-encoding: '=XX' → byte, '_' → space
      const out: number[] = [];
      for (let i = 0; i < data.length; i++) {
        const ch = data.charCodeAt(i);
        if (ch === 0x5f /* _ */) { out.push(0x20); continue; }
        if (ch === 0x3d /* = */ && i + 2 < data.length) {
          const hex = data.slice(i + 1, i + 3);
          if (/^[0-9A-Fa-f]{2}$/.test(hex)) {
            out.push(parseInt(hex, 16));
            i += 2;
            continue;
          }
        }
        out.push(ch);
      }
      bytes = new Uint8Array(out);
    }
    return new TextDecoder(charset, { fatal: false }).decode(bytes);
  } catch {
    return null;
  }
}

/** Decode any encoded-words in a header value. Per RFC 2047, whitespace
 *  *between* two encoded-words is ignored — that matters for Japanese
 *  subjects split across multiple `=?UTF-8?B?...?=` tokens. */
function decodeHeader(value: string): string {
  // First pass: split on encoded-word boundaries while keeping the words.
  const re = /=\?[^?]+\?[BbQq]\?[^?]*\?=/g;
  let out = '';
  let last = 0;
  let lastWasEW = false;
  let m: RegExpExecArray | null;
  while ((m = re.exec(value)) !== null) {
    const between = value.slice(last, m.index);
    // Per RFC 2047, whitespace between encoded-words is discarded.
    if (!(lastWasEW && /^\s*$/.test(between))) out += between;
    const decoded = decodeEncodedWord(m[0]) ?? m[0];
    out += decoded;
    last = m.index + m[0].length;
    lastWasEW = true;
  }
  out += value.slice(last);
  return out;
}

/** Parse an address-list header (To / Cc / Bcc / Reply-To) into a flat email
 *  array. Drops display names. Tolerates a variety of formats:
 *    - `"Name, with comma" <a@b>`  (quoted name with comma)
 *    - `Name <a@b>`                 (bare name)
 *    - `<a@b>` / `a@b`              (no name)
 *    - `Name (a@b)`                 (paren form, Outlook)
 *    - `Name a@b`                   (no bracket bare)
 *    - `Team: a@x, b@y;`            (RFC 5322 group syntax)
 *    - `Name <a@b>; "Other" <c@d>`  (semicolon separator)
 *
 *  Approach: pull every email-like token out of the string with a regex,
 *  then dedupe. We don't try to preserve display names — caller only
 *  needs the raw addresses. */
function parseAddressListHeader(raw: string | undefined): string[] | undefined {
  if (!raw) return undefined;
  const decoded = decodeHeader(raw);
  // 任意の email 様トークンを抽出 (角括弧 / 括弧 / 裸 / RFC グループ全部カバー)。
  // 厳密 RFC 5322 ではなく実運用ヘッダで困らない範囲の緩い regex。
  const tokenRe = /[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}/g;
  const out: string[] = [];
  const seen = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = tokenRe.exec(decoded)) !== null) {
    const addr = m[0].trim();
    const key = addr.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(addr);
  }
  return out.length > 0 ? out : undefined;
}

/** Parse the From header into display-name and email.
 *  Accepts: `"Name" <a@b>`, `Name <a@b>`, `<a@b>`, `a@b`. */
function parseFromHeader(raw: string): { fromName?: string; fromEmail?: string } {
  const decoded = decodeHeader(raw).trim();
  const m = decoded.match(/^(.*?)<([^>]+)>\s*$/);
  if (m) {
    const name = m[1]!.trim().replace(/^"|"$/g, '').trim();
    const email = m[2]!.trim();
    return { fromName: name || undefined, fromEmail: email || undefined };
  }
  if (/^[^@\s]+@[^@\s]+$/.test(decoded)) return { fromEmail: decoded };
  return { fromName: decoded || undefined };
}

/** Parse RFC 2822 Date header → ISO 8601. Browsers' Date.parse handles
 *  RFC 2822 well enough for our use; we just normalize the output. */
function parseDateHeader(raw: string): string | undefined {
  const t = Date.parse(raw.trim());
  if (Number.isNaN(t)) return undefined;
  return new Date(t).toISOString();
}

/** Decode quoted-printable text. Used for headers and bodies. */
function decodeQuotedPrintable(s: string, charset: string): string {
  // Join soft-line-breaks first ('=' at EOL)
  const joined = s.replace(/=\r?\n/g, '');
  const out: number[] = [];
  for (let i = 0; i < joined.length; i++) {
    const ch = joined.charCodeAt(i);
    if (ch === 0x3d /* = */ && i + 2 < joined.length) {
      const hex = joined.slice(i + 1, i + 3);
      if (/^[0-9A-Fa-f]{2}$/.test(hex)) {
        out.push(parseInt(hex, 16));
        i += 2;
        continue;
      }
    }
    if (ch <= 0xff) out.push(ch);
    else {
      // Already-decoded multibyte (shouldn't happen for true QP, but be safe)
      out.push(...new TextEncoder().encode(joined[i]!));
    }
  }
  try {
    return new TextDecoder(charset, { fatal: false }).decode(new Uint8Array(out));
  } catch {
    return new TextDecoder('utf-8', { fatal: false }).decode(new Uint8Array(out));
  }
}

/** Decode base64 body. */
function decodeBase64Body(s: string, charset: string): string {
  try {
    const bin = atob(s.replace(/\s+/g, ''));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder(charset, { fatal: false }).decode(bytes);
  } catch {
    return s;
  }
}

/** Split RFC 822 headers + body. Body may be undefined (header-only). */
function splitHeadersBody(src: string): { headerBlock: string; body: string } {
  // Normalise CRLF/CR → LF for predictable splitting, then look for blank line.
  const norm = src.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const idx = norm.indexOf('\n\n');
  if (idx === -1) return { headerBlock: norm, body: '' };
  return { headerBlock: norm.slice(0, idx), body: norm.slice(idx + 2) };
}

/** Parse the header block into a case-insensitive map. Folds continuation
 *  lines (lines starting with space/tab belong to the previous header). */
function parseHeaders(block: string): Map<string, string> {
  const map = new Map<string, string>();
  const lines = block.split('\n');
  let current: { name: string; value: string } | null = null;
  const flush = (): void => {
    if (!current) return;
    map.set(current.name.toLowerCase(), current.value);
    current = null;
  };
  for (const line of lines) {
    if (/^[ \t]/.test(line) && current) {
      // continuation
      current.value += ' ' + line.trim();
      continue;
    }
    const m = line.match(/^([!-9;-~]+):\s?(.*)$/);
    if (!m) continue;
    flush();
    current = { name: m[1]!, value: m[2]! };
  }
  flush();
  return map;
}

/** Parse Content-Type into { mediaType, params }. */
function parseContentType(raw: string | undefined): { mediaType: string; params: Record<string, string> } {
  if (!raw) return { mediaType: 'text/plain', params: {} };
  const parts = raw.split(';').map(s => s.trim());
  const mediaType = (parts.shift() ?? '').toLowerCase();
  const params: Record<string, string> = {};
  for (const p of parts) {
    const m = p.match(/^([^=]+)=(.*)$/);
    if (!m) continue;
    const key = m[1]!.trim().toLowerCase();
    let val = m[2]!.trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    params[key] = val;
  }
  return { mediaType, params };
}

/** Decode a body part given its headers + raw text. */
function decodeBody(rawBody: string, headers: Map<string, string>): string {
  const ct = parseContentType(headers.get('content-type'));
  const charset = (ct.params['charset'] || 'utf-8').toLowerCase();
  const cte = (headers.get('content-transfer-encoding') || '7bit').toLowerCase();
  if (cte === 'base64') return decodeBase64Body(rawBody, charset);
  if (cte === 'quoted-printable') return decodeQuotedPrintable(rawBody, charset);
  // 7bit / 8bit / binary — assume already a string of the right charset.
  // If charset isn't utf-8, try to re-decode by reinterpreting code units as bytes.
  if (charset !== 'utf-8' && charset !== 'us-ascii' && charset !== 'ascii') {
    try {
      const bytes = new Uint8Array(rawBody.length);
      for (let i = 0; i < rawBody.length; i++) bytes[i] = rawBody.charCodeAt(i) & 0xff;
      return new TextDecoder(charset, { fatal: false }).decode(bytes);
    } catch {
      return rawBody;
    }
  }
  return rawBody;
}

/** Recursively find the first text/plain part in a multipart body.
 *  Returns the decoded text. */
function findTextPart(rawBody: string, ct: { mediaType: string; params: Record<string, string> }, headers: Map<string, string>): string | undefined {
  if (ct.mediaType.startsWith('multipart/')) {
    const boundary = ct.params['boundary'];
    if (!boundary) return undefined;
    const sep = '--' + boundary;
    // Split on the boundary; each part is `headers\n\nbody`.
    const parts = rawBody.split(sep);
    // First chunk is the preamble; last is the closing `--`. Iterate the middle.
    for (let i = 1; i < parts.length; i++) {
      let chunk = parts[i]!;
      if (chunk.startsWith('--')) break; // closing boundary
      // Strip leading \n after the boundary
      chunk = chunk.replace(/^\r?\n/, '');
      const { headerBlock, body: partBody } = splitHeadersBody(chunk);
      const partHeaders = parseHeaders(headerBlock);
      const partCt = parseContentType(partHeaders.get('content-type'));
      if (partCt.mediaType === 'text/plain') {
        return decodeBody(partBody.replace(/\r?\n--$/, ''), partHeaders);
      }
      if (partCt.mediaType.startsWith('multipart/')) {
        const nested = findTextPart(partBody, partCt, partHeaders);
        if (nested) return nested;
      }
    }
    // Fall back to first text/html part if no text/plain found
    for (let i = 1; i < parts.length; i++) {
      let chunk = parts[i]!;
      if (chunk.startsWith('--')) break;
      chunk = chunk.replace(/^\r?\n/, '');
      const { headerBlock, body: partBody } = splitHeadersBody(chunk);
      const partHeaders = parseHeaders(headerBlock);
      const partCt = parseContentType(partHeaders.get('content-type'));
      if (partCt.mediaType === 'text/html') {
        const html = decodeBody(partBody, partHeaders);
        // ★ stripHtmlTags 経由でブロック境界 (<br>/<p>/<div>/<li>) を改行に
        //   揃え、空行増殖を抑える。旧実装は全タグを単純削除していたため
        //   逆に改行が消えて "AB" のような連結に化けていた。
        return stripHtmlTags(html);
      }
    }
    return undefined;
  }
  if (ct.mediaType === 'text/plain') return decodeBody(rawBody, headers);
  if (ct.mediaType === 'text/html') {
    const html = decodeBody(rawBody, headers);
    return stripHtmlTags(html);
  }
  return undefined;
}

/** multipart 内から **生 HTML 部分** を取り出す。findTextPart は HTML を
 *  タグ剥がししてしまうので、別途 HTML をそのまま欲しい場合用。 */
function findHtmlPart(rawBody: string, ct: { mediaType: string; params: Record<string, string> }, headers: Map<string, string>): string | undefined {
  if (ct.mediaType === 'text/html') {
    return decodeBody(rawBody, headers);
  }
  if (ct.mediaType.startsWith('multipart/')) {
    const boundary = ct.params['boundary'];
    if (!boundary) return undefined;
    const sep = '--' + boundary;
    const parts = rawBody.split(sep);
    for (let i = 1; i < parts.length; i++) {
      let chunk = parts[i]!;
      if (chunk.startsWith('--')) break;
      chunk = chunk.replace(/^\r?\n/, '');
      const { headerBlock, body: partBody } = splitHeadersBody(chunk);
      const partHeaders = parseHeaders(headerBlock);
      const partCt = parseContentType(partHeaders.get('content-type'));
      if (partCt.mediaType === 'text/html') {
        return decodeBody(partBody.replace(/\r?\n--$/, ''), partHeaders);
      }
      if (partCt.mediaType.startsWith('multipart/')) {
        const nested = findHtmlPart(partBody, partCt, partHeaders);
        if (nested) return nested;
      }
    }
  }
  return undefined;
}

/** Parse a full `.eml` file content into structured fields. */
export function parseEml(src: string): ParsedEml {
  const { headerBlock, body } = splitHeadersBody(src);
  const headers = parseHeaders(headerBlock);
  const ct = parseContentType(headers.get('content-type'));

  const subjectRaw = headers.get('subject');
  const fromRaw = headers.get('from');
  const dateRaw = headers.get('date');

  const subject = subjectRaw ? decodeHeader(subjectRaw).trim() : undefined;
  const from = fromRaw ? parseFromHeader(fromRaw) : {};
  const dateISO = dateRaw ? parseDateHeader(dateRaw) : undefined;
  const bodyText = findTextPart(body, ct, headers);
  const bodyHtmlRaw = findHtmlPart(body, ct, headers);
  const messageId = headers.get('message-id')?.trim() || undefined;

  return {
    subject,
    fromName: from.fromName,
    fromEmail: from.fromEmail,
    dateISO,
    body: bodyText?.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim(),
    bodyHtml: bodyHtmlRaw?.trim() || undefined,
    internetMessageId: messageId,
    toEmails: parseAddressListHeader(headers.get('to')),
    ccEmails: parseAddressListHeader(headers.get('cc')),
  };
}

// ─── Outlook (Windows) drag-text parser ───────────────────────────────────
//
// Outlook for Windows はメールをブラウザにドラッグした際、`.eml` 本体では
// なく以下のような text/plain だけを渡してくる:
//
//   差出人: 田中太郎 <tanaka@x.com>
//   送信日時: 2026年5月17日 (火) 10:30
//   宛先: someone@y.com
//   件名: テストメール
//
//   (本文)
//
// あるいは英語ロケール:
//
//   From: John Doe <john@x.com>
//   Sent: Monday, May 17, 2026 10:30 AM
//   To: ...
//   Subject: Test email
//
//   (body)
//
// parseEml と同じ ParsedEml シェイプで返し、UI 側 (inbox.ts /
// ticketDetail.ts) からは parseEml と同じ感覚で扱える。

interface HeaderKey {
  canon: 'from' | 'to' | 'cc' | 'subject' | 'sent';
  /** Lowercase aliases that map to this canonical key. */
  aliases: string[];
}
const OUTLOOK_KEYS: HeaderKey[] = [
  { canon: 'from',    aliases: ['from', '差出人', '送信者'] },
  { canon: 'to',      aliases: ['to', '宛先'] },
  { canon: 'cc',      aliases: ['cc'] },
  { canon: 'subject', aliases: ['subject', '件名'] },
  { canon: 'sent',    aliases: ['sent', 'date', '送信日時', '日付'] },
];

function matchHeaderKey(raw: string): HeaderKey['canon'] | null {
  const lc = raw.trim().toLowerCase();
  for (const h of OUTLOOK_KEYS) {
    if (h.aliases.includes(lc)) return h.canon;
  }
  return null;
}

/** 日本語日付「2026年5月17日 (火) 10:30」/「2026年5月17日 10:30」を ISO へ。
 *  曜日カッコ部分は無視。失敗時 undefined。 */
function parseJpDate(s: string): string | undefined {
  const m = s.match(/(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日(?:\s*\([^)]*\))?\s*(?:(\d{1,2}):(\d{2}))?/);
  if (!m) return undefined;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  const h = m[4] ? Number(m[4]) : 0;
  const mi = m[5] ? Number(m[5]) : 0;
  const dt = new Date(y, mo, d, h, mi);
  if (Number.isNaN(dt.getTime())) return undefined;
  return dt.toISOString();
}

/** Outlook drag テキストをパースして ParsedEml に変換する。
 *
 *  実装方針 (堅牢化):
 *  「連続するヘッダ行を上から舐めて空行で終了」だと、Outlook for Windows
 *  が出すテキスト (ヘッダ間に空行が混ざる / メッセージヘッダの上に署名等
 *  非ヘッダが入る等) を取り逃がす。よって 2 パス方式で全行スキャン:
 *    Pass 1: 上から 60 行までを走査して header-shaped な行を全て収集。
 *            既に取れているキーは上書きしない (最初に出てきた値を採用)。
 *    Pass 2: 最後に見つかったヘッダ行の次以降を body 候補とする。
 *            先頭の空行を trim して返す。
 *  これでヘッダの並び順や空行の有無に依存しなくなる。 */
export function parseOutlookDragText(text: string): ParsedEml {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  // 「キー: 値」「キー：値」「キー : 値」「ASCII / 全角コロン両対応」
  // キーは英字 or 日本語 (ひらがな・カタカナ・CJK)。
  const headerRe = /^[ \t]*([A-Za-zぁ-ヿ一-鿿]+)\s*[::]\s*(.*)$/;

  const headers: Partial<Record<HeaderKey['canon'], string>> = {};
  let lastHeaderIdx = -1;
  const scanLimit = Math.min(60, lines.length);

  for (let i = 0; i < scanLimit; i++) {
    const line = lines[i] ?? '';
    const m = headerRe.exec(line);
    if (!m) continue;
    const canon = matchHeaderKey(m[1] ?? '');
    if (!canon) continue;
    // 同じキーが複数あれば最初のものを採用 (= メールヘッダ部分が引用転送
    // の中にも出る可能性があるため、最上部のを優先)。
    if (!headers[canon]) {
      headers[canon] = (m[2] ?? '').trim();
    }
    lastHeaderIdx = Math.max(lastHeaderIdx, i);
  }

  // ヘッダが 1 つも取れなかったら諦めて空シェイプ
  if (!headers.from && !headers.subject) {
    return {};
  }

  // From: 名前 + email 分離
  let fromName: string | undefined;
  let fromEmail: string | undefined;
  if (headers.from) {
    fromName = headers.from;
    // <...@...> 形式
    const angle = headers.from.match(/^(.*?)<([^>]+)>\s*$/);
    if (angle) {
      const name = angle[1]!.trim().replace(/^"|"$/g, '').trim();
      fromName = name || undefined;
      fromEmail = angle[2]!.trim();
    } else {
      // メールアドレスを文字列のどこからでも抽出 (例: "田中太郎 [tanaka@example.com]"
      // や "田中太郎 (tanaka@example.com)" 等の Outlook 派生表記に対応)
      const eml = headers.from.match(/([\w.+-]+@[\w.-]+\.\w+)/);
      if (eml) {
        fromEmail = eml[1];
        // メールアドレス部分を除いた残りを名前として採用
        const stripped = headers.from
          .replace(eml[0]!, '')
          .replace(/[<>[\](){}]+/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        fromName = stripped || undefined;
      } else if (/^[^@\s]+@[^@\s]+$/.test(headers.from)) {
        fromEmail = headers.from;
        fromName = undefined;
      }
    }
  }

  // 日付パース: 日本語 → JS Date.parse → undefined
  let dateISO: string | undefined;
  if (headers.sent) {
    dateISO = parseJpDate(headers.sent);
    if (!dateISO) {
      const t = Date.parse(headers.sent);
      if (!Number.isNaN(t)) dateISO = new Date(t).toISOString();
    }
  }

  // 本文: lastHeaderIdx の次以降。先頭の空行は捨てる。
  let bodyStart = lastHeaderIdx + 1;
  while (bodyStart < lines.length && !(lines[bodyStart] ?? '').trim()) bodyStart++;
  const body = lines.slice(bodyStart).join('\n').replace(/\n+$/, '');

  return {
    subject: headers.subject?.trim(),
    fromName,
    fromEmail,
    dateISO,
    body: body || undefined,
    toEmails: parseAddressListHeader(headers.to),
    ccEmails: parseAddressListHeader(headers.cc),
  };
}

// ─── .msg (Outlook for Windows binary) parser ─────────────────────────────
//
// .msg は OLE Compound File 形式のバイナリで、ブラウザ標準 API では中身を
// 読めないが、@kenjiuno/msgreader が CFB ストリームをデコードして
// senderName / senderEmail / subject / body / clientSubmitTime 等を取得
// してくれる。bundle に約 200KB 追加されるが、Outlook for Windows での
// 件名/送信者/メアド/本文/日時の取得が確実になる。
//
// File オブジェクトを受け取って ParsedEml で返す async 関数 1 本だけ
// export する (lazy import 推奨)。

import MsgReader from '@kenjiuno/msgreader';

export async function parseMsgFile(file: File): Promise<ParsedEml> {
  const buf = await file.arrayBuffer();
  // CJS パッケージの default 取り扱いを esbuild に任せる。dynamic import
  // 経由だと `mod.default.default` で 2 段ネストになるケースがあったため
  // 静的 import に統一。
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Ctor: any = (MsgReader as unknown as { default?: unknown }).default ?? MsgReader;
  const reader = new Ctor(buf);
  const data = reader.getFileData();

  // 送信日時の候補列。msgreader は PT_SYSTIME を .toUTCString() で
  // 文字列化して返すので Date.parse で UTC として解釈できる。優先順:
  //   clientSubmitTime  — 送信者が「送信」を押した時刻 (= 通常の「送信日時」)
  //   messageDeliveryTime — 受信メールボックスへの配信時刻
  //   creationTime / lastModificationTime — 上記が空の保険
  // 1980〜2100 の範囲外なら捨てる (FILETIME 0 や 1601 など壊れた値を排除)。
  const dateCandidates = [
    { key: 'clientSubmitTime',     val: (data as Record<string, unknown>).clientSubmitTime as string | undefined },
    { key: 'messageDeliveryTime',  val: (data as Record<string, unknown>).messageDeliveryTime as string | undefined },
    { key: 'creationTime',         val: (data as Record<string, unknown>).creationTime as string | undefined },
    { key: 'lastModificationTime', val: (data as Record<string, unknown>).lastModificationTime as string | undefined },
  ];
  console.debug('[app/parseMsg] date candidates:', dateCandidates);
  let dateISO: string | undefined;
  for (const c of dateCandidates) {
    if (!c.val || typeof c.val !== 'string') continue;
    const t = Date.parse(c.val);
    if (Number.isNaN(t)) continue;
    const year = new Date(t).getUTCFullYear();
    if (year < 1980 || year > 2100) continue; // FILETIME 0 や 1601 を排除
    dateISO = new Date(t).toISOString();
    console.debug('[app/parseMsg] adopted date:', c.key, '→', dateISO);
    break;
  }

  // HTML 本文の取得:
  //   1) PidTagBodyHtml (data.bodyHtml, 文字列)
  //   2) 無ければ PidTagHtml (data.html, バイナリ) をデコード
  // Outlook の .msg は HTML を 2) のバイナリ側に持つことが多く、1) は空のことが
  // あるため、2) を必ずフォールバックで見る (見ないと plain に落ちて二重改行になる)。
  let bodyHtml: string | undefined = data.bodyHtml?.trim() || undefined;
  if (!bodyHtml) {
    const htmlBytes = (data as { html?: unknown }).html;
    if (htmlBytes instanceof Uint8Array && htmlBytes.length) {
      let raw = new TextDecoder('utf-8').decode(htmlBytes);
      // charset が meta で指定され、かつ UTF-8 以外ならその charset で再デコード。
      const cm = raw.match(/charset\s*=\s*["']?([\w-]+)/i);
      if (cm && cm[1] && !/utf-?8/i.test(cm[1])) {
        try { raw = new TextDecoder(cm[1].toLowerCase()).decode(htmlBytes); } catch { /* 非対応 charset は UTF-8 のまま */ }
      }
      bodyHtml = raw.trim() || undefined;
    }
  }

  // 本文 (plain): body を優先、なければ bodyHtml から tag を剥がしてテキスト化。
  let body: string | undefined = data.body?.trim() || undefined;
  if (!body && bodyHtml) {
    body = stripHtmlTags(bodyHtml).trim() || undefined;
  }

  // SenderEmail は SMTP アドレスでなく EX アドレス (/o=ExchangeLabs/...) で
  // 来る場合がある。@ が無ければ sentRepresentingSmtpAddress や
  // senderSmtpAddress, recipients[0]?.smtpAddress を fallback で見る。
  // 旧実装は @ が無いだけで即 undefined にしていたため、Exchange 由来 .msg で
  // fromEmail が丸ごと欠落していた。
  const senderEx = (data as Record<string, unknown>).senderEmail;
  const senderSmtp = (data as Record<string, unknown>).senderSmtpAddress
    ?? (data as Record<string, unknown>).sentRepresentingSmtpAddress;
  let fromEmail: string | undefined;
  if (typeof senderSmtp === 'string' && /@/.test(senderSmtp)) {
    fromEmail = senderSmtp.trim();
  } else if (typeof senderEx === 'string' && /@/.test(senderEx)) {
    fromEmail = senderEx.trim();
  }

  // Message-ID: msgreader が internetMessageId を露出すればそれを、無ければ
  // 生のトランスポートヘッダ (PR_TRANSPORT_MESSAGE_HEADERS) から抽出する。
  const rec = data as Record<string, unknown>;
  let internetMessageId: string | undefined;
  const mid = rec.internetMessageId;
  if (typeof mid === 'string' && mid.trim()) {
    internetMessageId = mid.trim();
  } else {
    const rawHeaders = rec.headers;
    if (typeof rawHeaders === 'string' && rawHeaders) {
      const m = rawHeaders.match(/^message-id:\s*(<[^>\r\n]+>)/im);
      if (m) internetMessageId = m[1]!.trim();
    }
  }

  // .msg の To / Cc 受信者:
  //   msgreader は data.recipients = [{ recipType: 'to' | 'cc' | 'bcc', email, name }, ...]
  //   を返す (recipType は version によっては数値 1=To/2=Cc/3=Bcc)。
  //   transport headers から To: / Cc: を fallback で見るとさらに確実。
  let toEmails: string[] | undefined;
  let ccEmails: string[] | undefined;
  const recips = (data as { recipients?: unknown }).recipients;
  if (Array.isArray(recips)) {
    const toList: string[] = [];
    const ccList: string[] = [];
    for (const r of recips) {
      if (!r || typeof r !== 'object') continue;
      const rec = r as { recipType?: unknown; email?: unknown; smtpAddress?: unknown };
      // EX 形式 (例 '/o=ExchangeLabs/...') が email に入っているケースを救うため、
      // smtpAddress を先に見る → 無ければ email。両方共 @ 無しなら捨てる。
      const smtpCandidate = String(rec.smtpAddress ?? '').trim();
      const emailCandidate = String(rec.email ?? '').trim();
      let e = '';
      if (smtpCandidate && /@/.test(smtpCandidate)) e = smtpCandidate;
      else if (emailCandidate && /@/.test(emailCandidate)) e = emailCandidate;
      else continue;
      const rt = rec.recipType;
      const isCc = (typeof rt === 'string' && rt.toLowerCase() === 'cc')
                || (typeof rt === 'number' && rt === 2);
      const isTo = (typeof rt === 'string' && rt.toLowerCase() === 'to')
                || (typeof rt === 'number' && rt === 1);
      if (isCc) ccList.push(e);
      else if (isTo) toList.push(e);
      // bcc / unknown は無視
    }
    if (toList.length > 0) toEmails = toList;
    if (ccList.length > 0) ccEmails = ccList;
  }
  // Fallback: transport headers
  if ((!toEmails || !ccEmails)) {
    const rawHeaders = rec.headers;
    if (typeof rawHeaders === 'string' && rawHeaders) {
      if (!toEmails) {
        const m = rawHeaders.match(/^to:\s*([^\r\n]+(?:\r?\n[ \t][^\r\n]+)*)/im);
        toEmails = parseAddressListHeader(m?.[1]);
      }
      if (!ccEmails) {
        const m = rawHeaders.match(/^cc:\s*([^\r\n]+(?:\r?\n[ \t][^\r\n]+)*)/im);
        ccEmails = parseAddressListHeader(m?.[1]);
      }
    }
  }

  return {
    subject: data.subject?.trim() || undefined,
    fromName: data.senderName?.trim() || undefined,
    fromEmail,
    dateISO,
    body,
    bodyHtml,
    internetMessageId,
    toEmails,
    ccEmails,
  };
}

/** 簡易 HTML タグ剥がし。bodyHtml だけ取れて plain text が無い時の
 *  フォールバック用。`<style>` `<script>` ブロック丸ごと除去後、
 *  改行系タグを `\n` に置換してからタグ全削除。
 *
 *  ★ Outlook HTML は「1 行 = 1 つの <p>」で記述されることが多いので
 *    </p> は \n (1 改行) で十分。3 連改行を 2 連に圧縮して空行が増殖
 *    するのを防ぐ。trailing whitespace + 行末 \r も掃除。 */
/** プレーンテキスト本文を textarea に流す前に正規化する共通ユーティリティ。
 *  - \r\n / \r を \n に統一
 *  - 行末の trailing whitespace を削除
 *  - ★ 「double-spaced」検出: HTML メール由来の text/plain は「実行 → 空行
 *    → 実行 → 空行 …」と毎行に空行が入ることが多い。非空行とその直後の
 *    空行の組合せが 70% 超なら double-spaced と判定して全空行を collapse。
 *    そうでない場合は段落間の空行は 1 個まで残す。
 *
 *  inbox / ticketDetail の eml/msg ドラッグ取込で共通利用。 */
export function normalizeMailPlainText(s: string): string {
  let t = s
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+\n/g, '\n');
  const lines = t.split('\n');
  let contentCount = 0;
  let followedByBlankCount = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i]!.trim()) {
      contentCount++;
      if (i + 1 < lines.length && !lines[i + 1]!.trim()) {
        followedByBlankCount++;
      }
    }
  }
  const isDoubleSpaced = contentCount >= 3 && (followedByBlankCount / contentCount) >= 0.7;
  if (isDoubleSpaced) {
    t = t.replace(/\n\s*\n+/g, '\n');
  } else {
    t = t.replace(/\n{3,}/g, '\n\n');
  }
  return t.trim();
}

function stripHtmlTags(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    // ★ ブロック要素を改行に変換する 3 段階。
    //   注意: 開きタグ削除で「前段 step が入れた \n」を eat しないように、
    //   開きタグの regex には先頭 \s* を入れない (= 旧版バグの原因)。
    //   1. 閉じタグ + 後続の \s* → \n (= 元 HTML の改行も飲み込んで重複防止)
    //   2. <br> + 周囲 \s* → \n
    //   3. 開きタグ + 後続の \s* → '' (前段の \n は保護)
    .replace(/<\/(p|div|li|tr|h[1-6])>\s*/gi, '\n')
    .replace(/\s*<br\s*\/?>\s*/gi, '\n')
    .replace(/<(p|div|li|tr|h[1-6])[^>]*>\s*/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n');
}
