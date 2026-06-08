// AI スキャフォールド: 自然言語の依頼から「複数DB構成(リレーション/ロールアップ/
// ビュー/初期行)」の雛形を設計し、プレビュー確認の上で一括生成する。
//
// 流れ: AI が WorkspaceSpec(JSON) を生成 → openScaffoldPreview で確認 →
//       applyWorkspaceSpec が DB→列→リレーション→ロールアップ→ビュー→初期行 を
//       決定的に生成する。
//
// 規約(AIに渡す前提):
//   - リレーション/ロールアップは「親の Title」で結びつける。子DBは親の Title を
//     持つ列(fkField)を1つ用意する。
//   - 列タイプ: title / text / number / date / select / checkbox / person。
//     title は自動生成される Title 列に対応するので columns には含めない。

import { apiCreateDb, apiAddDbRow } from '../api/db';
import { addListField, getListFields } from '../api/sp-list';
import { metaById } from '../lib/page-store';
import { setLoad, toast } from './ui-helpers';

export interface SpecColumn { name: string; type?: string; options?: string[] }
export interface SpecRelation { name: string; fkField: string; targetDb: string }
export interface SpecRollup { name: string; childDb: string; childForeignField: string; targetField?: string; agg: string }
export interface SpecView { type: string; name?: string }
export interface SpecDb {
  name: string;
  columns?: SpecColumn[];
  relations?: SpecRelation[];
  rollups?: SpecRollup[];
  views?: SpecView[];
}
export interface SpecSeed { db: string; rows: Array<Record<string, unknown>> }
export interface WorkspaceSpec { dbs: SpecDb[]; seed?: SpecSeed[] }

const TYPE_KIND: Record<string, number> = {
  text: 2, number: 9, date: 4, checkbox: 8, select: 6, status: 6, person: 2, url: 2, email: 2,
};
const AGGS = new Set(['count', 'sum', 'avg', 'min', 'max', 'join']);

/** WorkspaceSpec を実際に生成する。parentId 配下に作る。 */
export async function applyWorkspaceSpec(spec: WorkspaceSpec, parentId: string): Promise<string[]> {
  const created: string[] = [];
  const nameToList = new Map<string, string>();    // DB名 → SPリスト名
  const fieldMaps = new Map<string, Record<string, string>>();  // DB名 → {表示名: InternalName}

  // Phase 1: DB を作成
  for (const db of spec.dbs) {
    const page = await apiCreateDb(db.name, parentId || '');
    const listTitle = metaById(page.Id)?.list || '';
    nameToList.set(db.name, listTitle);
    created.push(db.name);
  }

  // Phase 2: 列を追加(title は既定のTitle列なのでスキップ)
  for (const db of spec.dbs) {
    const listTitle = nameToList.get(db.name); if (!listTitle) continue;
    for (const col of db.columns || []) {
      const t = (col.type || 'text').toLowerCase();
      if (t === 'title') continue;
      const kind = TYPE_KIND[t] ?? 2;
      await addListField(listTitle, col.name, kind, kind === 6 ? (col.options || []) : undefined).catch(() => undefined);
    }
  }

  // Phase 2.5: 表示名→InternalName マップを構築(関連/集計の結線に使う)
  for (const db of spec.dbs) {
    const listTitle = nameToList.get(db.name); if (!listTitle) continue;
    try {
      const fields = await getListFields(listTitle);
      const map: Record<string, string> = {};
      for (const f of fields) { map[f.Title] = f.InternalName; map[f.InternalName] = f.InternalName; }
      fieldMaps.set(db.name, map);
    } catch { fieldMaps.set(db.name, {}); }
  }
  const internal = (dbName: string, display: string): string => fieldMaps.get(dbName)?.[display] || display;

  // Phase 3: リレーション(子側 fkField → 親Title 一致のリンクチップ)
  const { addLookupSpec } = await import('./db-lookups');
  for (const db of spec.dbs) {
    const listTitle = nameToList.get(db.name); if (!listTitle) continue;
    for (const rel of db.relations || []) {
      const targetList = nameToList.get(rel.targetDb); if (!targetList) continue;
      await addLookupSpec(listTitle, {
        name: rel.name, keyField: internal(db.name, rel.fkField),
        targetTitle: targetList, targetKeyField: 'Title', returnField: 'Title', asLink: true,
      }).catch(() => undefined);
    }
  }

  // Phase 4: ロールアップ(親側: 親Title == 子の fk 一致で集計)
  const { addRollupSpec } = await import('./db-rollups');
  for (const db of spec.dbs) {
    const listTitle = nameToList.get(db.name); if (!listTitle) continue;
    for (const ru of db.rollups || []) {
      const childList = nameToList.get(ru.childDb); if (!childList) continue;
      const agg = AGGS.has(ru.agg) ? ru.agg : 'count';
      await addRollupSpec(listTitle, {
        name: ru.name, parentKeyField: 'Title', childTitle: childList,
        childForeignField: internal(ru.childDb, ru.childForeignField),
        targetField: ru.targetField ? internal(ru.childDb, ru.targetField) : '',
        agg: agg as 'count' | 'sum' | 'avg' | 'min' | 'max' | 'join',
      }).catch(() => undefined);
    }
  }

  // Phase 5: ビュー(テーブル以外を追加)
  const vm = await import('./db-views-model');
  for (const db of spec.dbs) {
    const listTitle = nameToList.get(db.name); if (!listTitle) continue;
    for (const v of db.views || []) {
      const t = (v.type || '').toLowerCase();
      if (!t || t === 'table') continue;
      try {
        const view = vm.addView(listTitle, t as never);
        if (v.name) vm.renameView(listTitle, view.id, v.name);
      } catch { /* 未対応タイプは無視 */ }
    }
  }

  // Phase 6: 初期行
  for (const s of spec.seed || []) {
    const listTitle = nameToList.get(s.db); if (!listTitle) continue;
    for (const row of s.rows || []) {
      await apiAddDbRow(listTitle, row).catch(() => undefined);
    }
  }

  return created;
}

// ── プレビュー & 確定モーダル ──
function esc(s: unknown): string { return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

/** AI が提案した WorkspaceSpec をプレビュー表示し、確定で生成する。 */
export function openScaffoldPreview(spec: WorkspaceSpec, parentId: string): void {
  const overlay = document.getElementById('memola-overlay') || document.body;
  document.getElementById('memola-scaffold-md')?.remove();
  const md = document.createElement('div');
  md.id = 'memola-scaffold-md';
  md.className = 'memola-readonly-md';

  const dbsHtml = (spec.dbs || []).map((db) => {
    const cols = (db.columns || []).map((c) => '<span class="memola-sf-col">' + esc(c.name) + (c.type ? '<i>:' + esc(c.type) + '</i>' : '') + '</span>').join('');
    const rels = (db.relations || []).map((r) => '<div class="memola-sf-line">🔗 ' + esc(r.name) + ' → ' + esc(r.targetDb) + ' <i>(' + esc(r.fkField) + ')</i></div>').join('');
    const rus = (db.rollups || []).map((r) => '<div class="memola-sf-line">Σ ' + esc(r.name) + ' = ' + esc(r.agg) + '(' + esc(r.childDb) + (r.targetField ? '.' + esc(r.targetField) : '') + ')</div>').join('');
    const views = (db.views || []).map((v) => esc(v.name || v.type)).join(' / ');
    return '<div class="memola-sf-db">' +
      '<div class="memola-sf-dbname">🗂 ' + esc(db.name) + '</div>' +
      (cols ? '<div class="memola-sf-cols">' + cols + '</div>' : '') +
      rels + rus +
      (views ? '<div class="memola-sf-line">👁 ビュー: ' + views + '</div>' : '') +
    '</div>';
  }).join('');

  const seedCount = (spec.seed || []).reduce((n, s) => n + (s.rows?.length || 0), 0);
  md.innerHTML =
    '<div class="memola-readonly-card" style="max-width:560px">' +
      '<h2>この構成で作成しますか？</h2>' +
      '<div class="memola-sf-list">' + (dbsHtml || '<i>DBがありません</i>') + '</div>' +
      (seedCount ? '<p class="memola-sf-seed">初期データ: ' + seedCount + ' 行</p>' : '') +
      '<div class="memola-readonly-acts">' +
        '<button class="memola-btn" id="memola-sf-cancel">キャンセル</button>' +
        '<button class="memola-btn p" id="memola-sf-ok">作成する</button>' +
      '</div>' +
    '</div>';
  overlay.appendChild(md);

  const close = (): void => { md.remove(); };
  md.querySelector('#memola-sf-cancel')?.addEventListener('click', close);
  md.querySelector('#memola-sf-ok')?.addEventListener('click', () => {
    md.remove();
    void (async () => {
      try {
        setLoad(true, '構成を作成中...');
        const created = await applyWorkspaceSpec(spec, parentId);
        const { apiGetPages } = await import('../api/pages');
        await apiGetPages();
        const { renderTree } = await import('./tree');
        renderTree();
        toast(created.length + '個のDBを作成しました: ' + created.join(', '));
      } catch (e) { toast('作成に失敗: ' + (e as Error).message, 'err'); }
      finally { setLoad(false); }
    })();
  });
}
