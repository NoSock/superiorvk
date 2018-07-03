const bodyParser = require('body-parser');
const router = require('express').Router({});

const auth = require('./auth');

router.use(bodyParser.json());


router.get('/test', (req, res) =>
  res.status(200).send('tested!' + JSON.stringify(req.query))
);

router.post('/register', async ({body: {login, password}}, res) => {
  const response = await auth.registerUser(login, password);
  res.status(200).send(response);
});

router.post('/authenticate', async ({body: {method, payload} }, res) => {
  const response = await auth.auth(method, payload);
  res.status(200).send(response);
});

module.exports = router;
