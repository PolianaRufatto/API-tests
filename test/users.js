import supertest from 'supertest';
import { expect } from 'chai'; 

const request = supertest('https://gorest.co.in/public/v2/');
const TOKEN = 'b8796f3a2648445f93a6ab9cf14d9460ddad8a3e8a2efa42902309e8ce7034a9';

describe('Users', () => {
  it('GET /users', () => {
    return request.get(`users?access-token=${TOKEN}`).then((res) => {
      expect(res.body).to.not.be.empty;
    });
  });

  it('GET /users/id', () => {
    return request.get(`users/3540?access-token=${TOKEN}`).then((res) => {
      expect(res.body.id).to.be.eq(3540);
    });
  });

  it('GET /users with query params', () => {
    const url = `users/?access-token=${TOKEN}&page=5&gender=female&status=active`;

    return request.get(url).then((res) => {
      expect(res.body).to.not.be.empty;
      res.body.forEach((data) => {
        expect(data.gender).to.eq('female');
        expect(data.status).to.eq('active');
      });
    });
  });
})