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

/** Format a Date as a per-page "保存済 …" label. Today → HH:MM, yesterday →
 *  「昨日 HH:MM」, this year → 「M/D HH:MM」, older → 「YYYY/M/D」. */
function formatSavedLabel(d: Date): string {
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  const yest = new Date(now); yest.setDate(now.getDate() - 1);
  const isYest = d.toDateString() === yest.toDateString();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  if (sameDay) return '保存済 ' + hh + ':' + mm;
  if (isYest)  return '保存済 昨日 ' + hh + ':' + mm;
  if (d.getFullYear() === now.getFullYear()) {
    return '保存済 ' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + hh + ':' + mm;
  }
  return '保存済 ' + d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
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
