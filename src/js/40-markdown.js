// ── MARKDOWN ↔ HTML ────────────────────────────────────

function htmlToMd(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return domWalk(div).replace(/\n{3,}/g, '\n\n').trim();
}

function domWalk(node) {
  if (node.nodeType === 3) return node.textContent.replace(/\n/g, ' ');
  if (node.nodeType !== 1) return '';
  var tag = node.tagName.toLowerCase();

  // Skip todo checkbox inputs
  if (tag === 'input' && node.classList.contains('n365-todo-cb')) return '';

  // Todo item
  if (tag === 'div' && node.classList.contains('n365-todo')) {
    var cb = node.querySelector('.n365-todo-cb');
    var txtEl = node.querySelector('.n365-todo-txt');
    var checked = cb && cb.checked;
    var txt = txtEl ? txtEl.textContent : '';
    return '\n- [' + (checked ? 'x' : ' ') + '] ' + txt + '\n';
  }

  // Callout block
  if (tag === 'div' && node.classList.contains('n365-callout')) {
    var ic = node.querySelector('.n365-callout-ic');
    var body = node.querySelector('.n365-callout-body');
    var emoji = ic ? ic.textContent.trim() : '💡';
    var bodyText = body ? Array.from(body.childNodes).map(domWalk).join('').trim() : '';
    return '\n> [' + emoji + '] ' + bodyText + '\n';
  }

  // Todo txt span — just return textContent
  if (tag === 'span' && node.classList.contains('n365-todo-txt')) {
    return node.textContent;
  }

  var ch = Array.from(node.childNodes).map(domWalk).join('');
  if (tag === 'h1') return '\n# ' + ch.trim() + '\n';
  if (tag === 'h2') return '\n## ' + ch.trim() + '\n';
  if (tag === 'h3') return '\n### ' + ch.trim() + '\n';
  if (tag === 'p')  return '\n' + ch.trim() + '\n';
  if (tag === 'strong' || tag === 'b') return '**' + ch + '**';
  if (tag === 'em' || tag === 'i')     return '*' + ch + '*';
  if (tag === 's' || tag === 'del' || tag === 'strike') return '~~' + ch + '~~';
  if (tag === 'code') {
    var inPre = node.parentNode && node.parentNode.tagName.toLowerCase() === 'pre';
    return inPre ? node.textContent : ('`' + node.textContent + '`');
  }
  if (tag === 'pre') {
    var cEl = node.querySelector('code');
    return '\n```\n' + (cEl ? cEl.textContent : node.textContent) + '\n```\n';
  }
  if (tag === 'blockquote') {
    return '\n' + ch.trim().split('\n').map(function(l){ return '> ' + l; }).join('\n') + '\n';
  }
  if (tag === 'ul') {
    return '\n' + Array.from(node.children).filter(function(c){ return c.tagName.toLowerCase()==='li'; })
      .map(function(li){ return '- ' + domWalk(li).trim(); }).join('\n') + '\n';
  }
  if (tag === 'ol') {
    return '\n' + Array.from(node.children).filter(function(c){ return c.tagName.toLowerCase()==='li'; })
      .map(function(li, idx){ return (idx+1) + '. ' + domWalk(li).trim(); }).join('\n') + '\n';
  }
  if (tag === 'li')  return ch;
  if (tag === 'hr')  return '\n---\n';
  if (tag === 'br')  return '\n';
  if (tag === 'a')   return '[' + ch + '](' + (node.getAttribute('href') || '') + ')';
  return ch;
}

function mdToHtml(md) {
  if (!md) return '';
  var lines = md.split('\n'), html = '', i = 0;

  function esc(t) { return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function inline(t) {
    return esc(t)
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,'<em>$1</em>')
      .replace(/~~(.+?)~~/g,'<s>$1</s>')
      .replace(/`(.+?)`/g,'<code>$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2">$1</a>');
  }

  while (i < lines.length) {
    var ln = lines[i];

    // Code block
    if (ln.trimStart().startsWith('```')) {
      var code = ''; i++;
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) { code += lines[i] + '\n'; i++; }
      html += '<pre><code>' + esc(code) + '</code></pre>'; i++; continue;
    }

    // Headings
    var hm = ln.match(/^(#{1,3})\s+(.*)/);
    if (hm) { var lv = hm[1].length; html += '<h'+lv+'>'+inline(hm[2])+'</h'+lv+'>'; i++; continue; }

    // HR
    if (ln.match(/^---+$/) || ln.match(/^\*\*\*+$/)) { html += '<hr>'; i++; continue; }

    // Todo: - [ ] or - [x]
    if (ln.match(/^- \[[ x]\] /)) {
      html += '<div class="n365-todo">';
      var checked = ln.charAt(3) === 'x';
      var todotxt = ln.replace(/^- \[[ x]\] /, '');
      html += '<input type="checkbox" class="n365-todo-cb"' + (checked ? ' checked' : '') + '>';
      html += '<span class="n365-todo-txt' + (checked ? ' done' : '') + '">' + inline(todotxt) + '</span>';
      html += '</div>';
      i++; continue;
    }

    // Blockquote / callout
    if (ln.startsWith('> ')) {
      var firstLine = ln.slice(2);
      // Callout: > [emoji] text
      var calloutMatch = firstLine.match(/^\[(.{1,4})\]\s*(.*)/);
      if (calloutMatch) {
        var calloutEmoji = calloutMatch[1];
        var calloutBody = calloutMatch[2] || '';
        // Collect continuation lines
        i++;
        while (i < lines.length && lines[i].startsWith('> ')) {
          calloutBody += ' ' + lines[i].slice(2); i++;
        }
        html += '<div class="n365-callout"><span class="n365-callout-ic">' + esc(calloutEmoji) + '</span><div class="n365-callout-body"><p>' + inline(calloutBody) + '</p></div></div>';
        continue;
      }
      // Regular blockquote
      var bq = ''; while (i < lines.length && lines[i].startsWith('> ')) { bq += lines[i].slice(2) + '\n'; i++; }
      html += '<blockquote>' + mdToHtml(bq.trim()) + '</blockquote>'; continue;
    }

    // Unordered list (not todo)
    if (ln.match(/^[-*]\s/) && !ln.match(/^- \[[ x]\] /)) {
      html += '<ul>';
      while (i < lines.length && lines[i].match(/^[-*]\s/) && !lines[i].match(/^- \[[ x]\] /)) {
        html += '<li>' + inline(lines[i].replace(/^[-*]\s/,'')) + '</li>'; i++;
      }
      html += '</ul>'; continue;
    }

    // Ordered list
    if (ln.match(/^\d+\.\s/)) {
      html += '<ol>';
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) { html += '<li>' + inline(lines[i].replace(/^\d+\.\s/,'')) + '</li>'; i++; }
      html += '</ol>'; continue;
    }

    if (ln.trim() === '') { i++; continue; }

    // Paragraph
    var para = '';
    while (i < lines.length && lines[i].trim() !== ''
      && !lines[i].match(/^#{1,3}\s/)
      && !lines[i].match(/^---+$/)
      && !lines[i].startsWith('> ')
      && !lines[i].match(/^[-*]\s/)
      && !lines[i].match(/^- \[[ x]\] /)
      && !lines[i].match(/^\d+\.\s/)
      && !lines[i].trimStart().startsWith('```')) {
      para += lines[i] + ' '; i++;
    }
    if (para.trim()) html += '<p>' + inline(para.trim()) + '</p>';
  }
  return html;
}

function buildMdFile(title, parentId, bodyHtml) {
  var fm = '---\ntitle: ' + title + '\nparent: ' + (parentId || '') + '\ncreated: ' + new Date().toISOString().slice(0,10) + '\n---\n\n';
  return fm + htmlToMd(bodyHtml);
}

function parseMeta(content) {
  var m = { title: '', parent: '' };
  if (!content || !content.startsWith('---')) return m;
  var end = content.indexOf('---', 3);
  if (end < 0) return m;
  content.substring(3, end).trim().split('\n').forEach(function(l){
    var c = l.indexOf(':'); if (c < 0) return;
    m[l.substring(0,c).trim()] = l.substring(c+1).trim();
  });
  return m;
}

function getBody(content) {
  if (!content || !content.startsWith('---')) return content || '';
  var end = content.indexOf('---', 3);
  return end < 0 ? content : content.substring(end + 3).trim();
}
