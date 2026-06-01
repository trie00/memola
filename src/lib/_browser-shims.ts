// ブラウザバンドルから Node 専用モジュール (`buffer` / `string_decoder` /
// `iconv-lite` / `safer-buffer`) を排除するための空スタブ。
//
// @kenjiuno/msgreader が依存している iconv-lite は非 Unicode 文字コード
// 変換用 (PT_STRING8 など)。現代の Outlook for Windows .msg はほぼ
// Unicode (PT_UNICODE) なので、iconv-lite を呼ばずにパース可能。
// 万一呼ばれたら例外で落ちて msg パース失敗 → text/plain 経路に
// フォールバックする (UI 側で handle 済み)。
//
// esbuild の `alias` 設定で上記モジュールをこのファイルへ差し替える。

// iconv-lite-likes interface (最小限)
export function encode(_str: string, _encoding: string): Uint8Array {
  throw new Error('iconv-lite (encode) is not available in browser build');
}
export function decode(buf: Uint8Array, encoding: string): string {
  // TextDecoder で扱える ASCII 互換系のみベストエフォートで対応
  try {
    return new TextDecoder(encoding).decode(buf);
  } catch {
    return new TextDecoder('utf-8', { fatal: false }).decode(buf);
  }
}
export function encodingExists(_encoding: string): boolean { return false; }

// `Buffer` 最低限 (msgreader が Buffer.isBuffer 等を呼ぶ可能性に備える)
export const Buffer = {
  isBuffer: (_v: unknown): boolean => false,
  from: (v: ArrayBuffer | Uint8Array | string): Uint8Array => {
    if (typeof v === 'string') return new TextEncoder().encode(v);
    if (v instanceof Uint8Array) return v;
    return new Uint8Array(v as ArrayBuffer);
  },
};

// `StringDecoder` 最低限
export class StringDecoder {
  private enc: string;
  constructor(encoding = 'utf-8') { this.enc = encoding; }
  write(buf: Uint8Array): string {
    try { return new TextDecoder(this.enc).decode(buf); }
    catch { return new TextDecoder('utf-8').decode(buf); }
  }
  end(): string { return ''; }
}

// default export (CJS interop)
const _default = { encode, decode, encodingExists, Buffer, StringDecoder };
export default _default;
