// CSV import / export for the active database.

import { S } from '../state';
import { toast, setLoad } from './ui-helpers';
import { addListField, getListFields, getListItems, createListItem } from '../api/sp-list';
import { renderDbTable } from './views';
import { listFormulas } from './db-formulas';
import { listLookups, getLookupValue } from './db-lookups';
import { evalFormula, formatFormulaValue } from '../lib/formula';

function csvEscape(v: unknown): string {
  if (v == null) return '';
  const s = String(v);
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = '';
  let inQuote = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuote) {
      if (c === '"') {
        if (text[i + 1] === '"') { cur += '"'; i++; }
        else inQuote = false;
      } else cur += c;
    } else {
      if (c === '"') inQuote = true;
      else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\r') { /* skip */ }
      else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
      else cur += c;
    }
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.length > 0));
}

export function exportCsv(): void {
  if (!S.dbList) { toast('DBが選択されていません', 'err'); return; }
  const fields = S.dbFields.filter((f) => [2, 4, 6, 8, 9].includes(f.FieldTypeKind));
  // 数式列・参照列(読み取り専用の計算列)も末尾に出力。各行で評価した値を入れる。
  const formulas = listFormulas(S.dbList);
  const lookups = listLookups(S.dbList);
  const header = [...fields.map((f) => f.Title), ...formulas.map((d) => d.name), ...lookups.map((d) => d.name)]
    .map(csvEscape).join(',');
  const rows = S.dbItems.map((item) => {
    const cells = fields.map((f) => csvEscape(item[f.InternalName]));
    if (formulas.length) {
      const propFn = (name: string): unknown => {
        const f = S.dbFields.find((x) => x.Title === name || x.InternalName === name);
        return f ? item[f.InternalName] : null;
      };
      for (const d of formulas) {
        const { value, error } = evalFormula(d.expr, propFn);
        cells.push(csvEscape(error ? '' : formatFormulaValue(value)));
      }
    }
    for (const d of lookups) cells.push(csvEscape(getLookupValue(d.id, item[d.keyField])));
    return cells.join(',');
  });
  const csv = '﻿' + [header, ...rows].join('\n');     // BOM for Excel
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (S.dbList || 'database') + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('CSVをダウンロードしました');
}

export function importCsv(): void {
  if (!S.dbList) { toast('DBが選択されていません', 'err'); return; }
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv,text/csv';
  input.addEventListener('change', async () => {
    const file = input.files?.[0];
    if (!file) return;
    const text = await file.text();
    const rows = parseCsv(text);
    if (rows.length < 1) { toast('空のCSVです', 'err'); return; }
    const headers = rows[0].map((h) => h.replace(/^﻿/, '').trim());
    const dataRows = rows.slice(1);

    if (!confirm(headers.length + ' 列 × ' + dataRows.length + ' 行 をインポートします。よろしいですか？')) return;

    try {
      setLoad(true, 'インポート中... (列を準備)');
      // Ensure each header exists as a Text column (skip Title which already exists)
      const existing = new Set(S.dbFields.map((f) => f.Title));
      for (const h of headers) {
        if (h && !existing.has(h) && h !== 'Title') {
          await addListField(S.dbList, h, 2);
        }
      }
      // Refresh fields to get InternalName mapping for the new columns
      const { stripInternalDbFields } = await import('../api/db');
      S.dbFields = stripInternalDbFields(await getListFields(S.dbList));
      const titleToInternal: Record<string, string> = {};
      S.dbFields.forEach((f) => { titleToInternal[f.Title] = f.InternalName; });

      setLoad(true, '行をインポート中... (0/' + dataRows.length + ')');
      let done = 0;
      for (const row of dataRows) {
        const data: Record<string, unknown> = {};
        headers.forEach((h, idx) => {
          const internal = titleToInternal[h];
          if (!internal) return;
          const val = row[idx] || '';
          if (val) data[internal] = val;
        });
        if (Object.keys(data).length === 0) continue;
        if (!data.Title && data[titleToInternal['Title']] === undefined) data.Title = '(無題)';
        await createListItem(S.dbList, data);
        done++;
        if (done % 5 === 0) setLoad(true, '行をインポート中... (' + done + '/' + dataRows.length + ')');
      }
      S.dbItems = await getListItems(S.dbList);
      renderDbTable();
      toast(done + ' 行インポートしました');
    } catch (e) { toast('インポート失敗: ' + (e as Error).message, 'err'); }
    finally { setLoad(false); }
  });
  input.click();
}
