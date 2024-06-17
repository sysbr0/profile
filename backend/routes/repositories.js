// routes/repositories.js

const express = require('express');
const router = express.Router();
const Repository = require('../models/Repository');

// GET all repositories
router.get('/', async (req, res) => {
  try {
    const repositories = await Repository.find();
    res.json(repositories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new repository
router.post('/', async (req, res) => {
  const repository = new Repository({
    language: req.body.language,
    title: req.body.title,
    description: req.body.description,
    img: req.body.img
  });

  try {
    const newRepository = await repository.save();
    res.status(201).json(newRepository);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
