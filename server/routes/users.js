const express = require('express');
const router = express.Router();
const Course = require('../models/course'); // Import your Course model
const User = require('../models/user'); // Import your User model

// Define a route to fetch courses for a specific user
router.get('/:userId/courses', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId).populate('coursesBought');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract the user's purchased courses
    const courses = user.coursesBought;

    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/updatelocation/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { latitude, longitude } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update user's location
    user.location.coordinates = [latitude, longitude];
    await user.save();

    res.status(200).json({ message: 'User location updated successfully' });
  } catch (error) {
    console.error('Error updating user location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/submit/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { carno, phonenumber, destination } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Update user's details
    user.carno = carno;
    user.phonenumber = phonenumber;
    user.destination = destination;
    await user.save();
    res.status(200).json({ message: 'User details submitted successfully' });
  } catch (error) {
    console.error('Error submitting user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
