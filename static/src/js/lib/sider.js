import { viewConfig } from './view';

const siderId = 'J_ViewSider';
let hasInitedSider = false;


function initSider() {
  if (hasInitedSider === true) {
    console.warn('initSider: has inited!');
    return;
  }
  const config = viewConfig.getData();
  const $sider = document.querySelector(`#${siderId}`);
  $sider.innerHTML = `
    <div class="sider-container">
      <div class="sider-avatar">
        <img src="${config.avatar}" />
      </div>
      <div class="sider-github">
        <a class="github-link" href="${config.contact.github}" target="_blank">
          ${config.srcDev}
        </a>
      </div>
      <div class="sider-wechat">
        <img src="${config.contact.wechat}" />
      </div>
    </div>
  `;

  hasInitedSider = true;
}



export {
  initSider,
}