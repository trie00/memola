// ── STATE ──────────────────────────────────────────────
var S = {
  pages: [],
  meta: { pages: [] },
  currentId: null,
  currentType: 'page',
  dbFields: [],
  dbItems: [],
  dbList: '',
  expanded: new Set(),
  dirty: false,
  saving: false,
  dbSort: { field: null, asc: true },
  dbFilter: ''
};
var _svT = null;
