'use strict'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');

const db = require('./db');
const secret = require('./config').JWTSecret;

function generateUserToken(id) {
  const res = jwt.sign(
    {
      id
    },
    secret,
    {expiresIn: '7d'}
  );
  return res;
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

const generateUserId = () => {
  return uuid();
};

const vkAuth = (token) => {
  return {
    auth: false,
    error: 'Not implemented yet'
  }
};

const hash = (password) => bcrypt.hashSync(password, 8);

async function passwordAuth( {login, password} ) {
  const storedHash = await db.passwordByLogin(login);
  const id = await db.idByLogin(login);
  if (!storedHash || !id || !bcrypt.compareSync(password, storedHash)) {
    return {
      auth: false,
      error: 'Wrong login or password supplied'
    };
  }
  else return {
    auth: true,
    id,
    token: generateUserToken(id)
  };
}

async function jwtAuth (token) {
  let {id, exp} = decodeUserToken(token) || {};
  const result = {};
  if (id && await db.idExists(id)) {
    result.auth = true;
    //if the token is more than 24 hours old refresh it
    const inSixDays = Date.now() / 1000 + 6*24*3600;
    if (exp < inSixDays) {
      result.token = generateUserToken(token.id);
    }
  } else {
    result.error = 'Token invalid or expired!';
    result.auth = false;
  }
  return result;
}

const authMethods = {
  vk: vkAuth,
  jwt: jwtAuth,
  password: passwordAuth
};

const auth = (method, payload) => {
  if (!authMethods[method]) {
    throw new Error(`Invalid auth method: ${method}`);
  } else {
    return authMethods[method](payload);
  }
};


async function registerUser (login, password) {
  const response = {};
  if (await db.idByLogin(login)) {
    response.auth = false;
    response.error = {
      code: 1,
      text: 'The login is taken'
    };
  } else if (!login || !password || typeof login !== 'string' ||
              typeof password !== 'string') {
    response.auth = false;
    response.error = {
      code: 2,
      text: 'The credentials are invalid or incomplete'
    };
  } else {
    const id = generateUserId();
    await db.addUser(id, login, bcrypt.hashSync(password, 8));
    response.auth = true;
    response.token = generateUserToken(id);
  }
  return response;
}

module.exports = {
  auth,
  registerUser,
};
