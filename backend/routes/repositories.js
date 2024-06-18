const express = require('express');
const router = express.Router();
const Repository = require('../models/repository');

// Get all repositories
router.get('/', async (req, res) => {
  try {
    const repositories = await Repository.find();
    console.log('Fetched repositories:', repositories); // Debugging line
    res.json(repositories);
  } catch (err) {
    console.error('Error fetching repositories:', err); // Debugging line
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
