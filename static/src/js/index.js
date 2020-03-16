import { getPageData } from './lib/data';
import { renderPage, flushPage } from './lib/page';
import { initRouter, registerPathListener } from './lib/router';
import './../css/index.less';

function main() {
  const data = getPageData();
  renderPage(data);
  initRouter();
  registerPathListener((params = {}) => {
    const { nextPagePath, prevPagePath } = params;
    flushPage(nextPagePath, prevPagePath);
  })
}

main();

console.log('hello world!');