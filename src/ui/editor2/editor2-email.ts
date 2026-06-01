// メールファイル(.eml / .msg)のドロップ → メール参照ブロック挿入、および
// 「ソースを表示」で Outlook を開く(リレー経由)処理。
//
//  - ドロップされた .eml/.msg をブラウザ内で解析(lib/email-parse)。
//  - 元ファイルはライブラリの attachments に保存(再取得・将来の本文抽出用)。
//  - ページ本文には軽量メタ(imid/件名/差出人/日付)だけの EmailBlock を挿入。
//    → SharePoint リストの入力値上限を圧迫しない。
//  - 「ソースを表示」→ リレー GET /memola/outlook/open?id=<imid> で Outlook 表示。
//
// 画像ハンドラ(editor2-image)とは drop を別リスナで受けるが、各々が自分の
// 対象ファイル種別だけ preventDefault するので衝突しない。

import type { Editor } from './editor2';
import { email, paragraph } from './editor-state';
import { uploadAttachment } from './editor2-image';
import { parseEmailFile, isEmailFile } from '../../lib/email-parse';
import { prefAiCorpBaseUrl } from '../../lib/prefs';
import { setLoad, toast } from '../ui-helpers';

/** リレーの origin を推定(corp ベースURL → 既定 localhost:18080)。 */
function relayOrigin(): string {
  const cur = prefAiCorpBaseUrl.get();
  if (cur) { try { return new URL(cur).origin; } catch { /* ignore */ } }
  return 'http://localhost:18080';
}

/** InternetMessageId で Outlook 上にメールを開く。 */
async function openInOutlook(imid: string): Promise<void> {
  if (!imid) { toast('Message-Id が無いため開けません', 'err'); return; }
  const url = relayOrigin() + '/memola/outlook/open?id=' + encodeURIComponent(imid);
  try {
    const r = await fetch(url);
    const j = await r.json().catch(() => null) as { ok?: boolean; found?: boolean } | null;
    if (!r.ok || !j?.ok) { toast('リレーがメールを開けませんでした', 'err'); return; }
    if (j.found === false) { toast('Outlook 内に該当メールが見つかりませんでした', 'err'); }
  } catch {
    toast('リレーに接続できません(中継サーバを起動してください)', 'err');
  }
}

export function attachEmailHandlers(editor: Editor, rootEl: HTMLElement): () => void {
  let alive = true;

  const captureAnchor = (): string | null => {
    const sel = window.getSelection();
    const node = sel?.anchorNode as Element | null;
    const block = node?.parentElement?.closest<HTMLElement>('[data-block-id]');
    return block?.dataset.blockId || null;
  };

  const insertEmail = (anchorId: string | null, meta: { imid: string; subject: string; from: string; date: string; fileUrl: string; filename: string }): string => {
    const block = email(meta);
    editor.applyMutation((s) => {
      const blocks = s.blocks.slice();
      const idx = anchorId ? blocks.findIndex((b) => b.id === anchorId) : blocks.length - 1;
      const at = idx >= 0 ? idx + 1 : blocks.length;
      blocks.splice(at, 0, block);
      // チップの直後に編集可能ブロックを保証(キャレット置き場 + Backspace 削除用)。
      const after = blocks[at + 1];
      let caretId: string;
      if (after && after.kind !== 'image' && after.kind !== 'email' && 'inline' in after) {
        caretId = after.id;
      } else {
        const p = paragraph('');
        blocks.splice(at + 1, 0, p);
        caretId = p.id;
      }
      return { ...s, blocks, selection: { kind: 'caret', blockId: caretId, offset: 0 } };
    }, 'structural');
    return block.id;
  };

  const onDrop = async (ev: DragEvent): Promise<void> => {
    if (!ev.dataTransfer?.files?.length) return;
    const mailFiles = Array.from(ev.dataTransfer.files).filter(isEmailFile);
    if (mailFiles.length === 0) return;   // 画像等は image ハンドラに任せる
    ev.preventDefault();
    let anchorId = captureAnchor();
    try {
      setLoad(true, 'メールを取り込み中...');
      for (const f of mailFiles) {
        if (!alive) return;
        const meta = await parseEmailFile(f);
        if (!meta) { toast(`${f.name}: メールを解析できませんでした`, 'err'); continue; }
        const fileUrl = await uploadAttachment(f, 'mail', f.name.toLowerCase().endsWith('.msg') ? '.msg' : '.eml');
        const id = insertEmail(anchorId, {
          imid: meta.imid, subject: meta.subject, from: meta.from, date: meta.date,
          fileUrl, filename: f.name,
        });
        anchorId = id;   // 複数ドロップは順序保持
      }
    } catch (err) {
      if (alive) toast('メール取り込み失敗: ' + (err as Error).message, 'err');
    } finally { setLoad(false); }
  };

  // 「ソースを表示」ボタン(委譲)
  const onClick = (ev: MouseEvent): void => {
    const btn = (ev.target as HTMLElement)?.closest?.<HTMLElement>('.memola-email-src');
    if (!btn) return;
    ev.preventDefault();
    ev.stopPropagation();
    void openInOutlook(btn.dataset.emailSrc || '');
  };

  rootEl.addEventListener('drop', onDrop);
  rootEl.addEventListener('click', onClick, true);
  return () => {
    alive = false;
    rootEl.removeEventListener('drop', onDrop);
    rootEl.removeEventListener('click', onClick, true);
  };
}
