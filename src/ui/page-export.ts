// Markdown / HTML export for the currently-open page.
//
// The HTML export carries an inline copy of the editor's stylesheet so
// the resulting file is self-contained (no Memola runtime needed).
// The markdown export prepends a small YAML front-matter block with
// title / parent / exported date for round-trip-able archive purposes.

import { S } from '../state';
import { setLoad, toast } from './ui-helpers';
import { apiLoadRawBody } from '../api/pages';
import { mdToHtml } from '../lib/blocks-html';

function downloadFile(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: mime + ';charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function safeFilename(s: string): string {
  return s.replace(/[/\\?%*:|"<>]/g, '_').slice(0, 100) || 'untitled';
}

function exportCss(): string {
  return `
:root { color-scheme: light; }
body {
  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif;
  max-width: 720px; margin: 48px auto; padding: 0 24px;
  color: rgb(55, 53, 47); background: #fff; line-height: 1.6; font-size: 16px;
}
h1, h2, h3 { line-height: 1.3; margin: 1.2em 0 .3em; }
h1 { font-size: 2em; font-weight: 700; }
h2 { font-size: 1.5em; font-weight: 600; }
h3 { font-size: 1.25em; font-weight: 600; }
p { margin: .25em 0; }
ul, ol { padding-left: 1.6em; margin: .25em 0; }
li + li { margin-top: 4px; }
blockquote { border-left: 3px solid rgb(55, 53, 47); padding-left: .9em; opacity: .65; margin: .25em 0; }
hr { border: none; border-top: 1px solid rgba(55, 53, 47, .16); margin: 1em 0; }
pre {
  background: rgb(247, 246, 243); padding: 14px 16px; border-radius: 4px;
  font-family: "SFMono-Regular", Menlo, Consolas, "Liberation Mono", Courier, monospace;
  font-size: 85%; overflow-x: auto; white-space: pre; tab-size: 2; margin: .5em 0;
}
pre code { background: none; padding: 0; color: inherit; font-size: inherit; }
code {
  background: rgba(135, 131, 120, .2); padding: 2px 4px; border-radius: 3px;
  font-family: "SFMono-Regular", Menlo, Consolas, monospace; font-size: 85%; color: #eb5757;
}
strong { font-weight: 600; }
em { font-style: italic; }
s, del { text-decoration: line-through; opacity: .7; }
a { color: inherit; text-decoration: underline; opacity: .75; }
.memola-callout {
  display: flex; gap: 10px; background: rgb(241, 241, 239); border-radius: 4px;
  padding: 12px 16px; margin: .8em 0;
}
.memola-callout + .memola-callout { margin-top: .8em; }
.memola-callout-ic { font-size: 20px; flex-shrink: 0; line-height: 1.5; }
.memola-callout-body { flex: 1; min-width: 0; }
.memola-callout-body > p:first-child { margin-top: 0; }
.memola-callout-body > p:last-child  { margin-bottom: 0; }
.memola-todo { display: flex; align-items: flex-start; gap: 6px; margin: 4px 0; }
.memola-todo-cb { margin-top: 5px; width: 14px; height: 14px; flex-shrink: 0; accent-color: rgb(35, 131, 226); }
.memola-todo-txt { flex: 1; }
.memola-todo-txt.done { text-decoration: line-through; opacity: .4; }
`.replace(/\s+/g, ' ').trim();
}

function currentPage() {
  if (!S.currentId) return null;
  return S.pages.find((p) => p.Id === S.currentId) || null;
}

export async function exportMd(): Promise<void> {
  const page = currentPage();
  if (!page) return;
  if (page.Type === 'database') {
    toast('データベースはMD出力できません', 'err');
    return;
  }
  try {
    setLoad(true, 'エクスポート中...');
    const body = await apiLoadRawBody(page.Id);
    const today = new Date().toISOString().slice(0, 10);
    const fm = '---\ntitle: ' + (page.Title || '無題') + '\nparent: ' + (page.ParentId || '') +
      '\nexported: ' + today + '\n---\n\n';
    downloadFile(safeFilename(page.Title || '無題') + '.md', fm + body, 'text/markdown');
  } catch (err) {
    toast('MD出力失敗: ' + (err as Error).message, 'err');
  } finally {
    setLoad(false);
  }
}

export async function exportHtml(): Promise<void> {
  const page = currentPage();
  if (!page) return;
  if (page.Type === 'database') {
    toast('データベースはHTML出力できません', 'err');
    return;
  }
  try {
    setLoad(true, 'エクスポート中...');
    const md = await apiLoadRawBody(page.Id);
    const body = mdToHtml(md);
    const title = page.Title || '無題';
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const css = exportCss();
    const html =
      '<!DOCTYPE html>\n<html lang="ja">\n<head>\n' +
      '<meta charset="UTF-8">\n<title>' + esc(title) + '</title>\n' +
      '<style>' + css + '</style>\n' +
      '</head>\n<body>\n<h1>' + esc(title) + '</h1>\n' + body + '\n</body>\n</html>';
    downloadFile(safeFilename(title) + '.html', html, 'text/html');
  } catch (err) {
    toast('HTML出力失敗: ' + (err as Error).message, 'err');
  } finally {
    setLoad(false);
  }
}

export function printCurrent(): void {
  window.print();
}
