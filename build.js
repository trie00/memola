const esbuild = require('esbuild');
const fs = require('fs');

const result = esbuild.buildSync({
  entryPoints: ['src/main.ts'],
  bundle: true,
  format: 'iife',
  target: 'es2020',
  loader: { '.css': 'text' },
  write: false,
  minify: false,
  legalComments: 'none',
});

const bundled = result.outputFiles[0].text;
const url = 'javascript:void(' + encodeURIComponent(bundled) + ');';

let html = fs.readFileSync('src/template.html', 'utf8');
html = html.replaceAll('{{BOOKMARKLET_URL}}', url);

fs.writeFileSync('install.html', html);
console.log('Built install.html (' + Math.round(html.length / 1024) + ' KB)');
