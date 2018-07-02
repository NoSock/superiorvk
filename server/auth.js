'use strict'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('./db');
const secret = require('./config').JWTSecret;

function generateUserToken(userId) {
  return jwt.sign(
    {
      userId,
      timestamp: Date.now()
    },
    secret,
    {expiresIn: '7d'}
  );
}

function decodeUserToken(token) {
  let result;
  try{
    result = jwt.verify(token, secret);
  } catch (e) {
    console.log(e);
  }
  return result;
}

function renewUserToken(token) {
  let userId = decodeUserToken(token);
  if (userId) {
    return generateUserToken(userId);
  }
}

const generateUserId = () => {
  let id;
  do {
    id = uuid();
  } while (db.users[id]);
  return id;
};

const vkAuth = (token) => {
  return {
    auth: false,
    error: 'Not implemented yet'
  }
};

const hash = (password) => bcrypt.hashSync(password, 8);

const passHashAuth = (login, password) => {
  const user = db.credentials[login];
  if (!user || hash(password) !== user.passHash) {
    return {
      auth: false,
      error: 'Wrong login or password supplied'
    };
  }
  else return {
    auth: true,
    id: user.id,
    token: generateUserToken(user.id)
  };
};

const jwtAuth = (token) => {
  const result = decodeUserToken(token);
  if (token.id && users[token.id]) {
    result.auth = true;
    //if the token is more than 24 hours old refresh it
    if (Date.now() - result.timestamp > 1000*39600*24) {
      result.token = generateUserToken(token.id);
    }
  } else {
    result.error = 'Token invalid or expired!';
    result.auth = false;
  }
  return result;
};

const authMethods = {
  vk: vkAuth(token),
  jwt: jwtAuth(token),
  password: passHashAuth(login, passHash)
};

const auth = (method, payload) => {
  if (!authMethods[method]) {
    throw new Error(`Invalid auth method: &{method}`);
  } else {
    return authMethods[method](payload);
  }
};

const reg = (login, password) => {
  if (db.credentials[login]) {
    return {
      auth: false,
      error: 'The login is already taken!'
    };
  }
  const id = generateUserId();
  db.addUser(
    id,
    {
      credentials: {login, password}
    }
  );
  return {
    auth: true,
    id,
    token: generateUserToken(id)
  }
};

module.exports = {
  auth,
  reg
};
