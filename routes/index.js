var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bonsai Buddy' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {});
})

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', {});
})

/* GET userHome page. */
router.get('/userHome', function(req, res, next) {
  res.render('userHome', {});
})

/* GET camera page. */
router.get('/CameraFeed', function(req, res, next) {
  res.render('camera', {});
})


module.exports = router;
