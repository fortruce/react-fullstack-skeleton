import express from 'express';

const app = express();

app.get('/api', (req, res) => {
  res.json({
    shouts: [
      'Hello World!',
      'This is React and Webpack...',
      'They make development fun',
      'Another shout'
    ]
  });
});

app.get('/api/test', (req, res) => {
  res.json({
    hello: "world"
  });
});

app.post('/api/test/test', (req, res) => {
  res.json({
    hello: "world'"
  });
});

app.listen(8080, function(err) {
  if (err)
    return console.log(err);
  console.log('running on localhost:8080');
});