const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv= require('dotenv').config()

router.get('/nearbyhospitals', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
      params: {
        location: `${lat},${lng}`,
        radius: 100000,
        type: 'hospital',
        key: process.env.GOG_API // Replace with your actual Google Maps API key
      }
    });
   
    if (response.data.status === 'OK') {
      res.json(response.data.results);
    } else {
      res.status(500).json({ error: 'Could not retrieve nearby hospitals' });
    }
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/directions', async (req, res) => {
  try {
    const { originLat, originLng, destinationLat, destinationLng, key } = req.query;
const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
  params: {
    origin: `${originLat},${originLng}`,
    destination: `${destinationLat},${destinationLng}`,
    key: process.env.GOG_API // Use the API key passed from the client
  }
});

   
    if (response.data.status === 'OK') {
      res.json(response.data);
    } else {
      res.status(500).json({ error: 'Could not retrieve directions' });
    }
  } catch (error) {
    console.error('Error fetching directions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
