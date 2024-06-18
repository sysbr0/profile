const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const path = require('path');
const fs = require('fs');

const usersRouter = require('./routes/users');

// Debugging: Verify the path to repository.js
const repositoryPath = path.resolve(__dirname, '../models/repository.js');
console.log('Resolved repository path:', repositoryPath);

if (fs.existsSync(repositoryPath)) {
  console.log('Repository model found:', repositoryPath);
} else {
  console.log('Repository model not found:', repositoryPath);
}

const Repository = require(repositoryPath); // Using dynamic path resolution for debug

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
});
connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
