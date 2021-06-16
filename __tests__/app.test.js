import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('profile routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('create a profile for our user via POST', async () => {

    const res = await request(app)
      .post('/api/v1/profile')
      .send({
        name: 'User',
        favoriteCharacter: 'Hermes'
      });

    expect(res.body).toEqual({
      id:'1',
      name:'User',
      favoriteCharacter: 'Hermes',
      tagline: expect.any(String)
    });
  });

});
