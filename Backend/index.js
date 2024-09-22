require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const registerRoute = require('./routes/registrationRoutes'); // Import the registration routes
const wardenRoute = require('./routes/wardenRoutes'); // Import the warden routes
const citizenRoute = require('./routes/citizenRoutes'); // Import the citizen routes

const app = express();
const port = process.env.PORT || 3000; // Use PORT from .env file or default to 3000
const dbURI = process.env.DB_URI; // Use DB_URI from .env file

// Connect to MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use the registration routes
app.use('/api/registration', registerRoute);

// Use the warden routes
app.use('/api/warden', wardenRoute);

// Use the citizen routes
app.use('/api/citizen', citizenRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
