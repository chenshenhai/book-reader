import marked from 'marked';
import highlight from 'highlight.js';
import { parseToInnerPath } from './url';

const mdRender = new marked.Renderer();
const imageSVG = `<svg t="1584022505113" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7962" width="200" height="200"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z" p-id="7963" fill="#bfbfbf"></path><path d="M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z" p-id="7964" fill="#bfbfbf"></path></svg>`;


mdRender.link = function (href, title, text) {
  href = parseToInnerPath(href);
  return `<a data-inner-page-path="Y" href="${href}" title="${title || ''}">${text || ''}</a>`;
}
mdRender.image = function (src, title, text) {
  return `
  <div data-image-lazy-src="${src}" data-image-lazy-status="none" title="${title || ''}" alt="${text || ''}">
    ${imageSVG}
  </div>`;
}
marked.setOptions({
  renderer: mdRender,
  highlight: function(code) {
    return highlight.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});


function decodeHTML(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  const text = div.innerText;
  return text;
}

function parseLazyImage(str) {
  const regImg = /(<|&lt;)img\s+src="(.*?)".*?(>|&gt;)/ig;
  const regSrc = /src="(.*?)"/ig;
  str = str.replace(regImg, (match) => {
    const result = regSrc.exec(match);
    const src = result[1] || '';
    return `
    <div data-image-lazy-src="${src}">${imageSVG}</div>
    `;
  });
  return str;
}

function compile(md) {
  // md = decodeHTML(md);
  md = decodeHTML(md);
  let html = marked(md);
  // html = parseLazyImage(html);
  return html;
}

export {
  compile
}