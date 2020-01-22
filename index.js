const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routes
const authRoute = require('./routes/auth.js');

dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to db'),
);

// Allow cross-origin requests
app.use(cors());

// Middleware
app.use(express.json());

// Route Middlewares
app.use('/api/auth', authRoute);

app.listen(3000, () => console.log('Server up and running on port 3000'));
