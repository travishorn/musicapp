const Koa = require('koa');
const Router = require('koa-router');
const json = require('koa-json');

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 3000;

const api = new Router();

api.get('/', async (ctx) => {
  ctx.body = { msg: 'hello api' };
});

router.use('/api', json(), api.routes());

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port);
console.log(`Musicapp server listening on port ${port}.`);
