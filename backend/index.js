const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Remove useCreateIndex option here
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
