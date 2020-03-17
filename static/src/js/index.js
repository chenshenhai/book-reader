import { renderPage, flushPage } from './lib/page';
import { initRouter, registerPathListener } from './lib/router';
import './../css/index.less';

function main() {
  renderPage();
  initRouter();
  registerPathListener((params = {}) => {
    const { nextPagePath, prevPagePath } = params;
    flushPage(nextPagePath, prevPagePath);
  })
}

main();

console.log('hello world!');