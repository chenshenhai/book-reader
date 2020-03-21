import { viewConfig, viewSummary, viewSider } from './view';

const headerId = 'J_ViewHeader';
const leftId = 'J_ViewHeader_LeftBtnId';
const rightId = 'J_ViewHeader_RightBtnId';
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
      <span class="left-nav-btn" id="${leftId}"></span>
      <a class="header-home-btn" href="/" data-inner-page-path="Y">
        <span class="header-home-icon"></span>
        <span>${config.name}</span>
      </a>
      <span class="right-nav-btn" id="${rightId}"></span>
    </div>
  `;

  const $btnLeft = $header.querySelector(`#${leftId}`);
  const $btnRight = $header.querySelector(`#${rightId}`);

  $btnLeft.addEventListener('click', () => {
    viewSummary.show();
  });
  $btnRight.addEventListener('click', () => {
    viewSider.show();
  });

  hasInitedHeader = true;
}



export {
  initHeader,
}