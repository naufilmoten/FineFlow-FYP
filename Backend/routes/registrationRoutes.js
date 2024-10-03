const express = require('express');
const router = express.Router();
const Registration = require('../model/registration');

// Service Functions (Business Logic)
const getAllRegistrations = async () => {
  return await Registration.find({});
};

const getRegistrationById = async (registration_id) => {
  return await Registration.findOne({ registration_id });
};

const createRegistration = async (registrationData) => {
  const newRegistration = new Registration(registrationData);
  return await newRegistration.save();
};

const updateRegistration = async (registration_id, registrationData) => {
  return await Registration.findOneAndUpdate(
    { registration_id },
    registrationData,
    { new: true }
  );
};

const deleteRegistration = async (registration_id) => {
  return await Registration.findOneAndDelete({ registration_id });
};

// Controller Functions (Handle Requests and Responses)
// Get All Registrations
router.get('/', async (req, res) => {
  try {
    const registrations = await getAllRegistrations();
    res.status(200).json(registrations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching registrations', error: err });
  }
});

// Get Registration by ID
router.get('/:registration_id', async (req, res) => {
  const registration_id = req.params.registration_id;
  try {
    const registration = await getRegistrationById(registration_id);
    if (registration) {
      res.status(200).json(registration);
    } else {
      res.status(404).json({ message: 'Registration not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching registration', error: err });
  }
});

// Post (Create) New Registration
router.post('/', async (req, res) => {
  const registrationData = req.body;
  try {
    const newRegistration = await createRegistration(registrationData);
    res.status(201).json(newRegistration);
  } catch (err) {
    res.status(500).json({ message: 'Error creating registration', error: err });
  }
});

// Update Registration by ID
router.put('/:registration_id', async (req, res) => {
  const registration_id = req.params.registration_id;
  const registrationData = req.body;
  try {
    const updatedRegistration = await updateRegistration(registration_id, registrationData);
    if (updatedRegistration) {
      res.status(200).json(updatedRegistration);
    } else {
      res.status(404).json({ message: 'Registration not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating registration', error: err });
  }
});

// Delete Registration by ID
router.delete('/:registration_id', async (req, res) => {
  const registration_id = req.params.registration_id;
  try {
    const deletedRegistration = await deleteRegistration(registration_id);
    if (deletedRegistration) {
      res.status(200).json({ message: 'Registration deleted successfully' });
    } else {
      res.status(404).json({ message: 'Registration not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting registration', error: err });
  }
});

// Get Registrations by Owner CNIC
router.get('/cnic/:owner_cnic', async (req, res) => {
  const owner_cnic = req.params.owner_cnic;
  try {
    const registrations = await Registration.find({ owner_cnic });
    if (registrations.length > 0) {
      res.status(200).json(registrations);
    } else {
      res.status(404).json({ message: 'No registrations found for this CNIC' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching registrations', error: err });
  }
});

module.exports = router;
