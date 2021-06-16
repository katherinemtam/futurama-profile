import { Router } from 'express';
import request from 'superagent';
import Profile from '../models/Profile';
import { fetchTagline } from '../utils/futuramaApi';


export default Router()
  .post('/api/v1/profile', async (req, res) => {
    try {

      const quote = await fetchTagline(req.body.favoriteCharacter);
      const profile = await Profile.createProfile(req.body, quote.body[0].quote);

      res.send(profile);

    } catch (err) {
      res.status(500).send({ error: err.message });

    }
  });


