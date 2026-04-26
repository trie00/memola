// Paste / drop images into the editor — uploads to SP and inserts <img>.

import { S } from '../state';
import { SITE, FOLDER, SITE_REL } from '../config';
import { getDigest } from '../api/digest';
import { getEd } from './dom';
import { setSave, toast, setLoad } from './ui-helpers';
import { schedSave } from './actions';

const ATTACH_FOLDER = 'attachments';

async function ensureAttachmentsFolder(): Promise<void> {
  const url = SITE + "/_api/web/GetFolderByServerRelativeUrl('" + FOLDER + '/' + ATTACH_FOLDER + "')";
  const r = await fetch(url, { headers: { Accept: 'application/json;odata=verbose' }, credentials: 'include' });
  if (r.ok) return;
  const d = await getDigest();
  await fetch(SITE + '/_api/web/folders', {
    method: 'POST',
    headers: {
      Accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      'X-RequestDigest': d,
    },
    credentials: 'include',
    body: JSON.stringify({ __metadata: { type: 'SP.Folder' }, ServerRelativeUrl: FOLDER + '/' + ATTACH_FOLDER }),
  });
}

async function uploadImage(file: File): Promise<string> {
  await ensureAttachmentsFolder();
  const d = await getDigest();
  const ext = (file.name.match(/\.[^./]+$/)?.[0] || '.png').toLowerCase();
  const filename = 'img-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + ext;
  const target = FOLDER + '/' + ATTACH_FOLDER;
  const url =
    SITE +
    "/_api/web/GetFolderByServerRelativeUrl('" + target + "')/Files/add(url='" + encodeURIComponent(filename) + "',overwrite=true)";
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'X-RequestDigest': d },
    credentials: 'include',
    body: await file.arrayBuffer(),
  });
  if (!r.ok) throw new Error('画像アップロード失敗: ' + r.status);
  // Return a URL the browser can fetch (full SP URL)
  const tenant = SITE.replace(SITE_REL, '');
  return tenant + target + '/' + filename;
}

function insertImageAtCursor(src: string, alt: string): void {
  const ed = getEd();
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.className = 'n365-img';
  const sel = window.getSelection();
  if (sel && sel.rangeCount && ed.contains(sel.anchorNode)) {
    sel.getRangeAt(0).insertNode(img);
    sel.collapseToEnd();
  } else {
    ed.appendChild(img);
  }
  S.dirty = true; setSave('未保存'); schedSave();
}

export function attachImagePaste(): void {
  const ed = getEd();
  ed.addEventListener('paste', async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const it of Array.from(items)) {
      if (it.kind === 'file' && it.type.startsWith('image/')) {
        e.preventDefault();
        const file = it.getAsFile();
        if (!file) continue;
        try {
          setLoad(true, '画像アップロード中...');
          const url = await uploadImage(file);
          insertImageAtCursor(url, file.name);
        } catch (err) { toast('画像挿入失敗: ' + (err as Error).message, 'err'); }
        finally { setLoad(false); }
        return;
      }
    }
  });

  ed.addEventListener('drop', async (e) => {
    if (!e.dataTransfer?.files?.length) return;
    const imageFiles = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;
    e.preventDefault();
    try {
      setLoad(true, '画像アップロード中...');
      for (const f of imageFiles) {
        const url = await uploadImage(f);
        insertImageAtCursor(url, f.name);
      }
    } catch (err) { toast('画像挿入失敗: ' + (err as Error).message, 'err'); }
    finally { setLoad(false); }
  });
}
