import './toast.less';

class Toast {
  /**
   * @param {*} opts 
   * opts.type {string} "loading"
   */
  constructor(opts = {}) {
    this.__opts = opts;
    this.__uuid = Math.random().toString(26).substr(2);
    this.__$container = undefined;
    this.__$text = undefined;
  }

  show(text) {
    if (this.__$text) {
      this.__$text.innerText = text;
      if (this.__$container) {
        this.__$container.classList.add('toast-status-show')
      }
      return;
    }
    this.__render();
    this.__$text.innerText = text;
  }

  hide() {
    if (this.__$container) {
      this.__$container.classList.remove('toast-status-show')
    }
  }

  __render() {
    if (this.__$container) {
      return;
    }
    const opts = this.__opts || {};
    const { type = ''} = opts;
    const domId = `J_Toast_${this.__uuid}`;
    const textId = `J_ToastText_${this.__uuid}`;
    const $body = document.querySelector('body');
    const html = `
      <div class="page-util-toast toast-status-show" id="${domId}">
        <div class="page-util-toast-mask"></div>
        <div class="page-util-toast-container" >
          <div class="page-util-toast-content" >
            <div class="page-util-toast-main" >
              <div class="page-util-toast-text toast-type-${type}" id="${textId}"></div>
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