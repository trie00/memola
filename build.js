const esbuild = require('esbuild');
const fs = require('fs');
const crypto = require('crypto');

// Build identifier — surfaced in Settings → Help so users can verify
// which version their bookmarklet is running. Format:
//   YYMMDD-HHMM-<6-char-content-hash>
// The content hash is computed from src/ + styles to detect "the
// bookmark URL is the same byte sequence" cases.
function computeBuildId() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const stamp = String(d.getFullYear()).slice(2) + pad(d.getMonth() + 1) + pad(d.getDate())
    + '-' + pad(d.getHours()) + pad(d.getMinutes());
  // Hash a representative subset of source files. Don't walk the
  // whole tree — just the entry + a stable few files is enough to
  // detect "same code or different".
  const hash = crypto.createHash('sha256');
  for (const f of ['src/main.ts', 'src/api/pages.ts', 'src/ui/wiring.ts', 'package.json']) {
    try { hash.update(fs.readFileSync(f)); } catch { /* ignore */ }
  }
  return stamp + '-' + hash.digest('hex').slice(0, 6);
}
const BUILD_ID = computeBuildId();

const result = esbuild.buildSync({
  entryPoints: ['src/main.ts'],
  bundle: true,
  format: 'iife',
  target: 'es2020',
  loader: { '.css': 'text' },
  write: false,
  // minify: ブックマークレットは javascript: URL 1本に丸ごと埋め込むため、
  // ブラウザの URL 長制限(約2MB)を超えると無言で実行されなくなる。縮小必須。
  minify: true,
  legalComments: 'none',
  define: {
    '__BUILD_ID__': JSON.stringify(BUILD_ID),
  },
});

const bundled = result.outputFiles[0].text;
// Wrap in an outer IIFE: the bundle starts with "use strict"; followed by an
// inner IIFE (two statements). void(...) requires a single expression, so we
// wrap them in function(){ ... }() to make it one expression.
const wrapped = 'function(){' + bundled + '}()';
const url = 'javascript:void(' + encodeURIComponent(wrapped) + ');';

let html = fs.readFileSync('src/template.html', 'utf8');
html = html.replaceAll('{{BOOKMARKLET_URL}}', url);

fs.writeFileSync('install.html', html);
console.log('Built install.html (' + Math.round(html.length / 1024) + ' KB)');
