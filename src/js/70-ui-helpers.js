// ── UI helpers ─────────────────────────────────────────
var _tkT;
function toast(msg, type, ms) {
  var el = g('tk'); el.textContent = msg;
  el.className = 'on' + (type === 'err' ? ' er' : '');
  clearTimeout(_tkT); _tkT = setTimeout(function(){ el.className = ''; }, ms || 3500);
}
function setLoad(on, msg) { g('lm').textContent = ' ' + (msg || '読み込み中...'); g('ld').classList.toggle('off', !on); }
function setSave(t) { g('ss').textContent = t; }
function autoR(el) { el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; }
