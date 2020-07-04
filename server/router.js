const path = require('path');
const Router = require('@koa/router');
const send = require('koa-send');
const config = require('./../config');
const controller = require('./controller/index');
const router = new Router();


// TODO
router.get('/favicon.ico', async (ctx, next) => {
  ctx.set('cache-control', `public, max-age=${24 * 60 * 60 * 1000}`);
  await send(ctx, '/favicon.ico', {
    root: path.join(__dirname, 'public')
  })
});
router.get('/abs.txt', async (ctx, next) => {
  ctx.body = config.abs || '';
});

router.get('/', controller.renderHome);

const paramCount = 6;
function loopRouterGet(count) {
  const limit = 10;
  config.books.forEach((bookName) => {
    for (let i = 0; i < count; i ++) {
      if (count > limit) {
        break;
      }
      const paramKeys = [];
      for (let j = 1; j < i + 1; j++) {
        paramKeys.push(`param${j}`);
      }
      let pagePath = `/${bookName}`;
      if (Array.isArray(paramKeys) && paramKeys.length > 0) {
        pagePath = `/${bookName}/:${paramKeys.join('/:')}`;
      }
      router.get(pagePath, controller.renderPage);
      router.get(`/api${pagePath}`, controller.apiPage);
    }
  });
}
loopRouterGet(paramCount);


module.exports = router;
