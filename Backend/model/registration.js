const mongoose = require('mongoose');

// Define the schema for registration
const registrationSchema = new mongoose.Schema({
  registration_id: {
    type: String,
    required: true,
    unique: true
  },
  owner_cnic: {
    type: String,
    required: true,
    ref: 'Citizen' // Reference to the Citizen model
  },
  vehicle_name: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  }
});

// Create the model
const Registration = mongoose.model('Registration', registrationSchema);

// Export the model so it can be used in other parts of the app
module.exports = Registration;
