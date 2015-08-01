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

app.listen(8080, function(err) {
  if (err)
    return console.log(err);
  console.log('running on localhost:8080');
});