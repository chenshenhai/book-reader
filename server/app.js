
const path = require('path');
const Koa = require('koa');
const render = require('koa-ejs');
const koaStatic = require('./middleware/static');
const config = require('./../config');
const router = require('./router');
const { pathKeyworks } = require('./lib/setting');
const app = new Koa();

config.books.forEach((name) => {
  if (pathKeyworks.indexOf(name) >= 0) {
    throw Error(`config.books[]: "${name}" is keyword!`);
  }
})

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