// DB「数式」列の評価エンジン(Notion Formula のサブセット)。
//   - prop("列名") で同じ行の他列を参照
//   - 演算子: + - * / %  == != < <= > >=  && || !  三項 ?:
//   - 関数: if/ifs/and/or/not/empty, concat/join/lower/upper/trim/length/
//           contains/replace/slice, round/floor/ceil/abs/sqrt/mod/min/max/
//           pow/sign/toNumber, now/today/dateAdd/dateSubtract/dateBetween/
//           formatDate/year/month/day/hour/minute, format
// 各行で評価する読み取り専用。値は保存しない(Notion と同じ)。

export type FormulaValue = number | string | boolean | Date | null;

// ── Tokenizer ────────────────────────────────────────────
type Tok = { t: 'num' | 'str' | 'id' | 'op'; v: string };

function tokenize(src: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  const n = src.length;
  const isIdStart = (c: string): boolean => /[A-Za-z_]/.test(c);
  const isId = (c: string): boolean => /[A-Za-z0-9_]/.test(c);
  while (i < n) {
    const c = src[i];
    if (c === ' ' || c === '\t' || c === '\n' || c === '\r') { i++; continue; }
    if (c >= '0' && c <= '9') {
      let j = i + 1;
      while (j < n && /[0-9.]/.test(src[j])) j++;
      toks.push({ t: 'num', v: src.slice(i, j) }); i = j; continue;
    }
    if (c === '"' || c === "'") {
      const q = c; let j = i + 1; let s = '';
      while (j < n && src[j] !== q) {
        if (src[j] === '\\' && j + 1 < n) { s += src[j + 1]; j += 2; }
        else { s += src[j]; j++; }
      }
      j++; // closing quote
      toks.push({ t: 'str', v: s }); i = j; continue;
    }
    if (isIdStart(c)) {
      let j = i + 1;
      while (j < n && isId(src[j])) j++;
      toks.push({ t: 'id', v: src.slice(i, j) }); i = j; continue;
    }
    // multi-char operators
    const two = src.slice(i, i + 2);
    if (two === '==' || two === '!=' || two === '<=' || two === '>=' || two === '&&' || two === '||') {
      toks.push({ t: 'op', v: two }); i += 2; continue;
    }
    if ('+-*/%(),?:<>!'.includes(c)) { toks.push({ t: 'op', v: c }); i++; continue; }
    throw new Error('不正な文字: ' + c);
  }
  return toks;
}

// ── Parser (AST) ─────────────────────────────────────────
type Node =
  | { k: 'num'; v: number }
  | { k: 'str'; v: string }
  | { k: 'bool'; v: boolean }
  | { k: 'null' }
  | { k: 'prop'; name: string }
  | { k: 'un'; op: string; a: Node }
  | { k: 'bin'; op: string; a: Node; b: Node }
  | { k: 'tern'; c: Node; a: Node; b: Node }
  | { k: 'call'; name: string; args: Node[] };

function parse(toks: Tok[]): Node {
  let p = 0;
  const peek = (): Tok | undefined => toks[p];
  const next = (): Tok => toks[p++];
  // 演算子/キーワードの照合はトークン種別も見る("-" 等の文字列を演算子と誤認しない)。
  const isOp = (v: string): boolean => { const t = peek(); return !!t && t.t === 'op' && t.v === v; };
  const isOpIn = (vs: string[]): boolean => { const t = peek(); return !!t && t.t === 'op' && vs.includes(t.v); };
  const isKw = (v: string): boolean => { const t = peek(); return !!t && t.t === 'id' && t.v === v; };
  const eat = (v: string): void => { const t = next(); if (!t || t.t !== 'op' || t.v !== v) throw new Error('「' + v + '」が必要です'); };

  function parseExpr(): Node { return ternary(); }
  function ternary(): Node {
    const c = or();
    if (isOp('?')) { next(); const a = parseExpr(); eat(':'); const b = parseExpr(); return { k: 'tern', c, a, b }; }
    return c;
  }
  function or(): Node { let a = and(); while (isOp('||') || isKw('or')) { next(); a = { k: 'bin', op: '||', a, b: and() }; } return a; }
  function and(): Node { let a = eq(); while (isOp('&&') || isKw('and')) { next(); a = { k: 'bin', op: '&&', a, b: eq() }; } return a; }
  function eq(): Node { let a = cmp(); while (isOpIn(['==', '!='])) { const op = next().v; a = { k: 'bin', op, a, b: cmp() }; } return a; }
  function cmp(): Node { let a = add(); while (isOpIn(['<', '<=', '>', '>='])) { const op = next().v; a = { k: 'bin', op, a, b: add() }; } return a; }
  function add(): Node { let a = mul(); while (isOpIn(['+', '-'])) { const op = next().v; a = { k: 'bin', op, a, b: mul() }; } return a; }
  function mul(): Node { let a = unary(); while (isOpIn(['*', '/', '%'])) { const op = next().v; a = { k: 'bin', op, a, b: unary() }; } return a; }
  function unary(): Node {
    if (isOp('-') || isOp('!')) { const op = next().v; return { k: 'un', op, a: unary() }; }
    if (isKw('not')) { next(); return { k: 'un', op: '!', a: unary() }; }
    return primary();
  }
  function primary(): Node {
    const t = next();
    if (!t) throw new Error('式が途中で終了しました');
    if (t.t === 'num') return { k: 'num', v: parseFloat(t.v) };
    if (t.t === 'str') return { k: 'str', v: t.v };
    if (t.t === 'op' && t.v === '(') { const e = parseExpr(); eat(')'); return e; }
    if (t.t === 'id') {
      const name = t.v;
      if (name === 'true') return { k: 'bool', v: true };
      if (name === 'false') return { k: 'bool', v: false };
      if (name === 'null') return { k: 'null' };
      // function call
      if (isOp('(')) {
        next();
        const args: Node[] = [];
        if (!isOp(')')) {
          args.push(parseExpr());
          while (isOp(',')) { next(); args.push(parseExpr()); }
        }
        eat(')');
        if (name === 'prop') {
          const a0 = args[0];
          if (!a0 || a0.k !== 'str') throw new Error('prop() には列名(文字列)を渡してください');
          return { k: 'prop', name: a0.v };
        }
        return { k: 'call', name, args };
      }
      throw new Error('未知の識別子: ' + name + '（列参照は prop("名前") を使ってください）');
    }
    throw new Error('予期しないトークン: ' + t.v);
  }

  const ast = parseExpr();
  if (p < toks.length) throw new Error('式の末尾に余分な記号: ' + toks[p].v);
  return ast;
}

// ── Coercion ─────────────────────────────────────────────
function toNum(v: FormulaValue): number {
  if (typeof v === 'number') return v;
  if (typeof v === 'boolean') return v ? 1 : 0;
  if (v instanceof Date) return v.getTime();
  if (v == null) return NaN;
  const s = String(v).trim().replace(/,/g, '');
  return s === '' ? NaN : Number(s);
}
function toStr(v: FormulaValue): string {
  if (v == null) return '';
  if (v instanceof Date) return fmtDate(v, 'YYYY-MM-DD');
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  return String(v);
}
function toBool(v: FormulaValue): boolean {
  if (typeof v === 'boolean') return v;
  if (v == null) return false;
  if (typeof v === 'number') return v !== 0 && !isNaN(v);
  if (v instanceof Date) return true;
  const s = String(v).trim().toLowerCase();
  return s !== '' && s !== 'false' && s !== '0';
}
function toDate(v: FormulaValue): Date | null {
  if (v instanceof Date) return isNaN(v.getTime()) ? null : v;
  if (typeof v === 'number') { const d = new Date(v); return isNaN(d.getTime()) ? null : d; }
  if (v == null || v === '') return null;
  const d = new Date(String(v));
  return isNaN(d.getTime()) ? null : d;
}
function isNumericish(v: FormulaValue): boolean {
  if (typeof v === 'number') return !isNaN(v);
  if (typeof v === 'string') { const s = v.trim().replace(/,/g, ''); return s !== '' && !isNaN(Number(s)); }
  return false;
}

function fmtDate(d: Date, fmt: string): string {
  const p2 = (n: number): string => (n < 10 ? '0' + n : String(n));
  return fmt
    .replace(/YYYY/g, String(d.getFullYear()))
    .replace(/MM/g, p2(d.getMonth() + 1))
    .replace(/DD/g, p2(d.getDate()))
    .replace(/HH/g, p2(d.getHours()))
    .replace(/mm/g, p2(d.getMinutes()));
}

const DAY = 86400000;
function dateDiff(a: Date, b: Date, unit: string): number {
  const ms = a.getTime() - b.getTime();
  switch ((unit || 'days').toLowerCase()) {
    case 'minutes': return Math.trunc(ms / 60000);
    case 'hours': return Math.trunc(ms / 3600000);
    case 'weeks': return Math.trunc(ms / (DAY * 7));
    case 'months': return (a.getFullYear() - b.getFullYear()) * 12 + (a.getMonth() - b.getMonth());
    case 'years': return a.getFullYear() - b.getFullYear();
    case 'days':
    default: return Math.trunc(ms / DAY);
  }
}
function dateShift(d: Date, n: number, unit: string, sign: number): Date {
  const r = new Date(d.getTime());
  const k = sign * n;
  switch ((unit || 'days').toLowerCase()) {
    case 'minutes': r.setMinutes(r.getMinutes() + k); break;
    case 'hours': r.setHours(r.getHours() + k); break;
    case 'weeks': r.setDate(r.getDate() + k * 7); break;
    case 'months': r.setMonth(r.getMonth() + k); break;
    case 'years': r.setFullYear(r.getFullYear() + k); break;
    case 'days':
    default: r.setDate(r.getDate() + k); break;
  }
  return r;
}

// ── Evaluator ────────────────────────────────────────────
function evalNode(node: Node, prop: (name: string) => FormulaValue): FormulaValue {
  switch (node.k) {
    case 'num': return node.v;
    case 'str': return node.v;
    case 'bool': return node.v;
    case 'null': return null;
    case 'prop': return prop(node.name);
    case 'un': {
      const a = evalNode(node.a, prop);
      return node.op === '!' ? !toBool(a) : -toNum(a);
    }
    case 'tern': return toBool(evalNode(node.c, prop)) ? evalNode(node.a, prop) : evalNode(node.b, prop);
    case 'bin': return evalBin(node.op, evalNode(node.a, prop), evalNode(node.b, prop));
    case 'call': return callFn(node.name, node.args.map((a) => evalNode(a, prop)));
  }
}

function evalBin(op: string, a: FormulaValue, b: FormulaValue): FormulaValue {
  switch (op) {
    case '+':
      if (isNumericish(a) && isNumericish(b)) return toNum(a) + toNum(b);
      return toStr(a) + toStr(b);   // 文字列なら連結
    case '-': return toNum(a) - toNum(b);
    case '*': return toNum(a) * toNum(b);
    case '/': return toNum(a) / toNum(b);
    case '%': return toNum(a) % toNum(b);
    case '&&': return toBool(a) && toBool(b);
    case '||': return toBool(a) || toBool(b);
    case '==': return eqVal(a, b);
    case '!=': return !eqVal(a, b);
    case '<': case '<=': case '>': case '>=': {
      const num = isNumericish(a) && isNumericish(b);
      const x = num ? toNum(a) : toStr(a);
      const y = num ? toNum(b) : toStr(b);
      if (op === '<') return x < y; if (op === '<=') return x <= y;
      if (op === '>') return x > y; return x >= y;
    }
  }
  return null;
}
function eqVal(a: FormulaValue, b: FormulaValue): boolean {
  if (isNumericish(a) && isNumericish(b)) return toNum(a) === toNum(b);
  return toStr(a) === toStr(b);
}

function callFn(name: string, a: FormulaValue[]): FormulaValue {
  const num = (i: number): number => toNum(a[i]);
  switch (name) {
    // 論理
    case 'if': return toBool(a[0]) ? a[1] ?? null : a[2] ?? null;
    case 'ifs': {
      for (let i = 0; i + 1 < a.length; i += 2) if (toBool(a[i])) return a[i + 1];
      return a.length % 2 === 1 ? a[a.length - 1] : null;   // 末尾の else
    }
    case 'and': return a.every(toBool);
    case 'or': return a.some(toBool);
    case 'not': return !toBool(a[0]);
    case 'empty': { const v = a[0]; return v == null || v === '' || (typeof v === 'number' && isNaN(v)); }
    // 文字列
    case 'concat': return a.map(toStr).join('');
    case 'join': return a.slice(1).map(toStr).join(toStr(a[0]));
    case 'lower': return toStr(a[0]).toLowerCase();
    case 'upper': return toStr(a[0]).toUpperCase();
    case 'trim': return toStr(a[0]).trim();
    case 'length': return toStr(a[0]).length;
    case 'contains': return toStr(a[0]).includes(toStr(a[1]));
    case 'replace': return toStr(a[0]).replace(toStr(a[1]), toStr(a[2]));
    case 'replaceAll': return toStr(a[0]).split(toStr(a[1])).join(toStr(a[2]));
    case 'slice': return toStr(a[0]).slice(num(1), a[2] == null ? undefined : num(2));
    case 'substring': return toStr(a[0]).substring(num(1), a[2] == null ? undefined : num(2));
    case 'format': return toStr(a[0]);
    // 数値
    case 'round': { const d = a[1] == null ? 0 : num(1); const m = Math.pow(10, d); return Math.round(num(0) * m) / m; }
    case 'floor': return Math.floor(num(0));
    case 'ceil': return Math.ceil(num(0));
    case 'abs': return Math.abs(num(0));
    case 'sqrt': return Math.sqrt(num(0));
    case 'pow': return Math.pow(num(0), num(1));
    case 'mod': return num(0) % num(1);
    case 'sign': return Math.sign(num(0));
    case 'min': return Math.min(...a.map(toNum));
    case 'max': return Math.max(...a.map(toNum));
    case 'toNumber': return toNum(a[0]);
    // 日付
    case 'now': return new Date();
    case 'today': { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }
    case 'dateAdd': { const d = toDate(a[0]); return d ? dateShift(d, num(1), toStr(a[2]), 1) : null; }
    case 'dateSubtract': { const d = toDate(a[0]); return d ? dateShift(d, num(1), toStr(a[2]), -1) : null; }
    case 'dateBetween': { const x = toDate(a[0]); const y = toDate(a[1]); return x && y ? dateDiff(x, y, toStr(a[2])) : null; }
    case 'formatDate': { const d = toDate(a[0]); return d ? fmtDate(d, toStr(a[1]) || 'YYYY-MM-DD') : ''; }
    case 'year': { const d = toDate(a[0]); return d ? d.getFullYear() : null; }
    case 'month': { const d = toDate(a[0]); return d ? d.getMonth() + 1 : null; }
    case 'day': { const d = toDate(a[0]); return d ? d.getDate() : null; }
    case 'hour': { const d = toDate(a[0]); return d ? d.getHours() : null; }
    case 'minute': { const d = toDate(a[0]); return d ? d.getMinutes() : null; }
    default: throw new Error('未知の関数: ' + name);
  }
}

// ── Public API (compiled AST cache) ──────────────────────
const _cache = new Map<string, Node | { err: string }>();
function compile(expr: string): Node | { err: string } {
  let c = _cache.get(expr);
  if (c) return c;
  try { c = parse(tokenize(expr)); }
  catch (e) { c = { err: (e as Error).message }; }
  _cache.set(expr, c);
  return c;
}

/** 式を1行ぶん評価。prop は列名(表示名/内部名)→値。 */
export function evalFormula(expr: string, prop: (name: string) => unknown): { value: FormulaValue; error?: string } {
  const ast = compile(expr);
  if ('err' in ast) return { value: null, error: ast.err };
  try {
    const v = evalNode(ast, (n) => (prop(n) as FormulaValue) ?? null);
    return { value: v };
  } catch (e) { return { value: null, error: (e as Error).message }; }
}

/** 構文チェックのみ(エディタ用)。OK なら null、NG ならエラーメッセージ。 */
export function checkFormula(expr: string): string | null {
  const ast = compile(expr);
  return 'err' in ast ? ast.err : null;
}

/** 表示用の文字列化。 */
export function formatFormulaValue(v: FormulaValue): string {
  if (v == null) return '';
  if (typeof v === 'number') {
    if (isNaN(v)) return '';
    return Number.isInteger(v) ? String(v) : String(Math.round(v * 1e6) / 1e6);
  }
  if (typeof v === 'boolean') return v ? '✓' : '';
  if (v instanceof Date) return fmtDate(v, v.getHours() || v.getMinutes() ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD');
  return String(v);
}
