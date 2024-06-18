const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const usersRouter = require('./routes/users');
const repositoriesRouter = require('./routes/repositories');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/repositories', repositoriesRouter); // Add this line

// Connect to MongoDB
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
}); // weilcome

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
