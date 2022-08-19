import supertest from 'supertest';
import { expect } from 'chai'; 

const request = supertest('https://gorest.co.in/public/');

describe('Users', () => {
  it('GET /users', (done) => {
    request.get('v2/users?access-token=b8796f3a2648445f93a6ab9cf14d9460ddad8a3e8a2efa42902309e8ce7034a9').end((err, res) => {
      expect(res.body).to.not.be.empty;
      done();
    })
  });
})