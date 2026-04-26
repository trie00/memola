// AI chat panel: right-side slide-out powered by direct Claude API calls.

import { S } from '../state';
import { g, getEd } from './dom';
import { toast } from './ui-helpers';
import { callClaude, getApiKey, setApiKey, type ChatMessage } from '../api/anthropic';
import { htmlToMd } from '../lib/markdown';

const QUICK_PROMPTS: Array<{ label: string; prompt: string }> = [
  { label: '要約', prompt: 'このページの内容を3行で要約してください。' },
  { label: '改稿', prompt: 'このページの本文をより読みやすく、自然な日本語に書き直してください。' },
  { label: '翻訳', prompt: 'このページの本文を英語に翻訳してください。' },
  { label: 'アクション抽出', prompt: 'このページの内容から、ToDo・アクションアイテムを箇条書きで抽出してください。' },
];

function pageContext(): string {
  const ed = getEd();
  if (!ed || !ed.innerHTML.trim()) return '';
  const md = htmlToMd(ed.innerHTML);
  if (!md.trim()) return '';
  const titleEl = g('ttl') as HTMLTextAreaElement | null;
  const title = (titleEl && titleEl.value) || '';
  return `現在のページタイトル: ${title}\n\nページ本文 (Markdown):\n${md}`;
}

function systemPrompt(): string {
  const ctx = pageContext();
  const base = 'あなたは n365 (Notion風 SharePoint連携ノートアプリ) の AI アシスタントです。簡潔で親しみやすい日本語で回答してください。';
  return ctx ? `${base}\n\n${ctx}` : base;
}

export function openAiPanel(): void {
  S.ai.panelOpen = true;
  g('ai-panel').classList.add('on');
  ensureApiKey();
  renderAiMessages();
  setTimeout(() => (g('ai-input') as HTMLTextAreaElement).focus(), 50);
}

export function closeAiPanel(): void {
  S.ai.panelOpen = false;
  g('ai-panel').classList.remove('on');
}

export function toggleAiPanel(): void {
  if (S.ai.panelOpen) closeAiPanel();
  else openAiPanel();
}

function ensureApiKey(): boolean {
  if (getApiKey()) return true;
  const key = prompt(
    'Anthropic APIキーを入力してください\n(sk-ant-... で始まる文字列。https://console.anthropic.com/settings/keys から取得)',
  );
  if (key && key.trim()) {
    setApiKey(key.trim());
    toast('APIキーを保存しました');
    return true;
  }
  return false;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function mdLineToHtml(line: string): string {
  // very small inline markdown for chat bubbles
  return escapeHtml(line)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function renderMessageBody(text: string): string {
  return text.split(/\r?\n/).map(mdLineToHtml).join('<br>');
}

export function renderAiMessages(): void {
  const list = g('ai-messages');
  list.innerHTML = '';
  if (S.ai.messages.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'n365-ai-empty';
    empty.innerHTML =
      '<div class="n365-ai-empty-title">このページについて質問できます</div>' +
      '<div class="n365-ai-empty-sub">下のチップから始めるか、自由に入力してください</div>';
    list.appendChild(empty);
  }
  for (const m of S.ai.messages) {
    const row = document.createElement('div');
    row.className = 'n365-ai-msg n365-ai-' + m.role;
    row.innerHTML = renderMessageBody(m.content);
    list.appendChild(row);
  }
  if (S.ai.loading) {
    const loader = document.createElement('div');
    loader.className = 'n365-ai-msg n365-ai-assistant n365-ai-loading';
    loader.textContent = '考え中…';
    list.appendChild(loader);
  }
  list.scrollTop = list.scrollHeight;
}

export async function sendAiMessage(text: string): Promise<void> {
  const trimmed = text.trim();
  if (!trimmed) return;
  if (!ensureApiKey()) return;

  S.ai.messages.push({ role: 'user', content: trimmed });
  S.ai.loading = true;
  renderAiMessages();
  (g('ai-input') as HTMLTextAreaElement).value = '';

  try {
    const reply = await callClaude(
      S.ai.messages.map<ChatMessage>((m) => ({ role: m.role, content: m.content })),
      systemPrompt(),
    );
    S.ai.messages.push({ role: 'assistant', content: reply });
  } catch (err) {
    toast('AI失敗: ' + (err as Error).message, 'err');
    S.ai.messages.push({ role: 'assistant', content: '⚠️ ' + (err as Error).message });
  } finally {
    S.ai.loading = false;
    renderAiMessages();
  }
}

export function clearAiHistory(): void {
  if (S.ai.messages.length === 0) return;
  if (!confirm('会話履歴をクリアしますか？')) return;
  S.ai.messages = [];
  renderAiMessages();
}

export function configureApiKey(): void {
  const cur = getApiKey() || '';
  const next = prompt('Anthropic APIキー (空欄で削除):', cur);
  if (next === null) return;
  setApiKey(next.trim());
  toast(next.trim() ? 'APIキーを更新しました' : 'APIキーを削除しました');
}

export function getQuickPrompts(): typeof QUICK_PROMPTS {
  return QUICK_PROMPTS;
}
