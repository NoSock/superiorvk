const admin = require('firebase-admin');

const {serviceAccount, databaseUrl} = require('./config');

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount)),
  databaseURL: databaseUrl
});

const db = admin.database();
const usersRef = db.ref().child('users');

function get(child) {
  return usersRef.child(child).get();
}

function idByLogin(login) {
  return usersRef.child('ids')
    .orderByValue().equalTo(login).limitToFirst(1)
    .once('value').then(snap => snap.val()?
                        Object.keys(snap.val())[0]: false);
}

function passwordByLogin(login) {
  return usersRef.child('passwords')
    .orderByKey().equalTo(login).limitToFirst(1)
    .once('value').then(snap => snap.val() ?
      snap.val()[login] : false);
}

function loginById(id) {
  return usersRef.child('ids')
    .orderByKey().equalTo(id).limitToFirst(1)
    .once('value').then(snap => snap.val() ?
                        snap.val()[id] : false)
    .then(login =>
      login === true ?
      false : login);
}

function idExists(id) {
  return usersRef.child('ids')
    .orderByKey().equalTo(id).limitToFirst(1)
    .once('value').then(snap => !!snap.val());
}

async function addUser(id, login, password) {
  if (await idExists(id))
    throw new Exception('Id exists!');
  if (await idByLogin(login))
    throw new Exception('Id exists!');
  const updateObj = {
    [`ids/${id}`]: login || true,
    [`passwords/${login}`]: login? password : false
  };
  return usersRef.update(updateObj);
}

module.exports = {
  idExists,
  idByLogin,
  loginById,
  passwordByLogin,
  addUser
};
