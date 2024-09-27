

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS middleware
const registerRoute = require('./routes/registrationRoutes'); // Import the registration routes
const wardenRoute = require('./routes/wardenRoutes'); // Import the warden routes
const citizenRoute = require('./routes/citizenRoutes'); // Import the citizen routes

const app = express();
const port = process.env.PORT || 5000; // Use PORT from .env file or default to 5000
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

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3001', // Allow requests from this origin (your frontend)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Specify the allowed headers
}));

// Use the registration routes
app.use('/api/registration', registerRoute);

// Use the warden routes
app.use('/api/warden', wardenRoute);

// Use the citizen routes
app.use('/api/citizen', citizenRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
