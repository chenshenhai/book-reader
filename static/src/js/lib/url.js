import { viewConfig } from './view';


function parseToInnerPath(url) {
  let pagePath = url;
  const config = viewConfig.getData();
  const regFullFile = new RegExp(`^${config.srcSite}\/${config.srcDev}\/(.*)\.md$`, 'i');
  const regSrcBaseUrl  = new RegExp(`^${config.srcSite}\/${config.srcDev}\/`, 'i');
  pagePath = pagePath.replace(/^https\:\/\//, '').replace(/^http\:\/\//, '').replace(/^\/\//, '').replace(/^www./)
  let bookName = config.currentBook || '';

  if (url.startsWith('./') === true && url.startsWith(`./${bookName}/`) !== true) {
    return pagePath.replace('./', `/${bookName}/`).replace(/\.md$/, '');
  } else if (regFullFile.test(pagePath)) {
    return pagePath.replace(regSrcBaseUrl, '/').replace('/blob/master/', '/').replace(/\.md$/, '');
  } else if (regSrcBaseUrl.test(pagePath)) {
    pagePath = pagePath.replace(regSrcBaseUrl, '/').replace(/\/$/, '');
    if (/^\/[0-9a-zA-Z\-\_]{1,}$/.test(pagePath)) {
      return pagePath;
    }
  }
  return url;
}

function isInnerPageUrl(url) {
  const config = viewConfig.getData();
  let result = false;
  let bookName = config.currentBook || '';
  if (url.startsWith('./') === true && url.startsWith(`./${bookName}/`) !== true) {
    result = true;
  } else if (/^\/[0-9a-zA-Z\_\-]{1,}/.test(url)) {
    result = true;
  }
  return result;
}

function mergeParams(params) {
  let keys = [];
  if (params) {
    keys = Object.keys(params);
  }
  let strList = [];
  keys.forEach((key) => {
    strList.push(`${key}=${params[key]}`);
  });
  const result = strList.join('&');
  return result;
}

export {
  isInnerPageUrl,
  parseToInnerPath,
  mergeParams,
}