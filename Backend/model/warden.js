const mongoose = require('mongoose');

// Define the schema for warden
const wardenSchema = new mongoose.Schema({
  warden_id: {
    type: String,
<<<<<<< HEAD
    required: true,
    unique: true
=======
    unique: true,
>>>>>>> hammad1
  },
  warden_name: {
    type: String,
    required: true
  },
  warden_cnic: {
    type: String,
<<<<<<< HEAD
    required: true
=======
    required: true,
    unique: true
>>>>>>> hammad1
  },
  warden_username: {
    type: String,
    required: true,
    unique: true
  },
  warden_password: {
    type: String,
    required: true
<<<<<<< HEAD
=======
  },
  account_index: {
    type: Number,
    unique: true,
>>>>>>> hammad1
  }
});

// Create the model
const Warden = mongoose.model('Warden', wardenSchema);

// Export the model so it can be used in other parts of the app
module.exports = Warden;
