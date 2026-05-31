// 書き込み担当の単一化 (リース選出)。複数人が同時に org の共有ベクトルセグメントを
// 書き換えると壊れるため、調整用リスト「memola-rag-sync」の単一リース行を ETag 楽観
// ロックで奪い合い、勝った1人だけが org ストアへ書き込む (外部ベクトル ADR-012 を移植)。
//
// 個人 (user) ストアはローカル専用 = 書き手は常に本人のためリース不要。

import { SITE } from '../config';
import { getDigest } from '../api/digest';
import { ensureList, createListItem, updateListItemIfMatch } from '../api/sp-list';

const SYNC_LIST = 'memola-rag-sync';
const LEASE_KEY = '__lease__';
const HEARTBEAT_MS = 30_000;
const HEARTBEAT_IDLE_MS = 5 * 60_000;
const LEASE_MS = 2 * 60_000;

function clientId(): string {
  try {
    let id = localStorage.getItem('memola:rag:client-id');
    if (!id) { id = 'c-' + Math.random().toString(36).slice(2, 10); localStorage.setItem('memola:rag:client-id', id); }
    return id;
  } catch { return 'c-anon'; }
}

interface LeaseRow { Id: number; holder: string; expires: string; etag: string }

export class WriterLease {
  private readonly me = clientId();
  private listReady = false;
  private writer = false;
  private timer: number | null = null;
  private started = false;
  private visibilityBound = false;

  get id(): string { return this.me; }
  isWriter(): boolean { return this.writer; }

  /** 書き込み直前に呼ぶ。リースを取得/更新し、書き込み可なら true。 */
  async ensureWriter(): Promise<boolean> {
    await this.ensureListReady();
    await this.electOrRenew();
    return this.writer;
  }

  async start(): Promise<void> {
    if (this.started) return;
    this.started = true;
    await this.ensureListReady();
    await this.tick();
    this.scheduleNext();
    if (!this.visibilityBound && typeof document !== 'undefined') {
      this.visibilityBound = true;
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) void this.tick();
        this.scheduleNext();
      });
    }
  }

  stop(): void {
    this.started = false;
    if (this.timer != null) { window.clearInterval(this.timer); this.timer = null; }
    void this.release();
  }

  private scheduleNext(): void {
    if (this.timer != null) { window.clearInterval(this.timer); this.timer = null; }
    if (!this.started) return;
    const ms = (typeof document !== 'undefined' && document.hidden) ? HEARTBEAT_IDLE_MS : HEARTBEAT_MS;
    this.timer = window.setInterval(() => { void this.tick(); }, ms);
  }

  private async ensureListReady(): Promise<void> {
    if (this.listReady) return;
    await ensureList({
      title: SYNC_LIST,
      fields: [
        { name: 'holder', kind: 2 },
        { name: 'expires', kind: 4 },
        { name: 'last_seen', kind: 4 },
      ],
    });
    this.listReady = true;
  }

  private async tick(): Promise<void> {
    try { await this.heartbeat(); await this.electOrRenew(); }
    catch (e) { console.warn('[rag/lease] tick 失敗:', (e as Error).message); }
  }

  /** Title=title の行を ETag 付きで読む。無ければ null。 */
  private async readRow(title: string): Promise<LeaseRow | null> {
    const url = SITE + "/_api/web/lists/getbytitle('" + SYNC_LIST + "')/items"
      + "?$select=Id,holder,expires&$filter=Title eq '" + title.replace(/'/g, "''") + "'&$top=1";
    const r = await fetch(url, { headers: { Accept: 'application/json;odata=verbose' }, credentials: 'include' });
    if (!r.ok) return null;
    const j = (await r.json()) as { d?: { results?: Array<{ Id: number; holder?: string; expires?: string; __metadata?: { etag?: string } }> } };
    const row = j.d?.results?.[0];
    if (!row) return null;
    return { Id: row.Id, holder: String(row.holder ?? ''), expires: String(row.expires ?? ''), etag: row.__metadata?.etag ?? '*' };
  }

  private async heartbeat(): Promise<void> {
    const now = new Date().toISOString();
    const row = await this.readRow(this.me);
    if (row) await updateListItemIfMatch(SYNC_LIST, row.Id, { last_seen: now }, '*').catch(() => undefined);
    else await createListItem(SYNC_LIST, { Title: this.me, last_seen: now }).catch(() => undefined);
  }

  private async electOrRenew(): Promise<void> {
    const nowMs = Date.now();
    const untilMs = nowMs + LEASE_MS;
    const until = () => new Date(untilMs).toISOString();
    const lease = await this.readRow(LEASE_KEY);

    if (!lease) {
      try {
        await createListItem(SYNC_LIST, { Title: LEASE_KEY, holder: this.me, expires: until() });
        this.writer = true;
      } catch {
        this.writer = false; // 同時 create 競合 → 次 tick で再判定
      }
      return;
    }

    const holder = lease.holder;
    const expires = Date.parse(lease.expires) || 0;
    if (holder === this.me || expires < nowMs) {
      const r = await updateListItemIfMatch(SYNC_LIST, lease.Id, { holder: this.me, expires: until() }, lease.etag);
      this.writer = r.ok;
    } else {
      this.writer = false; // 他者が有効リース保持中
    }
  }

  private async release(): Promise<void> {
    if (!this.listReady || !this.writer) return;
    try {
      const lease = await this.readRow(LEASE_KEY);
      if (lease && lease.holder === this.me) {
        await updateListItemIfMatch(SYNC_LIST, lease.Id, { expires: new Date().toISOString() }, lease.etag);
      }
    } catch { /* best-effort */ }
    this.writer = false;
  }
}

let shared: WriterLease | null = null;
export function getLease(): WriterLease {
  if (!shared) shared = new WriterLease();
  return shared;
}
