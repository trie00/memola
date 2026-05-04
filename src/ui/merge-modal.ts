// 3-way merge modal — the user-facing tool that turns a draft saved
// during a conflict back into a useful merged document.
//
// Inputs:
//   - draft.body  = user's edits at the moment they hit "相手の版" on the
//                   conflict modal
//   - draft.baseBody = SP page contents at the moment THE USER STARTED
//                   editing (= common ancestor)
//   - current SP body = whatever the page contains right now
//
// We auto-merge sections where only one side changed. True conflicts
// (= same region edited on both sides) get a resolver UI: each conflict
// shows yours / theirs / base with [採用 (yours)] / [採用 (theirs)] /
// [両方残す] buttons. The user can also free-edit the merged text in
// the centre column. When all conflicts are resolved, [このマージを保存]
// applies the result to the page (= goes through the normal save path).

import { S } from '../state';
import { threeWayMerge, resolveConflict, hasUnresolvedConflicts, type ConflictHunk } from '../lib/three-way-merge';
import { apiLoadRawBody, apiSavePageMd, apiLoadFileMeta } from '../api/pages';
import type { Draft } from './draft-store';
import { deleteDraft } from './draft-store';
import { escapeHtml } from '../lib/html-escape';
import { mdToHtml } from '../lib/markdown';
import { toast, setLoad } from './ui-helpers';

const MODAL_ID = 'memola-merge-md';

interface MergeState {
  draft: Draft;
  /** Current SP body — fetched fresh when modal opens. */
  currentBody: string;
  /** Current SP etag — used for optimistic concurrency on final save. */
  currentEtag: string;
  /** The merged text (with conflict markers if any unresolved). */
  merged: string;
  conflicts: ConflictHunk[];
  /** id → resolution decision so we can disable buttons after pick. */
  resolved: Map<number, 'yours' | 'theirs' | 'both' | 'manual'>;
  /** When true, this MergeState was created from a live save-conflict
   *  (NOT a saved draft), so successful apply must NOT delete a draft
   *  (there is no real draft entry — `draft.key === '__direct__'`). */
  isDirect?: boolean;
}

let _state: MergeState | null = null;

/** Entry point. Pass the draft and we'll fetch the current SP body
 *  ourselves. The modal handles the rest of the flow. */
export async function openMergeModal(draft: Draft): Promise<void> {
  setLoad(true, '統合の準備中...');
  let currentBody = '';
  let currentEtag = '';
  try {
    currentBody = await apiLoadRawBody(draft.pageId);
    const fm = await apiLoadFileMeta(draft.pageId);
    currentEtag = fm?.etag || '';
  } catch (e) {
    setLoad(false);
    toast('原本の読み込みに失敗: ' + (e as Error).message, 'err');
    return;
  }
  setLoad(false);

  const baseBody = draft.baseBody || '';
  const result = baseBody
    ? threeWayMerge(baseBody, draft.body, currentBody)
    : // Fallback: legacy drafts without baseBody can only do a 2-way
      // diff. Treat the user's draft as "yours", current SP as "theirs",
      // and use one side as the synthetic base. The conflict count will
      // be artificially inflated but the user can still resolve.
      threeWayMerge(currentBody, draft.body, currentBody);

  _state = {
    draft,
    currentBody,
    currentEtag,
    merged: result.merged,
    conflicts: result.conflicts,
    resolved: new Map(),
  };
  S.sync.mergeInProgress = true;
  render();
}

/** Direct entry from a live save-conflict (= the user clicked
 *  「統合する」 on the conflict modal). No draft is created — we go
 *  straight from the user's in-editor markdown + the captured base
 *  body to the merge UI. On apply, the merged content is saved to SP
 *  and the editor is refreshed; no draft cleanup needed.
 *
 *  Falls back to 2-way diff when `baseBody` is empty (e.g. legacy data
 *  predating S.sync.baseBody capture, or an edge case where the page
 *  load happened before this code shipped). */
export async function openMergeModalDirect(opts: {
  pageId: string;
  pageTitle: string;
  title: string;
  yoursBody: string;
  baseBody: string;
}): Promise<void> {
  setLoad(true, '統合の準備中...');
  let currentBody = '';
  let currentEtag = '';
  try {
    currentBody = await apiLoadRawBody(opts.pageId);
    const fm = await apiLoadFileMeta(opts.pageId);
    currentEtag = fm?.etag || '';
  } catch (e) {
    setLoad(false);
    toast('原本の読み込みに失敗: ' + (e as Error).message, 'err');
    return;
  }
  setLoad(false);

  const baseForMerge = opts.baseBody || currentBody;     // 2-way fallback
  const result = threeWayMerge(baseForMerge, opts.yoursBody, currentBody);

  // Build a synthetic Draft so the existing render logic works unchanged.
  // The key='__direct__' marker is checked on apply to skip draft deletion.
  const synthDraft: Draft = {
    key: '__direct__',
    pageId: opts.pageId,
    pageTitle: opts.pageTitle,
    title: opts.title,
    body: opts.yoursBody,
    savedAt: Date.now(),
    reason: 'conflict-discarded',
    baseBody: opts.baseBody,
  };

  _state = {
    draft: synthDraft,
    currentBody,
    currentEtag,
    merged: result.merged,
    conflicts: result.conflicts,
    resolved: new Map(),
    isDirect: true,
  };
  S.sync.mergeInProgress = true;
  render();
}

function render(): void {
  if (!_state) return;
  closeMergeModal();
  const overlay = document.getElementById('memola-overlay') || document.body;
  const md = document.createElement('div');
  md.id = MODAL_ID;
  md.className = 'memola-merge-md on';

  const totalConflicts = _state.conflicts.length;
  const remaining = countUnresolved();
  const autoMerged = countAutoMerged();
  const headerStatus = totalConflicts === 0
    ? `<span class="memola-merge-ok">✓ 競合なし — 自動マージ完了</span>`
    : remaining === 0
      ? `<span class="memola-merge-ok">✓ ${totalConflicts} 件すべて解決済み</span>`
      : `<span class="memola-merge-warn">⚠ 残り ${remaining} / ${totalConflicts} 件の競合</span>`;

  md.innerHTML = `
    <div class="memola-merge-box">
      <div class="memola-merge-header">
        <div class="memola-merge-title">📝 下書きを原本に統合</div>
        <div class="memola-merge-status">
          ${headerStatus}
          <span class="memola-merge-meta">
            自動マージ ${autoMerged} 箇所 · 元の下書き ${new Date(_state.draft.savedAt).toLocaleString('ja-JP')}
          </span>
        </div>
        <button class="memola-merge-close" data-merge-act="close" title="閉じる">×</button>
      </div>
      <div class="memola-merge-body">
        <div class="memola-merge-conflicts">
          ${renderConflictsHtml()}
        </div>
        <div class="memola-merge-preview">
          <div class="memola-merge-editor-label">統合後のページ内容 (= 保存される内容):</div>
          <div class="memola-merge-preview-content">
            ${remaining > 0
              ? '<div class="memola-merge-preview-pending">' +
                '⚠ 残り ' + remaining + ' 件の競合を左ペインで解決すると、ここに最終的な内容が表示されます。' +
                '</div>'
              : mdToHtml(_state.merged)
            }
          </div>
        </div>
      </div>
      <div class="memola-merge-foot">
        <div class="memola-merge-help">
          競合は自動でマージできなかった箇所のみ表示。各ボタンで採用する版を選んでください。
        </div>
        <button class="memola-btn s" data-merge-act="cancel">キャンセル</button>
        <button class="memola-btn p" data-merge-act="apply" ${remaining > 0 ? 'disabled' : ''}>
          このマージを保存
        </button>
      </div>
    </div>
  `;
  overlay.appendChild(md);

  // Wire conflict buttons
  md.querySelectorAll<HTMLButtonElement>('[data-conflict-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.conflictId || '0', 10);
      const choice = btn.dataset.choice as 'yours' | 'theirs' | 'both';
      if (!_state) return;
      _state.merged = resolveConflict(_state.merged, id, choice);
      _state.resolved.set(id, choice);
      render();        // re-render so the textarea + status update
    });
  });

  // Footer buttons
  md.querySelectorAll<HTMLElement>('[data-merge-act]').forEach((el) => {
    el.addEventListener('click', () => {
      const act = el.dataset.mergeAct;
      if (act === 'close' || act === 'cancel') {
        closeMergeModal();
        _state = null;
      } else if (act === 'apply') {
        void applyMerge();
      }
    });
  });

  // ESC closes
  document.addEventListener('keydown', escHandler, true);
}

function escHandler(e: KeyboardEvent): void {
  if (e.key === 'Escape' && document.getElementById(MODAL_ID)) {
    e.preventDefault();
    e.stopPropagation();
    closeMergeModal();
    _state = null;
  }
}

export function closeMergeModal(): void {
  const md = document.getElementById(MODAL_ID);
  if (md) md.remove();
  document.removeEventListener('keydown', escHandler, true);
  // Always clear the autosave-suppression flag — applies whether the
  // close came from a successful apply, cancel, ESC, or backdrop click.
  S.sync.mergeInProgress = false;
}

function countUnresolved(): number {
  if (!_state) return 0;
  return _state.conflicts.filter((c) => !_state!.resolved.has(c.id)).length;
}

function countAutoMerged(): number {
  // Auto-merged sections aren't tracked individually here; we report
  // "0 conflicts → all auto-merged" when conflicts.length is 0, else
  // an approximation: lines in merged minus lines in current.
  if (!_state) return 0;
  // Better: rerun the merge to get the count. Cheap.
  if (!_state.draft.baseBody) return 0;
  const r = threeWayMerge(_state.draft.baseBody, _state.draft.body, _state.currentBody);
  return r.autoMergedCount;
}

function renderConflictsHtml(): string {
  if (!_state) return '';
  if (_state.conflicts.length === 0) {
    return '<div class="memola-merge-empty">' +
      '🎉 自動マージで全て解決しました。右の内容を確認して保存してください。' +
      '</div>';
  }
  return _state.conflicts.map((c) => {
    const decided = _state!.resolved.get(c.id);
    const cls = decided ? 'memola-merge-conflict resolved' : 'memola-merge-conflict';
    const yoursPreview = c.yours.length === 0 ? '<i>(削除)</i>' : escapeHtml(c.yours.join('\n'));
    const theirsPreview = c.theirs.length === 0 ? '<i>(削除)</i>' : escapeHtml(c.theirs.join('\n'));
    const basePreview = c.base.length === 0 ? '<i>(空)</i>' : escapeHtml(c.base.join('\n'));
    const decidedLabel = decided
      ? `<span class="memola-merge-decided">✓ ${decided === 'yours' ? 'あなた' : decided === 'theirs' ? 'SP' : '両方'} を採用</span>`
      : '';
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
          <button class="memola-btn s" data-conflict-id="${c.id}" data-choice="yours">← あなたを採用</button>
          <button class="memola-btn s" data-conflict-id="${c.id}" data-choice="theirs">SP を採用 →</button>
          <button class="memola-btn s" data-conflict-id="${c.id}" data-choice="both">両方残す</button>
        </div>
      </div>
    `;
  }).join('');
}

async function applyMerge(): Promise<void> {
  if (!_state) return;
  const finalBody = _state.merged;
  if (hasUnresolvedConflicts(finalBody)) {
    toast('未解決の競合があります', 'err');
    return;
  }
  setLoad(true, '統合結果を保存中...');
  try {
    const pageId = _state.draft.pageId;
    const title = _state.draft.title;
    // Use If-Match against the SP etag we read at modal open. If the SP
    // page advanced again while the user was resolving, surface the new
    // conflict — the user may want to re-merge.
    const result = await apiSavePageMd(pageId, title, finalBody, _state.currentEtag);
    if (!result.ok) {
      setLoad(false);
      toast('保存中にさらに競合が発生しました — 再度ページを開いて確認してください', 'err');
      return;
    }
    // Clean up: drop the saved draft now that it's been integrated.
    // Skip in direct mode — the synthetic draft was never persisted.
    if (!_state.isDirect) {
      deleteDraft(_state.draft.key);
    }
    // If currently viewing this page, refresh editor body from the new save.
    if (S.currentId === pageId) {
      const { doSelect } = await import('./views');
      await doSelect(pageId);
    }
    setLoad(false);
    toast('統合内容を保存しました');
    closeMergeModal();
    _state = null;
    // Refresh drafts modal/badge
    void import('./drafts-modal').then((m) => {
      m.refreshDraftsBadge?.();
    });
  } catch (e) {
    setLoad(false);
    toast('保存に失敗: ' + (e as Error).message, 'err');
  }
}
