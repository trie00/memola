// Inline AI block. Inserted via /ai slash command.
// User picks an action (要約/改稿/翻訳/...), the block calls Claude with the
// surrounding page text as context, then offers 採用 / 編集 / 破棄 buttons.

import { getEd } from './dom';
import { toast } from './ui-helpers';
import { schedSave } from './save-control';
import { callClaude } from '../api/anthropic';
import { htmlToBlocks } from '../lib/blocks-html';
import { blocksToMd } from '../lib/blocks-md';
const htmlToMd = (html: string): string => blocksToMd(htmlToBlocks(html));
import { escapeHtml } from '../lib/html-escape';

const ACTIONS: Array<{ key: string; label: string; prompt: string }> = [
  { key: 'summarize', label: '要約', prompt: 'このページの内容を3行で簡潔に要約してください。' },
  { key: 'rewrite',   label: '改稿', prompt: 'このページの本文を、より読みやすく自然な日本語に書き直してください。' },
  { key: 'translate', label: '英訳', prompt: 'このページの本文を自然な英語に翻訳してください。' },
  { key: 'actions',   label: 'アクション抽出', prompt: 'このページの内容から、ToDo・アクションアイテムを箇条書きで抽出してください。' },
];

/** Reattach handlers + restore result-state on AI blocks that were
 *  rebuilt from saved markdown. Called after page load so the regen /
 *  adopt / edit / discard buttons work on round-tripped blocks too. */
export function reattachAiBlocks(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>('.memola-ai-block').forEach((wrap) => {
    if (wrap.dataset.aibBound === '1') return;
    wrap.dataset.aibBound = '1';
    const action = wrap.dataset.aibAction || '';
    const result = wrap.dataset.aibResult || '';
    const cfg = ACTIONS.find((a) => a.key === action) ||
      { key: action, label: action, prompt: '' };
    if (result) {
      // Result-state already rendered from markdown — wire up buttons.
      showResult(wrap, cfg, result);
    } else {
      // Picker-state — re-bind the action picker (no result yet).
      wrap.innerHTML = renderActionPicker();
      attachActionHandlers(wrap);
    }
  });
}

export function insertAiBlock(): void {
  const ed = getEd();
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;

  const wrap = document.createElement('div');
  wrap.className = 'memola-ai-block';
  wrap.contentEditable = 'false';
  wrap.innerHTML = renderActionPicker();

  // Insert after current block (or at cursor)
  const range = sel.getRangeAt(0);
  let block: Node | null = range.startContainer;
  while (block && block.parentElement !== ed) block = block.parentElement;
  if (block && block !== ed) {
    ed.insertBefore(wrap, block.nextSibling);
    if (!(block as HTMLElement).textContent?.trim()) (block as HTMLElement).remove();
  } else {
    range.insertNode(wrap);
  }
  // Add a trailing <p> so the user can keep typing below
  const trail = document.createElement('p');
  trail.appendChild(document.createElement('br'));
  ed.insertBefore(trail, wrap.nextSibling);

  attachActionHandlers(wrap);
  schedSave();
}

function renderActionPicker(): string {
  return (
    '<div class="memola-aib-head">' +
      '<span class="memola-aib-title">✦ AI ブロック</span>' +
      '<span class="memola-aib-hint">アクションを選択</span>' +
    '</div>' +
    '<div class="memola-aib-actions">' +
      ACTIONS.map((a) =>
        '<button class="memola-aib-action" data-action="' + a.key + '">' + a.label + '</button>',
      ).join('') +
      '<button class="memola-aib-action memola-aib-cancel" data-action="cancel">×</button>' +
    '</div>'
  );
}

function attachActionHandlers(wrap: HTMLElement): void {
  wrap.querySelectorAll<HTMLButtonElement>('.memola-aib-action').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action!;
      if (action === 'cancel') { wrap.remove(); schedSave(); return; }
      const cfg = ACTIONS.find((a) => a.key === action);
      if (!cfg) return;
      runAction(wrap, cfg);
    });
  });
}

async function runAction(wrap: HTMLElement, cfg: { key: string; label: string; prompt: string }): Promise<void> {
  const ed = getEd();
  const ctx = htmlToMd(ed.innerHTML);
  wrap.innerHTML =
    '<div class="memola-aib-head">' +
      '<span class="memola-aib-title">✦ ' + escapeHtml(cfg.label) + '</span>' +
      '<span class="memola-aib-hint">考え中…</span>' +
    '</div>' +
    '<div class="memola-aib-body memola-aib-loading">…</div>';

  try {
    const reply = await callClaude(
      [{ role: 'user', content: cfg.prompt + '\n\n--- ページ本文 ---\n' + ctx }],
      'あなたは Memola のAIアシスタントです。簡潔で自然な日本語で答えてください。',
    );
    showResult(wrap, cfg, reply);
  } catch (err) {
    wrap.innerHTML =
      '<div class="memola-aib-head"><span class="memola-aib-title">✦ ' + escapeHtml(cfg.label) + '</span></div>' +
      '<div class="memola-aib-body memola-aib-error">⚠️ ' + escapeHtml((err as Error).message) + '</div>' +
      '<div class="memola-aib-foot">' +
        '<button class="memola-aib-btn memola-aib-retry" data-action="retry">再試行</button>' +
        '<button class="memola-aib-btn memola-aib-discard" data-action="discard">破棄</button>' +
      '</div>';
    wrap.querySelector<HTMLButtonElement>('.memola-aib-retry')?.addEventListener('click', () => runAction(wrap, cfg));
    wrap.querySelector<HTMLButtonElement>('.memola-aib-discard')?.addEventListener('click', () => { wrap.remove(); });
  }
}

function showResult(wrap: HTMLElement, cfg: { key: string; label: string; prompt: string }, text: string): void {
  // Record the action + raw result on the wrap so save-time
  // serialization (markdown.ts) can round-trip the block. Without
  // these data attrs the block silently disappears from the saved
  // markdown — the user has to redo the AI call after navigating
  // away. With them, mdToHtml can reconstruct the result-state block.
  wrap.dataset.aibAction = cfg.key;
  wrap.dataset.aibResult = text;
  wrap.innerHTML =
    '<div class="memola-aib-head">' +
      '<span class="memola-aib-title">✦ ' + escapeHtml(cfg.label) + '</span>' +
      '<button class="memola-aib-regen" title="再生成">↻</button>' +
    '</div>' +
    '<div class="memola-aib-body">' + nl2br(escapeHtml(text)) + '</div>' +
    '<div class="memola-aib-foot">' +
      '<button class="memola-aib-btn memola-aib-adopt" data-action="adopt">採用</button>' +
      '<button class="memola-aib-btn memola-aib-edit" data-action="edit">編集</button>' +
      '<button class="memola-aib-btn memola-aib-discard" data-action="discard">破棄</button>' +
    '</div>';

  wrap.querySelector<HTMLButtonElement>('.memola-aib-regen')?.addEventListener('click', () => runAction(wrap, cfg));
  wrap.querySelector<HTMLButtonElement>('.memola-aib-adopt')?.addEventListener('click', () => {
    // Replace block with paragraphs of the result
    const ed = getEd();
    const lines = text.split(/\n+/).filter((l) => l.trim());
    const insertBefore = wrap.nextSibling;
    lines.forEach((l) => {
      const p = document.createElement('p');
      p.textContent = l;
      ed.insertBefore(p, insertBefore);
    });
    wrap.remove();
    schedSave();
    toast('AIブロックを採用しました');
  });
  wrap.querySelector<HTMLButtonElement>('.memola-aib-edit')?.addEventListener('click', () => {
    const body = wrap.querySelector('.memola-aib-body') as HTMLElement;
    body.contentEditable = 'true';
    body.focus();
  });
  wrap.querySelector<HTMLButtonElement>('.memola-aib-discard')?.addEventListener('click', () => {
    wrap.remove();
    schedSave();
  });
}

function nl2br(s: string): string { return s.replace(/\n/g, '<br>'); }
