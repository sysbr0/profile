const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const usersRouter = require('./routes/users');
const repositoriesRouter = require('./routes/repositories');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/repositories', repositoriesRouter);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.on('connected', () => {
  console.log('Connected to MongoDB');

  // Log current directory and list files for debugging
  console.log('Current directory:', __dirname);
  const fs = require('fs');
  const path = require('path');
  fs.readdir(__dirname, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    console.log('Directory contents:');
    files.forEach(file => {
      console.log(file);
    });
  });

  const modelsPath = path.join(__dirname, 'models');
  fs.readdir(modelsPath, (err, files) => {
    if (err) {
      return console.log('Unable to scan models directory: ' + err);
    }
    console.log('Models directory contents:');
    files.forEach(file => {
      console.log(file);
    });
  });
});
connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
