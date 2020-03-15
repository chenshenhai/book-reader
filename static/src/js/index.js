import { getPageContent } from './lib/data';
import { renderPage, flushPage } from './lib/page';
import { initRouter, registerPathListener } from './lib/router';
import { compile } from './lib/markdown';
import './../css/index.less';

function main() {
  const md = getPageContent();
  renderPage({
    content: md,
  });
  initRouter();
  registerPathListener((params = {}) => {
    const { nextPagePath, prevPagePath } = params;
    flushPage(nextPagePath, prevPagePath);
  })
}

main();

console.log('hello world!');