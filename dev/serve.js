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
  const SRC = path.join(DEV_DIR, '..', 'src');
  const ctx = await esbuild.context({
    entryPoints: [path.join(DEV_DIR, 'main.ts')],
    bundle: true,
    outfile: path.join(DEV_DIR, 'main.js'),
    loader: { '.css': 'text' },
    format: 'iife',
    target: 'es2020',
    sourcemap: 'inline',
    logLevel: 'info',
    // 本番 build.js と同様、@kenjiuno/msgreader が引っ張る Node 専用モジュールを
    // ブラウザ用の空スタブへ差し替える。これが無いと dev ビルドが
    // "Could not resolve buffer/string_decoder" で失敗し、古いバンドルを配信し続ける。
    alias: {
      'iconv-lite':     path.join(SRC, 'lib/_browser-shims.ts'),
      'safer-buffer':   path.join(SRC, 'lib/_browser-shims.ts'),
      'buffer':         path.join(SRC, 'lib/_browser-shims.ts'),
      'string_decoder': path.join(SRC, 'lib/_browser-shims.ts'),
    },
    define: {
      '__BUILD_ID__': JSON.stringify('dev-' + new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '')),
    },
  });
  await ctx.watch();

  const server = http.createServer((req, res) => {
    const reqUrl = (req.url || '/').split('?')[0];
    // Version token endpoint for the live-reload loader (dev/loader.js).
    // Returns a string that changes whenever esbuild rewrites main.js
    // (mtime + size). The loader polls this and reloads on change.
    if (reqUrl === '/__ver') {
      let token = '0';
      try {
        const st = fs.statSync(path.join(DEV_DIR, 'main.js'));
        token = st.mtimeMs + '-' + st.size;
      } catch { /* main.js not built yet */ }
      res.writeHead(200, { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' });
      res.end(token);
      return;
    }
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
