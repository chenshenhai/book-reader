
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
    content: JSON.stringify(result),
    name: JSON.stringify(config.main),
  });
});

const paramCount = 4;
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
      // const bookName = ctx.params['param0'];
      // const bookDir = path.join(config.baseDir, config.main);
      // const reader = new Reader({ bookDir });
      // const result = reader.getReadme();
      await ctx.render('index', {
        title: 'my-title',
        content: JSON.stringify(ctx.params),
        name: JSON.stringify(config.main),
      });
    });
  }
}

loopRouterGet(paramCount);


module.exports = router;
