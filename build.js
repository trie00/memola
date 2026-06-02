const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Build identifier — surfaced in Settings → Help so users can verify
// which version their bookmarklet is running. Format:
//   YYMMDD-HHMM-<6-char-content-hash>
function computeBuildId() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const stamp = String(d.getFullYear()).slice(2) + pad(d.getMonth() + 1) + pad(d.getDate())
    + '-' + pad(d.getHours()) + pad(d.getMinutes());
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
  // @kenjiuno/msgreader が引っ張る Node 専用モジュール(iconv-lite / safer-buffer /
  // buffer / string_decoder)をブラウザ用の空スタブに差し替える(別アプリ と同方式)。
  alias: {
    'iconv-lite':     path.resolve('src/lib/_browser-shims.ts'),
    'safer-buffer':   path.resolve('src/lib/_browser-shims.ts'),
    'buffer':         path.resolve('src/lib/_browser-shims.ts'),
    'string_decoder': path.resolve('src/lib/_browser-shims.ts'),
  },
  write: false,
  minify: true,
  legalComments: 'none',
  define: {
    '__BUILD_ID__': JSON.stringify(BUILD_ID),
  },
});

const bundled = result.outputFiles[0].text;   // 自己実行する IIFE

// ── 出力ディレクトリ ──
if (!fs.existsSync('dist')) fs.mkdirSync('dist');

// ① ホスティング用バンドル + version.txt (SP / ローカルリレーが配信)
fs.writeFileSync('dist/memola.bundle.js', bundled);
fs.writeFileSync('dist/version.txt', BUILD_ID + '\n');

// ② ローダ (ブックマークレットの中身)。別アプリ と同方式:
//   - ベース決定: localStorage dev(local) → 上書き → SP の順
//   - version.txt を毎回 fetch(キャッシュ無効) → memola.bundle.js?v=<ver> を読み込み
//   - SP 配信は <script src> (同一オリジン)、ローカルは CSP 回避で fetch→eval
//   - SP 失敗は静かにフォールバック、ローカル失敗は loud(alert) 通知
const libPath = process.env.MEMOLA_BUNDLE_LIB || '/Shared%20Documents/memola';
const overrideBase = JSON.stringify(process.env.MEMOLA_BUNDLE_BASE || '');
const loader =
  `(function(){var d=document,w=window;` +
  `function SP(){try{var c=w._spPageContextInfo;if(c&&c.webServerRelativeUrl)return c.webServerRelativeUrl.replace(/\\/$/,'')+${JSON.stringify(libPath)};}catch(e){}return '';}` +
  `var sp=SP(),dev='';` +
  `try{if(w.localStorage&&localStorage.getItem('memola.dev.bundle-source')==='local')dev=(localStorage.getItem('memola.dev.local-base')||'http://127.0.0.1:18080/memola').replace(/\\/+$/,'');}catch(e){}` +
  `var primary=dev||${overrideBase}||sp;var fb=(primary!==sp&&sp)?sp:'';var isLocal=!!dev;` +
  `function fail(base,why){var msg='[memola] バンドル読込失敗: '+base+(why?' ('+why+')':'')+'\\nrelay 起動 / CORS / CSP / SP 配置を確認してください。';if(isLocal){alert(msg);console.error(msg);}else{console.warn(msg);}}` +
  `function evalLoad(base,ver){fetch(base+'/memola.bundle.js?v='+encodeURIComponent(ver),{credentials:'same-origin'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text();}).then(function(t){var o=d.getElementById('memola-script');if(o)o.remove();try{(0,eval)(t);}catch(e){fail(base,'eval: '+(e&&e.message||e));}}).catch(function(e){fail(base,e&&e.message||'fetch error');});}` +
  `function inject(base,ver){if(isLocal){evalLoad(base,ver);return;}var o=d.getElementById('memola-script');if(o)o.remove();var s=d.createElement('script');s.id='memola-script';s.src=base+'/memola.bundle.js?v='+encodeURIComponent(ver);s.onerror=function(){fail(base,'script load error');if(fb){var x=fb;fb='';go(x);}};d.body.appendChild(s);}` +
  `function go(base){fetch(base+'/version.txt?t='+Date.now(),{credentials:'same-origin'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text();}).then(function(t){inject(base,(t||'').trim()||String(Date.now()));}).catch(function(e){fail(base,e&&e.message||'fetch error');if(isLocal)return;if(fb){var x=fb;fb='';go(x);}else{inject(base,String(Date.now()));}});}` +
  `go(primary);})();`;
fs.writeFileSync('dist/memola.loader.js', loader);
const loaderHref = 'javascript:' + encodeURIComponent(loader);

// ③ install.html = ローダ型インストールページ(極小・推奨。次回起動で自動更新)
const tpl = fs.readFileSync('src/template.html', 'utf8');
fs.writeFileSync('install.html', tpl.replaceAll('{{BOOKMARKLET_URL}}', loaderHref));

// ④ install-full.html = 旧来のバンドル丸ごと埋込(オフライン/フォールバック用)
const wrapped = 'function(){' + bundled + '}()';
const fullUrl = 'javascript:void(' + encodeURIComponent(wrapped) + ');';
fs.writeFileSync('install-full.html', tpl.replaceAll('{{BOOKMARKLET_URL}}', fullUrl));

const kb = (s) => (fs.statSync(s).size / 1024).toFixed(1);
console.log('Built (loader方式):');
console.log('  install.html        ' + kb('install.html') + ' KB  ← ローダ型(配布・推奨)');
console.log('  install-full.html   ' + kb('install-full.html') + ' KB  ← 丸ごと埋込(オフライン)');
console.log('  dist/memola.bundle.js ' + kb('dist/memola.bundle.js') + ' KB  ← SP/リレーに配置');
console.log('  dist/version.txt    "' + BUILD_ID + '"  ← SP/リレーに配置');
console.log('  dist/memola.loader.js (= bookmarklet 中身)');
console.log('');
console.log('  ▶ 本番配置: SharePoint「ドキュメント」→ memola フォルダに memola.bundle.js と version.txt を置く');
console.log('  ▶ 開発: 設定→開発者モードで「ローカルリレーから読込」ON (relay が dist を配信)');
