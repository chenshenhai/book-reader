
const path = require('path');
const Koa = require('koa');
const render = require('koa-ejs');
const koaStatic = require('./middlewares/static');
const config = require('./../config');
const router = require('./router');
const app = new Koa();

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  // debug: true
});
app.use(koaStatic(
  path.join(__dirname , '..', 'static'), {
    prefix: '/dist/',
    maxAge: process.env.NODE_ENV !== 'production' ? -1 : 365 * 24 * 60 * 60 * 1000
  }
));
app.use(router.routes());

function startAsync() {
  app.listen(config.port, () => {
    console.log(`the server is start prot: ${config.port}`)
  })
}

module.exports = {
  startAsync,
}