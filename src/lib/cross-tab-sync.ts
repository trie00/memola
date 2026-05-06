// Cross-tab broadcast channel.
//
// When the same user has multiple tabs of Memola open, edits in one
// tab need to surface in the others — otherwise tab B sits on a stale
// snapshot until the 30s poller catches up (or worse, never, if the
// poller is set to "off"). BroadcastChannel is the lightest way to
// post a "I just saved page X" hint to all sibling tabs immediately.
//
// Sibling tabs that match `pageId` against their current view trigger
// a fast-path foreign-edit check (= the same code the slow poller
// uses), which surfaces the existing "🔔 別のタブ (あなた) が更新
// しました" banner.

const CHANNEL_NAME = 'memola-cross-tab';

export interface PageSavedMessage {
  type: 'page-saved';
  /** SP item id (or composite key) of the saved page. */
  pageId: string;
  /** Post-save etag. Receivers compare against their `loadedEtag`. */
  etag: string;
  /** Post-save Modified timestamp. */
  modified: string;
  /** Sender tab's session id — receivers ignore self-broadcasts. */
  tabId: string;
}

const _ourTabId = Math.random().toString(36).slice(2) + Date.now().toString(36);
let _channel: BroadcastChannel | null = null;

function getChannel(): BroadcastChannel | null {
  // Older browsers / Safari pre-15.4 lack BroadcastChannel. Fall back
  // to no-op (= legacy 30s polling still covers the slow path).
  if (typeof BroadcastChannel === 'undefined') return null;
  if (!_channel) _channel = new BroadcastChannel(CHANNEL_NAME);
  return _channel;
}

/** Broadcast that we just saved a page. Other tabs will see this and
 *  decide whether to surface the foreign-edit banner. Safe to call
 *  even when no other tab is open. */
export function broadcastPageSaved(pageId: string, etag: string, modified: string): void {
  const ch = getChannel();
  if (!ch) return;
  const msg: PageSavedMessage = {
    type: 'page-saved', pageId, etag, modified, tabId: _ourTabId,
  };
  try { ch.postMessage(msg); }
  catch { /* serialization or closed-channel — ignore */ }
}

/** Subscribe to cross-tab page-saved messages. Self-broadcasts are
 *  filtered out automatically. Returns an unsubscribe fn. */
export function listenPageSaved(handler: (msg: PageSavedMessage) => void): () => void {
  const ch = getChannel();
  if (!ch) return () => undefined;
  const onMsg = (ev: MessageEvent): void => {
    const data = ev.data as PageSavedMessage | undefined;
    if (!data || data.type !== 'page-saved') return;
    if (data.tabId === _ourTabId) return;
    handler(data);
  };
  ch.addEventListener('message', onMsg);
  return () => ch.removeEventListener('message', onMsg);
}
