// Toast / loading / save indicator helpers.

import { g } from './dom';
import { formatRelativeTime } from '../lib/date-utils';

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

/** "保存済 …" label — delegates to the shared `formatRelativeTime`. */
function formatSavedLabel(d: Date): string {
  return '保存済 ' + formatRelativeTime(d);
}

export function setSave(t: string): void {
  // 仕様: 「保存中…」「保存済 HH:MM」「オフライン」「未保存」
  const el = g('ss');
  if (t === 'saved' || t === '保存済' || t === '保存済み' || t === '') {
    el.textContent = formatSavedLabel(new Date());
    el.dataset.state = 'saved';
  } else if (t === 'saving' || t === '保存中...') {
    el.textContent = '保存中…';
    el.dataset.state = 'saving';
  } else {
    el.textContent = t;
    el.dataset.state = t === '未保存' ? 'dirty' : '';
  }
}

/** Show the *page-specific* last-saved time. Used when switching pages so the
 *  status reflects when the now-active page was actually saved, rather than
 *  the wall-clock at navigation moment. Pass null/empty to clear. */
export function setSavedAt(when: Date | string | null | undefined): void {
  const el = g('ss');
  if (!when) { el.textContent = ''; el.dataset.state = ''; return; }
  const d = typeof when === 'string' ? new Date(when) : when;
  if (Number.isNaN(d.getTime())) { el.textContent = ''; el.dataset.state = ''; return; }
  el.textContent = formatSavedLabel(d);
  el.dataset.state = 'saved';
}

// Online/offline indicator
if (typeof window !== 'undefined') {
  const updateOnline = (): void => {
    const el = document.getElementById('memola-ss');
    if (!el) return;
    if (!navigator.onLine) {
      el.textContent = 'オフライン';
      el.dataset.state = 'offline';
    }
  };
  window.addEventListener('offline', updateOnline);
  window.addEventListener('online', () => {
    const el = document.getElementById('memola-ss');
    if (el && el.dataset.state === 'offline') { el.textContent = ''; el.dataset.state = ''; }
  });
}

export function autoR(el: HTMLTextAreaElement): void {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}
