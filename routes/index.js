var express = require('express');
var router = express.Router();


var Account = require('../models/account');
//here we are connecting the the accounts

var passport = require('passport');
var flash = require('connect-flash');

//here we are

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Final Assignment',
    message: 'Passport Authentication (Local) ',
    user: req.user
  });
});
//here we are getting the  passport authentication making it local


router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Register',
    user: req.user
  });
});
//to get register form

router.post('/register', function(req, res, next) {

  Account.register(new Account(
      { username: req.body.username }),
      req.body.password,
      function(err, account) {
        if (err) {
          console.log(err);
          res.redirect('/register');
        }
        else {
          res.redirect('/login');
        }
      });
});
//here we are the functionality of the form

router.get('/login', function(req, res, next) {

  var messages = req.session.messages || [];


  req.session.messages = [];

  res.render('login', {
    title: 'Login',
    messages: messages,
    user: req.user
  });
});
//to get login page


router.post('/login', passport.authenticate('local', {
  successRedirect: '/regions',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login',
  failureFlash: true
}));
//here we get the functionality for login page

router.get('/logout', function(req, res, next) {

  req.logout();
  res.redirect('/login');
});
//here we get the page for logout
module.exports = router;