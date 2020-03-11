
const path = require('path');
const Koa = require('koa');
const render = require('koa-ejs');
const Router = require('@koa/router');
const koaStatic = require('./middlewares/static');
const config = require("./../config");

const app = new Koa();
const router = new Router();

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  // debug: true
});

app.use(koaStatic(
  path.join(__dirname , '..', 'static'),
  {
    prefix: '/dist/'
  }
));
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'my-title',
    name: JSON.stringify(config),
  });
});

app.use(router.routes());


function startAsync() {
  app.listen(config.port, () => {
    console.log('the server is start')
  })
}

module.exports = {
  startAsync,
}