import { getPageConfig } from './page';

let hasInitedRouter = false;
let hasInitedProxyLink = false;
let hasInitedHistoryListener = false;
let hasRegisteredPathChange = false;

const config = getPageConfig();
const regSrcBaseUrl = RegExp(`^${config.srcSite}\/${config.srcDev}`, 'i');

function getUrlPath(url) {;
  let pagePath = url.replace(/^https\:\/\//, '').replace(/^http\:\/\//, '').replace(/^\/\//, '').replace(/^www./).replace(regSrcBaseUrl, '');
  return pagePath;
}

function initHistoryListener() {
  if (hasInitedHistoryListener !== true) {
    const watcher = function(type) {
      const evenEntity = history[type];
      return function() {
        var registerFunc = evenEntity.apply(this, arguments);
        var e = new Event(type);
        e.__$arguments = arguments;
        window.dispatchEvent(e);
        return registerFunc;
      };
    };
    history.pushState = watcher('pushState');
    history.replaceState = watcher('replaceState');
    hasInitedHistoryListener = true;
  } else {
    console.warn('initHistoryListener: has inited!');
  }
}

function registerPathListener(callback) {
  if (hasRegisteredPathChange !== true) {
    window.addEventListener('pushState', () => {
      callback();
    })
    window.addEventListener('replaceState', () => {
      callback();
    })
    window.addEventListener('popstate', function(event) {
      callback();
    })
  } else {
    console.warn('registerPathListener: has inited!');
  }
}

function isInnerPageUrl(url) {
  let result = false;
  if (url.startsWith('//') || url.startsWith('https://') || url.startsWith('http://')) {
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

function linkEvent(a) {
  const href = a.getAttribute('href');
  const isInnerPage = isInnerPageUrl(href);
  if (isInnerPage === true) {
    const path = getUrlPath(href);
    history.pushState({
      path,
      timestamp: new Date().getTime(),
    }, '', path);
  } else {
    window.open(href);
  }
}

function initProxyLink() {
  if (hasInitedProxyLink !== true) {
    const $body = document.querySelector('body');
    $body.addEventListener('click', (event) => {
      if (event.target.tagName.toLocaleLowerCase() === 'a') {
        event.preventDefault();
        event.stopPropagation();
        linkEvent(event.target);
      }
    });
    hasInitedProxyLink = true;
  } else {
    console.warn('initProxyLink: has inited!');
  }
}

function initRouter() {
  if (hasInitedRouter !== true) {
    initProxyLink();
    initHistoryListener();
    hasInitedRouter = true;
  } else {
    console.warn('initRouter: has inited!');
  }
}


export {
  initRouter,
  registerPathListener,
}