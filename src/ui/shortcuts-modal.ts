// Keyboard shortcuts reference modal.
//
// One source of truth for "what keys do what" in Memola. The list lives
// here as a typed constant; the modal renders it directly.
//
// IMPORTANT: keep this list in sync with the actual handlers in
// `keymap.ts onKey()`, the editor toolbar, and `editor.ts`. Adding an
// entry here doesn't bind a key — it just documents one.

import { escapeHtml } from '../lib/html-escape';
import { confirmModal } from './lib/modal';

const MODAL_ID = 'memola-shortcuts-md';

export interface Shortcut {
  /** Key combo. We render Cmd/Ctrl conditionally per-platform. Use 'Mod'
   *  for Cmd-on-Mac / Ctrl-on-PC, 'Shift', 'Alt', and literal keys. */
  keys: string[];
  desc: string;
}

export interface ShortcutGroup {
  title: string;
  items: Shortcut[];
}

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

/** Render `keys` for display. Maps 'Mod' → ⌘ on Mac, Ctrl on others. */
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

function buildHtml(): string {
  const sections = SHORTCUT_GROUPS.map((group) => {
    const items = group.items.map((item) =>
      '<li><span class="memola-shortcuts-keys">' + renderKeys(item.keys) +
      '</span><span class="memola-shortcuts-desc">' + escapeHtml(item.desc) + '</span></li>'
    ).join('');
    return '<section class="memola-shortcuts-sec"><h3>' +
      escapeHtml(group.title) + '</h3><ul>' + items + '</ul></section>';
  }).join('');
  return '<div class="memola-mb memola-shortcuts-mb">' +
    '<h2>⌨ キーボードショートカット</h2>' +
    '<div class="memola-shortcuts-grid">' + sections + '</div>' +
    '<div class="memola-ma">' +
      '<button class="memola-btn p" data-c="close">閉じる</button>' +
    '</div>' +
  '</div>';
}

/** Open the shortcut cheatsheet. Auto-closes on ESC, backdrop click, or
 *  the 「閉じる」 button — all wired by the shared modal helper. */
export function openShortcutsModal(): void {
  // Fire-and-forget: the user dismissing the modal resolves the Promise
  // but we don't need its value (cheatsheet has nothing to return).
  void confirmModal<void>({
    id: MODAL_ID,
    className: '',                              // already in the contentHtml
    contentHtml: buildHtml(),
    buttons: { close: undefined as unknown as void },
    cancelValue: undefined as unknown as void,
  });
}

export function closeShortcutsModal(): void {
  const md = document.getElementById(MODAL_ID);
  if (md) md.remove();
}
