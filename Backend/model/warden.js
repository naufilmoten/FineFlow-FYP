const mongoose = require('mongoose');

// Define the schema for warden
const wardenSchema = new mongoose.Schema({
  warden_id: {
    type: String,
    unique: true,
  },
  warden_name: {
    type: String,
    required: true
  },
  warden_cnic: {
    type: String,
    required: true,
    unique: true
  },
  warden_username: {
    type: String,
    required: true,
    unique: true
  },
  warden_password: {
    type: String,
    required: true
  },
  account_index: {
    type: Number,
    unique: true,
  }
});

// Create the model
const Warden = mongoose.model('Warden', wardenSchema);

// Export the model so it can be used in other parts of the app
module.exports = Warden;
