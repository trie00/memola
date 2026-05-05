// Modal helper tests — validates the singleton guard, ESC handling,
// backdrop click, and button-driven resolution.
//
// happy-dom (configured via vitest defaults) provides a real
// document/window so DOM operations work as in the bookmarklet.

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { confirmModal, subscriberModal } from '../src/ui/lib/modal';

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('confirmModal', () => {
  it('mounts the modal with the given id and class', async () => {
    const p = confirmModal<'ok' | 'cancel'>({
      id: 't1',
      className: 'x',
      contentHtml: '<button data-c="ok">OK</button><button data-c="cancel">Cancel</button>',
      buttons: { ok: 'ok', cancel: 'cancel' },
      cancelValue: 'cancel',
    });
    const el = document.getElementById('t1');
    expect(el).not.toBeNull();
    expect(el!.classList.contains('on')).toBe(true);
    expect(el!.classList.contains('x')).toBe(true);
    // Clicking ok resolves with 'ok'
    el!.querySelector<HTMLButtonElement>('button[data-c="ok"]')!.click();
    expect(await p).toBe('ok');
    expect(document.getElementById('t1')).toBeNull();   // unmounted
  });

  it('resolves to cancelValue on ESC', async () => {
    const p = confirmModal<'go' | 'no'>({
      id: 't2',
      className: 'x',
      contentHtml: '<button data-c="go">go</button>',
      buttons: { go: 'go' },
      cancelValue: 'no',
    });
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(await p).toBe('no');
    expect(document.getElementById('t2')).toBeNull();
  });

  it('resolves to cancelValue on backdrop click', async () => {
    const p = confirmModal<'go' | 'no'>({
      id: 't3',
      className: 'x',
      contentHtml: '<button data-c="go">go</button>',
      buttons: { go: 'go' },
      cancelValue: 'no',
    });
    const el = document.getElementById('t3')!;
    // Simulate click ON the backdrop (= the root element itself, not a button)
    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(await p).toBe('no');
  });

  it('singleton — second call resolves to cancelValue without rendering', async () => {
    const first = confirmModal<'a' | 'b'>({
      id: 't4',
      className: 'x',
      contentHtml: '<button data-c="a">a</button>',
      buttons: { a: 'a' },
      cancelValue: 'b',
    });
    // Second call hits the singleton guard
    const second = await confirmModal<'a' | 'b'>({
      id: 't4',
      className: 'x',
      contentHtml: '<button data-c="a">a</button>',
      buttons: { a: 'a' },
      cancelValue: 'b',
    });
    expect(second).toBe('b');
    // Only one DOM node with that id
    expect(document.querySelectorAll('#t4').length).toBe(1);
    // Resolve the first one to clean up
    document.getElementById('t4')!.querySelector<HTMLButtonElement>('button[data-c="a"]')!.click();
    expect(await first).toBe('a');
  });

  it('skips ESC when cancelValue is undefined (uncancellable)', async () => {
    let resolved: string | undefined;
    const p = confirmModal<string>({
      id: 't5',
      className: 'x',
      contentHtml: '<button data-c="ok">ok</button>',
      buttons: { ok: 'ok' },
      // no cancelValue
    });
    p.then((v) => { resolved = v; });
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    // Give microtasks a chance
    await Promise.resolve();
    expect(resolved).toBeUndefined();
    expect(document.getElementById('t5')).not.toBeNull();
    document.getElementById('t5')!.querySelector<HTMLButtonElement>('button[data-c="ok"]')!.click();
    expect(await p).toBe('ok');
  });

  it('onMounted runs after mount', async () => {
    const fn = vi.fn();
    const p = confirmModal<string>({
      id: 't6',
      className: 'x',
      contentHtml: '<button data-c="ok">ok</button>',
      buttons: { ok: 'ok' },
      cancelValue: 'cancel',
      onMounted: (root) => fn(root.id),
    });
    expect(fn).toHaveBeenCalledWith('t6');
    document.getElementById('t6')!.querySelector<HTMLButtonElement>('button[data-c="ok"]')!.click();
    await p;
  });
});

describe('subscriberModal', () => {
  it('render → close lifecycle', () => {
    const m = subscriberModal({ id: 'sub1', className: 'sx' });
    expect(m.isOpen()).toBe(false);
    m.render('<div class="hello">hi</div>');
    expect(m.isOpen()).toBe(true);
    expect(document.getElementById('sub1')).not.toBeNull();
    m.close();
    expect(m.isOpen()).toBe(false);
    expect(document.getElementById('sub1')).toBeNull();
  });

  it('re-render replaces the DOM cleanly', () => {
    const m = subscriberModal({ id: 'sub2', className: 'sx' });
    m.render('<div data-v="1">a</div>');
    expect(document.querySelector('#sub2 [data-v="1"]')).not.toBeNull();
    m.render('<div data-v="2">b</div>');
    expect(document.querySelector('#sub2 [data-v="1"]')).toBeNull();
    expect(document.querySelector('#sub2 [data-v="2"]')).not.toBeNull();
    // Only one #sub2 in the DOM after re-render
    expect(document.querySelectorAll('#sub2').length).toBe(1);
    m.close();
  });

  it('ESC fires onEscape', () => {
    const onEsc = vi.fn();
    const m = subscriberModal({ id: 'sub3', className: 'sx', onEscape: onEsc });
    m.render('<div>x</div>');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(onEsc).toHaveBeenCalledTimes(1);
    m.close();
  });

  it('backdrop click fires onBackdropClick', () => {
    const onBd = vi.fn();
    const m = subscriberModal({ id: 'sub4', className: 'sx', onBackdropClick: onBd });
    m.render('<div>x</div>');
    const root = document.getElementById('sub4')!;
    root.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onBd).toHaveBeenCalledTimes(1);
    m.close();
  });

  it('onMounted runs on each render', () => {
    const fn = vi.fn();
    const m = subscriberModal({ id: 'sub5', className: 'sx' });
    m.render('<div>a</div>', () => fn('first'));
    m.render('<div>b</div>', () => fn('second'));
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn.mock.calls[0][0]).toBe('first');
    expect(fn.mock.calls[1][0]).toBe('second');
    m.close();
  });
});
