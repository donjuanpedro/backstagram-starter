const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcryptjs = require('bcryptjs');
const UserModel = require('../models/UserModel');
const middleware = require('../routes/middleware');

/* GET home page. */
router.get('/', middleware.auth, function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/login');
  } else {
    res.render('index', {
      bootstrap: JSON.stringify({ username: req.user.username })
    });
  }
});

router.get('/register', function(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('register');
  }
});

router.post('/register', function(req, res, next) {
  UserModel.findOne({ username: req.body.username.toLowerCase() }, function (err, user) {
    if(user) {
      req.flash('error', 'The username has already been used');
      return res.redirect('/register');
    }

    if(req.body.password.length <= 5) {
      req.flash('error', 'Password must be at least 6 characters');
      return res.redirect('/register');
    }
    const saltRounds = 10;
    bcryptjs.hash(req.body.password, saltRounds, function (err, hash) {
      user = new UserModel({
        username: req.body.username.toLowerCase(),
        password: hash
      });
      user.save(function(error, user) {
        if(error) {
          req.flash('error', error.message);
          res.redirect('/register');
        }
        req.login(user, function(err) {
          if(err) {
            return res.redirect('/register');
          }
          return res.redirect('/');
        });
      });
    });
  });
});

router.get('/login', function(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('login');
  };
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.post('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
