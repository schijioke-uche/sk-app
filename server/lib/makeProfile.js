//
// makeProfile.js - construct a consistant user profile object from a User's OIDC Record
//
const assert = require('assert');

const { USERS_BLUEGROUP, ADMINS_BLUEGROUP } = process.env;
assert(
  USERS_BLUEGROUP && ADMINS_BLUEGROUP,
  'Missing a BLUEGROUP environment variable'
);

const makeProfile = (user) => {
  const blueGroups = user.blueGroups || [];
  const roles = [];

  if (USERS_BLUEGROUP === '*' || blueGroups.includes(USERS_BLUEGROUP)) {
    roles.push('USER');
  }

  if (blueGroups.includes(ADMINS_BLUEGROUP)) {
    roles.push('ADMIN');
  }

  const profile = {
    uid: user.uniqueSecurityName,
    givenName: user.given_name,
    familyName: user.family_name,
    displayName: user.displayName || user.given_name + ' ' + user.family_name,
    email: user.email,
    address: user.address,
    realm: (user.realmName || '').match(/w3id/) ? 'W3ID' : 'IBMID',
    roles,
  };
  console.log(`PROFILE:`, profile);

  return profile;
};

module.exports = makeProfile;
