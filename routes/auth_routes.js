const router = require('express').Router();
const passport = require('passport');
const { User, Note } = require('../models');

const LocalStrategy = require('passport-local').Strategy;

// localhost:5000/api

// User is logging in --> passport.authenticate()
passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  User.findOne({email: email})
    .then(user => {
      if ( !user ) done(null, false);

      if ( !user.comparePassword(password, user.password) ) done(null, false);

      done(null, {
        id: user._id,
        email: user.email
      });
    });
}));

passport.serializeUser((user_id, done) => {
  done(null, user_id);
});

passport.deserializeUser((user_id, done) => {
  done(null, user_id);
});


// ROUTES
router.post('/register', (req, res) => {

  User.create(req.body)
    .then(user => {
      req.login({
        id: user._id,
        email: user.email
      }, err => {
        if ( err ) return res.status(500).send({error: err});

        res.send(req.user);
      });
    }).catch(err => res.status(500).send({error: 'User could not be created.'}));
});

router.post('/login', (req, res) => {
  passport.authenticate('local')(req, res, result => {
    res.status(200).send(req.user);
  });
});

router.get('/isauth', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send({message: 'Logged out successfully!'});
});

module.exports = router;