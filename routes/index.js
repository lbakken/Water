var express = require('express');
var router = express.Router();


require('../auth.js');
var passport = require('passport');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Bonsai Buddy' });
});

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', {});
})

router.post('/login', function (req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/users/' + req.body.username,
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', function (req, res, next) {
  req.logout()
  res.redirect('/')
})

/* GET register page. */
router.get('/register', function (req, res, next) {
  res.render('register', {});
  // sql query for new users 
  // INSERT INTO users(username, password_salt, password_hash, email, created) VALUES(..., current_timestamp);
})

/* GET userHome page. */
router.get('/userHome', function (req, res, next) {
  res.render('userHome', {});
})

/* GET camera page. */
router.get('/CameraFeed', function (req, res, next) {
  res.render('camera', {});
})

module.exports = router;
