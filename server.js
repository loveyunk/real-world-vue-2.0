// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const pause = require('connect-pause');

server.use(middlewares);
server.use(pause(1000));
server.use(router);

router.render = (req, res) => {
  res.jsonp({
    data: res.locals.data,
    status: {
      code: 0,
      message: ''
    }
  });
};

server.listen(3000, () => {
  console.log('JSON Server is running');
});
