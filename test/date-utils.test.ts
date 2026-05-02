import { describe, it, expect } from 'vitest';
import { parseFlexibleDate, formatDateJST } from '../src/lib/date-utils';

describe('parseFlexibleDate', () => {
  it('accepts compact YYYYMMDD', () => {
    expect(parseFlexibleDate('20260515')).toBe('2026-05-15');
  });
  it('accepts hyphen YYYY-MM-DD', () => {
    expect(parseFlexibleDate('2026-05-15')).toBe('2026-05-15');
  });
  it('accepts slash YYYY/MM/DD', () => {
    expect(parseFlexibleDate('2026/05/15')).toBe('2026-05-15');
  });
  it('accepts dot YYYY.MM.DD', () => {
    expect(parseFlexibleDate('2026.05.15')).toBe('2026-05-15');
  });
  it('zero-pads single-digit month/day', () => {
    expect(parseFlexibleDate('2026-5-9')).toBe('2026-05-09');
    expect(parseFlexibleDate('2026/5/9')).toBe('2026-05-09');
  });
  it('rejects invalid calendar dates', () => {
    expect(parseFlexibleDate('2026-02-30')).toBeNull();
    expect(parseFlexibleDate('2026-13-01')).toBeNull();
  });
  it('rejects garbage', () => {
    expect(parseFlexibleDate('hello')).toBeNull();
    expect(parseFlexibleDate('')).toBeNull();
    expect(parseFlexibleDate('2026')).toBeNull();
    expect(parseFlexibleDate(null)).toBeNull();
  });
});

describe('formatDateJST', () => {
  it('passes through plain YYYY-MM-DD', () => {
    expect(formatDateJST('2026-05-15')).toBe('2026-05-15');
  });
  it('converts UTC ISO to JST date', () => {
    // 2026-05-14T15:00:00Z is JST 2026-05-15 00:00
    expect(formatDateJST('2026-05-14T15:00:00.000Z')).toBe('2026-05-15');
  });
  it('returns empty for invalid input', () => {
    expect(formatDateJST('')).toBe('');
    expect(formatDateJST(null)).toBe('');
    expect(formatDateJST('garbage')).toBe('');
  });
});
