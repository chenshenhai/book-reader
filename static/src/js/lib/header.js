import { viewConfig } from './view';

const headerId = 'J_ViewHeader';
let hasInitedHeader = false;


function initHeader() {
  if (hasInitedHeader === true) {
    console.warn('initHeader: has inited!');
    return;
  }
  const config = viewConfig.getData();
  const $header = document.querySelector(`#${headerId}`);
  $header.innerHTML = `
    <div class="header-container">
      <span class="summary-nav-btn"></span>
      <a class="header-home-btn" href="/" data-inner-page-path="Y">
        <span class="header-home-icon"></span>
        <span>${config.name}</span>
      </a>
      <span class="sider-nav-btn"></span>
    </div>
  `;

  hasInitedHeader = true;
}



export {
  initHeader,
}