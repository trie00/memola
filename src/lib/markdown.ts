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

  // Callout block: header line "> [emoji] line1", continuation lines prefixed with "> "
  if (tag === 'div' && el.classList.contains('n365-callout')) {
    const ic = el.querySelector('.n365-callout-ic');
    const body = el.querySelector('.n365-callout-body');
    const emoji = ic ? (ic.textContent || '').trim() : '💡';
    const bodyMd = body ? Array.from(body.childNodes).map(domWalk).join('').replace(/^\n+|\n+$/g, '') : '';
    const lines = bodyMd.split('\n');
    let result = '\n> [' + emoji + '] ' + (lines[0] || '') + '\n';
    for (let k = 1; k < lines.length; k++) result += '> ' + lines[k] + '\n';
    return result;
  }

  // Todo txt span — just return textContent
  if (tag === 'span' && el.classList.contains('n365-todo-txt')) {
    return el.textContent || '';
  }

  const ch = Array.from(el.childNodes).map(domWalk).join('');
  if (tag === 'h1') return '\n# ' + ch.trim() + '\n';
  if (tag === 'h2') return '\n## ' + ch.trim() + '\n';
  if (tag === 'h3') return '\n### ' + ch.trim() + '\n';
  if (tag === 'p') {
    const trimmed = ch.trim();
    // Empty paragraph (typed by pressing Enter on a blank line) — preserve it
    if (!trimmed) return '\n<br>\n';
    return '\n' + trimmed + '\n';
  }
  // Skip emitting markers around empty/whitespace-only inline elements.
  // Browsers often leave behind <i></i>/<s></s> after applying then unapplying
  // formatting, which would otherwise produce ambiguous markdown like ~~* *~~.
  if (tag === 'strong' || tag === 'b') {
    return (el.textContent || '').trim() ? '**' + ch + '**' : ch;
  }
  if (tag === 'em' || tag === 'i') {
    return (el.textContent || '').trim() ? '*' + ch + '*' : ch;
  }
  if (tag === 's' || tag === 'del' || tag === 'strike') {
    return (el.textContent || '').trim() ? '~~' + ch + '~~' : ch;
  }
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
  if (tag === 'br')  return '  \n';
  if (tag === 'img') {
    const src = (el as HTMLImageElement).getAttribute('src') || '';
    const alt = (el as HTMLImageElement).getAttribute('alt') || '';
    return '![' + alt + '](' + src + ')';
  }
  if (tag === 'a')   return '[' + ch + '](' + (el.getAttribute('href') || '') + ')';
  // Plain <div> (no recognized class) = treat as paragraph block.
  // Chrome's contenteditable creates these on Enter when defaultParagraphSeparator
  // hasn't been set; older saves may still contain them.
  if (tag === 'div' && !el.className) {
    return '\n' + ch.trim() + '\n';
  }
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
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="n365-img">')
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

    // Empty paragraph marker (single <br> on a line, our serialization for blank paragraphs)
    if (ln.trim().match(/^<br\s*\/?>$/i)) {
      html += '<p><br></p>'; i++; continue;
    }

    // Todo: - [ ] or - [x]  (trailing space optional — tail trim of file may strip it)
    if (ln.match(/^- \[[ xX]\](\s|$)/)) {
      html += '<div class="n365-todo">';
      const checked = ln.charAt(3).toLowerCase() === 'x';
      const todotxt = ln.replace(/^- \[[ xX]\]\s?/, '');
      html += '<input type="checkbox" class="n365-todo-cb"' + (checked ? ' checked' : '') + '>';
      html += '<span class="n365-todo-txt' + (checked ? ' done' : '') + '">' + inline(todotxt) + '</span>';
      html += '</div>';
      i++; continue;
    }

    // Blockquote / callout
    if (ln.startsWith('> ')) {
      const firstLine = ln.slice(2);
      // Callout: > [emoji] text  (continuation lines: > more text, recursively parsed as md)
      const calloutMatch = firstLine.match(/^\[(.{1,4})\]\s*(.*)/);
      if (calloutMatch) {
        const calloutEmoji = calloutMatch[1];
        let calloutBody = calloutMatch[2] || '';
        i++;
        while (i < lines.length && lines[i].startsWith('> ')) {
          // Don't absorb another callout header
          if (/^\[.{1,4}\]\s*/.test(lines[i].slice(2))) break;
          calloutBody += '\n' + lines[i].slice(2); i++;
        }
        const bodyHtml = mdToHtml(calloutBody) || '<p><br></p>';
        html += '<div class="n365-callout"><span class="n365-callout-ic">' + esc(calloutEmoji) +
          '</span><div class="n365-callout-body">' + bodyHtml + '</div></div>';
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
      const cur = lines[i];
      // Two-space-trailing = markdown hard break (use unprintable sentinel that survives esc)
      if (cur.endsWith('  ')) para += cur.replace(/  +$/, '') + '';
      else para += cur + ' ';
      i++;
    }
    if (para.trim()) {
      const processed = inline(para.trim()).replace(//g, '<br>');
      html += '<p>' + processed + '</p>';
    }
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
