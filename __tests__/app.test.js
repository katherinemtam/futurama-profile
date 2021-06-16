import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import { fetchTagline } from '../lib/utils/futuramaApi';
import Profile from '../lib/models/Profile';

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
      id: '1',
      name: 'User',
      favoriteCharacter: 'Hermes',
      tagline: expect.any(String)
    });
  });

  test('get a profile via GET', async () => {
    const quote = await fetchTagline('Bender');
    const profile = await Profile.createProfile({ name: 'User', favoriteCharacter: 'Bender' }, quote.body[0].quote);

    const res = await request(app).get(`/api/v1/profile/${profile.id}`);

    expect(res.body).toEqual(profile);
  });

  test('get all via GET', async () => {
    const quote1 = await fetchTagline('Bender');
    const profile1 = await Profile.createProfile({ name: 'User', favoriteCharacter: 'Bender' }, quote1.body[0].quote);

    const quote2 = await fetchTagline('Fry');
    const profile2 = await Profile.createProfile({ name: 'User 2', favoriteCharacter: 'Fry' }, quote2.body[0].quote);

    const res = await request(app).get('/api/v1/profile');

    expect(res.body).toEqual([profile1, profile2]);
  });
  test('updates favorite character not name or tagline', async () => {
    const quote = await fetchTagline('Bender');
    const profile = await Profile.createProfile({ name: 'User', favoriteCharacter: 'Bender' }, quote.body[0].quote);
    profile.favoriteCharacter = 'Hermes';
    const res = await request(app)
      .patch(`/api/v1/profile/${profile.id}`)
      .send({ favoriteCharacter: 'Hermes' });
   
    expect(res.body).toEqual({
      id: '1',
      name: 'User',
      favoriteCharacter: profile.favoriteCharacter,
      tagline: expect.not.stringContaining(profile.tagline)
    });
  
    
  });
});
