const debug = require('debug')('app:auth');

const express = require('express');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

debug(`auth0: domain=${process.env.AUTH0_DOMAIN}`)

passport.use(new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    debug("auth0 strategy callback; profile: " + JSON.stringify(profile, null, 4));
    return done(null, profile);
  }
));

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  debug("auth0 serialize user: " + JSON.stringify(user, null, 4));
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  debug("auth0 deserialize user: " + JSON.stringify(user, null, 4));
  done(null, user);
});

// login/logout routes

var router = express.Router();

// session login and redirect to homepage
router.get(
  '/login',
  passport.authenticate('auth0', {
    clientID: process.env.AUTH0_CLIENT_ID,
    domain: process.env.AUTH0_DOMAIN,
    redirectUri: process.env.AUTH0_CALLBACK_URL,
    audience: 'https://' + process.env.AUTH0_DOMAIN + '/userinfo',
    responseType: 'code',
    scope: 'openid profile'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

// session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get(
  '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/');
  }
);

module.exports.router = router;
