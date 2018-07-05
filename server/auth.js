'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');

const db = require('./db');
const secret = require('./config').JWTSecret;

const actions = {
  register: {
    name: 'Registration',
    methods: {
      password: passwordReg,
      //vk: vkReg
    }
  },
  authenticate: {
    name: 'Authentication',
    methods: {
      password: passwordAuth,
      //vk: vkAuth
    }
  }
};

function generateUserToken(id) {
  return jwt.sign(
    {
      id
    },
    secret,
    {expiresIn: '7d'}
  );
}

async function generateUserId() {
  let id;
  do {
    id = uuid();
  } while (await db.idExists(id));
  return id;
}

async function passwordReg(req, res) {
  const {login, password} = req.body;

  if (!login || !password) {
    res.status(400).send({
      auth: false,
      error: 'Credentials invalid or incomplete'
    });
    return;
  }

  if (await db.idByLogin(login)) {
    res.status(400).send({
      auth: false,
      error: 'Login already taken'
    });
    return;
  }

  const id = await generateUserId();
  await db.addUser(id, login, password);

  res.set({Authorization: generateUserToken(id)});
  res.status(200).send({auth: true});

}

async function passwordAuth(req, res, payload) {
  const {login, password} = payload;

  if (!login || !password) {
    res.status(400).send({
      auth: false,
      error: 'Credentials invalid or incomplete'
    });
    return;
  }

  const id = await db.idByLogin(login);

  if (!id ||
    !bcrypt.compareSync(password, await db.passwordByLogin(login))
  ) {
    res.status(400).send({
      auth: false,
      error: 'Wrong login or password'
    });
    return;
  }

  const token = generateUserToken(id);

  res.set('Authorization', `Bearer ${token}`);
  res.status(200).send({auth: true});
}

function actionHandler(action) {
  return async(req, res) => {
    const {method, payload} = req.body;
    const handler = action.methods[method];

    if(!handler) {
      res.status(400).send(`${action.name} method ${method} is not allowed`);
    } else {
      handler(req, res, payload);
    }
  }
}

function perform(actionName) {
  const action = actions[actionName];
  if (!action) throw new Error(`Auth action ${actionName} does not exist`);
  return actionHandler(action);
}

async function jwtMiddleware(req, res, next) {
  const authHeader = req && req.get('Authorization');
  const token = authHeader &&
    authHeader.split(' ')[0] === 'Bearer' &&
    authHeader.split(' ')[1];

  //the token generator will throw an error if the token is invalid or empty
  try {
    const {id, iat} = jwt.verify(token, secret);

    if (!await db.idExists(id)) throw new Exception('Invalid id in a valid token!');

    const inSixDays = Date.now() / 1000 + 6*24*3600;
    if (iat < inSixDays) {
      res.set({Authorization: `Bearer ${generateUserToken(id)}`});
    }

    next();
    return;

  } catch (e) {
    console.error(e);
  }

  // default fail message
  res.set({'WWW-Authenticate':'Please include a valid JWT in the Authentication - Bearer header.'});
  res.status(401).send('Your token is either incorrect, absent or expired. Please log in again.');
}

module.exports = {
  perform,
  jwtMiddleware,
};
