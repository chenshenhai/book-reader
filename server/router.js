
const path = require('path');
const Router = require('@koa/router');
const config = require('./../config');
const Reader = require('./../server/lib/reader');
const router = new Router();

router.get('/', async (ctx, next) => {
  const bookDir = path.join(config.baseDir, config.main);
  const reader = new Reader({ bookDir });
  const result = reader.getReadme();
  await ctx.render('index', {
    title: 'my-title',
    content: result.content,
  });
});

const paramCount = 6;
function loopRouterGet(count) {
  const limit = 10;
  for (let i = 0; i < count; i ++) {
    if (count > limit) {
      break;
    }
    const paramKeys = [];
    for (let j = 0; j < i + 1; j++) {
      paramKeys.push(`param${j}`);
    }
    const pagePath = `/:${paramKeys.join('/:')}`
    router.get(pagePath, async (ctx, next) => {
      const ctxPath = ctx.path.replace(/[\.]{2,}/ig, '');
      const bookName = ctx.params['param0'];
      const bookDir = path.join(config.baseDir, bookName);
      const reader = new Reader({ bookDir });
      const bookPagePath = ctxPath.replace(`/${bookName}/`, '/');
      const result = reader.getPage(bookPagePath);
      await ctx.render('index', {
        title: 'my-title',
        content: result.content,
      });
    });
  }
}

loopRouterGet(paramCount);


module.exports = router;
