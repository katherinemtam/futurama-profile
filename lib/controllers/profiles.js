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
  })

  .get('/api/v1/profile/:id', async (req, res) => {
    try {
      const profile = await Profile.getProfile(req.params.id);
      res.send(profile);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/profile', async (req, res) => {
    try {
      const profiles = await Profile.getAllProfiles();
      res.send(profiles);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .patch('/api/v1/profile/:id', async (req, res) => {
    try {
  
      const quote = await fetchTagline(req.body.favoriteCharacter);
      const profile = await Profile.patchProfile(req.params.id, req.body.favoriteCharacter, quote.body[0].quote);
      res.send(profile);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .delete('/api/v1/profile/:id', async (req, res) => {
    try {
      const profile = await Profile.deleteProfile(req.params.id);
      res.send(profile);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })


