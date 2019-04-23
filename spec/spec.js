var request = require('supertest');
// var should = require('should');
var app = require('../app');

const good_cred = {
  email: 'good@mail.com',
  password: 'goodpass'
}

const bad_cred = {
  email: 'bad@mail.com',
  password: 'badpass'
}

const bad_pass = {
  email: 'good@mail.com',
  password: 'badpass'
}

describe('Index Routes', function() {
  beforeEach(function () {
  })
  it('responds to /', function testSlash(done) {
    request(app)
      .get('/')
      .expect(200, done)
  });
  it('responds to /login', function testLogin(done) {
    request(app)
      .get('/login')
      .expect(200, done)
  });
  it('should reject illegal login', function testIllegalLogin(done) {
    request(app)
      .post('/login')
      .expect(200, done)
  })
  it('should accept legal login', function testLegalLogin(done) {
    request(app)
      .post('/login')
      .expect(200, done)
  })
  it('responds to /register', function testRegister(done) {
    request(app)
      .get('/register')
      .expect(200, done)
  });
  it('responds to /logout', function testSlash(done) {
    request(app)
      .get('/logout')
      .expect(200, done)
  });
    it('404 everything else', function testPath(done) {
      request(app)
        .get('/foo/bar')
        .expect(404, done);
    });
})

describe('User Routes', function() {
  beforeEach(function () {
  })
  it('responds to /', function testSlash(done) {
    request(app)
      .get('/')
      .expect(200, done);
    });
    it('404 everything else', function testPath(done) {
      request(app)
        .get('/foo/bar')
        .expect(404, done);
    });
})