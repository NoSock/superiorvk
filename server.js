const express = require('express');

const router = require('./server/router');

const staticPath = __dirname + '../dist/superiorvk';
const server = express();

//server.use(forceSSL);
server.use('/api', router);
server.use(express.static(staticPath));
server.get('/*', (req, res) => res
  .sendFile(staticPath + '/index.html')
);

// Start the server by listening on the default Heroku port
server.listen(process.env.PORT || 8080);
//
// const db = require('./server/db');
// (async () => {
//   await db.loginById('49a46903-76cd-4e45-b743-e572e087cca2').then(console.log);
//   await db.loginById('49a46903-76cd-4e45-b743-e572e087cca3').then(console.log);
//   await db.loginById('49a46903-76cd-4e45-b743-e572e087cca4').then(console.log);
//   await db.idByLogin('c').then(console.log);
//   await db.idByLogin('d').then(console.log);
//   await db.idExists('49a46903-76cd-4e45-b743-e572e087cca2').then(console.log);
//   await db.idExists('49a46903-76cd-4e45-b743-e572e087cca3').then(console.log);
//   await db.idExists('49a46903-76cd-4e45-b743-e572e087cca4').then(console.log);
// })();

function forceSSL (req, res, next) {
  if (!req.secure) {
    return res.redirect(
      ['https://', req.get('Host'), req.url].join('')
    );
  }
  next();
}
