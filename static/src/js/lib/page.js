const dataContentId = '#J_DataContent';
const dataConfigId = '#J_DataConfig';

const pageContentId = '#J_PageContent';
const pageSummaryId = '#J_PageSummary';
const pageSiderId = '#J_PageSider';


function getPageConfig() {
  const $textarea = document.querySelector(dataConfigId);
  let config = {}
  if ($textarea) {
    let text = $textarea.innerHTML;
    try {
      config = JSON.parse(text);
    } catch (err) {
      console.log(err);
    }
  }
  return config;
}

function getPageMarkdown() {
  const $textarea = document.querySelector(dataContentId);
  let text = '';
  if ($textarea) {
    text = $textarea.innerHTML;
    text = text.trim();
    if (!(text && text.length > 0)) {
      text = '# 404 Not Found!'
    }
  }
  return text;
}

function renderContent(html) {
  const $content = document.querySelector(pageContentId);
  if ($content) {
    $content.innerHTML = html;
  }
}

function flushPage(nextPagePath, prevPagePath = '') {
  console.log(nextPagePath, prevPagePath);
  const nextPaths = nextPagePath.replace(/^\//, '').replace(/\/$/, '').split('/');
  const prevPaths = prevPagePath.replace(/^\//, '').replace(/\/$/, '').split('/');
  const params = {};
  if (nextPaths[0] === prevPaths[0]) {
    params.summary = false;
  }
  fetch(`/api${nextPagePath}`, params).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
  }).catch((err) => {
    console.log(err);
  });
}

export {
  getPageMarkdown,
  getPageConfig,
  renderContent,
  flushPage,
}