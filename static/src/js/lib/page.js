import { viewConfig, viewSummary, viewContent } from './view';
import { mergeParams } from './url';
// TODO
import Toast from './../util/toast';
const toast = new Toast({ type: 'loading' });

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


function renderPage(data = { content: null, summary: null, config: null,}) {
  if (data.config !== null) {
    viewConfig.setData(data.config);
  }
  renderContent(data.content);
  renderSummary(data.summary);
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
  if (config.currentBook !== nextPaths[0]) {
    params.summary = true;
  }
  
  toast.show('Loading ...');
  fetch(`/api${nextPagePath}?${mergeParams(params)}`).then((response) => {
    return response.json();
  }).then((json = {}) => {
    console.log(json);
    toast.hide();
    renderPage(json.data);
  }).catch((err) => {
    toast.hide();
    console.log(err);
  });
}

export {
  renderPage,
  flushPage,
}