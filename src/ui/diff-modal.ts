// Diff-preview confirmation modal for Tool Use update_page / update_db_row.
//
// confirmPageUpdate    — page body / title diff
// confirmDbRowUpdate   — DB row column changes + optional body diff
//
// Both resolve Promise<boolean> based on the user's OK / Cancel choice,
// driven by the shared `confirmModal` helper (handles backdrop click,
// ESC capture, focus, singleton).

import { escapeHtml } from '../lib/html-escape';
import { confirmModal } from './lib/modal';

const MODAL_ID = 'memola-diff-modal';

interface DiffOpts {
  pageId: string;
  pageTitle: string;
  oldTitle?: string;
  newTitle?: string;
  oldBody?: string;
  newBody?: string;
}

export function confirmPageUpdate(opts: DiffOpts): Promise<boolean> {
  const titleChanged = opts.newTitle != null && opts.newTitle !== (opts.oldTitle || '');
  const bodyChanged = opts.newBody != null && opts.newBody !== (opts.oldBody || '');

  let inner =
    '<div class="memola-diff-card">' +
      '<div class="memola-diff-head">' +
        '<h2>ページ更新の確認</h2>' +
        '<div class="memola-diff-sub">' +
          escapeHtml(opts.pageTitle || '無題') + ' (id=' + escapeHtml(opts.pageId) + ')' +
        '</div>' +
      '</div>';

  if (titleChanged) {
    inner += '<div class="memola-diff-title-row">' +
      '<div class="memola-diff-label">タイトル</div>' +
      '<div class="memola-diff-title-old">' + escapeHtml(opts.oldTitle || '') + '</div>' +
      '<div class="memola-diff-arrow">→</div>' +
      '<div class="memola-diff-title-new">' + escapeHtml(opts.newTitle || '') + '</div>' +
      '</div>';
  }

  if (bodyChanged) {
    inner += '<div class="memola-diff-body">' +
      '<div class="memola-diff-label">本文の差分</div>' +
      '<pre class="memola-diff-pre" data-body-diff="1"></pre>' +
      '</div>';
  }

  if (!titleChanged && !bodyChanged) {
    inner += '<div class="memola-diff-empty">変更がありません</div>';
  }

  inner += '<div class="memola-diff-actions">' +
      '<button class="memola-btn s" data-c="cancel">キャンセル</button>' +
      '<button class="memola-btn p" data-c="ok">更新する</button>' +
    '</div>' +
  '</div>';

  return confirmModal<boolean>({
    id: MODAL_ID,
    className: 'memola-diff-modal',
    contentHtml: inner,
    buttons: { ok: true, cancel: false },
    cancelValue: false,
    focusSel: 'button[data-c="ok"]',
    onMounted: (root) => {
      // Inject the diff fragment programmatically (HTML escape would
      // strip the <span> structure that carries the per-line styling).
      if (bodyChanged) {
        const pre = root.querySelector<HTMLElement>('pre[data-body-diff]');
        if (pre) pre.appendChild(renderDiff(opts.oldBody || '', opts.newBody || ''));
      }
      // Cmd/Ctrl+Enter as a quick confirm shortcut.
      root.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          root.querySelector<HTMLElement>('button[data-c="ok"]')?.click();
        }
      });
    },
  });
}

interface DbRowDiffOpts {
  dbTitle: string;
  rowId: number;
  rowTitle: string;
  fieldChanges: Array<{ name: string; oldValue: string; newValue: string }>;
  oldBody?: string;
  newBody?: string;
}

export function confirmDbRowUpdate(opts: DbRowDiffOpts): Promise<boolean> {
  const bodyChanged = opts.newBody != null && opts.newBody !== (opts.oldBody || '');
  const hasFieldChanges = opts.fieldChanges.length > 0;

  let inner =
    '<div class="memola-diff-card">' +
      '<div class="memola-diff-head">' +
        '<h2>行更新の確認</h2>' +
        '<div class="memola-diff-sub">' +
          escapeHtml(opts.dbTitle) + ' #' + opts.rowId +
          (opts.rowTitle ? ' — ' + escapeHtml(opts.rowTitle) : '') +
        '</div>' +
      '</div>';

  if (hasFieldChanges) {
    const rows = opts.fieldChanges.map((ch) =>
      '<tr>' +
      '<td class="memola-diff-fname">' + escapeHtml(ch.name) + '</td>' +
      '<td class="memola-diff-title-old">' + escapeHtml(ch.oldValue || '(空)') + '</td>' +
      '<td class="memola-diff-arrow">→</td>' +
      '<td class="memola-diff-title-new">' + escapeHtml(ch.newValue || '(空)') + '</td>' +
      '</tr>'
    ).join('');
    inner += '<div class="memola-diff-fields">' +
      '<div class="memola-diff-label">列の変更</div>' +
      '<table class="memola-diff-fields-tbl">' + rows + '</table>' +
      '</div>';
  }

  if (bodyChanged) {
    inner += '<div class="memola-diff-body">' +
      '<div class="memola-diff-label">本文の差分</div>' +
      '<pre class="memola-diff-pre" data-body-diff="1"></pre>' +
      '</div>';
  }

  if (!hasFieldChanges && !bodyChanged) {
    inner += '<div class="memola-diff-empty">変更がありません</div>';
  }

  inner += '<div class="memola-diff-actions">' +
      '<button class="memola-btn s" data-c="cancel">キャンセル</button>' +
      '<button class="memola-btn p" data-c="ok">更新する</button>' +
    '</div>' +
  '</div>';

  return confirmModal<boolean>({
    id: MODAL_ID,
    className: 'memola-diff-modal',
    contentHtml: inner,
    buttons: { ok: true, cancel: false },
    cancelValue: false,
    focusSel: 'button[data-c="ok"]',
    onMounted: (root) => {
      if (bodyChanged) {
        const pre = root.querySelector<HTMLElement>('pre[data-body-diff]');
        if (pre) pre.appendChild(renderDiff(opts.oldBody || '', opts.newBody || ''));
      }
      root.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          root.querySelector<HTMLElement>('button[data-c="ok"]')?.click();
        }
      });
    },
  });
}

// ── pure diff helpers ──────────────────────────────────────────

interface DiffOp { type: 'eq' | 'del' | 'add'; line: string }

/** Render a unified line-level diff into a DocumentFragment. */
function renderDiff(oldText: string, newText: string): DocumentFragment {
  const ops = diffLines(oldText.split('\n'), newText.split('\n'));
  const frag = document.createDocumentFragment();
  for (const op of ops) {
    const line = document.createElement('span');
    line.className = 'memola-diff-line memola-diff-' + op.type;
    const sigil = op.type === 'add' ? '+ ' : op.type === 'del' ? '- ' : '  ';
    line.textContent = sigil + op.line + '\n';
    frag.appendChild(line);
  }
  return frag;
}

/** Line diff via LCS. O(n*m) memory; fine for Memola page sizes. */
function diffLines(a: string[], b: string[]): DiffOp[] {
  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  const ops: DiffOp[] = [];
  let i = n;
  let j = m;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) { ops.push({ type: 'eq', line: a[i - 1] }); i--; j--; }
    else if (dp[i - 1][j] >= dp[i][j - 1]) { ops.push({ type: 'del', line: a[i - 1] }); i--; }
    else { ops.push({ type: 'add', line: b[j - 1] }); j--; }
  }
  while (i > 0) { ops.push({ type: 'del', line: a[i - 1] }); i--; }
  while (j > 0) { ops.push({ type: 'add', line: b[j - 1] }); j--; }
  return ops.reverse();
}
