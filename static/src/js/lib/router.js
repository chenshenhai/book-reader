import { isInnerPageUrl, parseToInnerPath } from './url';

let hasInitedRouter = false;
let hasInitedProxyLink = false;
let hasInitedHistoryListener = false;
let hasRegisteredPathChange = false;

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



function linkEvent(a) {
  const href = a.getAttribute('href');
  const isInnerPage = isInnerPageUrl(href);
  if (isInnerPage === true) {
    const path = parseToInnerPath(href);
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
      const $link = event.target;
      if ($link.tagName.toLocaleLowerCase() === 'a' && $link.getAttribute('data-inner-page-path') === 'Y') {
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