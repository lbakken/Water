var express = require('express');
var router = express.Router();
var passport = require('passport');
// var passport = require('../auth')

require('../auth.js');
var passport = require('passport')
var bcrypt = require('bcryptjs')
var knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'ec2-107-20-183-142.compute-1.amazonaws.com',
    port: '5432',
    user: 'gyiklnogoftxaw',
    password: '4ed2c78146de60f01e360a7dd390b3dbdee012f09d7e45cdd42dbd531ba46afe',
    database: 'd9jgpghedbvma3',
    ssl: true
  }
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Bonsai Buddy' });
});

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', {});
})

/* POST login page. */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/userHome',
  failureRedirect: '/login',
  failureFlash: 'Invalid username or password.',
  failureFlash: true
}));

/* GET logout page. */
router.get('/logout', function (req, res, next) {
  req.logout()
  res.redirect('/')
})

/* GET register page. */
router.get('/register', function (req, res, next) {
  res.render('register', {});
})

/* POST register page */
router.post('/register', function (req, res, next) {
  let saltRounds = 10;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) throw err;

    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) throw err;
      // username, password, email;
      knex('users').insert({
        username: req.body.username,
        password_hash: hash,
        password_salt: salt,
        email: req.body.email,
        created: new Date()
      }).whereNotExists(
        knex.select('*').where('username', req.body.username)
      ).then(function (res) {
        // Redirect to login page?
        console.log(res);
      }).catch(function (err) {
        // Username Already exists
        console.error(err.detail);
      })

    })
  })
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
