const express = require('express');
const router = express.Router();
const Repository = require('../models/repository');

// Get all repositories
router.get('/', async (req, res) => {
  try {
    const repositories = await Repository.find();
    res.json(repositories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Other routes (CRUD operations) can go here

module.exports = router;
