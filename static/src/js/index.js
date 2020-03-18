import { renderPage, flushPage } from './lib/page';
import { initRouter, registerPathListener } from './lib/router';
import { initLazyImageEvent } from './lib/image';
import './../css/index.less';

// TODO
import Toast from './util/toast';
const toast = new Toast();
toast.show('hello world');

function main() {
  renderPage();
  initLazyImageEvent();
  initRouter();
  registerPathListener((params = {}) => {
    const { nextPagePath, prevPagePath } = params;
    flushPage(nextPagePath, prevPagePath);
  });
}

main();

console.log('hello world!');