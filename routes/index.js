var express = require('express');
var router = express.Router();
var passport = require('passport');
// var passport = require('../auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bonsai Buddy' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {});
})

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

router.get('/logout', function(req, res, next) {
  req.logout()
  res.redirect('/')
})

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', {});
})

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

/* GET userHome page. */
router.get('/userHome', function(req, res, next) {
  res.render('userHome', {});
})

/* GET camera page. */
router.get('/CameraFeed', function(req, res, next) {
  res.render('camera', {});
})

module.exports = router;
