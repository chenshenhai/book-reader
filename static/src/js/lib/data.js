// import url from './url';
const dataContentId = '#J_DataContent';
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


export {
  getPageConfig,
  getPageContent
}