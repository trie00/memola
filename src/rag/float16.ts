// Float16 (half precision) <-> Base64 変換 (ExtVec より移植)。
// 埋め込みベクトルを SharePoint Document Library のテキストファイルに詰める
// ためのエンコード。1 ベクトル ≒ dims*2 バイト → Base64 で約 700B (256 次元)。

/** number (f32) を IEEE 754 half-precision の 16bit 整数表現へ。 */
export function f32ToF16Bits(value: number): number {
  const f32 = new Float32Array(1);
  const i32 = new Int32Array(f32.buffer);
  f32[0] = value;
  const x = i32[0];

  const sign = (x >>> 16) & 0x8000;
  let exp = ((x >>> 23) & 0xff) - 127 + 15;
  let mant = x & 0x7fffff;

  if (exp <= 0) {
    if (exp < -10) return sign;
    mant = (mant | 0x800000) >> (1 - exp);
    return sign | (mant >> 13);
  }
  if (exp >= 0x1f) {
    return sign | 0x7c00;
  }
  return sign | (exp << 10) | (mant >> 13);
}

/** half-precision 16bit 整数表現 → number (f32)。 */
export function f16BitsToF32(h: number): number {
  const sign = (h & 0x8000) << 16;
  const exp = (h & 0x7c00) >> 10;
  const mant = h & 0x03ff;

  let bits: number;
  if (exp === 0) {
    if (mant === 0) {
      bits = sign;
    } else {
      let e = -1;
      let m = mant;
      do { e++; m <<= 1; } while ((m & 0x400) === 0);
      m &= 0x03ff;
      bits = sign | ((e + 127 - 15 + 1) << 23) | (m << 13);
    }
  } else if (exp === 0x1f) {
    bits = sign | 0x7f800000 | (mant << 13);
  } else {
    bits = sign | ((exp - 15 + 127) << 23) | (mant << 13);
  }
  const i32 = new Int32Array(1);
  const f32 = new Float32Array(i32.buffer);
  i32[0] = bits;
  return f32[0];
}

/** Float32Array (埋め込み) → Base64 文字列 (Float16 で格納)。 */
export function encodeEmbedding(vec: Float32Array | number[]): string {
  const u16 = new Uint16Array(vec.length);
  for (let i = 0; i < vec.length; i++) u16[i] = f32ToF16Bits(vec[i]);
  const bytes = new Uint8Array(u16.buffer);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

/** Base64 文字列 → Float32Array (検索時に展開)。 */
export function decodeEmbedding(b64: string): Float32Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const u16 = new Uint16Array(bytes.buffer);
  const out = new Float32Array(u16.length);
  for (let i = 0; i < u16.length; i++) out[i] = f16BitsToF32(u16[i]);
  return out;
}

/** L2 正規化したコピーを返す (cosine をドット積で計算するため)。 */
export function normalize(v: Float32Array): Float32Array {
  let norm = 0;
  for (let i = 0; i < v.length; i++) norm += v[i] * v[i];
  norm = Math.sqrt(norm);
  if (norm === 0) return v;
  const out = new Float32Array(v.length);
  for (let i = 0; i < v.length; i++) out[i] = v[i] / norm;
  return out;
}
