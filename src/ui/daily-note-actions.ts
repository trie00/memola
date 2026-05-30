// Daily-note opener helpers: jump to today's note, open by arbitrary
// date, restore a converted page back to a daily-note row, and the
// floating date-picker popover used by the sidebar's 「日付を選んで開く」
// entry.
//
// These were inline closures inside `wiring.ts attachAll()`; pulling
// them out lets sidebar-wiring import them directly without the
// circular-trampoline of "wiring → sidebar → wiring".

import { S } from '../state';
import { setLoad, toast } from './ui-helpers';
import { renderTree } from './tree';
import { metaById } from '../lib/page-store';

/** Synchronous YYYY-MM-DD for "today" without async-importing daily.ts. */
function todayYMD(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return d.getFullYear() + '-' + m + '-' + day;
}

/** Open the daily note for an arbitrary YYYY-MM-DD. If it doesn't yet
 *  exist:
 *    - confirmCreate=false: create silently (used for "今日" — typing
 *      today's date and being prompted feels redundant).
 *    - confirmCreate=true:  ask first; cancel = no-op (used for the
 *      date picker — the user might just be browsing). */
export async function openDailyNoteForDate(
  date: string,
  opts: { confirmCreate: boolean },
): Promise<void> {
  try {
    setLoad(true, 'デイリーノートを開いています...');
    const daily = await import('../api/daily');
    const existing = await daily.findNoteForDate(date);
    if (!existing && opts.confirmCreate) {
      setLoad(false);
      if (!confirm(date + ' のデイリーノートはまだありません。新しく作成しますか？')) return;
      setLoad(true, 'デイリーノートを作成しています...');
    }
    const ref = existing
      ? { ...existing, dbPageId: (await daily.ensureDailyDb()).dbPageId }
      : await daily.getOrCreateNoteForDate(date);
    // Make sure the daily DB row shows up in the sidebar (S.pages may be
    // stale if this is the very first call in the session, or if the row
    // was just created).
    if (!S.pages.some((p) => p.Id === ref.dbPageId)) {
      const { apiGetPages } = await import('../api/pages');
      await apiGetPages();
    }
    const dbPage = S.pages.find((p) => p.Id === ref.dbPageId);
    if (!dbPage) { toast('デイリー DB が見つかりません', 'err'); return; }
    const v = await import('./views');
    await v.doSelectDb(ref.dbPageId, dbPage);
    const item = S.dbItems.find((i) => i.Id === ref.rowId);
    if (item) {
      const r = await import('./row-page');
      await r.openRowAsPage(ref.dbPageId, item);
    }
    renderTree();
  } catch (e) {
    toast('デイリーノートを開けませんでした: ' + (e as Error).message, 'err');
  } finally { setLoad(false); }
}

/** Open (or first-time create) the daily note for today. */
export async function openTodayDailyNote(): Promise<void> {
  await openDailyNoteForDate(todayYMD(), { confirmCreate: false });
}

/** Restore a converted-from-daily page back to a daily-note row.
 *  Mirror of the page-menu's 「デイリーノートに戻す」 entry. */
export async function restoreToDailyNote(): Promise<void> {
  const id = S.currentId;
  if (!id) return;
  const meta = metaById(id);
  if (!meta?.originDailyDate) return;
  if (!confirm(`このページをデイリーノート (${meta.originDailyDate}) に戻しますか？\n\n通常ページとしての本ページは削除され、本文がデイリー側に統合されます。`)) return;
  try {
    setLoad(true, 'デイリーノートに復元しています...');
    const daily = await import('../api/daily');
    const { rowId, date } = await daily.restoreToDaily(id);
    const { apiGetPages } = await import('../api/pages');
    await apiGetPages();
    renderTree();
    const dailyDb = await daily.ensureDailyDb();
    const dbPage = S.pages.find((p) => p.Id === dailyDb.dbPageId);
    if (dbPage) {
      const v = await import('./views');
      await v.doSelectDb(dailyDb.dbPageId, dbPage);
      const item = S.dbItems.find((i) => i.Id === rowId);
      if (item) {
        const r = await import('./row-page');
        await r.openRowAsPage(dailyDb.dbPageId, item);
      }
    }
    toast('デイリーノート (' + date + ') に戻しました');
  } catch (e) {
    toast('復元失敗: ' + (e as Error).message, 'err');
  } finally { setLoad(false); }
}

/** Floating date-picker popover anchored to a sidebar entry. Picking a
 *  date opens (with create-confirm) the daily note for that date. */
export function showDailyPicker(anchor: HTMLElement): void {
  // Tear down any existing popover so re-clicking just re-anchors.
  const prev = document.getElementById('memola-daily-picker');
  if (prev) prev.remove();

  const today = todayYMD();
  const pop = document.createElement('div');
  pop.id = 'memola-daily-picker';
  pop.innerHTML =
    '<div class="memola-dp-row">' +
      '<button class="memola-dp-nav" data-nav="-1" title="前日">‹</button>' +
      '<input type="date" id="memola-dp-input" value="' + today + '">' +
      '<button class="memola-dp-nav" data-nav="+1" title="翌日">›</button>' +
    '</div>' +
    '<div class="memola-dp-quick">' +
      '<button data-quick="-7">先週</button>' +
      '<button data-quick="-1">昨日</button>' +
      '<button data-quick="0">今日</button>' +
      '<button data-quick="+1">明日</button>' +
      '<button data-quick="+7">来週</button>' +
    '</div>' +
    '<div class="memola-dp-foot">' +
      '<button id="memola-dp-cancel">キャンセル</button>' +
      '<button id="memola-dp-open" class="memola-dp-primary">開く</button>' +
    '</div>';

  const r = anchor.getBoundingClientRect();
  pop.style.position = 'fixed';
  pop.style.left = r.left + 'px';
  pop.style.top = (r.bottom + 4) + 'px';
  (document.getElementById('memola-overlay') || document.body).appendChild(pop);

  const input = pop.querySelector<HTMLInputElement>('#memola-dp-input');
  if (!input) return;
  setTimeout(() => input.focus(), 0);

  function shiftDate(days: number, base?: string): string {
    const d = new Date(((base || input!.value) || today) + 'T00:00:00');
    d.setDate(d.getDate() + days);
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + day;
  }

  pop.querySelectorAll<HTMLButtonElement>('.memola-dp-nav').forEach((btn) => {
    btn.addEventListener('click', () => {
      const delta = parseInt(btn.dataset.nav || '0', 10);
      input.value = shiftDate(delta);
    });
  });
  pop.querySelectorAll<HTMLButtonElement>('.memola-dp-quick button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const delta = parseInt(btn.dataset.quick || '0', 10);
      input.value = shiftDate(delta, today);
    });
  });

  function close(): void { pop.remove(); document.removeEventListener('click', outside); }
  function outside(e: MouseEvent): void {
    if (!pop.contains(e.target as Node) && !anchor.contains(e.target as Node)) close();
  }
  setTimeout(() => document.addEventListener('click', outside), 0);

  pop.querySelector('#memola-dp-cancel')?.addEventListener('click', close);
  const open = (): void => {
    const date = input.value;
    if (!date) return;
    close();
    void openDailyNoteForDate(date, { confirmCreate: true });
  };
  pop.querySelector('#memola-dp-open')?.addEventListener('click', open);
  input.addEventListener('keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Enter') open();
  });
}
