
const path = require('path');
const Router = require('@koa/router');
const config = require('./../config');
const Reader = require('./../server/lib/reader');
const router = new Router();

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'my-title',
//     content: 'my-content',
//     name: JSON.stringify(config),
//   });
// });

router.get('/', async (ctx, next) => {
  const bookDir = path.join(config.baseDir, config.main);
  const reader = new Reader({ bookDir });
  const result = reader.getReadme();
  await ctx.render('index', {
    title: 'my-title',
    content: JSON.stringify(result),
    name: JSON.stringify(config),
  });
});


module.exports = router;
