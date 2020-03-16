// import url from './url';
const dataContentId = '#J_DataContent';
const dataSummaryId = '#J_DataSummary';
const dataConfigId = '#J_DataConfig';


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

function getPageContent() {
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


function getPageSummary() {
  const $textarea = document.querySelector(dataSummaryId);
  let text = '';
  if ($textarea) {
    text = $textarea.innerHTML;
    text = text.trim();
  }
  return text;
}


function getPageData() {
  const config = getPageConfig();
  const content = getPageContent();
  const summary = getPageSummary();
  return {
    config,
    content,
    summary,
  }
}

export {
  getPageData,
  getPageConfig,
  getPageContent,
  getPageSummary,
}