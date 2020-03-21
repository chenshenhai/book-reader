const path = require('path');
// const Router = require('@koa/router');
const send = require('koa-send')
const config = require('./../../config');
const Reader = require('./../lib/reader');
const timestamp = new Date().getTime();
const maxAge = 365 * 24 * 60 * 60 * 1000

function getPageConfig(currentBook = '', opts = {}) {
  const { stringify } = opts;
  const pageConfig = {
    name: config.name,
    srcSite: config.srcSite,
    srcDev: config.srcDev,
    books: config.books,
    currentBook,
    avatar: config.avatar,
    contact: {
      github: config.contact.github,
      wechat: config.contact.wechat,
    }
  }
  let result = pageConfig
  if (stringify === true) {
    result = JSON.stringify(pageConfig);
  }
  return result;
}

const controller = {

  async renderHome(ctx, next) {
    const bookDir = path.join(config.baseDir, config.books[0] || '');
    const reader = new Reader({ bookDir });
    const readmeRs = reader.getReadme();
    const summaryRs = reader.getSummary();
    await ctx.render('index', {
      title: config.name,
      headInjects: config.pageHeadInjects.join('\r\n'),
      content: readmeRs.data,
      summary: summaryRs.data,
      sider: '',
      config: getPageConfig(config.books[0], { stringify: true }),
      timestamp,
    });
  },

  async renderPage(ctx, next) {
    const ctxPath = ctx.path.replace(/^\//g, '').replace(/\/$/g, '').replace(/[\.]{2,}/ig, '');
    const pathParams = ctxPath.split('/');
    const bookName = pathParams[0] || '';
    if (/\.(jpg|png|jpeg|gif)$/i.test(ctx.path)) {
      ctx.set('cache-control', `public, max-age=${maxAge}`);
      await send(ctx, ctx.path, {
        root: path.join(config.baseDir)
      })
    } else {
      const bookDir = path.join(config.baseDir, bookName);
      const reader = new Reader({ bookDir });
      pathParams.shift();
  
      let bookPagePath = 'README';
      if (pathParams.length > 0) {
        bookPagePath = pathParams.join('/');
      }
      const result = reader.getPage(bookPagePath, { summary: true });
      await ctx.render('index', {
        title: config.name,
        headInjects: config.pageHeadInjects.join('\r\n'),
        content: result.data.content,
        summary: result.data.summary,
        sider: '',
        config: getPageConfig(bookName, { stringify: true }),
        timestamp,
      });
    }
    
  },

  async apiPage(ctx, next) {
    const ctxPath = ctx.path.replace(/^\/api\//g, '').replace(/\/$/g, '').replace(/[\.]{2,}/ig, '');
    const pathParams = ctxPath.split('/');
    const bookName = pathParams[0] || '';
    const bookDir = path.join(config.baseDir, bookName);
    const reader = new Reader({ bookDir });
    pathParams.shift();
    let bookPagePath = 'README';
    if (pathParams.length > 0) {
      bookPagePath = pathParams.join('/');
    }
    const result = reader.getPage(bookPagePath, { summary: ctx.query.summary === 'true' });
    const apiResult = {
      success: result.success,
      data: {
        content: result.data.content,
        summary: result.data.summary,
        sider: null,
        config: getPageConfig(bookName, {}),
        timestamp,
      }
    }
    ctx.body = apiResult;
  },

}


module.exports = controller;
