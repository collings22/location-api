const request = require('supertest');
const app = require('../../app');
const chai = require('chai');
const data = require('../../data/test_data.json');

describe('TESTING USER ROUTE', () => {
  let randomUser = data[Math.floor(Math.random() * data.length)];

  it('Get user by id', (done) => {

    request(app)
      .get('/user/'+randomUser.id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        chai.assert(res.body.email == randomUser.email, 'ip address matched');
      })      
      .expect(200, done);
  });

  it('Get one user by invalid characters id', (done) => {
    request(app)
      .get('/user/'+randomUser.email)
      .expect(500, done)
  });

  it('Get one user by invalid numbered id', (done) => {
    request(app)
      .get('/user/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        chai.assert.equal(res.body.message.includes('doesn\'t exist'), true);
      })      
      .expect(200, done);
  });


});