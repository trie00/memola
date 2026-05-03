// Tool Use loop. Calls Claude with the registered tools, executes tool_use
// blocks locally, returns tool_result and repeats until end_turn (or a hard
// step cap is hit).
//
// Returns the *delta* of new messages produced during this run so the caller
// can append them to the persistent chat history. tool_use / tool_result
// blocks are preserved in that history — that's what lets Claude remember
// prior actions ("update the page I just created") across turns.

import {
  callClaudeRaw,
  type ApiMessage,
  type ContentBlock,
  type ToolUseBlock,
  type ToolResultBlock,
  type SystemBlock,
} from '../api/anthropic';
import { TOOL_DEFS } from './tool-defs';
import { executeTool } from './tool-exec';

const MAX_STEPS = 12;            // safety: prevent runaway tool loops

export interface AgentResult {
  /** Messages produced during this run (assistant + interleaved tool_result user msgs). */
  newMessages: ApiMessage[];
  /** Concatenated assistant text from the final turn (for chat bubble). */
  finalText: string;
  /** Trace of tools executed, for UI display. */
  toolTrace: Array<{ name: string; ok: boolean }>;
}

/**
 * Run a single user turn through the agent loop.
 * @param history Prior structured chat history (already includes the user input).
 * @param systemPrompt System prompt (may include current page context).
 * @param onTextDelta Optional callback for streaming text chunks.
 * @param signal Optional AbortSignal — fetch is cancelled if it fires.
 */
export async function runAgent(
  history: ApiMessage[],
  systemPrompt: string | SystemBlock[],
  onTextDelta?: (delta: string) => void,
  signal?: AbortSignal,
): Promise<AgentResult> {
  // Working copy of the conversation we send to the API
  const working: ApiMessage[] = history.slice();
  // Track only the new messages added during this run
  const newMessages: ApiMessage[] = [];
  const toolTrace: Array<{ name: string; ok: boolean }> = [];
  const finalTexts: string[] = [];

  for (let step = 0; step < MAX_STEPS; step++) {
    if (signal?.aborted) throw new Error('aborted');
    // Provider dispatch: Claude API / Azure OpenAI 互換 API / ローカル AI.
    // All three speak the same ClaudeResponse shape thanks to the
    // translation layers in openai-corp.ts and openai-local.ts.
    const { getProvider, getClaudeModel, getCorpAiModel, getLocalAiModel } =
      await import('../api/ai-settings');
    const provider = getProvider();
    let res;
    if (provider === 'corp') {
      const { corpAiChatRaw } = await import('../api/openai-corp');
      res = await corpAiChatRaw({
        messages: working, system: systemPrompt, tools: TOOL_DEFS,
        model: getCorpAiModel(), signal,
        stream: onTextDelta ? { onText: onTextDelta } : undefined,
      });
    } else if (provider === 'local') {
      const { localAiChatRaw } = await import('../api/openai-local');
      res = await localAiChatRaw({
        messages: working, system: systemPrompt, tools: TOOL_DEFS,
        model: getLocalAiModel(), signal,
        stream: onTextDelta ? { onText: onTextDelta } : undefined,
      });
    } else {
      res = await callClaudeRaw({
        messages: working, system: systemPrompt, tools: TOOL_DEFS,
        model: getClaudeModel(), signal,
        stream: onTextDelta ? { onText: onTextDelta } : undefined,
      });
    }

    const assistantMsg: ApiMessage = { role: 'assistant', content: res.content };
    working.push(assistantMsg);
    newMessages.push(assistantMsg);

    for (const block of res.content) {
      if (block.type === 'text' && block.text.trim()) {
        finalTexts.push(block.text);
      }
    }

    if (res.stop_reason === 'end_turn' || res.stop_reason === 'stop_sequence') {
      break;
    }
    if (res.stop_reason !== 'tool_use') {
      // max_tokens or unknown — bail
      break;
    }

    const toolUses = res.content.filter((b): b is ToolUseBlock => b.type === 'tool_use');
    if (toolUses.length === 0) break;

    const toolResults: ToolResultBlock[] = [];
    for (const tu of toolUses) {
      const result = await executeTool(tu.name, tu.input);
      toolResults.push({ type: 'tool_result', tool_use_id: tu.id, content: result });
      let okFlag = false;
      try { okFlag = !!(JSON.parse(result) as { ok?: boolean }).ok; } catch { /* ignore */ }
      toolTrace.push({ name: tu.name, ok: okFlag });
    }
    const userMsg: ApiMessage = { role: 'user', content: toolResults as ContentBlock[] };
    working.push(userMsg);
    newMessages.push(userMsg);
  }

  let finalText = finalTexts[finalTexts.length - 1] || '';
  if (!finalText && toolTrace.length > 0) {
    finalText = '(' + toolTrace.length + ' 件のツールを実行しました)';
  }
  return { newMessages, finalText, toolTrace };
}
