// Dev shell entry. Mounts Memola in a localhost page, with a fetch
// mock standing in for SharePoint REST. Goal: drive the editor in
// real Chrome via the Claude Preview tools without needing the SP
// bookmarklet round-trip.
//
// Reuses src/ verbatim — only the SP-check in src/main.ts is the
// reason this isn't a one-line "import src/main.ts". We replicate
// the bootstrap sans the hostname guard and add the fetch mock.

import { installSpMock } from './sp-mock';
import { initConfig, setSite } from '../src/config';
import { buildHtml } from '../src/ui/html-template';
import { attachAll, init } from '../src/ui/wiring';
import css from '../src/styles/app.css';

(async function () {
  // 1. Install the fetch mock BEFORE any module reads from window.fetch
  installSpMock();

  // 2. Pin the site URL to a synthetic host so config doesn't try to
  //    sniff it from location (= localhost would fail SP-shaped URLs).
  setSite('https://localhost.memola.dev/sites/dev');
  // Also call the real init to populate FOLDER etc. — it'll see our
  // pinned site since prefCurrentWsUrl is empty in dev.
  initConfig();
  // Override again in case initConfig clobbered (= location-derived
  // override). The mock relies on `_api/` paths, not the host.
  setSite('https://localhost.memola.dev/sites/dev');

  // 3. CSS
  const st = document.createElement('style');
  st.id = 'memola-style';
  st.textContent = css;
  document.head.appendChild(st);

  // 4. HTML overlay
  const ov = document.createElement('div');
  ov.id = 'memola-overlay';
  ov.innerHTML = buildHtml();
  document.body.appendChild(ov);

  // 5. Bootstrap
  attachAll();
  void init();

  // Dev-only: expose the editor2 bridge on window so preview_eval can
  // drive `applyMutation` / `getBlocks` directly. Real bookmarklet
  // builds don't include this entry point.
  void import('../src/ui/editor2/editor2-bridge').then((m) => {
    (window as unknown as { __memolaDev?: unknown }).__memolaDev = m;
    console.log('[dev] window.__memolaDev exposed (bridge module)');
  });

  console.log('[dev] Memola mounted. Open #memola-overlay to interact.');
})();
