// 3-way merge UI — Saver subscriber.
//
// Renders whenever `saver.state().kind === 'merging'`. Buttons drive
// Saver methods directly; this file owns NO state of its own.
//
// Earlier the file maintained a parallel `_state` (rawMerged, resolved,
// currentBody, currentEtag, isDirect) plus a `mergeInProgress` flag,
// duplicating what was already computable from the live merge inputs.
// Each render re-allocated the modal DOM and accidentally cleared the
// flag mid-stream; mountains of bug-fix comments survive in git history.
//
// Now: Saver owns the conflict bundle, the resolution map, and the
// rawMerged immutable text. We just project that into HTML.
//
// Drafts-list "merge" path: drafts-modal calls
// `saver.beginExternalMerge(...)` which fetches theirs and transitions
// directly to 'merging'. This file then renders, exactly as it would
// for a live save-conflict.

import { S } from '../state';
import { escapeHtml } from '../lib/html-escape';
import { mdToBlocks } from '../lib/blocks-md';
import { blocksToHtml } from '../lib/blocks-html';
const mdToHtml = (md: string): string => blocksToHtml(mdToBlocks(md));
import { saver, type SaverState } from '../lib/saver';
import { setLoad, toast } from './ui-helpers';
import { subscriberModal } from './lib/modal';

const MODAL_ID = 'memola-merge-md';

const _modal = subscriberModal({
  id: MODAL_ID,
  className: 'memola-merge-md',
  onEscape: () => saver.cancelMerge(),    // → 'conflict'
});

let _attached = false;

export function attachMergeModal(): void {
  if (_attached) return;
  _attached = true;
  saver.subscribe(onState);
}

function onState(s: SaverState): void {
  if (s.kind !== 'merging') {
    _modal.close();
    return;
  }
  render(s);
}

function render(s: Extract<SaverState, { kind: 'merging' }>): void {
  const total = s.hunks.length;
  const remaining = total - s.resolved.size;
  const headerStatus = total === 0
    ? '<span class="memola-merge-ok">✓ 競合なし — 自動マージ完了</span>'
    : remaining === 0
      ? '<span class="memola-merge-ok">✓ ' + total + ' 件すべて解決済み</span>'
      : '<span class="memola-merge-warn">⚠ 残り ' + remaining + ' / ' + total + ' 件の競合</span>';

  const previewHtml = remaining > 0
    ? '<div class="memola-merge-preview-pending">' +
      '⚠ 残り ' + remaining + ' 件の競合を左ペインで解決すると、ここに最終的な内容が表示されます。' +
      '</div>'
    : mdToHtml(saver.computeMergedBody());

  const conflictsHtml = renderConflictsHtml(s);

  const html = `
    <div class="memola-merge-box">
      <div class="memola-merge-header">
        <div class="memola-merge-title">📝 自分の編集を SP の最新版と統合</div>
        <div class="memola-merge-status">
          ${headerStatus}
        </div>
        <button class="memola-merge-close" data-merge-act="cancel" title="閉じる">×</button>
      </div>
      <div class="memola-merge-body">
        <div class="memola-merge-conflicts">
          ${conflictsHtml}
        </div>
        <div class="memola-merge-preview">
          <div class="memola-merge-editor-label">統合後のページ内容 (= 保存される内容):</div>
          <div class="memola-merge-preview-content">
            ${previewHtml}
          </div>
        </div>
      </div>
      <div class="memola-merge-foot">
        <div class="memola-merge-help">
          競合は自動でマージできなかった箇所のみ表示。各ボタンで採用する版を選んでください。
        </div>
        <button class="memola-btn s" data-merge-act="cancel">キャンセル</button>
        <button class="memola-btn p" data-merge-act="apply" ${saver.isMergeResolved() ? '' : 'disabled'}>
          このマージを保存
        </button>
      </div>
    </div>
  `;

  _modal.render(html, (root) => {
    // Per-hunk choice buttons
    root.querySelectorAll<HTMLButtonElement>('[data-conflict-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.conflictId || '0', 10);
        const choice = btn.dataset.choice as 'yours' | 'theirs' | 'both';
        saver.setMergeChoice(id, choice);     // re-renders via subscriber
      });
    });
    // Footer buttons
    root.querySelectorAll<HTMLElement>('[data-merge-act]').forEach((el) => {
      el.addEventListener('click', () => {
        const act = el.dataset.mergeAct;
        if (act === 'cancel') {
          saver.cancelMerge();
        } else if (act === 'apply') {
          void onApply();
        }
      });
    });
  });
}

function renderConflictsHtml(s: Extract<SaverState, { kind: 'merging' }>): string {
  if (s.hunks.length === 0) {
    return '<div class="memola-merge-empty">' +
      '🎉 自動マージで全て解決しました。右の内容を確認して保存してください。' +
      '</div>';
  }
  return s.hunks.map((c) => {
    const decided = s.resolved.get(c.id);
    const cls = decided ? 'memola-merge-conflict resolved' : 'memola-merge-conflict';
    const yoursPreview = c.yours.length === 0 ? '<i>(削除)</i>' : escapeHtml(c.yours.join('\n'));
    const theirsPreview = c.theirs.length === 0 ? '<i>(削除)</i>' : escapeHtml(c.theirs.join('\n'));
    const basePreview = c.base.length === 0 ? '<i>(空)</i>' : escapeHtml(c.base.join('\n'));
    const decidedLabel = decided
      ? '<span class="memola-merge-decided">✓ ' +
        (decided === 'yours' ? 'あなた' : decided === 'theirs' ? 'SP' : '両方') +
        ' を採用</span>'
      : '';
    const btnCls = (k: 'yours' | 'theirs' | 'both'): string =>
      decided === k ? 'memola-btn p' : 'memola-btn s';
    return `
      <div class="${cls}" data-cid="${c.id}">
        <div class="memola-merge-conflict-hd">
          競合 #${c.id + 1} ${decidedLabel}
        </div>
        <div class="memola-merge-side memola-merge-yours">
          <div class="memola-merge-side-hd">あなた</div>
          <pre>${yoursPreview}</pre>
        </div>
        <div class="memola-merge-side memola-merge-theirs">
          <div class="memola-merge-side-hd">SP 最新</div>
          <pre>${theirsPreview}</pre>
        </div>
        <details class="memola-merge-base">
          <summary>元の状態 (= 編集を始めた時)</summary>
          <pre>${basePreview}</pre>
        </details>
        <div class="memola-merge-buttons">
          <button class="${btnCls('yours')}" data-conflict-id="${c.id}" data-choice="yours">← あなたを採用</button>
          <button class="${btnCls('theirs')}" data-conflict-id="${c.id}" data-choice="theirs">SP を採用 →</button>
          <button class="${btnCls('both')}" data-conflict-id="${c.id}" data-choice="both">両方残す</button>
        </div>
      </div>
    `;
  }).join('');
}

async function onApply(): Promise<void> {
  setLoad(true, '統合結果を保存中...');
  try {
    const r = await saver.applyMerge();
    setLoad(false);
    if (r.ok) {
      toast('統合内容を保存しました');
      // If the user is still on this page, refresh the editor body.
      const st = saver.state();
      if (st.kind === 'idle' && S.currentId === st.base.pageId) {
        const { doSelect } = await import('./views');
        await doSelect(st.base.pageId);
      }
      // Drafts panel may have stale entries
      void import('./drafts-modal').then((m) => m.refreshDraftsBadge?.());
      return;
    }
    if (!r.ok && r.reason === 'conflict') {
      toast('保存中にさらに競合が発生しました — 再度ページを開いて確認してください', 'err');
      // Saver auto-transitioned to 'conflict' — conflict-modal subscriber takes over.
      return;
    }
    if (!r.ok && r.reason === 'error') {
      toast('保存に失敗: ' + (r.error?.message || ''), 'err');
    }
  } catch (e) {
    setLoad(false);
    toast('保存に失敗: ' + (e as Error).message, 'err');
  }
}
