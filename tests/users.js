const request = require('supertest');
const app = require('../app'); //reference to you app.js file

describe('GET /users', function () {
  it('Get a list of all users within 50 mile radius of London', function (done) {
      request(app)
          .get('/users')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });
});