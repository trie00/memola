// Dev server: esbuild watch + minimal HTTP server.
//
// Serves dev/index.html and dev/main.js (built from dev/main.ts).
// Touch a source file -> esbuild rebuilds -> reload the browser
// page to pick up changes.

const esbuild = require('esbuild');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT || '3000', 10);
const DEV_DIR = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

(async () => {
  const ctx = await esbuild.context({
    entryPoints: [path.join(DEV_DIR, 'main.ts')],
    bundle: true,
    outfile: path.join(DEV_DIR, 'main.js'),
    loader: { '.css': 'text' },
    format: 'iife',
    target: 'es2020',
    sourcemap: 'inline',
    logLevel: 'info',
    define: {
      '__BUILD_ID__': JSON.stringify('dev-' + new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '')),
    },
  });
  await ctx.watch();

  const server = http.createServer((req, res) => {
    const reqUrl = (req.url || '/').split('?')[0];
    const url = reqUrl === '/' ? '/index.html' : reqUrl;
    const filePath = path.join(DEV_DIR, url);
    // Prevent path traversal
    if (!filePath.startsWith(DEV_DIR)) {
      res.writeHead(403); res.end('forbidden'); return;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(404); res.end('404 ' + url); return; }
      const ext = path.extname(filePath);
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'text/plain',
        'Cache-Control': 'no-store',
      });
      res.end(data);
    });
  });
  server.listen(PORT, () => {
    console.log('Memola dev shell: http://localhost:' + PORT);
  });
})();
