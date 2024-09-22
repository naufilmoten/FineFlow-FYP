const mongoose = require('mongoose');

// Define the schema for registration
const registrationSchema = new mongoose.Schema({
  registration_id: {
    type: String,
    required: true,
    unique: true
  },
  owner_name: {
    type: String,
    required: true
  },
  owner_cnic: {
    type: String,
    required: true
  },
  owner_contact: {
    type: String,
    required: true
  },
  owner_email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Ensures email format is correct
  },
  owner_address: {
    type: String,
    required: true
  }
});

// Create the model
const Registration = mongoose.model('Registration', registrationSchema);

// Export the model so it can be used in other parts of the app
module.exports = Registration;
