import { viewConfig } from './view';


function parseToInnerPath(url) {
  let pagePath = url;
  const config = viewConfig.getData();
  const regSrcBaseUrl = new RegExp(`^${config.srcSite}\/${config.srcDev}\/`, 'i');
  const regFullFile = new RegExp(`^${config.srcSite}\/${config.srcDev}\/(.*)\.md$`, 'i');
  pagePath = pagePath.replace(/^https\:\/\//, '').replace(/^http\:\/\//, '').replace(/^\/\//, '').replace(/^www./)
  let bookName = config.currentBook || '';
  if (url.startsWith('./') === true && url.startsWith(`./${bookName}/`) !== true) {
    return pagePath.replace('./', `/${bookName}/`).replace(/\.md$/, '');
  } else if (regFullFile.test(pagePath)) {
    return pagePath.replace(regSrcBaseUrl, '/').replace('/blob/master/', '/').replace(/\.md$/, '');
  } else if (regSrcBaseUrl.test(pagePath)) {
    return pagePath.replace(regSrcBaseUrl, '/').replace('/blob/master/', '/').replace(/\.md$/, '');
  }
  return url;
}

function isInnerPageUrl(url) {
  const config = viewConfig.getData();
  let result = false;
  let bookName = config.currentBook || '';
  // TODO
  if (window.location.host.indexOf('127.0.0.1') < 0) {
    return false;
  }
  if (url.startsWith('./') === true && url.startsWith(`./${bookName}/`) !== true) {
    result = true;
  } else if (/^\/[0-9a-zA-Z\_\-]{1,}/.test(url)) {
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

// function mergeParams(params) {
//   let keys = [];
//   if (params) {
//     keys = Object.keys(params);
//   }
//   let strList = [];
//   keys.forEach((key) => {
//     strList.push(`${key}=${params[key]}`);
//   });
//   const result = strList.join('&');
//   return result;
// }

export {
  isInnerPageUrl,
  parseToInnerPath,
  // mergeParams,
}