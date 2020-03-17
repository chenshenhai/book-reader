class ViewBase {
  /**
   * @param {object} opts
   * opts.dataId {string}
   * opts.viewId? {string}
   * opts.dataType {string} default "string", "string"|"json" 
   * opts.compiler? {(str: string)=>string}
   */
  constructor(opts = {}) {
    const defaultOpts = {
      dataType: 'string',
      compiler: (str) => { return `${str || ''}` }
    }
    this._opts = {...defaultOpts, ...opts};
    
    const { dataId, viewId } = this._opts;
    this._data = null;
    this._$textarea = document.querySelector(dataId);
    this._$view = document.querySelector(viewId);
    // init data;
    this.getData();
  }

  getData() {
    const $textarea = this._$textarea;
    if (!$textarea) {
      return;
    }
    if (this._data !== null) {
      return this._data;
    }
    const { dataType } = this._opts;
    
    if ($textarea) {
      let data = $textarea.innerHTML;
      if (dataType === 'json') {
        data = JSON.parse(data);
      } else {
        data = `${data || ''}`;
      }
      this._data = data;
    }
  }

  setData(data) {
    const $textarea = this._$textarea;
    if (!$textarea) {
      return;
    }
    let _data = data;
    const { dataType } = this._opts;
    this._data = _data;
    let _text = this._data;
    if (dataType === 'json') {
      _text = JSON.stringify(this._data);
    }
    $textarea.innerHTML = `${_text}`;
  }

  render() {
    if (!this._$view) {
      return;
    }
    const { compiler } = this._opts;
    const html = compiler(this._data);
    this._$view.innerHTML = html;
  }
}

export { 
  ViewBase
}