
const path = require('path');
const Router = require('@koa/router');
const config = require('./../config');
const Reader = require('./../server/lib/reader');
const router = new Router();

function getPageConfig() {
  const pageConfig = {
    srcSite: config.srcSite,
    srcDev: config.srcDev,
    books: config.books,
  }
  return JSON.stringify(pageConfig);
}


// TODO
router.get('/favicon.ico', (ctx, next) => {
  ctx.set('cache-control', `public, max-age=${24 * 60 * 60}`);
  ctx.body = '';
});

router.get('/', async (ctx, next) => {
  const bookDir = path.join(config.baseDir, config.books[0] || '');
  const reader = new Reader({ bookDir });
  const result = reader.getReadme();
  await ctx.render('index', {
    title: config.name,
    content: result.content,
    pageConfig: getPageConfig(),
  });
});

const paramCount = 6;
function loopRouterGet(count) {
  const limit = 10;
  config.books.forEach((bookName) => {
    for (let i = 1; i < count; i ++) {
      if (count > limit) {
        break;
      }
      const paramKeys = [];
      for (let j = 1; j < i + 1; j++) {
        paramKeys.push(`param${j}`);
      }
      const pagePath = `/${bookName}/:${paramKeys.join('/:')}`;
      router.get(pagePath, async (ctx, next) => {
        const ctxPath = ctx.path.replace(/[\.]{2,}/ig, '');
        const bookDir = path.join(config.baseDir, bookName);
        const reader = new Reader({ bookDir });
        const bookPagePath = ctxPath.replace(`/${bookName}/`, '/');
        const result = reader.getPage(bookPagePath);
        await ctx.render('index', {
          title: config.name,
          content: result.content,
          pageConfig: getPageConfig(),
        });
      });
    }
  });
}

loopRouterGet(paramCount);


module.exports = router;
