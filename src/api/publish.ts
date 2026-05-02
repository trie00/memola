// Publish-to-SharePoint helpers (Modern Site Pages flavor).
//
// "Publishing" creates / updates a Modern Site Page (.aspx) that mirrors the
// n365 page. SP renders Site Pages natively, so they aren't blocked by the
// document-library "Strict Browser File Handling" policy that was forcing
// .html files to download.
//
// Sync model: explicit, *not* automatic. `publishPage` does the initial
// publish; subsequent edits in n365 mark the page as `PublishedDirty=1` but
// do NOT touch the Site Page. The "公開中" tag in the top bar shows the
// dirty state and lets the user trigger `syncPublishedPage` on demand.
//
// This is *not* internet-public sharing. SP enforces normal site permissions
// on the page; "publishing" only means a stable URL exists and can be shared
// inside the org.

import { S } from '../state';
import { SITE } from '../config';
import { getDigest } from './digest';
import { updateListItem } from './sp-list';
import { PAGES_LIST, apiLoadFileMeta } from './pages';
import { mdToHtml } from '../lib/markdown';

/** After any write to the n365-pages row, the row's Modified/ETag advances.
 *  If the active page is the one we just wrote, refresh S.sync so the next
 *  auto-save isn't flagged as a conflict against a stale ETag. */
async function refreshSyncWatermark(pageId: string): Promise<void> {
  if (S.sync.pageId !== pageId) return;
  try {
    const fm = await apiLoadFileMeta(pageId);
    if (fm) {
      S.sync.loadedEtag = fm.etag;
      S.sync.loadedModified = fm.modified;
    }
  } catch { /* ignore */ }
}

interface SitePageRef {
  id: number;
  url: string;
}

function genGuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Build the LayoutWebpartsContent JSON — controls the page header / banner.
 *  Shape mirrors PnP-JS's TitleRegion template exactly, which is the format
 *  the SP UI itself emits for an Article-layout page. The Modern renderer
 *  is picky: NoImage / non-default layoutType combinations are sometimes
 *  silently dropped, so we use FullWidthImage with imageSourceType=4 (no
 *  image) — that's the official "plain title" combo. */
function buildLayoutContent(title: string): string {
  const blocks: unknown[] = [
    {
      // Well-known web-part id for the Modern Title Region web part.
      id: 'cbe7b0a9-3504-44dd-a3a3-0e5cacd07788',
      instanceId: genGuid(),
      title: 'Title Region',
      description: 'Title Region Description',
      audiences: [],
      serverProcessedContent: {
        htmlStrings: {},
        searchablePlainTexts: {},
        imageSources: {},
        links: {},
      },
      dataVersion: '1.4',
      properties: {
        title: title,
        imageSourceType: 4,             // 4 = no banner image
        layoutType: 'FullWidthImage',   // PnP-default; with imageSourceType=4 → plain title
        textAlignment: 'Left',
        showTopicHeader: false,
        showPublishDate: false,
        topicHeader: '',
        authors: [],
        authorByline: [],
        isDecorative: true,
      },
    },
  ];
  return JSON.stringify(blocks);
}

/** Build the CanvasContent1 JSON for a Modern Site Page from markdown. */
function buildCanvasContent(bodyMd: string): string {
  const html = bodyMd ? mdToHtml(bodyMd) : '<p></p>';
  // Single Text web part containing the converted markdown.
  const blocks: unknown[] = [
    {
      controlType: 4,
      id: genGuid(),
      position: {
        controlIndex: 1,
        sectionIndex: 1,
        zoneIndex: 1,
        sectionFactor: 12,
        layoutIndex: 1,
      },
      addedFromPersistedData: true,
      innerHTML: html,
    },
    {
      controlType: 0,
      pageSettingsSlice: {
        isDefaultDescription: true,
        isDefaultThumbnail: true,
      },
    },
  ];
  return JSON.stringify(blocks);
}

async function spReadJson(url: string): Promise<{ d?: Record<string, unknown> } | null> {
  const r = await fetch(url, {
    headers: { Accept: 'application/json;odata=verbose' },
    credentials: 'include',
  });
  if (!r.ok) return null;
  return r.json();
}

/** Create a Site Page (Article layout). Returns its id and absolute URL. */
async function createSitePage(title: string, content: string): Promise<SitePageRef> {
  const d = await getDigest();
  const r = await fetch(SITE + '/_api/sitepages/pages', {
    method: 'POST',
    headers: {
      Accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      'X-RequestDigest': d,
    },
    credentials: 'include',
    body: JSON.stringify({
      __metadata: { type: 'SP.Publishing.SitePage' },
      PageLayoutType: 'Article',
      Title: title,
    }),
  });
  if (!r.ok) {
    const txt = await r.text().catch(() => '');
    throw new Error('SitePage 作成失敗: ' + r.status + (txt ? ' — ' + txt.slice(0, 200) : ''));
  }
  const j = (await r.json()) as { d?: Record<string, unknown> };
  const created = (j.d || j) as Record<string, unknown>;
  const id = Number(created.Id) || 0;
  if (!id) throw new Error('SitePage 作成失敗: ID 取得不可');

  // Push content into the new page, then publish it.
  await saveDraft(id, title, content);
  const url = await publishDraft(id);
  return { id, url };
}

/** Modern Site Pages distinguish "編集セッション" — a Checkout/Publish pair —
 *  from raw entity updates. Updating CanvasContent1 outside such a session
 *  trips a 409 "サイトメンバーが編集セッションを終了したため…". The flow we
 *  follow here mirrors the SP UI:
 *
 *    1. CheckoutPage          ← start session
 *    2. SavePageAsDraft       ← write content (must be inside the session)
 *    3. Publish               ← end session, make visible
 *
 *  SavePageAsDraft is a *method*, NOT an entity update — so no MERGE /
 *  IF-MATCH headers, just a POST with a JSON body. */

async function checkoutPage(id: number): Promise<Response> {
  const d = await getDigest();
  return fetch(SITE + '/_api/sitepages/pages(' + id + ')/CheckoutPage', {
    method: 'POST',
    headers: { Accept: 'application/json;odata=verbose', 'X-RequestDigest': d },
    credentials: 'include',
  });
}

async function discardPage(id: number): Promise<void> {
  const d = await getDigest();
  await fetch(SITE + '/_api/sitepages/pages(' + id + ')/DiscardPage', {
    method: 'POST',
    headers: { Accept: 'application/json;odata=verbose', 'X-RequestDigest': d },
    credentials: 'include',
  }).catch(() => undefined);
}

/** Direct MERGE on the SP.Publishing.SitePage entity — this is how PnP-JS
 *  saves Modern Site Pages. SavePageAsDraft (a method endpoint) sometimes
 *  silently drops Title / LayoutWebpartsContent updates, so we go with
 *  MERGE which reliably persists every field. Must be called inside an
 *  active CheckoutPage session. */
async function mergeAll(
  id: number, title: string, content: string,
): Promise<Response> {
  const d = await getDigest();
  const layout = buildLayoutContent(title);
  return fetch(SITE + '/_api/sitepages/pages(' + id + ')', {
    method: 'POST',
    headers: {
      Accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      'X-RequestDigest': d,
      'X-HTTP-Method': 'MERGE',
      'IF-MATCH': '*',
    },
    credentials: 'include',
    body: JSON.stringify({
      __metadata: { type: 'SP.Publishing.SitePage' },
      Title: title,
      CanvasContent1: content,
      LayoutWebpartsContent: layout,
    }),
  });
}

async function readErr(r: Response): Promise<string> {
  const txt = await r.text().catch(() => '');
  return r.status + (txt ? ' — ' + txt.slice(0, 400) : '');
}

async function saveDraft(id: number, title: string, content: string): Promise<void> {
  // 1. Start an edit session.
  let co = await checkoutPage(id);
  if (co.status === 409) {
    await discardPage(id);
    co = await checkoutPage(id);
  }
  if (!co.ok && co.status !== 200 && co.status !== 201) {
    throw new Error('SitePage チェックアウト失敗: ' + (await readErr(co)));
  }

  // 2. MERGE all fields (Title + CanvasContent1 + LayoutWebpartsContent)
  //    onto the entity in one shot — this is what PnP-JS does and is the
  //    only way to reliably persist the title-region web part.
  let r = await mergeAll(id, title, content);

  // 3. If 409, refresh the session and retry once.
  if (r.status === 409) {
    await discardPage(id);
    const co2 = await checkoutPage(id);
    if (!co2.ok) {
      throw new Error('SitePage 再チェックアウト失敗: ' + (await readErr(co2)));
    }
    r = await mergeAll(id, title, content);
  }

  if (!r.ok) {
    throw new Error('SitePage 保存失敗: ' + (await readErr(r)));
  }
}

/** Promote draft to published; returns the published page's absolute URL. */
async function publishDraft(id: number): Promise<string> {
  const d = await getDigest();
  const r = await fetch(SITE + '/_api/sitepages/pages(' + id + ')/Publish', {
    method: 'POST',
    headers: {
      Accept: 'application/json;odata=verbose',
      'X-RequestDigest': d,
    },
    credentials: 'include',
  });
  if (!r.ok) {
    const txt = await r.text().catch(() => '');
    throw new Error('SitePage 公開失敗: ' + r.status + (txt ? ' — ' + txt.slice(0, 200) : ''));
  }
  // Look up the absolute URL for navigation (Publish itself returns void).
  const meta = await spReadJson(SITE + '/_api/sitepages/pages(' + id + ')');
  const page = (meta?.d || meta) as Record<string, unknown> | null;
  const abs = (page?.AbsoluteUrl as string) || '';
  if (abs) return abs;
  // Fallback: build from FileName + SitePages library path
  const fn = (page?.FileName as string) || '';
  if (fn) return SITE + '/SitePages/' + fn;
  return '';
}

async function deleteSitePage(id: number): Promise<void> {
  const d = await getDigest();
  await fetch(SITE + '/_api/sitepages/pages(' + id + ')', {
    method: 'POST',
    headers: {
      'X-RequestDigest': d,
      'X-HTTP-Method': 'DELETE',
      'IF-MATCH': '*',
    },
    credentials: 'include',
  });
}

/** Browser-accessible URL for the published page (Site Page .aspx). */
export function publishedUrlFor(pageId: string): string {
  const meta = S.meta.pages.find((p) => p.id === pageId);
  return meta?.publishedUrl || '';
}

/** Mark the page as published and create / refresh its Site Page mirror.
 *  Also clears the "未反映" dirty flag — the mirror now matches n365. */
export async function publishPage(pageId: string, title: string, bodyMd: string): Promise<string> {
  const meta = S.meta.pages.find((p) => p.id === pageId);
  const content = buildCanvasContent(bodyMd);
  let ref: SitePageRef;
  const existingId = meta?.publishedSitePageId || 0;
  if (existingId) {
    await saveDraft(existingId, title, content);
    const url = (await publishDraft(existingId)) || meta?.publishedUrl || '';
    ref = { id: existingId, url };
  } else {
    ref = await createSitePage(title, content);
  }
  const itemId = parseInt(pageId, 10);
  if (itemId) {
    await updateListItem(PAGES_LIST, itemId, {
      Published: 1,
      PublishedUrl: ref.url,
      PublishedPageId: ref.id,
      PublishedDirty: 0,
    });
  }
  if (meta) {
    meta.published = true;
    meta.publishedUrl = ref.url;
    meta.publishedSitePageId = ref.id;
    meta.publishedDirty = false;
  }
  await refreshSyncWatermark(pageId);
  return ref.url;
}

/** Clear the published flag and remove the Site Page mirror (best-effort). */
export async function unpublishPage(pageId: string): Promise<void> {
  const meta = S.meta.pages.find((p) => p.id === pageId);
  const sitePageId = meta?.publishedSitePageId || 0;
  if (sitePageId) {
    try { await deleteSitePage(sitePageId); } catch { /* ignore */ }
  }
  const itemId = parseInt(pageId, 10);
  if (itemId) {
    await updateListItem(PAGES_LIST, itemId, {
      Published: 0,
      PublishedUrl: '',
      PublishedPageId: 0,
      PublishedDirty: 0,
    }).catch(() => undefined);
  }
  if (meta) {
    meta.published = false;
    delete meta.publishedUrl;
    delete meta.publishedSitePageId;
    delete meta.publishedDirty;
  }
  await refreshSyncWatermark(pageId);
}

/** Explicitly push the current title/body to the Site Page mirror and clear
 *  the dirty flag. Caller decides when this runs (no auto-sync on save).
 *  Throws on failure so the UI can surface it. */
export async function syncPublishedPage(pageId: string, title: string, bodyMd: string): Promise<void> {
  const meta = S.meta.pages.find((p) => p.id === pageId);
  if (!meta?.published) throw new Error('not_published');
  const content = buildCanvasContent(bodyMd);
  const sitePageId = meta.publishedSitePageId || 0;
  if (sitePageId) {
    await saveDraft(sitePageId, title, content);
    await publishDraft(sitePageId);
  } else {
    // Flagged as published but no Site Page id (legacy / interrupted publish).
    // Recreate so future syncs have a valid id.
    const ref = await createSitePage(title, content);
    const itemId = parseInt(pageId, 10);
    if (itemId) {
      await updateListItem(PAGES_LIST, itemId, {
        PublishedUrl: ref.url,
        PublishedPageId: ref.id,
      }).catch(() => undefined);
    }
    meta.publishedUrl = ref.url;
    meta.publishedSitePageId = ref.id;
  }
  // Clear dirty marker on success.
  const itemId = parseInt(pageId, 10);
  if (itemId) {
    await updateListItem(PAGES_LIST, itemId, { PublishedDirty: 0 }).catch(() => undefined);
  }
  meta.publishedDirty = false;
  await refreshSyncWatermark(pageId);
}

export function isPagePublished(pageId: string): boolean {
  const meta = S.meta.pages.find((p) => p.id === pageId);
  return !!meta?.published;
}
