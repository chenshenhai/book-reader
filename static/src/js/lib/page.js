import { compile } from './markdown';

const pageContentId = '#J_PageContent';
const pageSummaryId = '#J_PageSummary';
const pageSiderId = '#J_PageSider';

function renderContent(md = '') {
  const $content = document.querySelector(pageContentId);
  if ($content) {
    const html = compile(`${md || ''}`);
    $content.innerHTML = html;
  }
}

function renderSummary(md = '') {
  const $summary = document.querySelector(pageSummaryId);
  if ($summary) {
    const html = compile(`${md || ''}`);
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const links = document.createElement('a[data-inner-page-path="Y"]');

    // TODO
    for (let i = 0; i<links.length; i++) {
      const link = links[i];
    }

    const uls = temp.children;
    const list = [];
    if (uls && uls.length > 0) {
      for (let i = 0; i<uls.length; i++) {
        const ul = uls[i];
        if (ul.tagName === 'UL') {
          list.push(`<ul>${ul.innerHTML}</ul>`);
        }
      }
    }
    const str = list.join(' ');
    $summary.innerHTML = str;
  }
}

function renderSider(md = '') {
  const $sider = document.querySelector(pageSiderId);
  if ($sider) {
    const html = compile(`${md || ''}`);
    $sider.innerHTML = html;
  }
}


function renderPage(data = { content: '', summary: '', sider: '' }) {
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
  renderContent,
  renderSummary,
  renderSider,
  flushPage,
}