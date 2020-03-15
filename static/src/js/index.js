import { getPageContent } from './lib/data';
import { renderContent, flushPage } from './lib/page';
import { initRouter, registerPathListener } from './lib/router';
import { compile } from './lib/markdown';
import './../css/index.less';

function main() {
  const md = getPageContent();
  const html = compile(md);
  renderContent(html);
  initRouter();
  registerPathListener((params = {}) => {
    const { nextPagePath, prevPagePath } = params;
    flushPage(nextPagePath, prevPagePath);
  })
}

main();

console.log('hello world!');