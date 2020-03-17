import { viewConfig, viewSummary, viewContent, viewSider } from './view';
import { mergeParams } from './url';

function renderContent(data) {
  if (data !== null) {
    viewContent.setData(data);
  }
  viewContent.render();
}

function renderSummary(data) {
  if (data !== null) {
    viewSummary.setData(data);
  }
  viewSummary.render();
}

function renderSider(data) {
  if (data !== null) {
    viewSider.setData(data);
  }
  viewSider.render();
}


function renderPage(data = { content: null, summary: null, sider: null, config: null,}) {
  if (data.config !== null) {
    viewConfig.setData(data.config);
  }
  renderContent(data.content);
  renderSummary(data.summary);
  renderSider(data.sider);
  pageScrollTop();
}


function pageScrollTop() {
  const $body = document.querySelector('body');
  if ($body) {
    $body.scrollTop = 0;
  }
}


function flushPage(nextPagePath = '', prevPagePath = '') {
  let nextPaths = [];
  // let prevPaths = [];
  const config = viewConfig.getData();
  if (typeof nextPagePath === 'string') {
    nextPaths = nextPagePath.replace(/^\//, '').replace(/\/$/, '').split('/');
  }

  const params = {};
  console.log(config.currentBook, nextPaths[0] );
  if (config.currentBook !== nextPaths[0]) {
    params.summary = true;
  }
  
  // if (nextPagePath === '/') {
  //   nextPagePath = `/${config.books[0]}`;
  // }
  // fetch(`/api${nextPagePath}?${url.mergeParams(params)}`, params).then((response) => {
  fetch(`/api${nextPagePath}?${mergeParams(params)}`).then((response) => {
    return response.json();
  }).then((json = {}) => {
    console.log(json);
    renderPage(json.data);
  }).catch((err) => {
    console.log(err);
  });
}

export {
  renderPage,
  flushPage,
}