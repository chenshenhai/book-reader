import marked from 'marked';
import highlight from 'highlight.js';
import { getPageMarkdown, renderContent } from './page';
import './../css/index.less';

marked.setOptions({
  renderer: new marked.Renderer(),
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

function main() {
  const md = getPageMarkdown();
  const html = marked(md);
  renderContent(html);
}

main();

console.log('hello world');