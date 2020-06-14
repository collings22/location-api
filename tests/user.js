const request = require('supertest');
const app = require('../app');

describe('GET /user/:id', function () {
  it('Get one user', function (done) {
      request(app)
          .get('/user/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });
});