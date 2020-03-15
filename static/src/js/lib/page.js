const pageContentId = '#J_PageContent';
const pageSummaryId = '#J_PageSummary';
const pageSiderId = '#J_PageSider';

function renderContent(html) {
  const $content = document.querySelector(pageContentId);
  if ($content) {
    $content.innerHTML = html;
  }
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
  }).then((json) => {
    console.log(json);
  }).catch((err) => {
    console.log(err);
  });
}

export {
  renderContent,
  flushPage,
}