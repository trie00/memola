// 参照(閲覧)権限のみのユーザー向け警告。memola は編集権限が前提のため、
// 書き込み不可のユーザーには管理者へ権限付与を依頼するガイドを出す。

import { canWrite } from '../api/perms';
import { SITE } from '../config';

let _shown = false;

export async function checkReadOnlyAndWarn(): Promise<void> {
  if (_shown) return;
  let writable = true;
  try { writable = await canWrite(); } catch { writable = true; }   // 判定不能なら出さない
  if (writable) return;
  _shown = true;
  showModal();
}

function showModal(): void {
  const overlay = document.getElementById('memola-overlay') || document.body;
  document.getElementById('memola-readonly-md')?.remove();
  const md = document.createElement('div');
  md.id = 'memola-readonly-md';
  md.className = 'memola-readonly-md';
  md.innerHTML =
    '<div class="memola-readonly-card">' +
      '<div class="memola-readonly-ic">🔒</div>' +
      '<h2>編集権限がありません</h2>' +
      '<p>このアカウントは現在のサイトに対して<b>参照（閲覧）権限のみ</b>です。' +
      'Memola はページやDBの作成・編集に<b>「編集」権限</b>が必要です。</p>' +
      '<div class="memola-readonly-guide">' +
        '<b>サイト管理者への依頼内容</b>' +
        '<ol>' +
          '<li>このサイトの「サイトの権限」を開く</li>' +
          '<li>あなたのアカウントを「メンバー（編集）」グループに追加してもらう</li>' +
          '<li>（厳密な個人プライベートが必要な場合は、管理者が memola-user-… リストを所有者のみに設定）</li>' +
        '</ol>' +
        '<div class="memola-readonly-site"></div>' +
      '</div>' +
      '<div class="memola-readonly-acts">' +
        '<button class="memola-btn" id="memola-readonly-copy">サイトURLをコピー</button>' +
        '<button class="memola-btn p" id="memola-readonly-close">閉じる</button>' +
      '</div>' +
    '</div>';
  overlay.appendChild(md);
  (md.querySelector('.memola-readonly-site') as HTMLElement).textContent = 'サイト: ' + SITE;
  md.querySelector('#memola-readonly-close')?.addEventListener('click', () => md.remove());
  md.querySelector('#memola-readonly-copy')?.addEventListener('click', () => {
    void navigator.clipboard?.writeText(SITE).catch(() => undefined);
  });
}
