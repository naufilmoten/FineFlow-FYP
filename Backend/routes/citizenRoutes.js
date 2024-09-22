const express = require('express');
const router = express.Router();
const Citizen = require('../model/citizen');

// Service Functions (Business Logic)
const getAllCitizens = async () => {
  return await Citizen.find({});
};

const getCitizenById = async (citizen_id) => {
  return await Citizen.findOne({ citizen_id });
};

const createCitizen = async (citizenData) => {
  const newCitizen = new Citizen(citizenData);
  return await newCitizen.save();
};

const updateCitizen = async (citizen_id, citizenData) => {
  return await Citizen.findOneAndUpdate(
    { citizen_id },
    citizenData,
    { new: true }
  );
};

const deleteCitizen = async (citizen_id) => {
  return await Citizen.findOneAndDelete({ citizen_id });
};

// Controller Functions (Handle Requests and Responses)
// Get All Citizens
router.get('/', async (req, res) => {
  try {
    const citizens = await getAllCitizens();
    res.status(200).json(citizens);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching citizens', error: err });
  }
});

// Get Citizen by ID
router.get('/:citizen_id', async (req, res) => {
  const citizen_id = req.params.citizen_id;
  try {
    const citizen = await getCitizenById(citizen_id);
    if (citizen) {
      res.status(200).json(citizen);
    } else {
      res.status(404).json({ message: 'Citizen not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching citizen', error: err });
  }
});

// Post (Create) New Citizen
router.post('/', async (req, res) => {
  const citizenData = req.body;
  try {
    const newCitizen = await createCitizen(citizenData);
    res.status(201).json(newCitizen);
  } catch (err) {
    res.status(500).json({ message: 'Error creating citizen', error: err });
  }
});

// Update Citizen by ID
router.put('/:citizen_id', async (req, res) => {
  const citizen_id = req.params.citizen_id;
  const citizenData = req.body;
  try {
    const updatedCitizen = await updateCitizen(citizen_id, citizenData);
    if (updatedCitizen) {
      res.status(200).json(updatedCitizen);
    } else {
      res.status(404).json({ message: 'Citizen not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating citizen', error: err });
  }
});

// Delete Citizen by ID
router.delete('/:citizen_id', async (req, res) => {
  const citizen_id = req.params.citizen_id;
  try {
    const deletedCitizen = await deleteCitizen(citizen_id);
    if (deletedCitizen) {
      res.status(200).json({ message: 'Citizen deleted successfully' });
    } else {
      res.status(404).json({ message: 'Citizen not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting citizen', error: err });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { citizen_cnic, citizen_password } = req.body;
  try {
    const citizen = await Citizen.findOne({ citizen_cnic });
    if (citizen && citizen.citizen_password === citizen_password) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
});

// Sign Up
router.post('/signup', async (req, res) => {
  const citizenData = req.body;
  try {
    const newCitizen = await createCitizen(citizenData);
    res.status(201).json(newCitizen);
  } catch (err) {
    res.status(500).json({ message: 'Error signing up', error: err });
  }
});

module.exports = router;
