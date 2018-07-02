const express = require('express');
const config = require('./server/config');
const auth = require('./server/auth');

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

server.post('/authenticate', (req, res) => res
  .status(200).send(
    auth.auth(req.get('method'), req.get('payload'))
  )
);

server.post('/register', (req, res) => res
  .status(200).send(
    auth.reg(req.get('login'), req.get('password'))
  )
);

server.get('/*', (req, res) =>
  res.sendFile(publicPath +'/index.html')
);


// Start the server by listening on the default Heroku port
server.listen(process.env.PORT || 8080);
