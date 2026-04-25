// ── META ───────────────────────────────────────────────
async function loadMeta() {
  try { return JSON.parse(await readFile(META)); }
  catch(e) { return { pages: [] }; }
}

async function saveMeta() {
  await writeFile(META, JSON.stringify(S.meta, null, 2));
}
