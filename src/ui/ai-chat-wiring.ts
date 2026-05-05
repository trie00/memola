// AI chat panel wiring — toggle / clear / new-session / message send +
// quick-prompt chips + auto-grow input + provider-model picker.
//
// The actual chat rendering and provider routing lives in `./ai-chat.ts`;
// this module just hooks up the DOM listeners.

import { g } from './dom';
import {
  closeAiPanel, toggleAiPanel, sendAiMessage, clearAiHistory,
  getQuickPrompts, loadAiSession, newAiSession, renderHistoryDropdown,
  applyAiPanelState,
} from './ai-chat';

let _attached = false;

export function attachAiChatWiring(): void {
  if (_attached) return;
  _attached = true;

  g('ai-btn').addEventListener('click', toggleAiPanel);
  g('ai-close').addEventListener('click', closeAiPanel);
  g('ai-clear').addEventListener('click', clearAiHistory);
  document.getElementById('memola-ai-new')?.addEventListener('click', () => newAiSession());

  // Session-history dropdown
  g('ai-hist').addEventListener('change', () => {
    const v = (g('ai-hist') as HTMLSelectElement).value;
    if (v === '__new__') newAiSession();
    else loadAiSession(v);
  });
  renderHistoryDropdown();
  applyAiPanelState();

  // Pane resize handles (sidebar/outline/props/AI) — restore widths + install drag
  void import('./pane-resize').then((m) => m.attachPaneResizers());

  // Model picker in the chat input bar — single switch for provider+model.
  void import('./ai-chat').then((m) => m.syncProviderBadge?.());
  const modelPick = document.getElementById('memola-ai-model-pick') as HTMLSelectElement | null;
  if (modelPick) {
    modelPick.addEventListener('change', () => {
      void import('./ai-chat').then((m) => m.applyModelPick?.(modelPick.value));
    });
  }

  // Send button + Enter-to-send (Shift+Enter for newline).
  g('ai-send').addEventListener('click', () => {
    const ta = g('ai-input') as HTMLTextAreaElement;
    void sendAiMessage(ta.value);
  });
  g('ai-input').addEventListener('keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.isComposing || ke.keyCode === 229) return;
    if (ke.key === 'Enter' && !ke.shiftKey) {
      e.preventDefault();
      const ta = g('ai-input') as HTMLTextAreaElement;
      void sendAiMessage(ta.value);
    }
  });

  // Auto-grow up to 10 lines (~232px) on each input, then scroll. We
  // also nudge scrollTop to max so the bottom padding stays visible —
  // the browser's default cursor-into-view scroll lands flush with the
  // bottom edge, leaving the cursor seemingly without margin.
  const aiInputTa = g('ai-input') as HTMLTextAreaElement;
  aiInputTa.addEventListener('input', () => {
    aiInputTa.style.height = 'auto';
    aiInputTa.style.height = Math.min(aiInputTa.scrollHeight, 232) + 'px';
    aiInputTa.scrollTop = aiInputTa.scrollHeight;
  });

  // Quick-prompt chips
  const chips = g('ai-chips');
  getQuickPrompts().forEach((p) => {
    const b = document.createElement('button');
    b.className = 'memola-ai-chip';
    b.textContent = p.label;
    b.addEventListener('click', () => {
      void sendAiMessage(p.prompt);
    });
    chips.appendChild(b);
  });
}
