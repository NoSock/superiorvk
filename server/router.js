const bodyParser = require('body-parser');
const router = require('express').Router({});

const auth = require('./auth');

router.use(bodyParser.json());


//open auth methods
router.post('/register', wrap(auth.perform('register')) );
router.post('/authenticate', wrap(auth.perform('authenticate')) ) ;

//secure methods for authorized users only
router.use('/secure', auth.jwtMiddleware);
//an endpoint to test the token, will be rejected by the middlleware if something goes wrong
router.get('/secure/test', (req, res) =>
  res.status(200).send({auth: true})
);

module.exports = router;

function wrap(handler) {
  return async (req, res) => {
    try {
      await handler(req, res)
    } catch (e) {
      console.error(`Error trying to ${req.method} ${req.originalUrl}`);
      console.error(e);
      res.status(500).send('Server error');
    }
  };
}
