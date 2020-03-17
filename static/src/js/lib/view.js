import { ViewBase } from './base';
import { viewConfig } from './config';
import { compile } from './markdown';


const viewContent = new ViewBase({
  dataId: '#J_DataContent',
  viewId: '#J_ViewContent',
  dataType: 'string',
  compiler(md) {
    const html = compile(`${md || ''}`);
    return html;
  }
});

const viewSummary = new ViewBase({
  dataId: '#J_DataSummary',
  viewId: '#J_ViewSummary',
  dataType: 'string',
  compiler(md) {
    const config = viewConfig.getData();
    const html = compile(`${md || ''}`);
    const temp = document.createElement('div');
    temp.innerHTML = html;

    const links = temp.querySelectorAll('a[data-inner-page-path="Y"]');
    for (let i = 0; i<links.length; i++) {
      const link = links[i];
      let href = link.getAttribute('href');
      if (typeof href === 'string' && href) {
        href = href.replace(/\.md$/, '');
        link.setAttribute('href', `/${config.currentBook || ''}/${href}`)
      }
    }

    const uls = temp.children;
    const list = [];
    if (uls && uls.length > 0) {
      for (let i = 0; i<uls.length; i++) {
        const ul = uls[i];
        if (ul.tagName === 'UL') {
          list.push(`<ul>${ul.innerHTML}</ul>`);
        }
      }
    }
    const str = list.join(' ');
    return str;
  }
});

const viewSider = new ViewBase({
  dataId: '#J_DataSider',
  viewId: '#J_ViewSider',
  dataType: 'string',
  compiler(md) {
    const html = compile(`${md || ''}`);
    return html;
  }
});

export {
  viewConfig,
  viewContent,
  viewSummary,
  viewSider,
}