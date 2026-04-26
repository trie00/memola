// Inline AI block. Inserted via /ai slash command.
// User picks an action (要約/改稿/翻訳/...), the block calls Claude with the
// surrounding page text as context, then offers 採用 / 編集 / 破棄 buttons.

import { S } from '../state';
import { getEd } from './dom';
import { setSave, toast } from './ui-helpers';
import { schedSave } from './actions';
import { callClaude } from '../api/anthropic';
import { htmlToMd } from '../lib/markdown';

const ACTIONS: Array<{ key: string; label: string; prompt: string }> = [
  { key: 'summarize', label: '要約', prompt: 'このページの内容を3行で簡潔に要約してください。' },
  { key: 'rewrite',   label: '改稿', prompt: 'このページの本文を、より読みやすく自然な日本語に書き直してください。' },
  { key: 'translate', label: '英訳', prompt: 'このページの本文を自然な英語に翻訳してください。' },
  { key: 'actions',   label: 'アクション抽出', prompt: 'このページの内容から、ToDo・アクションアイテムを箇条書きで抽出してください。' },
];

export function insertAiBlock(): void {
  const ed = getEd();
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;

  const wrap = document.createElement('div');
  wrap.className = 'n365-ai-block';
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
  S.dirty = true; setSave('未保存'); schedSave();
}

function renderActionPicker(): string {
  return (
    '<div class="n365-aib-head">' +
      '<span class="n365-aib-title">✦ AI ブロック</span>' +
      '<span class="n365-aib-hint">アクションを選択</span>' +
    '</div>' +
    '<div class="n365-aib-actions">' +
      ACTIONS.map((a) =>
        '<button class="n365-aib-action" data-action="' + a.key + '">' + a.label + '</button>',
      ).join('') +
      '<button class="n365-aib-action n365-aib-cancel" data-action="cancel">×</button>' +
    '</div>'
  );
}

function attachActionHandlers(wrap: HTMLElement): void {
  wrap.querySelectorAll<HTMLButtonElement>('.n365-aib-action').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action!;
      if (action === 'cancel') { wrap.remove(); S.dirty = true; setSave('未保存'); schedSave(); return; }
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
    '<div class="n365-aib-head">' +
      '<span class="n365-aib-title">✦ ' + escapeHtml(cfg.label) + '</span>' +
      '<span class="n365-aib-hint">考え中…</span>' +
    '</div>' +
    '<div class="n365-aib-body n365-aib-loading">…</div>';

  try {
    const reply = await callClaude(
      [{ role: 'user', content: cfg.prompt + '\n\n--- ページ本文 ---\n' + ctx }],
      'あなたは n365 のAIアシスタントです。簡潔で自然な日本語で答えてください。',
    );
    showResult(wrap, cfg, reply);
  } catch (err) {
    wrap.innerHTML =
      '<div class="n365-aib-head"><span class="n365-aib-title">✦ ' + escapeHtml(cfg.label) + '</span></div>' +
      '<div class="n365-aib-body n365-aib-error">⚠️ ' + escapeHtml((err as Error).message) + '</div>' +
      '<div class="n365-aib-foot">' +
        '<button class="n365-aib-btn n365-aib-retry" data-action="retry">再試行</button>' +
        '<button class="n365-aib-btn n365-aib-discard" data-action="discard">破棄</button>' +
      '</div>';
    wrap.querySelector<HTMLButtonElement>('.n365-aib-retry')?.addEventListener('click', () => runAction(wrap, cfg));
    wrap.querySelector<HTMLButtonElement>('.n365-aib-discard')?.addEventListener('click', () => { wrap.remove(); });
  }
}

function showResult(wrap: HTMLElement, cfg: { key: string; label: string; prompt: string }, text: string): void {
  wrap.innerHTML =
    '<div class="n365-aib-head">' +
      '<span class="n365-aib-title">✦ ' + escapeHtml(cfg.label) + '</span>' +
      '<button class="n365-aib-regen" title="再生成">↻</button>' +
    '</div>' +
    '<div class="n365-aib-body">' + nl2br(escapeHtml(text)) + '</div>' +
    '<div class="n365-aib-foot">' +
      '<button class="n365-aib-btn n365-aib-adopt" data-action="adopt">採用</button>' +
      '<button class="n365-aib-btn n365-aib-edit" data-action="edit">編集</button>' +
      '<button class="n365-aib-btn n365-aib-discard" data-action="discard">破棄</button>' +
    '</div>';

  wrap.querySelector<HTMLButtonElement>('.n365-aib-regen')?.addEventListener('click', () => runAction(wrap, cfg));
  wrap.querySelector<HTMLButtonElement>('.n365-aib-adopt')?.addEventListener('click', () => {
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
    S.dirty = true; setSave('未保存'); schedSave();
    toast('AIブロックを採用しました');
  });
  wrap.querySelector<HTMLButtonElement>('.n365-aib-edit')?.addEventListener('click', () => {
    const body = wrap.querySelector('.n365-aib-body') as HTMLElement;
    body.contentEditable = 'true';
    body.focus();
  });
  wrap.querySelector<HTMLButtonElement>('.n365-aib-discard')?.addEventListener('click', () => {
    wrap.remove();
    S.dirty = true; setSave('未保存'); schedSave();
  });
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function nl2br(s: string): string { return s.replace(/\n/g, '<br>'); }
