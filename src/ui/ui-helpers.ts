// Toast / loading / save indicator helpers.

import { g } from './dom';

let _tkT: ReturnType<typeof setTimeout> | undefined;

export function toast(msg: string, type?: string, ms?: number): void {
  const el = g('tk');
  el.textContent = msg;
  el.className = 'on' + (type === 'err' ? ' er' : '');
  clearTimeout(_tkT);
  _tkT = setTimeout(() => { el.className = ''; }, ms || 3500);
}

export function setLoad(on: boolean, msg?: string): void {
  g('lm').textContent = ' ' + (msg || '読み込み中...');
  g('ld').classList.toggle('off', !on);
}

export function setSave(t: string): void {
  // 仕様: 「保存中…」「保存済 HH:MM」「オフライン」「未保存」
  const el = g('ss');
  if (t === 'saved' || t === '保存済') {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    el.textContent = '保存済 ' + hh + ':' + mm;
    el.dataset.state = 'saved';
  } else if (t === 'saving' || t === '保存中...') {
    el.textContent = '保存中…';
    el.dataset.state = 'saving';
  } else if (t === '') {
    // 完了 → 保存済 表示
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    el.textContent = '保存済 ' + hh + ':' + mm;
    el.dataset.state = 'saved';
  } else {
    el.textContent = t;
    el.dataset.state = t === '未保存' ? 'dirty' : '';
  }
}

// Online/offline indicator
if (typeof window !== 'undefined') {
  const updateOnline = (): void => {
    const el = document.getElementById('n365-ss');
    if (!el) return;
    if (!navigator.onLine) {
      el.textContent = 'オフライン';
      el.dataset.state = 'offline';
    }
  };
  window.addEventListener('offline', updateOnline);
  window.addEventListener('online', () => {
    const el = document.getElementById('n365-ss');
    if (el && el.dataset.state === 'offline') { el.textContent = ''; el.dataset.state = ''; }
  });
}

export function autoR(el: HTMLTextAreaElement): void {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}
