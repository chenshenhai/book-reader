import { renderPage, flushPage } from './lib/page';
import { initRouter, registerPathListener } from './lib/router';
import { initHeader } from './lib/header';
import { initSider } from './lib/sider';
import { initLazyImageEvent } from './lib/image';
import './../css/index.less';

function main() {
  renderPage();
  initHeader();
  initSider();
  initLazyImageEvent();
  initRouter();
  registerPathListener((params = {}) => {
    const { nextPagePath, prevPagePath } = params;
    flushPage(nextPagePath, prevPagePath);
  });
  
}

main();

console.log('hello world!');