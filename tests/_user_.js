const request = require('supertest');
const app = require('../app');
const chai = require('chai')

describe('TESTING USER ROUTE', () => {

  it('Get user by id', (done) => {
    request(app)
      .get('/user/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

});