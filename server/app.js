const Koa = require('koa');
const app = new Koa();

app.use((ctx) => {
  ctx.body = 'hello book-reader';
});

function startAsync() {
  app.listen(3001, () => {
    console.log('the server is start')
  })
}

module.exports = {
  startAsync,
}