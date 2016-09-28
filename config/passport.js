const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');

const User = require('../models/UserModel');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username.toLowerCase() }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.'});
      }
      bcryptjs.compare(password, user.password, function(err, match) {
        if(!match) {
          return done(null, false, { message: 'Incorrect password.'});
        }
        return done(null, user);
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
