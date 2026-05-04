// Keyboard shortcuts reference modal.
//
// One source of truth for "what keys do what" in Memola. The list lives
// here as a typed constant — the modal renders it directly, and any future
// command-palette / cheat-sheet feature can import the same list.
//
// IMPORTANT: keep this list in sync with the actual handlers in
// `actions.ts onKey()`, the editor toolbar, and `editor.ts`. Adding an
// entry here doesn't bind a key — it just documents one.

import { escapeHtml } from '../lib/html-escape';

export interface Shortcut {
  /** Key combo, in the abstract form. We render Cmd/Ctrl conditionally
   *  per-platform at display time. Use 'Mod' for Cmd-on-Mac / Ctrl-on-PC,
   *  'Shift', 'Alt', and literal keys like 'K', 'S', '\\', '['. */
  keys: string[];
  /** Human-readable description. */
  desc: string;
}

export interface ShortcutGroup {
  title: string;
  items: Shortcut[];
}

/** All shortcuts the app responds to, organised by category. Sourced by
 *  reading every `addEventListener('keydown', …)` in the codebase — if
 *  you add a binding, add it here too so the help modal stays accurate. */
export const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    title: 'ナビゲーション',
    items: [
      { keys: ['Mod', 'K'],         desc: 'クイック検索 / コマンドパレット' },
      { keys: ['Mod', '['],         desc: '戻る (履歴)' },
      { keys: ['Mod', ']'],         desc: '進む (履歴)' },
      { keys: ['Mod', '\\'],        desc: 'サイドバー開閉' },
      { keys: ['Esc'],              desc: '検索 / モーダル / メニューを閉じる' },
    ],
  },
  {
    title: '保存と編集',
    items: [
      { keys: ['Mod', 'S'],         desc: '今すぐ保存 (自動保存を待たない)' },
      { keys: ['Mod', 'Z'],         desc: '取り消し (Undo)' },
      { keys: ['Mod', 'Shift', 'Z'],desc: 'やり直し (Redo)' },
      { keys: ['Mod', 'Y'],         desc: 'やり直し (Redo / Windows 慣例)' },
    ],
  },
  {
    title: '作成',
    items: [
      { keys: ['Mod', 'N'],         desc: '新しいページを作成' },
      { keys: ['Mod', 'Shift', 'N'],desc: '新しい DB を作成' },
    ],
  },
  {
    title: 'パネル / ビュー',
    items: [
      { keys: ['Mod', 'Shift', 'L'],desc: '目次を開閉' },
      { keys: ['Mod', 'Shift', 'R'],desc: 'プロパティを開閉' },
      { keys: ['Mod', 'Shift', 'F'],desc: '集中モード切替' },
      { keys: ['Mod', 'Shift', 'A'],desc: 'AI チャット切替' },
      { keys: ['Mod', 'J'],         desc: 'AI チャット切替 (別バインド)' },
    ],
  },
  {
    title: 'エディタ内',
    items: [
      { keys: ['/'],                desc: 'スラッシュメニュー (ブロック挿入)' },
      { keys: ['[', '['],           desc: 'ページリンクを挿入 ([[ をタイプ)' },
      { keys: ['#', 'スペース'],    desc: '見出し 1 (## → 見出し 2、### → 見出し 3)' },
      { keys: ['-', 'スペース'],    desc: '箇条書き (* / + でも可)' },
      { keys: ['1', '.'],           desc: '番号付きリスト (1. → 開始)' },
      { keys: ['>', 'スペース'],    desc: '引用ブロック' },
      { keys: ['```'],              desc: 'コードブロック (3 連バッククォート)' },
    ],
  },
  {
    title: 'DB ビュー',
    items: [
      { keys: ['Mod', 'A'],         desc: '表示中の全行を選択' },
      { keys: ['Enter'],            desc: '新規行の編集を確定 / 次のセル' },
      { keys: ['Tab'],              desc: '次のセルへ移動 (新規行入力中)' },
      { keys: ['Shift', 'Tab'],     desc: '前のセルへ移動' },
      { keys: ['Esc'],              desc: '入力を破棄' },
    ],
  },
];

/** Render `keys` for display. Maps 'Mod' → ⌘ on Mac, Ctrl on others.
 *  Returns escaped HTML ready to drop into innerHTML. */
function renderKeys(keys: string[]): string {
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || '');
  return keys.map((k) => {
    let label = k;
    if (k === 'Mod')   label = isMac ? '⌘' : 'Ctrl';
    if (k === 'Shift') label = isMac ? '⇧' : 'Shift';
    if (k === 'Alt')   label = isMac ? '⌥' : 'Alt';
    if (k === 'Esc')   label = 'Esc';
    return '<kbd class="memola-kbd">' + escapeHtml(label) + '</kbd>';
  }).join('<span class="memola-kbd-plus">+</span>');
}

/** Open (or rebuild) the shortcut-cheatsheet modal. Idempotent — calling
 *  twice replaces the existing modal so the platform-conditional rendering
 *  always matches the current navigator. */
export function openShortcutsModal(): void {
  closeShortcutsModal();
  const md = document.createElement('div');
  md.id = 'memola-shortcuts-md';
  md.className = 'on';

  const inner = document.createElement('div');
  inner.className = 'memola-mb memola-shortcuts-mb';

  const title = document.createElement('h2');
  title.textContent = '⌨ キーボードショートカット';
  inner.appendChild(title);

  const grid = document.createElement('div');
  grid.className = 'memola-shortcuts-grid';
  for (const group of SHORTCUT_GROUPS) {
    const sec = document.createElement('section');
    sec.className = 'memola-shortcuts-sec';
    const h = document.createElement('h3');
    h.textContent = group.title;
    sec.appendChild(h);
    const ul = document.createElement('ul');
    for (const item of group.items) {
      const li = document.createElement('li');
      li.innerHTML = '<span class="memola-shortcuts-keys">' + renderKeys(item.keys) +
        '</span><span class="memola-shortcuts-desc">' + escapeHtml(item.desc) + '</span>';
      ul.appendChild(li);
    }
    sec.appendChild(ul);
    grid.appendChild(sec);
  }
  inner.appendChild(grid);

  const foot = document.createElement('div');
  foot.className = 'memola-ma';
  const close = document.createElement('button');
  close.className = 'memola-btn p';
  close.textContent = '閉じる';
  close.addEventListener('click', closeShortcutsModal);
  foot.appendChild(close);
  inner.appendChild(foot);

  md.appendChild(inner);
  // Click on the dark backdrop (but not the inner panel) closes too.
  md.addEventListener('click', (e) => { if (e.target === md) closeShortcutsModal(); });

  (document.getElementById('memola-overlay') || document.body).appendChild(md);
}

export function closeShortcutsModal(): void {
  const md = document.getElementById('memola-shortcuts-md');
  if (md) md.remove();
}
