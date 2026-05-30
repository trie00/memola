// Live-reload loader for the Memola dev shell.
//
// Loader-format auto-update: instead of baking the bundle into the page,
// this thin loader (a) fetches the freshly-built main.js from the dev
// server at launch, and (b) polls the /__ver token while running and
// reloads the page the moment esbuild rewrites main.js. So the edit →
// rebuild → see-it loop needs no manual refresh.
//
// Source is the local dev server (localhost) — this is a development
// productivity tool, not a production distribution path. (Real
// SharePoint pages are https and would block an http://localhost script
// as mixed content; the dev shell is served from localhost so same-
// origin http is fine.)
(function () {
  var VER_URL = '/__ver';
  var MAIN_URL = '/main.js';
  var POLL_MS = 1500;
  var current = null;

  // ── Small "live" status pill (bottom-right) ──────────────
  var pill = document.createElement('div');
  pill.style.cssText =
    'position:fixed;right:10px;bottom:10px;z-index:2147483647;' +
    'font:12px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;' +
    'background:#1f1f1f;color:#bdf5c0;padding:5px 9px;border-radius:999px;' +
    'box-shadow:0 2px 8px rgba(0,0,0,.25);opacity:.7;pointer-events:none;' +
    'transition:opacity .2s,background .2s,color .2s;';
  pill.textContent = '⟳ live';
  var addPill = function () {
    if (document.body) document.body.appendChild(pill);
    else document.addEventListener('DOMContentLoaded', function () { document.body.appendChild(pill); });
  };
  addPill();

  function flash(text, bg, fg) {
    pill.textContent = text;
    pill.style.background = bg;
    pill.style.color = fg;
    pill.style.opacity = '1';
  }

  function fetchVer() {
    return fetch(VER_URL, { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.text() : null; })
      .catch(function () { return null; });
  }

  function loadMain() {
    var s = document.createElement('script');
    // Cache-bust so Chrome refetches even with no-store.
    s.src = MAIN_URL + '?t=' + Date.now();
    s.onerror = function () { flash('⚠ 読込失敗', '#5a1f1f', '#ffc9c9'); };
    document.body.appendChild(s);
  }

  // Launch: record the current version, then load the latest bundle.
  fetchVer().then(function (v) {
    current = v;
    loadMain();
    // Poll for rebuilds while running.
    setInterval(function () {
      fetchVer().then(function (v2) {
        if (v2 == null) return;                 // server momentarily down / mid-build
        if (current == null) { current = v2; return; }
        if (v2 !== current) {
          current = v2;
          flash('⟳ 更新を検出 — 再読込', '#1f3a1f', '#bdf5c0');
          // A full reload is the clean hot-update for the dev shell:
          // the bundle is an IIFE that mounts an overlay, so re-running
          // it in place would double-mount. index.html re-runs this
          // loader after reload and picks up the new main.js.
          setTimeout(function () { location.reload(); }, 150);
        }
      });
    }, POLL_MS);
  });
})();
