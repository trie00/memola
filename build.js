const fs = require('fs');
const path = require('path');

const css = fs.readFileSync('src/css/app.css', 'utf8').trim();

const jsDir = 'src/js';
const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js')).sort();
let jsBody = jsFiles.map(f => fs.readFileSync(path.join(jsDir, f), 'utf8')).join('\n\n');

// Inject CSS (replace the single placeholder inside the function body)
jsBody = jsBody.replace("'<<N365_CSS>>'", JSON.stringify(css));

const funcSrc = 'function n365Bookmarklet() {\n' + jsBody + '\n}';
const url = 'javascript:void((' + encodeURIComponent(funcSrc) + ')())';

let html = fs.readFileSync('src/template.html', 'utf8');
html = html.replace(/\{\{BOOKMARKLET_URL\}\}/g, url);

fs.writeFileSync('install.html', html);
console.log('Built install.html (' + Math.round(html.length / 1024) + ' KB)');
