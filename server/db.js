const admin = require('firebase-admin');
const config = require('config');
const serviceAccount = config.serviceAccount;
const databaseUrl = config.databaseUrl;

function watch(dbRef, target) {
  let subs = [];
  subs.push(
    dbRef.on('child_added', snapshot =>
      target[snapshot.key] = snapshot.data()
    )
  );

  subs.push(
    dbRef.on('child_changed', snapshot =>
      target[snapshot.key] = snapshot.data()
    )
  );

  subs.push(
    dbRef.on('child_removed', snapshot =>
      delete target[snapshot.key]
    )
  );

  return {
    unwatch: () => {
      dbRef.off('child_added', subs[0]);
      dbRef.off('child_changed', subs[1]);
      dbRef.off('child_removed', subs[2]);
    }
  };
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseUrl
});

const db = admin.database();
const root = db.ref('users');
const usersRef = root.child('users');
const vkIdsRef = root.child('vkIds');
const credentialsRef = root.child('credentials');

let users = {};
let vkIds = {};
let credentials = {};

let watchers = [
  watch(usersRef, users),
  watch(vkIdsRef, vkIds),
  watch(credentialsRef, credentials),
];

const addCredentials = (id, credentials) => {
  if (!credentials.login || !credentials.passHash) {
    throw new Error ('Invalid or incomplete credentials provided!');
  }
  credentialsRef.child(credentials.login).set({
    passHash: credentials.passHash,
    userId: id
  });
};

const addUser = (id, {credentials, }) => {
  if (!id) throw new Error('No ID specified for user creation!');
  if (users[id]) throw new Error('User with the specified ID exists!');
  if (credentials) addCredentials(id, credentials);
};

module.exports = {
  users,
  vkIds,
  credentials,
  addUser
};
