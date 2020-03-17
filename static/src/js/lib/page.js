import { viewConfig, viewSummary, viewContent, viewSider } from './view';

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
    viewConfig.setData(config);
  }
  renderContent(data.content);
  renderSummary(data.summary);
  renderSider(data.sider);
}



function flushPage(nextPagePath = '', prevPagePath = '') {
  let nextPaths = [];
  let prevPaths = [];
  if (typeof nextPagePath === 'string') {
    nextPagePath.replace(/^\//, '').replace(/\/$/, '').split('/');
  }
  if (typeof prevPagePath === 'string') {
    prevPaths = prevPagePath.replace(/^\//, '').replace(/\/$/, '').split('/');
  }

  const params = {};
  if (nextPaths[0] === prevPaths[0]) {
    params.summary = true;
  }
  
  // fetch(`/api${nextPagePath}?${url.mergeParams(params)}`, params).then((response) => {
  fetch(`/api${nextPagePath}`, params).then((response) => {
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