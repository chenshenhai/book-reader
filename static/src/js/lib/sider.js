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
        ${config.contact.github}
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