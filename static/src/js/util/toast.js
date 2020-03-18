import './toast.less';

class Toast {
  constructor() {
    this.__uuid = Math.random().toString(26).substr(2);
    this.__$container = undefined;
    this.__$text = undefined;
  }

  show(text) {
    if (this.__$text) {
      this.__$text.innerText = text;
      return;
    }
    this.__render();
    this.__$text.innerText = text;
  }

  hide() {

  }

  __render() {
    if (this.__$container) {
      return;
    }
    const domId = `J_Toast_${this.__uuid}`;
    const textId = `J_ToastText_${this.__uuid}`;
    const $body = document.querySelector('body');
    const html = `
      <div class="page-util-toast" id="${domId}">
        <div class="page-util-toast-mask"></div>
        <div class="page-util-toast-container" >
          <div class="page-util-toast-content" >
            <div class="page-util-toast-main" >
              <div class="page-util-toast-text" id="${textId}"></div>
            </div>
          </div>
        </div>
      </div>
    `
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const $container = temp.querySelector(`#${domId}`);
    const $text = temp.querySelector(`#${textId}`);
    this.__$container = $container;
    this.__$text = $text;
    $body.appendChild($container);
  }
}

export default Toast;