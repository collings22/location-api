const request = require('supertest');
const app = require('../app');

describe('TESTING USERS ROUTE', function () {
  it('Get a list of all users within 50 mile radius of London', (done) => {
      request(app)
          .get('/users')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });


  it('Return error when trying to get users near invalid user id', (done) => {
    request(app)
      .get('/users/near/0')
      .expect(500, done);
  });

  it('Get users near user id', (done) => {
    request(app)
      .get('/users/near/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

});