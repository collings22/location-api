const request = require('supertest');
const app = require('../../app');

describe('TESTING INDEX ROUTE', () => {

  it('Get index information', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  it('Get 404 when param not empty', (done) => {
    request(app)
      .get('/1')    
      .expect(404, done);
  });

});