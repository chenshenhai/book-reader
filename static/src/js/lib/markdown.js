import marked from 'marked';
import highlight from 'highlight.js';
import { parseToInnerPath } from './url';
import { viewConfig } from './view';

const mdRender = new marked.Renderer();
const imageSVG = `<svg t="1584626841313" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2609" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M938.666667 553.92V768c0 64.8-52.533333 117.333333-117.333334 117.333333H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V256c0-64.8 52.533333-117.333333 117.333334-117.333333h618.666666c64.8 0 117.333333 52.533333 117.333334 117.333333v297.92z m-64-74.624V256a53.333333 53.333333 0 0 0-53.333334-53.333333H202.666667a53.333333 53.333333 0 0 0-53.333334 53.333333v344.48A290.090667 290.090667 0 0 1 192 597.333333a286.88 286.88 0 0 1 183.296 65.845334C427.029333 528.384 556.906667 437.333333 704 437.333333c65.706667 0 126.997333 16.778667 170.666667 41.962667z m0 82.24c-5.333333-8.32-21.130667-21.653333-43.648-32.917333C796.768 511.488 753.045333 501.333333 704 501.333333c-121.770667 0-229.130667 76.266667-270.432 188.693334-2.730667 7.445333-7.402667 20.32-13.994667 38.581333-7.68 21.301333-34.453333 28.106667-51.370666 13.056-16.437333-14.634667-28.554667-25.066667-36.138667-31.146667A222.890667 222.890667 0 0 0 192 661.333333c-14.464 0-28.725333 1.365333-42.666667 4.053334V768a53.333333 53.333333 0 0 0 53.333334 53.333333h618.666666a53.333333 53.333333 0 0 0 53.333334-53.333333V561.525333zM320 480a96 96 0 1 1 0-192 96 96 0 0 1 0 192z m0-64a32 32 0 1 0 0-64 32 32 0 0 0 0 64z" p-id="2610" fill="#cdcdcd"></path></svg>`;


mdRender.link = function (href, title, text) {
  href = parseToInnerPath(href);
  return `<a data-inner-page-path="Y" href="${href}" title="${title || ''}">${text || ''}</a>`;
}
mdRender.image = function (src, title, text) {
  const config = viewConfig.getData();
  const currentBook = config.currentBook;
  if (src.startsWith('./') === true) {
    src = src.replace(/^\.\//, `/${currentBook}/`);
  }
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
  // md = decodeHTML(md);
  let html = marked(md);
  // html = parseLazyImage(html);
  return html;
}

export {
  compile
}