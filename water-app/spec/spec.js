var request = require('supertest');
describe('loading express', function () {
  var app;
  beforeEach(function () {
    app = require('../app');
  });
  afterEach(function () {
    // app.close();
    // setTimeout(done, 1000)
  });
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
});