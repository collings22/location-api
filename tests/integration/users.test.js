const request = require('supertest');
const app = require('../../app');
const data = require('../../data/test_data.json');

describe('TESTING USERS ROUTE', function () {
  let randomUser = data[Math.floor(Math.random() * data.length)];

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
      .get('/users/near/'+randomUser.id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  it('Get users near user id with increased radius', (done) => {
    request(app)
      .get('/users/near/'+randomUser.id+'?radius='+(Math.random()*1000))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  it('Get users near Nashville, TN with radius of 200 miles', (done) => {
    request(app)
      .get('/users/near?lat=36.174465&lng=-86.767960&radius=200')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

});