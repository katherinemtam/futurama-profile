import { Router } from 'express';
import request from 'superagent';
import Profile from '../models/Profile';


export default Router()
  .post('/api/v1/profile', async (req, res) => {
    try{

      const fetchTagline = await request
        .get(`https://futuramaapi.herokuapp.com/api/characters/${req.body.favoriteCharacter}`);

      console.log('TAGLINE:', fetchTagline.body[0].quote);

      console.log('REQ BODY:', req.body);
      const profile = await Profile.createProfile(req.body, fetchTagline.body[0].quote);

      res.send(profile);

    } catch (err) {
      res.status(500).send({ error: err.message });

    }
  });
