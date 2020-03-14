import { getPageMarkdown, renderContent } from './lib/page';
import { initRouter, registerPathListener } from './lib/router';
import { compile } from './lib/markdown';
import './../css/index.less';

function main() {
  const md = getPageMarkdown();
  const html = compile(md);
  renderContent(html);
  initRouter();
  registerPathListener(() => {
    console.log('change: ', window.location.pathname);
  })
}

main();

console.log('hello world 444');