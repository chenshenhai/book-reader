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
      <div class="sider-issue">
        <a class="issue-link" href="${config.issueUrl}" target="_blank">
          反馈问题 >
        </a>
      </div>
      <div class="sider-wechat">
        <div class="wechat-title" >
          微信公众号
        </div>
        <div class="wechat-qrcode">
          <img src="${config.contact.wechat}" />
        </div>
      </div>
      
    </div>
  `;

  hasInitedSider = true;
}



export {
  initSider,
}