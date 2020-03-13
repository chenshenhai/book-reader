import { getPageConfig } from './page';

const config = getPageConfig();
function isInnerPage(url) {
  let result = false;
  if (url.startsWith('//') || url.startsWith('https://') || url.startsWith('http://')) {
    let baseUrl = url.replace(/^https\:\/\//, '').replace(/^http\:\/\//, '').replace(/\/\//, '');
    baseUrl = baseUrl.split('?')[0] || '';
    const itemList = baseUrl.split('/');
    const site = itemList[0];
    const dev = itemList[1];
    const book = itemList[2];
    if ([config.srcSite, `www.${config.srcSite}`].indexOf(site) >= 0 && config.srcDev === dev && config.books.indexOf(book) >= 0) {
      if (url.endsWith('.md') || itemList.length === 3) {
        result = true;
      }
    }
  }
  return result;
}

function initProxyLink() {
  const $body = document.querySelector('body');
  $body.addEventListener('click', (event) => {
    if (event.target.tagName.toLocaleLowerCase() === 'a') {
      event.preventDefault();
      event.stopPropagation();
      linkEvent(event.target);
    }
  })
}

function linkEvent(a) {
  const href = a.getAttribute('href');
  console.log('isInnerPage = ', isInnerPage(href));
}

function initRouter() {
  initProxyLink();
}


export {
  initRouter
}