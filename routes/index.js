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

<<<<<<< HEAD
router.post('/login', passport.authenticate('local', { successRedirect: '/',
                                 failureRedirect: '/login',
                                 failureFlash: true })
);
  // passport.authenticate('local', function(err, user, info) {
  //   if (err) { return next(err); }
  //   if (!user) { return res.redirect('/login'); }
  //   req.logIn(user, function(err) {
  //     if (err) { return next(err); }
  //     else { return res.redirect('/users/' + user.username) }
  //   });
  // })(req, res, next);
// });
=======
/* POST login page. */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/userHome',
  failureRedirect: '/login',
  failureFlash: 'Invalid username or password.',
  failureFlash: true
}));
>>>>>>> ca58b4099a2e1b37b8a409c36c3d5a863ea76e02

/* GET logout page. */
router.get('/logout', function (req, res, next) {
  req.logout()
  res.redirect('/')
})

/* GET register page. */
router.get('/register', function (req, res, next) {
  res.render('register', {});
})

<<<<<<< HEAD
// router.post('/register', function(req, res, next) {
//   return passport.createUser(req, res).then((response) => {
//     passport.authenticate('local', function(err, user, info) {
//       if (err) { return next(err) }
//       if (!user) { return res.redirect('/login') }
//       req.login(user, function(err) {
//         if (err) { return next(err) }
//         else { return res.redirect('/users/' + user.username) }
//       })
//     })
//   })
// })
=======
/* POST register page */
router.post('/register', function (req, res, next) {
  let saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) console.error(err);
    // username, password, email;
    knex('users').insert({
      username: req.body.username,
      password_hash: hash,
      password_salt: '123',
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
>>>>>>> ca58b4099a2e1b37b8a409c36c3d5a863ea76e02

/* GET userHome page. */
router.get('/userHome', function (req, res, next) {
  res.render('userHome', {});
})

/* GET camera page. */
router.get('/CameraFeed', function (req, res, next) {
  res.render('camera', {});
})

module.exports = router;
