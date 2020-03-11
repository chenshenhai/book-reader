const path = require('path');
const Koa = require('koa');
const render = require('koa-ejs');
const koaStatic = require('./middlewares/static');
const app = new Koa();


app.use(koaStatic(
  path.join(__dirname , '..', 'static'),
  {
    prefix: '/dist/'
  }
))

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  // debug: true
});

app.use(async (ctx) => {
  if (ctx.path === '/') {
    await ctx.render('index', {
      title: 'my-title',
      name: 'my-name',
    });
  }
});

function startAsync() {
  app.listen(3001, () => {
    console.log('the server is start')
  })
}

module.exports = {
  startAsync,
}