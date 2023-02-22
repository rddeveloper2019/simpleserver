const express = require('express');
const cors = require('cors');
const app = express();

const response = {
  status: 200,
  data: {
    blockId: 1,
    status: { code: 'ok', message: null },
    supportedVersions: [
      8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
    ],
  },
  headers: {
    'cache-control': 'no-cache',
    'content-encoding': 'gzip',
    'content-type': 'application/json;charset=UTF-8',
    date: 'Tue, 21 Feb 2023 20:36:50 GMT',
    'access-control-allow-credentials': 'true',
    'access-control-allow-headers':
      'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Credentials, Access-Control-Allow-Methods, X-MAC-ADDRESS',
    'access-control-allow-methods': 'GET, POST, OPTIONS, PUT, DELETE',
    'access-control-allow-origin': 'file://',
    'content-type': 'application/json',
    date: 'Tue, 21 Feb 2023 20:36:50 GMT',
    'strict-transport-security': 'max-age=31536000',
     'x-oracle-dms-rid': 0,
    'x-robots-tag': 'noindex, nofollow',
    'strict-transport-security': 'max-age=31536000',
    vary: 'Accept-Encoding',
    'x-oracle-dms-ecid': 'dc7c05f3-a1c6-452f-a9b1-65bba9615c6f-0000b7c0',
   },
};



app.use(cors());

app.get('*', function (req, res) {
  res.status(200);
  res.send(JSON.stringify(response));
});

app.post('*', function (req, res) {
  res.status(200);
  res.send(JSON.stringify(response));
});

app.listen(3000, () => {
  console.log('Server run on http://localhost:3000');
});
