// SVG icon strings used throughout the UI.
// 別アプリ と統一: Feather 系 24x24・stroke 1.7・currentColor。共通アイコンは 別アプリ の
// 定義に合わせ、memola 固有のキーも同じ線幅・体裁に揃えている。キー名は memola の
// 既存参照を壊さないため維持。
const SVG = (paths: string): string =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

export const ICONS: Record<string, string> = {
  // ── 別アプリ と共通(定義を合わせる) ──
  search:    SVG(`<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>`),
  plus:      SVG(`<path d="M12 5v14M5 12h14"/>`),
  link:      SVG(`<path d="M10 14a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"/><path d="M14 10a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"/>`),
  copy:      SVG(`<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>`),
  filter:    SVG(`<path d="M3 5h18l-7 9v6l-4-2v-4z"/>`),
  sort:      SVG(`<path d="M3 6h13M3 12h9M3 18h5"/><path d="M17 16l4 4 4-4" transform="translate(-4 -4)"/>`),
  trash:     SVG(`<path d="M3 6h18"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>`),
  edit:      SVG(`<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>`),
  refresh:   SVG(`<path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>`),
  gear:      SVG(`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>`),
  send:      SVG(`<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>`),
  external:  SVG(`<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/>`),
  chat:      SVG(`<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>`),
  stop:      SVG(`<rect x="6" y="6" width="12" height="12" rx="1"/>`),
  close:     SVG(`<path d="M6 6l12 12M18 6L6 18"/>`),               // = 別アプリ x
  exit:      SVG(`<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>`), // = 別アプリ door
  sparkle:   SVG(`<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="2.5"/>`), // = 別アプリ sparkles
  info:      SVG(`<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/>`), // = 別アプリ help 系

  // ── memola 固有(線幅 1.7 に統一) ──
  code:      SVG(`<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`),
  codeBlock: SVG(`<rect x="3" y="4" width="18" height="16" rx="2"/><polyline points="10 14 8 12 10 10"/><polyline points="14 10 16 12 14 14"/>`),
  ul:        SVG(`<line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1.3" fill="currentColor" stroke="none"/><circle cx="4.5" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="4.5" cy="18" r="1.3" fill="currentColor" stroke="none"/>`),
  ol:        SVG(`<line x1="10" y1="6" x2="20" y2="6"/><line x1="10" y1="12" x2="20" y2="12"/><line x1="10" y1="18" x2="20" y2="18"/><path d="M3.5 4.5L5 3.5v5"/><path d="M3.5 8.5h3"/>`),
  todo:      SVG(`<rect x="3" y="3" width="18" height="18" rx="3"/><polyline points="8 12 11 15 16 9"/>`),
  hr:        SVG(`<line x1="4" y1="12" x2="20" y2="12"/>`),
  database:  SVG(`<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>`),
  page:      SVG(`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`),
  table:     SVG(`<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/>`),
  board:     SVG(`<rect x="3" y="3" width="6" height="18" rx="1"/><rect x="11" y="3" width="6" height="11" rx="1"/><rect x="19" y="3" width="2" height="7" rx="1"/>`),
  sidebar:   SVG(`<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/>`),
  chevronLeft:  SVG(`<polyline points="15 18 9 12 15 6"/>`),
  chevronRight: SVG(`<polyline points="9 18 15 12 9 6"/>`),
  download:  SVG(`<path d="M12 3v12"/><polyline points="7 10 12 15 17 10"/><line x1="4" y1="21" x2="20" y2="21"/>`),
  print:     SVG(`<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>`),

  // ── 塗りつぶし系(stroke ではなく fill) ──
  quote:     '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 11c0-2.2 1.3-4 4-4v2c-1 0-2 1-2 2h2v5H5v-5zm8 0c0-2.2 1.3-4 4-4v2c-1 0-2 1-2 2h2v5h-4v-5z"/></svg>',
  more:      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>',
};
