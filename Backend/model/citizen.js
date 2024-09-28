const mongoose = require('mongoose');

// Define the schema for citizen
const citizenSchema = new mongoose.Schema({
  citizen_id: {
    type: String,
    unique: true,
  },
  citizen_cnic: {
    type: String,
    required: true,
    unique: true,
  },
  citizen_password: {
    type: String,
    required: true
  },
  citizen_name: {
    type: String,
    required: true
  },
  citizen_address: {
    type: String,
    required: true
  },
  citizen_number: {
    type: String,
    required: true
  },
  citizen_email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Ensures email format is correct
  },
  citizen_username: {
    type: String,
    required: true,
    unique: true
  },
  citizen_dob: {
    type: String,
    required: true
  },
  account_index: {
    type: Number,
    unique: true,
  }
});

// Create the model
const Citizen = mongoose.model('Citizen', citizenSchema);

// Export the model so it can be used in other parts of the app
module.exports = Citizen;
