// Markdown <-> HTML conversion. Pure logic — testable under happy-dom.

export function htmlToMd(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  return domWalk(div).replace(/\n{3,}/g, '\n\n').trim();
}

export function domWalk(node: Node): string {
  if (node.nodeType === 3) return (node.textContent || '').replace(/\n/g, ' ');
  if (node.nodeType !== 1) return '';
  const el = node as Element;
  const tag = el.tagName.toLowerCase();

  // Skip todo checkbox inputs
  if (tag === 'input' && el.classList.contains('n365-todo-cb')) return '';

  // Todo item
  if (tag === 'div' && el.classList.contains('n365-todo')) {
    const cb = el.querySelector('.n365-todo-cb') as HTMLInputElement | null;
    const txtEl = el.querySelector('.n365-todo-txt');
    const checked = !!(cb && cb.checked);
    const txt = txtEl ? (txtEl.textContent || '') : '';
    return '\n- [' + (checked ? 'x' : ' ') + '] ' + txt + '\n';
  }

  // Callout block
  if (tag === 'div' && el.classList.contains('n365-callout')) {
    const ic = el.querySelector('.n365-callout-ic');
    const body = el.querySelector('.n365-callout-body');
    const emoji = ic ? (ic.textContent || '').trim() : '💡';
    const bodyText = body ? Array.from(body.childNodes).map(domWalk).join('').trim() : '';
    return '\n> [' + emoji + '] ' + bodyText + '\n';
  }

  // Todo txt span — just return textContent
  if (tag === 'span' && el.classList.contains('n365-todo-txt')) {
    return el.textContent || '';
  }

  const ch = Array.from(el.childNodes).map(domWalk).join('');
  if (tag === 'h1') return '\n# ' + ch.trim() + '\n';
  if (tag === 'h2') return '\n## ' + ch.trim() + '\n';
  if (tag === 'h3') return '\n### ' + ch.trim() + '\n';
  if (tag === 'p')  return '\n' + ch.trim() + '\n';
  if (tag === 'strong' || tag === 'b') return '**' + ch + '**';
  if (tag === 'em' || tag === 'i')     return '*' + ch + '*';
  if (tag === 's' || tag === 'del' || tag === 'strike') return '~~' + ch + '~~';
  if (tag === 'code') {
    const inPre = el.parentNode && (el.parentNode as Element).tagName &&
      (el.parentNode as Element).tagName.toLowerCase() === 'pre';
    return inPre ? (el.textContent || '') : ('`' + (el.textContent || '') + '`');
  }
  if (tag === 'pre') {
    const cEl = el.querySelector('code');
    return '\n```\n' + (cEl ? (cEl.textContent || '') : (el.textContent || '')) + '\n```\n';
  }
  if (tag === 'blockquote') {
    return '\n' + ch.trim().split('\n').map((l) => '> ' + l).join('\n') + '\n';
  }
  if (tag === 'ul') {
    return '\n' + Array.from(el.children).filter((c) => c.tagName.toLowerCase() === 'li')
      .map((li) => '- ' + domWalk(li).trim()).join('\n') + '\n';
  }
  if (tag === 'ol') {
    return '\n' + Array.from(el.children).filter((c) => c.tagName.toLowerCase() === 'li')
      .map((li, idx) => (idx + 1) + '. ' + domWalk(li).trim()).join('\n') + '\n';
  }
  if (tag === 'li')  return ch;
  if (tag === 'hr')  return '\n---\n';
  if (tag === 'br')  return '\n';
  if (tag === 'a')   return '[' + ch + '](' + (el.getAttribute('href') || '') + ')';
  return ch;
}

export function mdToHtml(md: string): string {
  if (!md) return '';
  const lines = md.split('\n');
  let html = '';
  let i = 0;

  function esc(t: string): string {
    return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function inline(t: string): string {
    return esc(t)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/~~(.+?)~~/g, '<s>$1</s>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  }

  while (i < lines.length) {
    const ln = lines[i];

    // Code block
    if (ln.trimStart().startsWith('```')) {
      let code = ''; i++;
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) { code += lines[i] + '\n'; i++; }
      html += '<pre><code>' + esc(code) + '</code></pre>'; i++; continue;
    }

    // Headings
    const hm = ln.match(/^(#{1,3})\s+(.*)/);
    if (hm) { const lv = hm[1].length; html += '<h' + lv + '>' + inline(hm[2]) + '</h' + lv + '>'; i++; continue; }

    // HR
    if (ln.match(/^---+$/) || ln.match(/^\*\*\*+$/)) { html += '<hr>'; i++; continue; }

    // Todo: - [ ] or - [x]
    if (ln.match(/^- \[[ x]\] /)) {
      html += '<div class="n365-todo">';
      const checked = ln.charAt(3) === 'x';
      const todotxt = ln.replace(/^- \[[ x]\] /, '');
      html += '<input type="checkbox" class="n365-todo-cb"' + (checked ? ' checked' : '') + '>';
      html += '<span class="n365-todo-txt' + (checked ? ' done' : '') + '">' + inline(todotxt) + '</span>';
      html += '</div>';
      i++; continue;
    }

    // Blockquote / callout
    if (ln.startsWith('> ')) {
      const firstLine = ln.slice(2);
      // Callout: > [emoji] text
      const calloutMatch = firstLine.match(/^\[(.{1,4})\]\s*(.*)/);
      if (calloutMatch) {
        const calloutEmoji = calloutMatch[1];
        let calloutBody = calloutMatch[2] || '';
        i++;
        while (i < lines.length && lines[i].startsWith('> ')) {
          calloutBody += ' ' + lines[i].slice(2); i++;
        }
        html += '<div class="n365-callout"><span class="n365-callout-ic">' + esc(calloutEmoji) +
          '</span><div class="n365-callout-body"><p>' + inline(calloutBody) + '</p></div></div>';
        continue;
      }
      // Regular blockquote
      let bq = '';
      while (i < lines.length && lines[i].startsWith('> ')) { bq += lines[i].slice(2) + '\n'; i++; }
      html += '<blockquote>' + mdToHtml(bq.trim()) + '</blockquote>'; continue;
    }

    // Unordered list (not todo)
    if (ln.match(/^[-*]\s/) && !ln.match(/^- \[[ x]\] /)) {
      html += '<ul>';
      while (i < lines.length && lines[i].match(/^[-*]\s/) && !lines[i].match(/^- \[[ x]\] /)) {
        html += '<li>' + inline(lines[i].replace(/^[-*]\s/, '')) + '</li>'; i++;
      }
      html += '</ul>'; continue;
    }

    // Ordered list
    if (ln.match(/^\d+\.\s/)) {
      html += '<ol>';
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        html += '<li>' + inline(lines[i].replace(/^\d+\.\s/, '')) + '</li>'; i++;
      }
      html += '</ol>'; continue;
    }

    if (ln.trim() === '') { i++; continue; }

    // Paragraph
    let para = '';
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

export function buildMdFile(title: string, parentId: string, bodyHtml: string): string {
  const fm = '---\ntitle: ' + title + '\nparent: ' + (parentId || '') +
    '\ncreated: ' + new Date().toISOString().slice(0, 10) + '\n---\n\n';
  return fm + htmlToMd(bodyHtml);
}

export function parseMeta(content: string): Record<string, string> {
  const m: Record<string, string> = { title: '', parent: '' };
  if (!content || !content.startsWith('---')) return m;
  const end = content.indexOf('---', 3);
  if (end < 0) return m;
  content.substring(3, end).trim().split('\n').forEach((l) => {
    const c = l.indexOf(':'); if (c < 0) return;
    m[l.substring(0, c).trim()] = l.substring(c + 1).trim();
  });
  return m;
}

export function getBody(content: string): string {
  if (!content || !content.startsWith('---')) return content || '';
  const end = content.indexOf('---', 3);
  return end < 0 ? content : content.substring(end + 3).trim();
}
