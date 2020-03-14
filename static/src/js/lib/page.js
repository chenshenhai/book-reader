const textDomId = '#J_PageMarkdown';
const contentId = '#J_PageContent';
const configId = '#J_PageConfig';


function getPageConfig() {
  const $textarea = document.querySelector(configId);
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
  const $textarea = document.querySelector(textDomId);
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
  const $content = document.querySelector(contentId);
  if ($content) {
    $content.innerHTML = html;
  }
}

export {
  getPageMarkdown,
  getPageConfig,
  renderContent,
}