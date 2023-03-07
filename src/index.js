const jsonServer = require('json-server');
const fs = require('fs');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
var resetDB = require('./resetDB.js');
let defaultResponse = require('./defaultResp.js');
let time = 0;
let resetTimer = null;

function resetData() {
  var data = JSON.stringify(resetDB);
  fs.writeFile('db.json', data, (err) => {
    if (err) {
      console.log('db.json reset err:');
      console.log(err);
    } else {
      console.log('db.json reset success');
    }
  });
}

function restartResetTimer() {
  if (!time) {
    return;
  }
  if (resetTimer) {
    clearTimeout(resetTimer);
  }
  console.log(`reset timer: reset data after ${time} min`);

  resetTimer = setTimeout(() => {
    writeCookiesFile({ cookies: null });
    resetData();
  }, time * 1000 * 60);
}

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  time = 10;
  restartResetTimer();
  next();
});

server.get('/reset', (req, res) => {
  res.send('<p>Data Reset SUCCESS</p><button><a href="/">НАЗАД</a></button> ');
  resetData();
});
server.post('/defaultData', (req, res) => {
  res.send(JSON.stringify(defaultResponse));
});
server.get('/defaultData', (req, res) => {
  res.send(JSON.stringify(defaultResponse));
});
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running http://localhost:3000');
});
