// ── EDITOR ─────────────────────────────────────────────

// Slash command definitions
var SLASH_ITEMS = [
  { cmd:'p',       icon:'T',    name:'テキスト',        desc:'プレーンテキスト' },
  { cmd:'h1',      icon:'H1',   name:'見出し1',         desc:'大きな見出し' },
  { cmd:'h2',      icon:'H2',   name:'見出し2',         desc:'中見出し' },
  { cmd:'h3',      icon:'H3',   name:'見出し3',         desc:'小見出し' },
  { cmd:'ul',      icon:'•',    name:'箇条書き',        desc:'シンプルな箇条書き' },
  { cmd:'ol',      icon:'1.',   name:'番号付きリスト',  desc:'番号付き箇条書き' },
  { cmd:'todo',    icon:'☐',    name:'ToDoリスト',      desc:'チェックボックス付きリスト' },
  { cmd:'callout', icon:'💡',   name:'コールアウト',    desc:'ハイライトボックス' },
  { cmd:'quote',   icon:'❝',    name:'引用',            desc:'引用ブロック' },
  { cmd:'pre',     icon:'</>',  name:'コードブロック',  desc:'コードを記述' },
  { cmd:'hr',      icon:'—',    name:'区切り線',        desc:'セクション区切り' }
];

var _slashActive = false;
var _slashQuery = '';
var _slashSel = 0;
var _slashFiltered = [];
var _slashNode = null;   // the text node where slash was typed
var _slashOffset = 0;    // offset of '/' in the text node

function showSlashMenu(rect) {
  var el = g('slash');
  _slashFiltered = SLASH_ITEMS.filter(function(item){
    if (!_slashQuery) return true;
    return item.name.toLowerCase().includes(_slashQuery.toLowerCase()) ||
           item.cmd.toLowerCase().includes(_slashQuery.toLowerCase());
  });
  if (_slashFiltered.length === 0) { closeSlashMenu(); return; }
  if (_slashSel >= _slashFiltered.length) _slashSel = 0;

  el.innerHTML = '';
  _slashFiltered.forEach(function(item, idx) {
    var div = document.createElement('div');
    div.className = 'n365-slash-item' + (idx === _slashSel ? ' sel' : '');
    div.innerHTML =
      '<div class="n365-slash-icon">' + item.icon + '</div>' +
      '<div><div class="n365-slash-name">' + item.name + '</div><div class="n365-slash-desc">' + item.desc + '</div></div>';
    div.addEventListener('mousedown', function(e){ e.preventDefault(); applySlashCmd(item.cmd); });
    el.appendChild(div);
  });

  // Position below cursor
  var top = rect.bottom + window.scrollY + 4;
  var left = rect.left + window.scrollX;
  // Keep within viewport
  var vpW = window.innerWidth;
  if (left + 260 > vpW) left = vpW - 264;
  el.style.top = top + 'px';
  el.style.left = left + 'px';
  el.classList.add('on');
}

function closeSlashMenu() {
  _slashActive = false;
  _slashQuery = '';
  _slashSel = 0;
  _slashNode = null;
  g('slash').classList.remove('on');
}

function applySlashCmd(cmd) {
  // Delete only the typed /query (not the rest of the line)
  if (_slashNode && _ed.contains(_slashNode)) {
    var sel0 = window.getSelection();
    if (sel0.rangeCount) {
      var rng0 = sel0.getRangeAt(0);
      var curOff = (rng0.startContainer === _slashNode) ? rng0.startOffset : _slashNode.textContent.length;
      var slashStart = curOff - _slashQuery.length - 1;
      var txt = _slashNode.textContent;
      if (slashStart >= 0 && txt.charAt(slashStart) === '/') {
        _slashNode.textContent = txt.substring(0, slashStart) + txt.substring(curOff);
        var r = document.createRange();
        r.setStart(_slashNode, slashStart); r.collapse(true);
        sel0.removeAllRanges(); sel0.addRange(r);
      }
    }
  }
  closeSlashMenu();

  _ed.focus();
  if (cmd === 'p') {
    document.execCommand('formatBlock', false, 'p');
  } else if (cmd === 'todo') {
    var sel = window.getSelection();
    var div = document.createElement('div');
    div.className = 'n365-todo';
    var cb = document.createElement('input');
    cb.type = 'checkbox'; cb.className = 'n365-todo-cb';
    var sp = document.createElement('span');
    sp.className = 'n365-todo-txt';
    sp.appendChild(document.createElement('br'));
    div.appendChild(cb); div.appendChild(sp);
    if (sel.rangeCount) {
      var r = sel.getRangeAt(0);
      // Insert after current block if possible
      var block = curBlock();
      if (block && block !== _ed) {
        block.parentNode.insertBefore(div, block.nextSibling);
        if (!block.textContent.trim()) block.remove();
      } else {
        r.insertNode(div);
      }
      requestAnimationFrame(function(){
        var rng = document.createRange();
        rng.setStart(sp, 0); rng.collapse(true);
        var s = window.getSelection();
        s.removeAllRanges(); s.addRange(rng);
        _ed.focus();
      });
    }
  } else if (cmd === 'callout') {
    var calloutDiv = document.createElement('div');
    calloutDiv.className = 'n365-callout';
    var ic = document.createElement('span');
    ic.className = 'n365-callout-ic'; ic.textContent = '💡';
    var body = document.createElement('div');
    body.className = 'n365-callout-body';
    var p = document.createElement('p');
    p.appendChild(document.createElement('br'));
    body.appendChild(p); calloutDiv.appendChild(ic); calloutDiv.appendChild(body);
    var selC = window.getSelection();
    if (selC.rangeCount) {
      var rc = selC.getRangeAt(0);
      var blockC = curBlock();
      if (blockC && blockC !== _ed) {
        blockC.parentNode.insertBefore(calloutDiv, blockC.nextSibling);
        if (!blockC.textContent.trim()) blockC.remove();
      } else {
        rc.insertNode(calloutDiv);
      }
      requestAnimationFrame(function(){
        var rngC = document.createRange();
        rngC.setStart(p, 0); rngC.collapse(true);
        var s = window.getSelection();
        s.removeAllRanges(); s.addRange(rngC);
        _ed.focus();
      });
    }
  } else {
    execCmd(cmd);
  }
  S.dirty = true; setSave('未保存'); schedSave();
}

// Editor events
_ed.addEventListener('input', function(){
  S.dirty = true; setSave('未保存'); schedSave();

  // Slash command detection
  var sel = window.getSelection();
  if (!sel.rangeCount) return;
  var range = sel.getRangeAt(0);
  var node = range.startContainer;
  if (node.nodeType === 3) {
    var txt = node.textContent;
    var offset = range.startOffset;
    var before = txt.substring(0, offset);
    var slashMatch = before.match(/(^|\s)\/(\w*)$/);
    if (slashMatch) {
      _slashActive = true;
      _slashQuery = slashMatch[2] || '';
      _slashSel = 0;
      _slashNode = node;
      var rect = range.getBoundingClientRect();
      showSlashMenu(rect);
      return;
    }
  }
  if (_slashActive) closeSlashMenu();
});

_ed.addEventListener('keydown', function(e){
  // Skip during IME composition (Japanese input etc.)
  if (e.isComposing || e.keyCode === 229) return;

  // Handle slash menu navigation
  if (_slashActive) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      _slashSel = (_slashSel + 1) % _slashFiltered.length;
      var rect2 = window.getSelection().rangeCount ? window.getSelection().getRangeAt(0).getBoundingClientRect() : {bottom:0,left:0};
      showSlashMenu(rect2);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      _slashSel = (_slashSel - 1 + _slashFiltered.length) % _slashFiltered.length;
      var rect3 = window.getSelection().rangeCount ? window.getSelection().getRangeAt(0).getBoundingClientRect() : {bottom:0,left:0};
      showSlashMenu(rect3);
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (_slashFiltered[_slashSel]) applySlashCmd(_slashFiltered[_slashSel].cmd);
      return;
    }
    if (e.key === 'Escape' || e.key === ' ') {
      closeSlashMenu();
      return;
    }
  }

  if (e.key === 'Backspace') {
    var bsSel = window.getSelection();
    if (bsSel.rangeCount && bsSel.isCollapsed) {
      var bsRange = bsSel.getRangeAt(0);
      var startNode = bsRange.startContainer;

      var bsCallout = findCallout(startNode);
      if (bsCallout && isAtCalloutStart(bsRange, bsCallout)) {
        e.preventDefault();
        unwrapCallout(bsCallout);
        S.dirty = true; setSave('未保存'); schedSave();
        refTb();
        return;
      }

      var bsTodo = findAncestor(startNode, '.n365-todo');
      if (bsTodo && isAtBlockStart(bsRange, bsTodo)) {
        e.preventDefault();
        unwrapTodo(bsTodo);
        S.dirty = true; setSave('未保存'); schedSave();
        refTb();
        return;
      }

      var bsPre = findAncestor(startNode, 'pre');
      if (bsPre && isAtBlockStart(bsRange, bsPre)) {
        e.preventDefault();
        unwrapToP(bsPre, true);
        S.dirty = true; setSave('未保存'); schedSave();
        refTb();
        return;
      }

      var bsQuote = findAncestor(startNode, 'blockquote');
      if (bsQuote && isAtBlockStart(bsRange, bsQuote)) {
        e.preventDefault();
        unwrapToP(bsQuote, false);
        S.dirty = true; setSave('未保存'); schedSave();
        refTb();
        return;
      }

      var bsCb = curBlock();
      if (bsCb && bsCb !== _ed && isAtBlockStart(bsRange, bsCb)) {
        var prev = bsCb.previousElementSibling;
        if (prev && prev.tagName === 'HR') {
          e.preventDefault();
          prev.remove();
          S.dirty = true; setSave('未保存'); schedSave();
          refTb();
          return;
        }
      }
    }
  }

  var b = curBlock();
  if (e.key === 'Enter' && b && b.tagName === 'PRE') {
    e.preventDefault();
    var preSel = window.getSelection();
    if (preSel.rangeCount) {
      var preRng = preSel.getRangeAt(0);
      var atEnd = isAtBlockEnd(preRng, b);
      document.execCommand('insertText', false, atEnd ? '\n\n' : '\n');
      if (atEnd) {
        var s2 = window.getSelection();
        if (s2.rangeCount) {
          var r2 = s2.getRangeAt(0);
          if (r2.startOffset > 0) {
            var newR = document.createRange();
            newR.setStart(r2.startContainer, r2.startOffset - 1);
            newR.collapse(true);
            s2.removeAllRanges(); s2.addRange(newR);
          }
        }
      }
    }
  }
  if (e.key === 'Tab'   && b && b.tagName === 'PRE') { e.preventDefault(); document.execCommand('insertText', false, '  '); }
});

_ed.addEventListener('keyup', refTb);
_ed.addEventListener('mouseup', refTb);

// Todo checkbox click handler (delegated)
_ed.addEventListener('click', function(e){
  if (e.target.classList.contains('n365-todo-cb')) {
    var txt = e.target.nextElementSibling;
    if (txt && txt.classList.contains('n365-todo-txt')) {
      txt.classList.toggle('done', e.target.checked);
      S.dirty = true; setSave('未保存'); schedSave();
    }
  }
});

function curBlock() {
  var sel = window.getSelection(); if (!sel.rangeCount) return null;
  var n = sel.getRangeAt(0).startContainer;
  while (n && n !== _ed) { if (n.nodeType === 1 && /^(P|H[1-6]|PRE|BLOCKQUOTE|LI|UL|OL|DIV)$/.test(n.tagName)) return n; n = n.parentNode; }
  return null;
}

function findCallout(node) {
  while (node && node !== _ed) {
    if (node.nodeType === 1 && node.classList && node.classList.contains('n365-callout')) return node;
    node = node.parentNode;
  }
  return null;
}

function findAncestor(node, selector) {
  while (node && node !== _ed) {
    if (node.nodeType === 1 && node.matches && node.matches(selector)) return node;
    node = node.parentNode;
  }
  return null;
}

function isAtBlockStart(range, block) {
  var r = document.createRange();
  r.setStart(block, 0);
  r.setEnd(range.startContainer, range.startOffset);
  return r.toString() === '';
}

function isAtBlockEnd(range, block) {
  var r = document.createRange();
  r.setStart(range.startContainer, range.startOffset);
  r.setEnd(block, block.childNodes.length);
  return r.toString() === '';
}

function placeCaretAtStart(el) {
  var sel = window.getSelection();
  var r = document.createRange();
  r.setStart(el, 0); r.collapse(true);
  sel.removeAllRanges(); sel.addRange(r);
}

function unwrapToP(block, useTextOnly) {
  var p = document.createElement('p');
  if (useTextOnly) {
    p.textContent = block.textContent;
  } else {
    while (block.firstChild) p.appendChild(block.firstChild);
  }
  if (!p.firstChild) p.innerHTML = '<br>';
  block.parentNode.replaceChild(p, block);
  placeCaretAtStart(p);
  return p;
}

function unwrapTodo(todo) {
  var p = document.createElement('p');
  var txt = todo.querySelector('.n365-todo-txt');
  if (txt) { while (txt.firstChild) p.appendChild(txt.firstChild); }
  if (!p.firstChild) p.innerHTML = '<br>';
  todo.parentNode.replaceChild(p, todo);
  placeCaretAtStart(p);
}

function unwrapCallout(callout) {
  var body = callout.querySelector('.n365-callout-body');
  var parent = callout.parentNode;
  var firstMoved = null;
  if (body) {
    while (body.firstChild) {
      var child = body.firstChild;
      parent.insertBefore(child, callout);
      if (!firstMoved) firstMoved = child;
    }
  }
  if (!firstMoved) {
    firstMoved = document.createElement('p');
    firstMoved.innerHTML = '<br>';
    parent.insertBefore(firstMoved, callout);
  }
  callout.remove();
  var sel = window.getSelection();
  var r = document.createRange();
  r.setStart(firstMoved, 0); r.collapse(true);
  sel.removeAllRanges(); sel.addRange(r);
}

function isAtCalloutStart(range, callout) {
  var body = callout.querySelector('.n365-callout-body');
  if (!body) return false;
  var r = document.createRange();
  r.setStart(body, 0);
  r.setEnd(range.startContainer, range.startOffset);
  return r.toString() === '';
}

function execCmd(cmd) {
  _ed.focus();
  var sel = window.getSelection();
  switch(cmd) {
    case 'h1': case 'h2': case 'h3': document.execCommand('formatBlock', false, cmd); break;
    case 'bold':   document.execCommand('bold'); break;
    case 'italic': document.execCommand('italic'); break;
    case 'strike': document.execCommand('strikeThrough'); break;
    case 'code':
      if (sel.rangeCount && !sel.isCollapsed) {
        var r = sel.getRangeAt(0), t = r.toString(); r.deleteContents();
        var c = document.createElement('code'); c.textContent = t; r.insertNode(c);
      }
      break;
    case 'ul':    document.execCommand('insertUnorderedList'); break;
    case 'ol':    document.execCommand('insertOrderedList'); break;
    case 'quote': {
      var selQ = window.getSelection();
      if (selQ.rangeCount) {
        var bqEl = findAncestor(selQ.getRangeAt(0).startContainer, 'blockquote');
        if (bqEl) {
          unwrapToP(bqEl, false);
          S.dirty = true; setSave('未保存'); schedSave();
          refTb();
          return;
        }
      }
      document.execCommand('formatBlock', false, 'blockquote');
      break;
    }
    case 'pre': {
      var selP = window.getSelection();
      if (selP.rangeCount) {
        var preEl = findAncestor(selP.getRangeAt(0).startContainer, 'pre');
        if (preEl) {
          unwrapToP(preEl, true);
          S.dirty = true; setSave('未保存'); schedSave();
          refTb();
          return;
        }
      }
      document.execCommand('formatBlock', false, 'pre');
      break;
    }
    case 'hr':    document.execCommand('insertHTML', false, '<hr>'); break;
    case 'todo': {
      var selTd = window.getSelection();
      if (selTd.rangeCount) {
        var todoEl = findAncestor(selTd.getRangeAt(0).startContainer, '.n365-todo');
        if (todoEl) {
          unwrapTodo(todoEl);
          S.dirty = true; setSave('未保存'); schedSave();
          refTb();
          return;
        }
      }
      applySlashCmd('todo'); return;
    }
    case 'callout': {
      var selC = window.getSelection();
      if (selC.rangeCount) {
        var existing = findCallout(selC.getRangeAt(0).startContainer);
        if (existing) {
          unwrapCallout(existing);
          S.dirty = true; setSave('未保存'); schedSave();
          refTb();
          return;
        }
      }
      applySlashCmd('callout');
      return;
    }
  }
  refTb();
}

function refTb() {
  var m = {
    h1: function(){ return document.queryCommandValue('formatBlock').toLowerCase()==='h1'; },
    h2: function(){ return document.queryCommandValue('formatBlock').toLowerCase()==='h2'; },
    h3: function(){ return document.queryCommandValue('formatBlock').toLowerCase()==='h3'; },
    bold:   function(){ return document.queryCommandState('bold'); },
    italic: function(){ return document.queryCommandState('italic'); },
    strike: function(){ return document.queryCommandState('strikeThrough'); },
    ul:     function(){ return document.queryCommandState('insertUnorderedList'); },
    ol:     function(){ return document.queryCommandState('insertOrderedList'); },
    quote:  function(){ return document.queryCommandValue('formatBlock').toLowerCase()==='blockquote'; },
    pre:    function(){ return document.queryCommandValue('formatBlock').toLowerCase()==='pre'; },
    callout: function(){
      var s = window.getSelection();
      if (!s.rangeCount) return false;
      return !!findCallout(s.getRangeAt(0).startContainer);
    },
    todo: function(){
      var s = window.getSelection();
      if (!s.rangeCount) return false;
      return !!findAncestor(s.getRangeAt(0).startContainer, '.n365-todo');
    }
  };
  _ov.querySelectorAll('.n365-b[data-cmd]').forEach(function(b){ var f=m[b.dataset.cmd]; b.classList.toggle('on', f?f():false); });
}

// ── Floating selection toolbar ─────────────────────────
document.addEventListener('selectionchange', function(){
  var sel = window.getSelection();
  var ftb = g('ftb');
  if (!sel || sel.isCollapsed || !sel.rangeCount) { ftb.classList.remove('on'); return; }
  // Check if selection is within editor
  var range = sel.getRangeAt(0);
  var container = range.commonAncestorContainer;
  var node = container.nodeType === 3 ? container.parentNode : container;
  if (!_ed.contains(node)) { ftb.classList.remove('on'); return; }
  if (_slashActive) { ftb.classList.remove('on'); return; }

  var rect = range.getBoundingClientRect();
  if (!rect || rect.width === 0) { ftb.classList.remove('on'); return; }

  // Position above selection, centered
  var ftbRect = ftb.getBoundingClientRect();
  var top = rect.top + window.scrollY - 44;
  var left = rect.left + window.scrollX + (rect.width / 2);
  if (top < 4) top = rect.bottom + window.scrollY + 4;

  ftb.style.top = top + 'px';
  ftb.style.left = left + 'px';
  ftb.classList.add('on');
});
