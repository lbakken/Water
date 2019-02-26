var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/test', function(req, res, next) {
  res.render('user', {
    username: 'testuser',
    userid: '1234',
    plantname: 'testplant'
  });
});

module.exports = router;
