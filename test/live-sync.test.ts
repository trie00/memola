// planLiveSync tests — the pure decision for folding a foreign edit
// into the live editor (C).

import { describe, it, expect } from 'vitest';
import { planLiveSync } from '../src/lib/live-sync';
import { serializeBlocks } from '../src/api/pages';
import type { Block } from '../src/lib/blocks';

const P = (id: string, text: string): Block =>
  ({ id, kind: 'p', inline: [{ kind: 'text', text }] });
const body = (...bs: Block[]): string => serializeBlocks(bs);

describe('planLiveSync', () => {
  it('viewer (no local edits): takes theirs wholesale', () => {
    const base = body(P('1', 'a'), P('2', 'b'));
    const ours = base;                                  // I didn't edit
    const theirs = body(P('1', 'a (remote)'), P('2', 'b'));
    const plan = planLiveSync(base, ours, theirs);
    expect(plan.kind).toBe('merge');
    if (plan.kind !== 'merge') return;
    expect(plan.changed).toBe(true);
    expect(plan.merged.map((b) => (b as unknown as { inline: [{ text: string }] }).inline[0].text))
      .toEqual(['a (remote)', 'b']);
  });

  it('editor + remote edit different blocks: clean merge, both kept', () => {
    const base = body(P('1', 'a'), P('2', 'b'));
    const ours = body(P('1', 'a (mine)'), P('2', 'b'));     // I edited block 1
    const theirs = body(P('1', 'a'), P('2', 'b (remote)')); // they edited block 2
    const plan = planLiveSync(base, ours, theirs);
    expect(plan.kind).toBe('merge');
    if (plan.kind !== 'merge') return;
    expect(plan.changed).toBe(true);
    expect(plan.merged.map((b) => (b as unknown as { inline: [{ text: string }] }).inline[0].text))
      .toEqual(['a (mine)', 'b (remote)']);
  });

  it('same block edited on both sides: conflict (→ banner)', () => {
    const base = body(P('1', 'a'));
    const ours = body(P('1', 'a (mine)'));
    const theirs = body(P('1', 'a (remote)'));
    expect(planLiveSync(base, ours, theirs).kind).toBe('conflict');
  });

  it('remote change I already have (merged == ours): changed=false', () => {
    const base = body(P('1', 'a'));
    const theirs = body(P('1', 'a (remote)'));
    const ours = theirs;            // I somehow already match theirs
    const plan = planLiveSync(base, ours, theirs);
    expect(plan.kind).toBe('merge');
    if (plan.kind !== 'merge') return;
    expect(plan.changed).toBe(false);
  });

  it('non-block bodies → noop', () => {
    expect(planLiveSync('hello', 'hello x', 'hello y').kind).toBe('noop');
  });

  it('remote added a block while I edited another: clean merge', () => {
    const base = body(P('1', 'a'));
    const ours = body(P('1', 'a (mine)'));
    const theirs = body(P('1', 'a'), P('2', 'new remote block'));
    const plan = planLiveSync(base, ours, theirs);
    expect(plan.kind).toBe('merge');
    if (plan.kind !== 'merge') return;
    expect(plan.merged.map((b) => b.id)).toEqual(['1', '2']);
  });
});
