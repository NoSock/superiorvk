const express = require('express');
const cors = require('cors');

const router = require('./server/router');

const staticPath = __dirname + '/dist/superiorvk';

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  exposedHeaders: 'Authorization'
};

const server = express();

server.use(cors(corsOptions));
//server.use(forceSSL);
server.use('/api', router);
server.use(express.static(staticPath));
server.get('/*', (req, res) => res
  .sendFile(staticPath + '/index.html')
);

// Start the server by listening on the default Heroku port
server.listen(process.env.PORT || 8080);

function forceSSL (req, res, next) {
  if (!req.secure) {
    return res.redirect(
      ['https://', req.get('Host'), req.url].join('')
    );
  }
  next();
}
