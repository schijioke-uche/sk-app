const debug = require('debug')('server:auth');
const assert = require('assert');
const express = require('express');
const passport = require('passport');
const passport_ci_oidc = require('passport-ci-oidc');
const jwtDecode = require('jwt-decode');
const fetch = require('node-fetch');

const makeProfile = require('../lib/makeProfile');

const {
  OIDC_DISCOVERY_URL,
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
  OIDC_CALLBACK_URL,
  OIDC_TOKEN_ENDPOINT,
  OIDC_REVOKE_ENDPOINT, // optional
} = process.env;

assert(
  OIDC_DISCOVERY_URL &&
    OIDC_CLIENT_ID &&
    OIDC_CLIENT_SECRET &&
    OIDC_CALLBACK_URL &&
    OIDC_TOKEN_ENDPOINT,
  'Missing an OIDC environment variable'
);

const setRefreshTokenCookie = (res, refreshToken) =>
  res.cookie('rt', refreshToken, {
    secure: true,
    sameSite: true,
    httpOnly: true,
  });

const clearRefreshTokenCookie = res =>
  res.clearCookie('rt', {
    secure: true,
    sameSite: true,
    httpOnly: true,
  });

const router = express.Router();

router.use(passport.initialize());

var Strategy = new passport_ci_oidc.IDaaSOIDCStrategy(
  {
    discoveryURL: OIDC_DISCOVERY_URL,
    clientID: OIDC_CLIENT_ID,
    clientSecret: OIDC_CLIENT_SECRET,
    callbackURL: OIDC_CALLBACK_URL,
    scope: 'email',
    response_type: 'code',
    skipUserProfile: true,
  },
  function (iss, sub, oidcProfile, accessToken, refreshToken, params, done) {
    // debug(oidcProfile);
    process.nextTick(function () {
      done(null, {
        email: oidcProfile._json.email || oidcProfile._json.emailAddress,
        refreshToken,
      });
    });
  }
);

passport.use(Strategy);

//
// revokeRefreshToken - tell the OIDC provider to revoke a RT
//
const revokeRefreshToken = async refreshToken => {
  return typeof OIDC_REVOKE_ENDPOINT !== 'string'
    ? undefined // do nothing
    : fetch(OIDC_REVOKE_ENDPOINT, {
        method: 'POST',
        body:
          `token_type=refresh_token` +
          `&token=${refreshToken}` +
          `&client_id=${process.env.OIDC_CLIENT_ID}` +
          `&client_secret=${process.env.OIDC_CLIENT_SECRET}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then(response => {
          if (!response.ok) throw new Error(response.statusText);
        })
        .catch(error =>
          console.warn(`unable to revoke token: ${error.message}`)
        );
};

//
// OIDC authentication middleware
//
const oidcAuthenticate = [
  // mock session
  (req, _, next) => {
    req.session = { state: req.query.state };
    next();
  },
  passport.authenticate('openidconnect', { session: false }),
];

//
// GET /auth/sso/callback
//
router.get('/sso/callback', oidcAuthenticate, (req, res, next) => {
  // debug(req.user);
  const { email, refreshToken } = req.user;
  debug(`authorized: ${email}`);
  debug(`refreshToken: ${refreshToken}`);
  setRefreshTokenCookie(res, refreshToken);
  res.redirect('/');
});

//
// GET /auth/login
//
router.get('/login', oidcAuthenticate);

//
// GET /auth/logout
//
router.get('/logout', (req, res, next) => {
  const refreshToken = req.cookies.rt;
  clearRefreshTokenCookie(res);
  res.redirect('/');
  if (refreshToken) revokeRefreshToken(refreshToken);
});

//
// fetchFreshToken - take a refresh token and call the OIDC token endpoint
//
const fetchFreshToken = refreshToken =>
  fetch(OIDC_TOKEN_ENDPOINT, {
    method: 'post',
    body:
      `grant_type=refresh_token` +
      `&client_id=${OIDC_CLIENT_ID}` +
      `&client_secret=${OIDC_CLIENT_SECRET}` +
      // note: refreshToken came from the user, so sanitize it with encodeURIComponent
      `&refresh_token=${encodeURIComponent(refreshToken)}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(async fetchResult => {
    if (!fetchResult.ok) {
      //debug(fetchResult);
      //const bodyText = await fetchResult.text();
      //debug(bodyText);
      throw new Error(`unable to fetch profile (${fetchResult.status})`);
    }
    return fetchResult.json();
  });

//
// GET /auth/profile
//
router.get('/profile', (req, res, next) => {
  const refreshToken = req.cookies.rt;
  if (!refreshToken) return res.send({ ok: false, error: 'no refresh token' });
  fetchFreshToken(refreshToken)
    .then(
      ({
        access_token: accessToken,
        refresh_token: newRefreshToken,
        id_token,
      }) => {
        const user = jwtDecode(id_token);
        revokeRefreshToken(refreshToken); // technically not required, but for the security obsessed??
        setRefreshTokenCookie(res, newRefreshToken);
        return res.send({ ok: true, accessToken, profile: makeProfile(user) });
      }
    )
    .catch(err => {
      return res.send({ ok: false, error: err.message });
    });
});

//
// GET /auth/refresh-token
//
router.get('/refresh-token', (req, res, next) => {
  const refreshToken = req.cookies.rt;
  if (!refreshToken) return res.send({ ok: false, error: 'no refresh token' });
  fetchFreshToken(refreshToken)
    .then(({ access_token: accessToken, refresh_token: newRefreshToken }) => {
      setRefreshTokenCookie(res, newRefreshToken);
      return res.send({ ok: true, accessToken });
    })
    .catch(err => {
      return res.send({ ok: false, error: err.message });
    });
});

module.exports = router;
