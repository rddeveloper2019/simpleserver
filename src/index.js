const jsonServer = require('json-server');
const fs = require('fs');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
var resetDB = require('./resetDB.js');
let defaultResponse = require('./defaultResp.js');
let cookiesObj = require('./cookies.js');
let time = 0;
let resetTimer = null;

function writeCookiesFile({ cookies = null }) {
  const resetMode = cookies === null;
  cookiesObj = resetMode ? {} : { ...cookiesObj, ...cookies };
  var data = 'module.exports =' + JSON.stringify(cookiesObj) + ';';
  fs.writeFile('src/cookies.js', data, (err) => {
    if (err) {
      console.log('err:');
      console.log(err);
    } else {
      resetMode
        ? console.log('cookies reset success')
        : console.log('cookies updated');
    }
  });
}

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
  time = 7;
  restartResetTimer();
  console.log({ metod: req.method, url: req.url });
  if (req.method == 'POST' && req.url === '/cookies') {
    var newCookies = req.body;
    writeCookiesFile({ cookies: newCookies });
  }

  if (req.url === '/reset') {
    writeCookiesFile({ cookies: null });
    resetData();
  }
 
  Object.keys(cookiesObj).forEach((key) => {
    res.cookie(key, cookiesObj[key], { httpOnly: true });
  });

  next();
});

server.get('/reset', (req, res) => {
  res.send('Data Reset SUCCESS');
});
server.post('/defaultData', (req, res) => {
 
  res.send(JSON.stringify(defaultResponse))
})
server.get('/defaultData', (req, res) => {
  
  res.send(JSON.stringify(defaultResponse))
})
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running http://localhost:3000');
});
