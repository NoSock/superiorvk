//Install express server
const express = require('express');
const path = require('path');
const publicPath = __dirname + '/dist/superiorvk';

const app = express();

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

app.use(forceSSL());

// Serve only the static files form the dist directory
app.use(express.static(publicPath));

app.get('/*', function (req, res) {
  res.sendFile(publicPath +'/index.html');
});



// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
