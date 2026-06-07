// relay スクリプト(ps1/bat)の自動更新 — ブラウザ側 (別アプリ relayUpdate を移植)。
//
// 仕組み:
//   1. SP の memola フォルダの relay-version.txt (= build.js が出力する manifest)
//      と relay の /memola/relay/version を比較。
//   2. 差分があれば、SP からファイル群を fetch(ブラウザの SP セッション認証)→
//      base64 化 → relay の /memola/relay/self-update に POST。
//   3. relay は *.new に stage → memola-updater.bat を spawn → 自己 exit →
//      updater がファイル swap + relay 再起動。
//   4. /memola/health の復帰を ping で待つ。

import { SITE } from '../config';
import { prefAiCorpBaseUrl, prefDevLocalBase } from './prefs';

export interface RelayManifest { version: string; files: string[] }
export interface UpdateCheck {
  available: { localVersion: string; remoteVersion: string; files: string[] } | null;
  detail: string;
}
export interface ApplyResult { ok: boolean; relayBackUp: boolean; newVersion: string | null; error?: string }

/** relay の origin = 設定の「ローカルベース」(memola.dev.local-base)の origin。
 *  ユーザーが設定に入力したURLをそのまま参照する(別ポートでもそこを見る)。
 *  未設定時のみ corp ベースURL → 既定 localhost:18080 にフォールバック。 */
function relayOrigin(): string {
  const local = prefDevLocalBase.get();
  if (local) { try { return new URL(local).origin; } catch { /* ignore */ } }
  const cur = prefAiCorpBaseUrl.get();
  if (cur) { try { return new URL(cur).origin; } catch { /* ignore */ } }
  return 'http://localhost:18080';
}

/** SP 上の memola フォルダ URL(relay-version.txt / ps1 / bat の置き場)。 */
function spFolderUrl(): string {
  return SITE.replace(/\/+$/, '') + '/Shared Documents/memola';
}

export interface RelayBundleDir { dir: string; exists: boolean; hasBundle: boolean }

/** リレーが現在配信しているローカルフォルダを照会(開発: ローカル参照の配信元)。 */
export async function getRelayBundleDir(): Promise<RelayBundleDir | null> {
  try {
    const r = await fetch(relayOrigin() + '/memola/bundle-dir', { signal: AbortSignal.timeout(4000) });
    if (!r.ok) return null;
    const j = await r.json();
    return { dir: String(j.dir || ''), exists: !!j.exists, hasBundle: !!j.hasBundle };
  } catch { return null; }
}

/** リレーの配信フォルダを変更(実行中のみ有効。恒久指定は memola.env の MEMOLA_BUNDLE_DIR)。 */
export async function setRelayBundleDir(dir: string): Promise<RelayBundleDir | null> {
  try {
    const r = await fetch(relayOrigin() + '/memola/bundle-dir', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dir }), signal: AbortSignal.timeout(4000),
    });
    if (!r.ok) return null;
    const j = await r.json();
    return { dir: String(j.dir || ''), exists: !!j.exists, hasBundle: !!j.hasBundle };
  } catch { return null; }
}

async function pingRelay(): Promise<boolean> {
  try {
    const r = await fetch(relayOrigin() + '/memola/health', { signal: AbortSignal.timeout(3000) });
    return r.ok;
  } catch { return false; }
}

async function fetchManifestFromSp(): Promise<RelayManifest | null> {
  try {
    const r = await fetch(spFolderUrl() + '/relay-version.txt?t=' + Date.now(), { credentials: 'same-origin', cache: 'no-cache' });
    if (!r.ok) return null;
    const j = JSON.parse(await r.text()) as RelayManifest;
    return (j.version && Array.isArray(j.files)) ? j : null;
  } catch { return null; }
}

async function fetchRelayVersion(): Promise<{ version?: string } | null> {
  try {
    const r = await fetch(relayOrigin() + '/memola/relay/version', { signal: AbortSignal.timeout(7000) });
    return r.ok ? await r.json() : null;
  } catch { return null; }
}

/** SP と relay のバージョンを比較。 */
export async function checkRelayUpdate(): Promise<UpdateCheck> {
  if (!(await pingRelay())) return { available: null, detail: 'relay 未起動' };
  const [remote, local] = await Promise.all([fetchManifestFromSp(), fetchRelayVersion()]);
  if (!remote) return { available: null, detail: 'SP の relay-version.txt 取得失敗(配置を確認)' };
  if (!local?.version) return { available: null, detail: 'relay /memola/relay/version 取得失敗' };
  if (remote.version === local.version) return { available: null, detail: `同じバージョン (v${local.version})` };
  return { available: { localVersion: local.version, remoteVersion: remote.version, files: remote.files }, detail: `v${local.version} → v${remote.version}` };
}

async function fetchFileAsBase64(name: string): Promise<{ name: string; contentBase64: string } | null> {
  try {
    const r = await fetch(spFolderUrl() + '/' + name + '?t=' + Date.now(), { credentials: 'same-origin', cache: 'no-cache' });
    if (!r.ok) return null;
    const buf = await r.arrayBuffer();
    if (!buf.byteLength) return null;
    let bin = '';
    const v = new Uint8Array(buf);
    for (let i = 0; i < v.length; i += 0x8000) bin += String.fromCharCode.apply(null, Array.from(v.subarray(i, i + 0x8000)));
    return { name, contentBase64: btoa(bin) };
  } catch { return null; }
}

/** 更新を実行: SP から取得 → relay へ POST → 再起動を待つ。 */
export async function applyRelayUpdate(files: string[]): Promise<ApplyResult> {
  const downloaded: Array<{ name: string; contentBase64: string }> = [];
  for (const f of files) {
    const got = await fetchFileAsBase64(f);
    if (!got) return { ok: false, relayBackUp: true, newVersion: null, error: `SP からのDL失敗: ${f}` };
    downloaded.push(got);
  }
  try {
    const r = await fetch(relayOrigin() + '/memola/relay/self-update', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ files: downloaded }), signal: AbortSignal.timeout(30000),
    });
    if (!r.ok) {
      let detail = ''; try { detail = (await r.json())?.error?.detail ?? ''; } catch { /* noop */ }
      return { ok: false, relayBackUp: true, newVersion: null, error: `self-update HTTP ${r.status}: ${detail}` };
    }
    try { await r.json(); } catch { /* relay は応答後 exit するので body 読めなくてもOK */ }
  } catch {
    // relay が POST 直後に exit → 接続切れは想定内(updater は spawn 済み前提)。
  }
  // 再起動完了を ping で待つ (最大 25 秒)。
  const start = Date.now();
  while (Date.now() - start < 25_000) {
    await new Promise((r) => setTimeout(r, 1000));
    if (await pingRelay()) {
      const ver = await fetchRelayVersion();
      return { ok: true, relayBackUp: true, newVersion: ver?.version ?? null };
    }
  }
  return { ok: false, relayBackUp: false, newVersion: null, error: 'relay が25秒以内に再起動しませんでした。手動で memola-start.bat を実行してください' };
}
