const path = require('path');
const Router = require('@koa/router');
const config = require('./../../config');
const Reader = require('./../lib/reader');
const timestamp = new Date().getTime();

function getPageConfig() {
  const pageConfig = {
    srcSite: config.srcSite,
    srcDev: config.srcDev,
    books: config.books,
  }
  return JSON.stringify(pageConfig);
}

const controller = {

  async renderHome(ctx, next) {
    const bookDir = path.join(config.baseDir, config.books[0] || '');
    const reader = new Reader({ bookDir });
    const readmeRs = reader.getReadme();
    const summaryRs = reader.getSummary();
    await ctx.render('index', {
      title: config.name,
      content: readmeRs.data,
      summary: summaryRs.data,
      sider: '',
      pageConfig: getPageConfig(),
      timestamp,
    });
  },

  async renderPage(ctx, next) {
    const ctxPath = ctx.path.replace(/^\//g, '').replace(/\/$/g, '').replace(/[\.]{2,}/ig, '');
    const pathParams = ctxPath.split('/');
    const bookName = pathParams[0] || '';
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
      content: result.data.content,
      summary: result.data.summary,
      sider: '',
      pageConfig: getPageConfig(),
      timestamp,
    });
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
    const result = reader.getPage(bookPagePath, { summary: ctx.query.summary === true });
    ctx.body = result;
  },
}


module.exports = controller;
