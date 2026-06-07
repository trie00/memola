// バンドル更新のライブ検知。
//
// ローダは「起動時」に最新バンドルを取得するが、アプリを開きっぱなしだと更新に
// 気付けない。このウォッチャーは loader と同じベース(SP or 開発ローカル)の
// version.txt を定期的に確認し、現在実行中の __BUILD_ID__ と違えば「新バージョン
// あり」バナーを出してワンクリックでリロードさせる(編集中に勝手にリロードしない)。

import { SITE } from '../config';

declare const __BUILD_ID__: string;

const POLL_MS = 90_000;
let _timer: number | null = null;
let _shown = false;

/** バンドル取得元ベース。開発(ローカル)→ アプリの SITE → _spPageContextInfo の順。
 *  以前は _spPageContextInfo だけを見ていたが、ブックマークレット実行コンテキストで
 *  未定義のことがあり、その場合 base が空になって更新検知が一切働かなかった。
 *  アプリが全REST で使う SITE(絶対URL)を基準にすれば確実に解決できる。 */
function bundleBase(): string {
  try {
    if (localStorage.getItem('memola.dev.bundle-source') === 'local') {
      return (localStorage.getItem('memola.dev.local-base') || 'http://127.0.0.1:18080/memola').replace(/\/+$/, '');
    }
  } catch { /* ignore */ }
  if (SITE) return SITE.replace(/\/+$/, '') + '/Shared Documents/memola';
  const c = (window as unknown as { _spPageContextInfo?: { webServerRelativeUrl?: string } })._spPageContextInfo;
  if (c?.webServerRelativeUrl) return c.webServerRelativeUrl.replace(/\/$/, '') + '/Shared Documents/memola';
  return '';
}

function currentVersion(): string {
  try { return typeof __BUILD_ID__ !== 'undefined' ? __BUILD_ID__ : ''; } catch { return ''; }
}

function showBanner(remote: string): void {
  if (_shown) return;
  _shown = true;
  const bar = document.createElement('div');
  bar.id = 'memola-update-bar';
  bar.innerHTML =
    '<span>🔄 新しいバージョン (' + remote + ') があります。</span>'
    + '<button id="memola-update-reload">リロード</button>'
    + '<button id="memola-update-dismiss" title="閉じる">×</button>';
  document.getElementById('memola-overlay')?.appendChild(bar);
  bar.querySelector('#memola-update-reload')?.addEventListener('click', () => location.reload());
  bar.querySelector('#memola-update-dismiss')?.addEventListener('click', () => { bar.remove(); });
}

async function checkOnce(): Promise<boolean> {
  const base = bundleBase();
  const cur = currentVersion();
  if (!base || !cur) {
    // eslint-disable-next-line no-console
    console.warn('[memola update] スキップ: base=' + JSON.stringify(base) + ' current=' + JSON.stringify(cur));
    return false;
  }
  try {
    // ローカル(別オリジンの relay)取得は credentials を送らない。same-origin だと
    // クロスオリジンで挙動が分かりにくいので明示的に 'omit'。
    const cross = /^https?:\/\//i.test(base) && !base.startsWith(location.origin);
    const r = await fetch(base + '/version.txt?t=' + Date.now(), {
      credentials: cross ? 'omit' : 'same-origin',
      cache: 'no-store',
    });
    if (!r.ok) { console.warn('[memola update] version.txt HTTP ' + r.status + ' @ ' + base); return false; }
    const remote = (await r.text()).trim();
    // eslint-disable-next-line no-console
    console.log('[memola update] base=' + base + ' current=' + cur + ' remote=' + remote +
      (remote === cur ? ' (最新)' : ' → 新版あり'));
    if (remote && remote !== cur) { showBanner(remote); return true; }
  } catch (e) {
    // 握り潰さず可視化(CORS / Private Network / mixed-content / relay 未起動 等)。
    // eslint-disable-next-line no-console
    console.warn('[memola update] version.txt 取得失敗 @ ' + base + ': ' + ((e as Error)?.message || e));
  }
  return false;
}

/** 手動チェック(右上の更新ボタン等)。新版があればバナー表示、announce 指定時は
 *  最新ならトーストで知らせる。 */
export async function checkForUpdateNow(opts: { announce?: boolean } = {}): Promise<void> {
  const found = await checkOnce();
  if (!found && opts.announce) {
    const { toast } = await import('../ui/ui-helpers');
    toast('最新バージョンです (' + currentVersion() + ')');
  }
}

/** 定期チェック開始(冪等)。 */
export function startUpdateWatcher(): void {
  if (_timer !== null) return;
  // 初回は早め(8秒)に1回チェックして、以後は POLL_MS 間隔。
  _timer = window.setTimeout(function tick() {
    void checkOnce();
    _timer = window.setTimeout(tick, POLL_MS);
  }, 8_000);
}
