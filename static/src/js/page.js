const textDomId = '#J_PageMarkdown';
const contentId = '#J_PageContent';

function getPageMarkdown() {
  const $textarea = document.querySelector(textDomId);
  let text = '';
  if ($textarea) {
    text = $textarea.innerHTML;
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
  renderContent,
}