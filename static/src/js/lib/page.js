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
    html = parseLazyImage(html);
    $content.innerHTML = html;
  }
}

function parseLazyImage(html) {
  return html.replace(/<img\s+src="(.*?)".*?>/ig, (match) => {
    // let img = match.replace(/\s+src="/, ' data-lazy-image-src="');
    return `
    <svg t="1584022505113" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7962" width="200" height="200"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z" p-id="7963" fill="#bfbfbf"></path><path d="M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z" p-id="7964" fill="#bfbfbf"></path></svg>
    `;
  })
}

export {
  getPageMarkdown,
  getPageConfig,
  renderContent,
}