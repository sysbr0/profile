const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    console.log('Fetched users:', users); // Debugging line
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err); // Debugging line
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
