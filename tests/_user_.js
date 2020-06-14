const request = require('supertest');
const app = require('../app');
const chai = require('chai')

describe('TESTING USER ROUTE', () => {

  it('Get user by id', (done) => {
    request(app)
      .get('/user/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Get one user by invalid characters id', (done) => {
    request(app)
      .get('/user/fred')
      .expect(500, done)
  });

  it('Get one user by invalid numbered id', (done) => {
    request(app)
      .get('/user/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .expect((res) => {
        chai.assert.equal(res.body.message.includes('doesn\'t exist'), true);
      });
  });


});