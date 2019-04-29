var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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

var global_user = null;

// // used to serialize the user for the session
// passport.serializeUser(function(user, done) {
//   console.log('serialize called')
//   done(null, user.ID);
// });

// // used to deserialize the user
// passport.deserializeUser(function(id, done) {
//   console.log('deserialize called')
//   User.findById(id, function(err, user) {
//       done(err, user);
//   });
// });

passport.serializeUser(function (user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    knex.select('*').from('users').where('username', username).timeout(10000, { cancel: true }).then(
      function (result) {
        const _password_hash = result[0].password_hash.trim()
        const user = result[0]
        bcrypt.compare(password, _password_hash, function (err, res) {
          if (err) {
            console.error(err);
          } else if (!res) {
            return done(null, null, { message: 'Incorrect.' })
          } else {
            global_user = user
            console.log(global_user)
            return done(null, user)
          }
        })
      })
  }));

function loggedIn(req, res, next) {
  if (global_user) {
    next()
  } else {
    res.redirect('/logout')
  }
}

/* GET logout page. */
router.get('/logout', function (req, res, next) {
  // req.logout()
  res.redirect('/login')
})

/* GET home page. */
router.get('/', function (req, res, next) {
  var l = (req.user) ? true : false;
  res.render('index', { title: 'Bonsai Buddy', active_icon: 'home', logged_in: l });
});

/* GET login page. */
router.get('/login', function (req, res, next) {
  var l = (req.user) ? true : false;
  res.render('login', { active_icon: 'login', logged_in: l });
})

// router.post('/login', function (req, res, next) {
//   knex.select('*').from('users').where('username', req.body.username).timeout(10000, {cancel: true}).then(
//     function (result) {
//       const _password_hash = result[0].password_hash.trim()
//       const user = result[0]
//       bcrypt.compare(req.body.password, _password_hash, function (err, b_result) {
//         if (err) {
//           console.error(err);
//         } else if (!b_result) {
//           res.redirect('/logout')
//         } else {
//           console.log('user success')
//           res.redirect('/')
//         }
//       })
//   })
// })

router.post('/login', passport.authenticate('local', {
  successRedirect: '/userHome',
  failureRedirect: '/login'
}));

/* GET register page. */
router.get('/register', function (req, res, next) {
  var l = (req.user) ? true : false;
  res.render('register', { active_icon: 'register', logged_in: l });
})

/* POST register page */
router.post('/register', function (req, res, next) {
  let saltRounds = 10
  let plaintext = req.body.pwd
  let user_name = req.body.usr
  let e_mail = req.body.email
  let firstname = req.body.first
  let lastname = req.body.last
  bcrypt.hash(plaintext, saltRounds, function (err, hash) {
    if (err) {
      console.error(err);
    }
    knex('users').insert({
      username: user_name,
      password_hash: hash,
      email: e_mail,
      first_name: firstname,
      last_name: lastname,
      created: new Date()
    }).catch(function (error) {
      console.error(error);
    }).then(function (result) {
      res.redirect('/logout')
    })
  })
})

/* GET userHome page. */
router.get('/userHome', loggedIn, function (req, res, next) {
  console.log(global_user);
  // res.render('userHome', { active_icon: 'health', logged_in: true, user_info: global_user });

  knex.select('*').from('user_info').where('user_id', global_user.ID).orderBy('date_of_sensor', 'asc').timeout(10000, { cancel: true }).then(
    function (result) {
      res.render('userHome', { active_icon: 'health', logged_in: true, user_info: global_user, data: result });
    }).catch(function (error) {
      console.error('Error fetching sensor data', error);
      res.render('userHome', { active_icon: 'health', logged_in: true, user_info: global_user, data: [] });
    })
})

/* GET camera page. */
router.get('/CameraFeed', loggedIn, function (req, res, next) {
  res.render('camera', { active_icon: 'camera', logged_in: true, user_info: global_user });
})

/* GET pump page. */
router.get('/pump', loggedIn, function (req, res, next) {
  res.render('pump', { active_icon: 'pump', logged_in: true, user_info: global_user });
})

module.exports = router;
