// 条件付き行色(色分けルール)のエディタ。ユーザー作成ビューのみ。
//   条件(列・演算子・値)に合致した行へ色を付ける。複数ルールは上から順に評価。

import { S } from '../state';
import { getView, patchView } from './db-views-model';
import { openColorPalette } from './db-view-colors';
import type { DbColorRule, DbFilterOp } from '../lib/prefs';

const OP_LABEL: Array<{ v: DbFilterOp; t: string }> = [
  { v: 'contains', t: 'を含む' },
  { v: 'equals', t: 'と一致' },
  { v: 'not_empty', t: 'が空でない' },
  { v: 'empty', t: 'が空' },
];

let _pop: HTMLElement | null = null;
export function closeRulesEditor(): void { if (_pop) { _pop.remove(); _pop = null; } }

function ruleId(): string { return 'r' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36); }

export function openRulesEditor(viewId: string, anchor: HTMLElement): void {
  closeRulesEditor();
  const overlay = document.getElementById('memola-overlay') || document.body;
  const r = anchor.getBoundingClientRect();
  const pop = document.createElement('div');
  pop.className = 'memola-colmenu memola-rules-pop';
  pop.style.left = Math.round(Math.min(r.left, window.innerWidth - 420)) + 'px';
  pop.style.top = Math.round(r.bottom + 4) + 'px';
  _pop = pop;
  overlay.appendChild(pop);

  const rules = (getView(S.dbList, viewId).rules || []).map((x) => ({ ...x }));
  const save = (): void => { patchView(S.dbList, viewId, { rules: rules.map((x) => ({ ...x })) }); void import('./views-table').then((m) => m.renderDbTable()); };

  const render = (): void => {
    pop.innerHTML = '';
    const hdr = document.createElement('div');
    hdr.className = 'memola-colmenu-item';
    hdr.style.cssText = 'font-weight:600;color:var(--ink-3);cursor:default';
    hdr.textContent = '色分けルール（上から順に評価）';
    pop.appendChild(hdr);
    pop.appendChild(Object.assign(document.createElement('div'), { className: 'memola-colmenu-sep' }));

    if (rules.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'memola-colmenu-item';
      empty.style.cssText = 'color:var(--ink-4);cursor:default';
      empty.textContent = 'ルールがありません';
      pop.appendChild(empty);
    }

    rules.forEach((rule, i) => {
      const row = document.createElement('div');
      row.className = 'memola-rule-row';

      const fsel = document.createElement('select');
      fsel.className = 'memola-rule-f';
      for (const f of S.dbFields) {
        const o = document.createElement('option'); o.value = f.InternalName; o.textContent = f.Title;
        if (f.InternalName === rule.field) o.selected = true;
        fsel.appendChild(o);
      }
      if (!rule.field && S.dbFields[0]) rule.field = S.dbFields[0].InternalName;
      fsel.addEventListener('change', () => { rule.field = fsel.value; save(); });

      const osel = document.createElement('select');
      osel.className = 'memola-rule-op';
      for (const op of OP_LABEL) {
        const o = document.createElement('option'); o.value = op.v; o.textContent = op.t;
        if (op.v === rule.op) o.selected = true;
        osel.appendChild(o);
      }
      osel.addEventListener('change', () => {
        rule.op = osel.value as DbFilterOp;
        val.style.display = (rule.op === 'empty' || rule.op === 'not_empty') ? 'none' : '';
        save();
      });

      const val = document.createElement('input');
      val.className = 'memola-rule-val';
      val.placeholder = '値…';
      val.value = rule.value || '';
      val.style.display = (rule.op === 'empty' || rule.op === 'not_empty') ? 'none' : '';
      val.addEventListener('input', () => { rule.value = val.value; save(); });

      const sw = document.createElement('button');
      sw.className = 'memola-optedit-sw';
      sw.title = '色';
      sw.style.background = rule.color || '#e8e4d8';
      sw.addEventListener('click', () => {
        const rr = sw.getBoundingClientRect();
        openColorPalette(rr.right + 4, rr.top, (color) => { rule.color = color; sw.style.background = color || '#e8e4d8'; save(); });
      });

      const del = document.createElement('button');
      del.className = 'memola-optedit-del'; del.textContent = '×'; del.title = '削除';
      del.addEventListener('click', () => { rules.splice(i, 1); save(); render(); });

      row.append(fsel, osel, val, sw, del);
      pop.appendChild(row);
    });

    pop.appendChild(Object.assign(document.createElement('div'), { className: 'memola-colmenu-sep' }));
    const add = document.createElement('div');
    add.className = 'memola-colmenu-item';
    add.textContent = '＋ ルールを追加';
    add.addEventListener('click', () => {
      rules.push({ id: ruleId(), field: S.dbFields[0]?.InternalName || '', op: 'contains', value: '', color: '#fbf3db' });
      save(); render();
    });
    pop.appendChild(add);
  };
  render();

  const onOut = (e: MouseEvent): void => {
    if (_pop && !_pop.contains(e.target as Node) && !anchor.contains(e.target as Node)
        && !(e.target as HTMLElement).closest('#memola-dbcolor-pop')) {
      closeRulesEditor(); document.removeEventListener('mousedown', onOut, true);
    }
  };
  setTimeout(() => document.addEventListener('mousedown', onOut, true), 0);
}
