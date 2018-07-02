const express = require('express');


const publicPath = __dirname + '/dist/superiorvk';

const server = express();

const forceSSL = () =>
  (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  };

server.use(forceSSL());

// Serve only the static files form the dist directory
server.use(express.static(publicPath));

server.get('/*', function (req, res) {
  res.sendFile(publicPath +'/index.html');
});



// Start the server by listening on the default Heroku port
server.listen(process.env.PORT || 8080);
