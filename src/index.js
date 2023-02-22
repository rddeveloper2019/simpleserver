const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('*', function (req, res) {
  res.status(200);
  res.send(JSON.stringify({ message: 'Success' }));
});

app.post('*', function (req, res) {
  res.status(200);
  res.send(JSON.stringify({ message: 'Success' }));
});

app.listen(3000, () => {
  console.log('Server run on http://localhost:3000');
});
