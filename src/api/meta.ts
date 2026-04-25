// _meta.json read/write — the JSON manifest that powers the page tree.

import { META } from '../config';
import { S, type Meta } from '../state';
import { readFile, writeFile } from './sp-core';

export async function loadMeta(): Promise<Meta> {
  try { return JSON.parse(await readFile(META)) as Meta; }
  catch { return { pages: [] }; }
}

export async function saveMeta(): Promise<void> {
  await writeFile(META, JSON.stringify(S.meta, null, 2));
}
