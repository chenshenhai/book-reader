const path = require('path');
const Router = require('@koa/router');
const config = require('./../../config');
const Reader = require('./../lib/reader');
const router = new Router();

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
    const result = reader.getReadme();
    await ctx.render('index', {
      title: config.name,
      content: result.content,
      pageConfig: getPageConfig(),
    });
  },

  async renderPage(ctx, next) {
    const ctxPath = ctx.path.replace(/[\.]{2,}/ig, '');
    const pathParams = ctxPath.split('/');
    const bookName = pathParams[0] || '';
    const bookDir = path.join(config.baseDir, bookName);
    const reader = new Reader({ bookDir });
    const bookPagePath = ctxPath.replace(`/${bookName}/`, '/');
    const result = reader.getPage(bookPagePath);
    await ctx.render('index', {
      title: config.name,
      content: result.content,
      pageConfig: getPageConfig(),
    });
  }
}


module.exports = controller;
