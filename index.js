// https://www.youtube.com/watch?v=2jqok-WgelI
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routes
const authRoute = require('./routes/auth.js');
const entryRoute = require('./routes/entries.js');

dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to db'),
);

// Allow cross-origin requests
app.use(cors());

const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || 'development';

// Middleware
app.use(express.json());

// Route Middlewares
app.use('/api/auth', authRoute);
app.use('/api/entries', entryRoute);

app.listen(port, () => console.log(`Server up and running on port ${port}`));
