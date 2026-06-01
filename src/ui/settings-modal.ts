// Settings modal — AI-provider config, theme/density prefs, save/sync/
// presence intervals, and the three reset buttons (mine / others / all).
//
// Triggered by the gear button in the sidebar footer (or ESC-cascading
// through the global keymap). The settings panel is built statically in
// the HTML template; this file just wires up the inputs.
//
// Reset is potentially destructive — each button has a pre-flight count
// + double confirm + per-error toast/alert.

import { S } from '../state';
import { setLoad, toast } from './ui-helpers';
import { showView } from './views';
import { getApiKey, setApiKey } from '../api/anthropic';
import {
  prefDensity, prefTheme, prefSaveDelayMs, prefSyncPollMs, prefPresenceEnabled,
  prefRag外部ベクトルFolder, prefRag外部ベクトルKinds,
} from '../lib/prefs';

const EXTVEC_KIND_LIST = ['mail', 'onenote', 'pptx', 'doc', 'transcript'] as const;
import { openShortcutsModal } from './shortcuts-modal';

let _attached = false;

export function attachSettingsModal(): void {
  if (_attached) return;
  _attached = true;

  const setBtn = document.getElementById('memola-settings-btn');
  const setMd = document.getElementById('memola-settings-md');
  const setKey = document.getElementById('memola-set-aikey') as HTMLInputElement | null;
  const setProv = document.getElementById('memola-set-provider') as HTMLSelectElement | null;
  const setClaudeModel = document.getElementById('memola-set-claude-model') as HTMLSelectElement | null;
  const setCorpModel = document.getElementById('memola-set-corpai-model') as HTMLSelectElement | null;
  const setCorpKey = document.getElementById('memola-set-corpai-key') as HTMLInputElement | null;
  const setCorpBaseUrl = document.getElementById('memola-set-corpai-baseurl') as HTMLInputElement | null;
  const setCorpPrefix = document.getElementById('memola-set-corpai-prefix') as HTMLInputElement | null;
  const setCorpOverrides = document.getElementById('memola-set-corpai-overrides') as HTMLTextAreaElement | null;
  const setLocalBaseUrl = document.getElementById('memola-set-localai-baseurl') as HTMLInputElement | null;
  const setLocalKey = document.getElementById('memola-set-localai-key') as HTMLInputElement | null;
  const setLocalModel = document.getElementById('memola-set-localai-model') as HTMLInputElement | null;
  const setLocalModels = document.getElementById('memola-set-localai-models') as HTMLTextAreaElement | null;
  const setLocalReasoning = document.getElementById('memola-set-localai-reasoning') as HTMLInputElement | null;
  // 横断チャット (RAG / 埋め込み) — optional; absent fields degrade gracefully.
  const setEmbedProvider = document.getElementById('memola-set-embed-provider') as HTMLSelectElement | null;
  const setVoyageKey = document.getElementById('memola-set-voyage-key') as HTMLInputElement | null;
  const setVoyageModel = document.getElementById('memola-set-voyage-model') as HTMLSelectElement | null;
  const setEmbedModel = document.getElementById('memola-set-embed-model') as HTMLSelectElement | null;
  const setEmbedApiVer = document.getElementById('memola-set-embed-apiver') as HTMLInputElement | null;
  const setEmbedDims = document.getElementById('memola-set-embed-dims') as HTMLInputElement | null;
  const setRagTopK = document.getElementById('memola-set-rag-topk') as HTMLInputElement | null;
  const setRagMinScore = document.getElementById('memola-set-rag-minscore') as HTMLInputElement | null;
  const setDensity = document.getElementById('memola-set-density') as HTMLSelectElement | null;
  const setTheme = document.getElementById('memola-set-theme') as HTMLSelectElement | null;
  const setSaveDelay = document.getElementById('memola-set-savedelay') as HTMLSelectElement | null;
  const setSyncPoll = document.getElementById('memola-set-syncpoll') as HTMLSelectElement | null;
  const setPresence = document.getElementById('memola-set-presence') as HTMLSelectElement | null;

  // ⌨ Shortcut-list button (no-op when missing)
  document.getElementById('memola-set-shortcuts')?.addEventListener('click', () => openShortcutsModal());

  // Reset buttons (mine / others / all)
  document.getElementById('memola-set-reset-mine')?.addEventListener('click', () =>
    runReset('mine', '自分のプライベートのみ削除'));
  document.getElementById('memola-set-reset-others')?.addEventListener('click', () =>
    runReset('others', '組織+他人のデータを削除'));
  document.getElementById('memola-set-reset-all')?.addEventListener('click', () =>
    runReset('all', '全データ + 設定を初期化'));

  // Bail if any required element is missing — the settings panel UI
  // would be broken anyway, no point wiring partial.
  if (!setBtn || !setMd || !setKey || !setProv || !setClaudeModel || !setCorpModel ||
      !setCorpKey || !setCorpBaseUrl || !setCorpPrefix || !setCorpOverrides ||
      !setLocalBaseUrl || !setLocalKey || !setLocalModel || !setLocalModels ||
      !setLocalReasoning || !setDensity || !setTheme || !setSaveDelay ||
      !setSyncPoll || !setPresence) {
    return;
  }

  // Populate model dropdowns once.
  void import('../api/ai-settings').then((ai) => {
    ai.CLAUDE_MODELS.forEach((m) => {
      const o = document.createElement('option');
      o.value = m.id; o.textContent = m.label;
      setClaudeModel.appendChild(o);
    });
    ai.CORP_AI_MODELS.forEach((m) => {
      const o = document.createElement('option');
      o.value = m.id;
      o.textContent = m.id + (m.reasoning ? ' (推論)' : '') + (m.vision ? ' 🖼' : '');
      setCorpModel.appendChild(o);
    });
    if (setEmbedModel) {
      ai.EMBEDDING_MODELS.forEach((id) => {
        const o = document.createElement('option');
        o.value = id; o.textContent = id;
        setEmbedModel.appendChild(o);
      });
    }
    if (setVoyageModel) {
      ai.VOYAGE_MODELS.forEach((id) => {
        const o = document.createElement('option');
        o.value = id; o.textContent = id;
        setVoyageModel.appendChild(o);
      });
    }
  });

  // From here on, every `set*` ref has been null-guarded by the early
  // return above; capture the non-null aliases to satisfy TS in nested
  // closures.
  const provEl = setProv;
  /** Show/hide rows based on the selected provider. Each conditional row
   *  has a `data-prov` attribute matching the provider value. */
  function syncProviderRows(): void {
    const cur = provEl.value;
    const emb = setEmbedProvider?.value || 'voyage';
    // A row is shown iff it passes BOTH gates it declares:
    //   data-prov     — chat provider (comma-separated allowed)
    //   data-embprov  — embedding provider ('auto' | 'voyage')
    document.querySelectorAll<HTMLElement>('.memola-set-row[data-prov],.memola-set-row[data-embprov]').forEach((row) => {
      const provAttr = row.dataset.prov;
      const embAttr = row.dataset.embprov;
      const okProv = !provAttr || provAttr.split(',').map((s) => s.trim()).includes(cur);
      const okEmb = !embAttr || embAttr.split(',').map((s) => s.trim()).includes(emb);
      row.style.display = (okProv && okEmb) ? '' : 'none';
    });
  }
  provEl.addEventListener('change', syncProviderRows);
  setEmbedProvider?.addEventListener('change', syncProviderRows);

  // Sidebar nav inside the settings modal — tabs switch panes.
  document.querySelectorAll<HTMLElement>('.memola-set-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      if (!target) return;
      document.querySelectorAll<HTMLElement>('.memola-set-tab')
        .forEach((t) => t.classList.toggle('on', t === tab));
      document.querySelectorAll<HTMLElement>('.memola-set-pane')
        .forEach((p) => p.classList.toggle('on', p.dataset.pane === target));
    });
  });

  setBtn.addEventListener('click', () => {
    // Always reset to the first pane on open so the user has a
    // predictable starting point.
    document.querySelectorAll<HTMLElement>('.memola-set-tab')
      .forEach((t) => t.classList.toggle('on', t.dataset.tab === 'ai'));
    document.querySelectorAll<HTMLElement>('.memola-set-pane')
      .forEach((p) => p.classList.toggle('on', p.dataset.pane === 'ai'));
    // Populate the build id (Help pane). Injected by esbuild's
    // `define` at build time; falls back to 'unknown' just in case.
    const buildEl = document.getElementById('memola-set-build-id');
    if (buildEl) {
      buildEl.textContent = (typeof __BUILD_ID__ !== 'undefined' ? __BUILD_ID__ : 'unknown');
    }
    void import('../api/ai-settings').then((ai) => {
      try {
        setProv.value = ai.getProvider();
        setClaudeModel.value = ai.getClaudeModel();
        setCorpModel.value = ai.getCorpAiModel();
        setKey.value = getApiKey() || '';
        setCorpKey.value = ai.getCorpAiKey();
        setCorpBaseUrl.value = ai.getCorpAiBaseUrl();
        setCorpPrefix.value = ai.getCorpAiDeploymentPrefix();
        setCorpOverrides.value = ai.getCorpAiOverridesRaw();
        setLocalBaseUrl.value = ai.getLocalAiBaseUrl();
        setLocalKey.value = ai.getLocalAiKey();
        setLocalModel.value = ai.getLocalAiModel();
        setLocalModels.value = ai.getLocalAiModels().join('\n');
        setLocalReasoning.value = ai.getLocalAiReasoningModels().join(' ');
        if (setEmbedProvider) setEmbedProvider.value = ai.getEmbedProvider();
        if (setVoyageKey) setVoyageKey.value = ai.getVoyageKey();
        if (setVoyageModel) setVoyageModel.value = ai.getVoyageModel();
        if (setEmbedModel) setEmbedModel.value = ai.getEmbeddingModel();
        if (setEmbedApiVer) setEmbedApiVer.value = ai.getEmbeddingApiVersion();
        if (setEmbedDims) setEmbedDims.value = ai.getEmbeddingDimensions()?.toString() || '';
        if (setRagTopK) setRagTopK.value = String(ai.getRagTopK());
        if (setRagMinScore) setRagMinScore.value = String(ai.getRagMinScore());
        // 外部ベクトル 連携: フォルダ + kind トグル
        const tf = document.getElementById('memola-set-rag-extvec-folder') as HTMLInputElement | null;
        if (tf) tf.value = prefRag外部ベクトルFolder.get();
        {
          const enabled = new Set(prefRag外部ベクトルKinds.get().split(',').map((s) => s.trim()));
          for (const k of EXTVEC_KIND_LIST) {
            const cb = document.getElementById('memola-set-rag-extvec-' + k) as HTMLInputElement | null;
            if (cb) cb.checked = enabled.has(k);
          }
        }
        setDensity.value = prefDensity.get();
        setTheme.value = prefTheme.get();
        setSaveDelay.value = prefSaveDelayMs.get();
        setSyncPoll.value = prefSyncPollMs.get();
        setPresence.value = prefPresenceEnabled.get();
      } catch { /* ignore */ }
      syncProviderRows();
      setMd.classList.add('on');
    });
  });
  setMd.addEventListener('click', (e) => {
    if (e.target === setMd) setMd.classList.remove('on');
  });
  document.getElementById('memola-set-cancel')?.addEventListener('click', () =>
    setMd.classList.remove('on'));

  document.getElementById('memola-set-save')?.addEventListener('click', () => {
    // Pre-validate the overrides JSON so the user gets immediate feedback
    // rather than silent fallback at request time.
    const ovRaw = setCorpOverrides.value.trim();
    if (ovRaw) {
      try {
        const parsed = JSON.parse(ovRaw);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
          toast('オーバーライド JSON はオブジェクト形式で書いてください', 'err');
          return;
        }
      } catch (e) {
        toast('オーバーライド JSON が不正です: ' + (e as Error).message, 'err');
        return;
      }
    }
    void import('../api/ai-settings').then((ai) => {
      try {
        ai.setProvider(setProv.value as 'claude' | 'corp' | 'local');
        if (setClaudeModel.value) ai.setClaudeModel(setClaudeModel.value);
        if (setCorpModel.value) ai.setCorpAiModel(setCorpModel.value);
        setApiKey(setKey.value);
        ai.setCorpAiKey(setCorpKey.value);
        ai.setCorpAiBaseUrl(setCorpBaseUrl.value);
        ai.setCorpAiDeploymentPrefix(setCorpPrefix.value);
        ai.setCorpAiOverridesRaw(setCorpOverrides.value);
        ai.setLocalAiBaseUrl(setLocalBaseUrl.value);
        ai.setLocalAiKey(setLocalKey.value);
        ai.setLocalAiModel(setLocalModel.value);
        const localModelsList = setLocalModels.value
          .split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
        ai.setLocalAiModels(localModelsList);
        ai.setLocalAiReasoningModels(setLocalReasoning.value);
        if (setEmbedProvider) ai.setEmbedProvider(setEmbedProvider.value as 'auto' | 'voyage');
        if (setVoyageKey) ai.setVoyageKey(setVoyageKey.value);
        if (setVoyageModel) ai.setVoyageModel(setVoyageModel.value);
        if (setEmbedModel) ai.setEmbeddingModel(setEmbedModel.value);
        if (setEmbedApiVer) ai.setEmbeddingApiVersion(setEmbedApiVer.value);
        if (setEmbedDims) ai.setEmbeddingDimensions(setEmbedDims.value);
        if (setRagTopK) ai.setRagTopK(setRagTopK.value);
        if (setRagMinScore) ai.setRagMinScore(setRagMinScore.value);
        // 外部ベクトル 連携
        {
          const tf = document.getElementById('memola-set-rag-extvec-folder') as HTMLInputElement | null;
          if (tf) prefRag外部ベクトルFolder.set(tf.value.trim());
          const on: string[] = [];
          for (const k of EXTVEC_KIND_LIST) {
            const cb = document.getElementById('memola-set-rag-extvec-' + k) as HTMLInputElement | null;
            if (cb?.checked) on.push(k);
          }
          prefRag外部ベクトルKinds.set(on.join(','));
        }
        prefDensity.set(setDensity.value);
        prefTheme.set(setTheme.value);
        prefSaveDelayMs.set(setSaveDelay.value);
        prefSyncPollMs.set(setSyncPoll.value);
        const prevPresence = prefPresenceEnabled.get();
        prefPresenceEnabled.set(setPresence.value);
        // Re-apply sync-watch + presence so the new pref takes effect
        // immediately without a reload.
        if (S.sync.pageId && S.sync.loadedModified && S.sync.loadedEtag) {
          void import('./sync-watch').then((m) => {
            m.startWatching(S.sync.pageId!, S.sync.loadedModified!, S.sync.loadedEtag!);
          });
        }
        if (prevPresence !== setPresence.value) {
          void import('./presence-ui').then((m) => {
            if (setPresence.value === '0') m.shutdownPresence();
            else m.syncPresenceForCurrent();
          });
        }
      } catch { /* ignore */ }
      const ov = document.getElementById('memola-overlay');
      if (ov) {
        ov.dataset.density = setDensity.value;
        ov.dataset.theme = setTheme.value;
      }
      void import('./ai-chat').then((m) => m.syncProviderBadge?.());
      setMd.classList.remove('on');
      toast('設定を保存しました');
    });
  });

  // Apply on init
  const ov = document.getElementById('memola-overlay');
  if (ov) {
    ov.dataset.density = prefDensity.get();
    ov.dataset.theme = prefTheme.get();
  }
}

/** Triple-checked reset path: pre-flight count → double confirm →
 *  destructive run. Each mode hits a different `reset.ts` helper. */
async function runReset(
  mode: 'mine' | 'others' | 'all',
  label: string,
): Promise<void> {
  const reset = await import('../api/reset');
  setLoad(true, '対象を集計中...');
  let counts: { pages: number; dbs: number; dailyRows: number };
  try {
    counts = await reset.countResetTargets(mode);
  } catch (e) {
    setLoad(false);
    toast('集計失敗: ' + (e as Error).message, 'err');
    return;
  }
  setLoad(false);
  const total = counts.pages + counts.dbs + counts.dailyRows;
  const detail = mode === 'all'
    ? '全 memola-* SP リスト + 全 memola.* localStorage キー'
    : `ページ ${counts.pages} 件 + DB ${counts.dbs} 件` +
      (counts.dailyRows > 0 ? ` + デイリー ${counts.dailyRows} 件` : '');
  if (total === 0 && mode !== 'all') {
    toast('削除対象のデータがありません');
    return;
  }
  if (!confirm(
    '【' + label + '】\n\n' +
    '削除対象: ' + detail + '\n\n' +
    '⚠ 元に戻せません。SP のごみ箱からも復元できません。\n\n' +
    '本当に実行しますか?',
  )) return;
  if (!confirm('最終確認: 実行すると即座に SP からデータが削除されます。よろしいですか?')) return;
  setLoad(true, '削除中... (時間がかかる場合があります)');
  try {
    const sum = mode === 'mine' ? await reset.resetMyPrivateData()
              : mode === 'others' ? await reset.resetOthersData()
              : await reset.resetAll();
    const summary = mode === 'all'
      ? `SP リスト ${sum.spListsDeleted} 件 / 完全削除 ${sum.recycleBinPurged} 件`
      : `ページ ${sum.pagesDeleted} / DB ${sum.dbsDeleted} / 完全削除 ${sum.recycleBinPurged} 件`;
    let errSummary = '';
    if (sum.errors.length > 0) {
      const first = sum.errors[0].length > 80 ? sum.errors[0].slice(0, 80) + '…' : sum.errors[0];
      errSummary = sum.errors.length === 1
        ? ` (失敗 1 件: ${first})`
        : ` (失敗 ${sum.errors.length} 件、最初: ${first})`;
      console.warn('[Memola reset errors]', sum.errors);
      setTimeout(() => {
        const errDetail = sum.errors.slice(0, 20).join('\n');
        const more = sum.errors.length > 20 ? `\n…他 ${sum.errors.length - 20} 件 (コンソール参照)` : '';
        alert(`【リセットの失敗詳細 — ${sum.errors.length} 件】\n\n${errDetail}${more}`);
      }, 800);
    }
    if (mode !== 'all') {
      const { renderTree } = await import('./tree');
      renderTree();
      const v = await import('./views');
      if (S.currentRow) {
        const dbId = S.currentRow.dbId;
        const dbStillExists = S.pages.some((p) => p.Id === dbId);
        S.currentRow = null;
        if (dbStillExists) {
          const dbPage = S.pages.find((p) => p.Id === dbId);
          if (dbPage) await v.doSelectDb(dbId, dbPage);
        } else {
          S.currentId = null;
          showView('empty');
        }
      } else if (S.currentType === 'database' && S.currentId) {
        const dbPage = S.pages.find((p) => p.Id === S.currentId);
        if (dbPage) {
          await v.doSelectDb(S.currentId, dbPage);
        } else {
          S.currentId = null;
          showView('empty');
        }
      } else {
        const stillExists = S.currentId && S.pages.some((p) => p.Id === S.currentId);
        if (!stillExists) {
          S.currentId = null;
          showView('empty');
        }
      }
    }
    toast(label + ' 完了: ' + summary + errSummary,
      sum.errors.length > 0 ? 'err' : 'ok');
    document.getElementById('memola-settings-md')?.classList.remove('on');
    if (mode === 'all') {
      setTimeout(() => {
        if (confirm('完全リセットが完了しました。SP ページを今すぐリロードしますか?')) {
          location.reload();
        }
      }, 500);
    }
  } catch (e) {
    toast('リセット失敗: ' + (e as Error).message, 'err');
  } finally {
    setLoad(false);
  }
}
