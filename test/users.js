import supertest from 'supertest';
import { expect } from 'chai'; 

const request = supertest('https://gorest.co.in/public/v2/');
const TOKEN = 'b8796f3a2648445f93a6ab9cf14d9460ddad8a3e8a2efa42902309e8ce7034a9';

describe('Users', () => {
  let userId;

  describe('POST', () => {
    it('/users', () => {
      const data = {
        email: `testtt-${Math.floor(Math.random() * 9999)}@mail.com`,
        name: 'Test name',
        gender: 'female',
        status: 'inactive',
      };
  
      return request.post('users').set('Authorization', `Bearer ${TOKEN}`).send(data).then((res) => {
        expect(res.body).to.deep.include(data);
        userId = res.body.id
      });
    });
  });

  describe('GET', () => {
    it('/users', () => {
      return request.get(`users?access-token=${TOKEN}`).then((res) => {
        expect(res.body).to.not.be.empty;
      });
    });

    it('/users/id', () => {
      return request.get(`users/${userId}?access-token=${TOKEN}`).then((res) => {
        expect(res.body.id).to.be.eq(userId);
      });
    });

    it('/users with query params', () => {
      const url = `users/?access-token=${TOKEN}&page=5&gender=female&status=active`;

      return request.get(url).then((res) => {
        expect(res.body).to.not.be.empty;
        res.body.forEach((data) => {
          expect(data.gender).to.eq('female');
          expect(data.status).to.eq('active');
        });
      });
    });
  });

  describe('PUT', () => {
    it('/users/id', () => {
      const data = {
        status: 'active',
        name: `Test - ${Math.floor(Math.random() * 9999)}`,
      };

      return request.put(`users/${userId}`).set('Authorization', `Bearer ${TOKEN}`).send(data).then((res) => {
          expect(res.body).to.deep.include(data);
        });
    });
  });

  describe('DELETE', () => {
    it('/users/id', () => {
      return request.delete(`users/${userId}`).set('Authorization', `Bearer ${TOKEN}`).then((res) => {
        expect(res.body).to.be.eq(null);
      });
    });
  });
});