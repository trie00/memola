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
  g('ss').textContent = t;
}

export function autoR(el: HTMLTextAreaElement): void {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}
