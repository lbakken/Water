var express = require('express');
var router = express.Router();
var passport = require('passport');

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

function loggedIn(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.redirect('/logout')
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  var l = (req.user) ? true : false;
  res.render('index', { title: 'Bonsai Buddy',  active_icon: 'home', logged_in: l});
});

/* GET login page. */
router.get('/login', function (req, res, next) {
  var l = (req.user) ? true : false;
  res.render('login', {active_icon: 'login', logged_in: l});
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
  res.redirect('/login')
})

/* GET register page. */
router.get('/register', function (req, res, next) {
  var l = (req.user) ? true : false;
  res.render('register', {active_icon: 'register', logged_in: l});
})

/* POST register page */
router.post('/register', function (req, res, next) {
  let saltRounds = 10
  let plaintext = req.body.pwd
  let user_name = req.body.usr
  let e_mail = req.body.email
  let firstname = req.body.first
  let lastname = req.body.last
  bcrypt.hash(plaintext, saltRounds, function(err, hash) {
    if (err) {
      throw err
    }
    knex('users').insert({
      username: user_name,
      password_hash: hash,
      email: e_mail,
      first_name: firstname,
      last_name: lastname,
      created: new Date()
    }).whereNotExists(
      knex.select('*').where('username', user_name)
    ).then(function (result) {
      console.log(result)
      res.redirect('/login')
    }).catch(function (error) {
      throw error
    })
  })


  // bcrypt.genSalt(saltRounds, function (err, salt) {
  //   if (err) throw err;

  //   bcrypt.hash(req.body.password, salt, function (err, hash) {
  //     if (err) throw err;
  //     // username, password, email;
  //     knex('users').insert({
  //       username: req.body.username,
  //       password_hash: hash,
  //       password_salt: salt,
  //       email: req.body.email,
  //       created: new Date()
  //     }).whereNotExists(
  //       knex.select('*').where('username', req.body.username)
  //     ).then(function (res) {
  //       // Redirect to login page?
  //       res.redirect('/login')
  //       console.log(res);
  //     }).catch(function (err) {
  //       // Username Already exists
  //       alert('That username already exists')
  //       // console.error(err.detail);
  //     })

    // })
  // })
})

/* GET userHome page. */
router.get('/userHome', loggedIn, function (req, res, next) {
  res.render('userHome', {active_icon: 'health', logged_in: true, user_info: req.user});
})

/* GET camera page. */
router.get('/CameraFeed', loggedIn, function (req, res, next) {
  res.render('camera', {active_icon: 'camera', logged_in: true, user_info: req.user});
})

/* GET pump page. */
router.get('/pump', loggedIn, function (req, res, next) {
  res.render('pump', {active_icon: 'pump', logged_in: true, user_info: req.user});
})

module.exports = router;
