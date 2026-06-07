// 画面右上に「ログイン中ユーザー」を表示。AD(SharePoint)のプロフィール画像を
// 使い、無ければ頭文字を表示する。

import { getCurrentUserInfo } from '../api/sync';

export function attachUserAvatar(): void {
  const el = document.getElementById('memola-user-avatar');
  if (!el) return;
  void (async () => {
    const { title, email } = await getCurrentUserInfo();
    el.title = title || email || 'ユーザー';
    const initial = el.querySelector<HTMLElement>('.memola-user-initial');
    if (initial) initial.textContent = (title || email || '?').trim().charAt(0).toUpperCase();
    if (!email) return;
    // SharePoint/AD のプロフィール画像。userphoto.aspx は web ルートで配信される。
    const url = location.origin + '/_layouts/15/userphoto.aspx?size=M&accountname=' + encodeURIComponent(email);
    const img = document.createElement('img');
    img.className = 'memola-user-photo';
    img.alt = title || email;
    img.referrerPolicy = 'no-referrer';
    img.addEventListener('load', () => {
      // 画像が取得できたら頭文字を隠して写真を表示。
      if (img.naturalWidth > 1) { el.classList.add('has-photo'); }
    });
    img.addEventListener('error', () => { img.remove(); });
    img.src = url;
    el.appendChild(img);
  })();
}
