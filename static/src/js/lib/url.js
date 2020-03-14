import { getPageConfig } from './page';
const config = getPageConfig();

function parseToInnerUrl(url) {
  
}

function isInnerPageUrl(url) {
  let result = false;
  if (/^\/[0-9a-zA-Z\_\-]{1,}/.test(url)) {
    result = true;
  } else if (url.startsWith('//') || url.startsWith('https://') || url.startsWith('http://')) {
    let baseUrl = url.replace(/^https\:\/\//, '').replace(/^http\:\/\//, '').replace(/\/\//, '').replace(/^www./);
    baseUrl = baseUrl.split('?')[0] || '';
    const itemList = baseUrl.split('/');
    const site = itemList[0];
    const dev = itemList[1];
    const book = itemList[2];
    if ([config.srcSite].indexOf(site) >= 0 && config.srcDev === dev && config.books.indexOf(book) >= 0) {
      if (url.endsWith('.md') || itemList.length === 3) {
        result = true;
      }
    }
  }
  return result;
}

export {
  isInnerPageUrl
}