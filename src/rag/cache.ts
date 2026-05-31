// IndexedDB によるセグメントキャッシュ。
// 起動のたびに SharePoint から全DLしないよう、DL済みセグメント(JSON)と最後に見た
// manifest をブラウザにローカル保存する。次回は差分だけ取得すればよい。
//
// 個人 (user) スコープは SP にベクトルを置かない設計のため、このキャッシュが
// 「ローカルのみのベクトルストア」本体を兼ねる (manifest もローカルで進める)。
//
// DB 名は (サイト, スコープ) ごとに分離する。

import {
  type Segment, type Manifest, parseSegment, serializeSegment, parseManifest, serializeManifest,
} from './segments';
import { SITE } from '../config';

const DB_VERSION = 1;
const STORE_SEG = 'segments';
const STORE_META = 'meta';

function siteHash(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0; }
  return h.toString(16).padStart(8, '0');
}

function open(dbName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(dbName, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_SEG)) db.createObjectStore(STORE_SEG);
      if (!db.objectStoreNames.contains(STORE_META)) db.createObjectStore(STORE_META);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(db: IDBDatabase, store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = db.transaction(store, mode);
    const req = fn(t.objectStore(store));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export class SegmentCache {
  private dbp: Promise<IDBDatabase> | null = null;
  private readonly name: string;

  /** scope = 'org' | `user-<id>`。サイト+スコープ単位で DB を分離。 */
  constructor(scope: string) {
    this.name = `memola-rag-${siteHash(SITE)}-${scope}`;
  }

  get dbName(): string { return this.name; }
  private db(): Promise<IDBDatabase> { return (this.dbp ??= open(this.name)); }

  async allIds(): Promise<string[]> {
    const db = await this.db();
    const keys = await tx<IDBValidKey[]>(db, STORE_SEG, 'readonly', (s) => s.getAllKeys());
    return keys.map(String);
  }

  async get(id: string): Promise<Segment | null> {
    const db = await this.db();
    const text = await tx<string | undefined>(db, STORE_SEG, 'readonly', (s) => s.get(id));
    return text ? parseSegment(text) : null;
  }

  async put(id: string, seg: Segment): Promise<void> {
    const db = await this.db();
    await tx(db, STORE_SEG, 'readwrite', (s) => s.put(serializeSegment(seg), id));
  }

  async delete(id: string): Promise<void> {
    const db = await this.db();
    await tx(db, STORE_SEG, 'readwrite', (s) => s.delete(id));
  }

  async getManifest(): Promise<Manifest | null> {
    const db = await this.db();
    const text = await tx<string | undefined>(db, STORE_META, 'readonly', (s) => s.get('manifest'));
    return text ? parseManifest(text) : null;
  }

  async setManifest(m: Manifest): Promise<void> {
    const db = await this.db();
    await tx(db, STORE_META, 'readwrite', (s) => s.put(serializeManifest(m), 'manifest'));
  }

  async clearAll(): Promise<void> {
    const db = await this.db();
    await tx(db, STORE_SEG, 'readwrite', (s) => s.clear());
    await tx(db, STORE_META, 'readwrite', (s) => s.clear());
  }
}
