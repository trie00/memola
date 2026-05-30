// Image paste / drop handling for editor2.
//
// On clipboard paste or drag-drop with image files, upload each
// image to SP's `<site>/<docs>/attachments/` folder and insert an
// `ImageBlock` after the current block.
//
// This replaces the legacy `image-paste.ts` (deleted in Phase 2c-5)
// — same SP upload mechanics, but the editor mutation goes through
// state instead of `<img>` DOM injection.

import type { Editor } from './editor2';
import { image } from './editor-state';
import { SITE, FOLDER, SITE_REL } from '../../config';
import { getDigest } from '../../api/digest';
import { setLoad, toast } from '../ui-helpers';

const ATTACH_FOLDER = 'attachments';

/** Ensure ONE folder (given its server-relative URL) exists: GET it, and
 *  create it on 404. Idempotent. Throws (with the HTTP status) on a hard
 *  create failure so the caller surfaces a real error instead of a
 *  silent broken upload. */
async function ensureFolder(serverRelUrl: string): Promise<void> {
  const url = SITE +
    "/_api/web/GetFolderByServerRelativeUrl('" + serverRelUrl + "')";
  const r = await fetch(url, {
    headers: { Accept: 'application/json;odata=verbose' },
    credentials: 'include',
  });
  if (r.ok) return;
  const d = await getDigest();
  const res = await fetch(SITE + '/_api/web/folders', {
    method: 'POST',
    headers: {
      Accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      'X-RequestDigest': d,
    },
    credentials: 'include',
    body: JSON.stringify({
      __metadata: { type: 'SP.Folder' },
      ServerRelativeUrl: serverRelUrl,
    }),
  });
  // 409 = already exists (created concurrently) — fine. Anything else
  // that isn't 2xx is a real failure worth reporting.
  if (!res.ok && res.status !== 409) {
    throw new Error('フォルダ作成失敗(' + res.status + '): ' + serverRelUrl);
  }
}

/** Ensure the attachments folder (and its parent) exist before upload.
 *
 *  In the list-item storage model, pages are SP *list items* — the
 *  `Shared Documents/memola-pages` document-library FOLDER is never
 *  otherwise provisioned. SharePoint's `/web/folders` endpoint does NOT
 *  create missing parent folders, so creating `…/memola-pages/attachments`
 *  directly failed when `memola-pages` didn't exist → image paste/drop
 *  upload failed. Create the chain explicitly, parent first. */
async function ensureAttachmentsFolder(): Promise<void> {
  await ensureFolder(FOLDER);
  await ensureFolder(FOLDER + '/' + ATTACH_FOLDER);
}

/** Upload one File to SP, returning the absolute URL the browser
 *  can use to fetch it back. */
async function uploadImage(file: File): Promise<string> {
  await ensureAttachmentsFolder();
  const d = await getDigest();
  const ext = (file.name.match(/\.[^./]+$/)?.[0] || '.png').toLowerCase();
  const filename = 'img-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + ext;
  const target = FOLDER + '/' + ATTACH_FOLDER;
  const url =
    SITE +
    "/_api/web/GetFolderByServerRelativeUrl('" + target + "')" +
    "/Files/add(url='" + encodeURIComponent(filename) + "',overwrite=true)";
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'X-RequestDigest': d },
    credentials: 'include',
    body: await file.arrayBuffer(),
  });
  if (!r.ok) throw new Error('画像アップロード失敗: ' + r.status);
  const tenant = SITE.replace(SITE_REL, '');
  return tenant + target + '/' + filename;
}

/** Wire the editor for image paste + drop. Returns a destroy fn.
 *  Codex review U1: capture the anchor block id at paste/drop time
 *  AND a generation token, so an upload that finishes after the user
 *  navigated to a different page no longer mutates the new editor. */
export function attachImageHandlers(editor: Editor, rootEl: HTMLElement): () => void {
  let alive = true;

  const captureAnchor = (): string | null => {
    const sel = window.getSelection();
    const node = sel?.anchorNode as Element | null;
    const block = node?.parentElement?.closest<HTMLElement>('[data-block-id]');
    return block?.dataset.blockId || null;
  };

  const insertAt = (anchorId: string | null, src: string, alt: string): void => {
    if (!alive) return;
    const newBlock = image(src, alt);
    if (!anchorId) {
      editor.insertBlockAfterCurrent(newBlock);
      return;
    }
    editor.applyMutation((s) => {
      const idx = s.blocks.findIndex((b) => b.id === anchorId);
      if (idx < 0) {
        return { ...s, blocks: [...s.blocks, newBlock],
          selection: { kind: 'caret', blockId: newBlock.id, offset: 0 } };
      }
      const blocks = s.blocks.slice();
      blocks.splice(idx + 1, 0, newBlock);
      return { ...s, blocks,
        selection: { kind: 'caret', blockId: newBlock.id, offset: 0 } };
    }, 'structural');
  };

  const onPaste = async (ev: ClipboardEvent): Promise<void> => {
    const items = ev.clipboardData?.items;
    if (!items) return;
    const imageFile = Array.from(items)
      .find((it) => it.kind === 'file' && it.type.startsWith('image/'))?.getAsFile();
    if (!imageFile) return;
    ev.preventDefault();
    ev.stopPropagation();
    const anchorId = captureAnchor();
    try {
      setLoad(true, '画像アップロード中...');
      const url = await uploadImage(imageFile);
      insertAt(anchorId, url, imageFile.name);
    } catch (err) {
      if (alive) toast('画像挿入失敗: ' + (err as Error).message, 'err');
    } finally { setLoad(false); }
  };

  const onDrop = async (ev: DragEvent): Promise<void> => {
    if (!ev.dataTransfer?.files?.length) return;
    const imageFiles = Array.from(ev.dataTransfer.files)
      .filter((f) => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;
    ev.preventDefault();
    let anchorId = captureAnchor();
    try {
      setLoad(true, '画像アップロード中...');
      for (const f of imageFiles) {
        if (!alive) return;
        const url = await uploadImage(f);
        insertAt(anchorId, url, f.name);
        // Subsequent uploads slot in AFTER the just-inserted image so
        // pasted batches preserve order.
        anchorId = editor.getBlocks().slice(-1)[0]?.id ?? anchorId;
      }
    } catch (err) {
      if (alive) toast('画像挿入失敗: ' + (err as Error).message, 'err');
    } finally { setLoad(false); }
  };

  // Capture phase so we run BEFORE the bridge's md-paste handler.
  rootEl.addEventListener('paste', onPaste, true);
  rootEl.addEventListener('drop', onDrop);
  return () => {
    alive = false;
    rootEl.removeEventListener('paste', onPaste, true);
    rootEl.removeEventListener('drop', onDrop);
  };
}
