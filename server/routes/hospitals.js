const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv= require('dotenv').config()
const User=require('../models/user')

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

router.get('/userinfo/:userId', async (req, res) => {
  const { userId } = req.params;
  try{
    const user=await User.findById(userId);
    res.json(user);
} catch(error){
    res.status(500).json({error: 'Couldnt retrieve user'})
}
});

router.get('/notifications/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch the user document from MongoDB based on userId
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the notification parameter from the user document
    const notification = user.notification;

    res.json({ notification });
  } catch (error) {
    console.error('Error fetching notification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/police', async (req, res) => {
  const { lat, lng, radius } = req.query;
  const {role}='admin';
  try {
    // Query users with role 'admin' (police officers) within the radius
    const policeOfficers = await User.find({
      role: 'admin',
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)] // MongoDB expects [longitude, latitude]
          },
          $maxDistance: parseFloat(radius) * 1000 // Convert radius to meters (assuming radius is in kilometers)
        }
      }
    }).sort({ location: 1 }).limit(1);
  

    res.json(policeOfficers);
  } catch (error) {
    console.error('Error fetching police officers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
