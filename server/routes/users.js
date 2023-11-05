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

module.exports = router;
