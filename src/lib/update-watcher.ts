// バンドル更新のライブ検知。
//
// ローダは「起動時」に最新バンドルを取得するが、アプリを開きっぱなしだと更新に
// 気付けない。このウォッチャーは loader と同じベース(SP or 開発ローカル)の
// version.txt を定期的に確認し、現在実行中の __BUILD_ID__ と違えば「新バージョン
// あり」バナーを出してワンクリックでリロードさせる(編集中に勝手にリロードしない)。

declare const __BUILD_ID__: string;

const POLL_MS = 90_000;
let _timer: number | null = null;
let _shown = false;

/** loader と同じロジックでバンドル取得元ベースを決める。 */
function bundleBase(): string {
  try {
    if (localStorage.getItem('memola.dev.bundle-source') === 'local') {
      return (localStorage.getItem('memola.dev.local-base') || 'http://127.0.0.1:18080/memola').replace(/\/+$/, '');
    }
  } catch { /* ignore */ }
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
  if (!base) return false;
  const cur = currentVersion();
  if (!cur) return false;
  try {
    const r = await fetch(base + '/version.txt?t=' + Date.now(), { credentials: 'same-origin', cache: 'no-cache' });
    if (!r.ok) return false;
    const remote = (await r.text()).trim();
    if (remote && remote !== cur) { showBanner(remote); return true; }
  } catch { /* リレー未起動 / オフライン → 無視 */ }
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
  // 初回は起動直後の負荷を避けて少し遅らせる。
  _timer = window.setTimeout(function tick() {
    void checkOnce();
    _timer = window.setTimeout(tick, POLL_MS);
  }, POLL_MS);
}
