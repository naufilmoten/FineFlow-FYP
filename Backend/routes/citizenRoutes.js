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

const getCitizenByCnic = async (citizen_cnic) => {
  return await Citizen.findOne({ citizen_cnic });
};


const createCitizen = async (citizenData) => {
  const newCitizen = new Citizen(citizenData);
  newCitizen.citizen_id = newCitizen._id; // Assign the generated ID to citizen_id
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

// Helper function to send error responses
const handleErrorResponse = (res, err, defaultMessage) => {
  console.error(err); // Log the error for debugging
  res.status(500).json({ message: defaultMessage, error: err.message });
};

// Controller Functions (Handle Requests and Responses)

// Get All Citizens
router.get('/', async (req, res) => {
  try {
    const citizens = await getAllCitizens();
    res.status(200).json(citizens);
  } catch (err) {
    handleErrorResponse(res, err, 'Error fetching citizens');
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
    handleErrorResponse(res, err, 'Error fetching citizen');
  }
});

router.get('/cnic/:citizen_cnic', async (req, res) => {
  const citizen_cnic = req.params.citizen_cnic;
  try {
    const citizen = await getCitizenByCnic(citizen_cnic);
    if (citizen) {
      res.status(200).json(citizen);
    } else {
      res.status(404).json({ message: 'Citizen not found' });
    }
  } catch (err) {
    handleErrorResponse(res, err, 'Error fetching citizen by CNIC');
  }
});

// Post (Create) New Citizen
router.post('/', async (req, res) => {
  const citizenData = req.body;

  // Check for existing citizen based on CNIC, username, or Ethereum account_id
  const existingCitizen = await Citizen.findOne({
    $or: [
      { citizen_cnic: citizenData.citizen_cnic },
      { citizen_username: citizenData.citizen_username }
    ]
  });

  if (existingCitizen) {
    return res.status(400).json({ message: 'Duplicate CNIC or username' });
  }

  if (citizenData.account_id) {
    const existingAccount = await Citizen.findOne({ account_id: citizenData.account_id });
    if (existingAccount) {
      return res.status(400).json({ message: 'Duplicate account_id (Ethereum Account)' });
    }
  }

  try {
    const newCitizen = await createCitizen(citizenData);
    res.status(201).json(newCitizen);
  } catch (err) {
    handleErrorResponse(res, err, 'Error creating citizen');
  }
});

// Update Citizen by ID
router.put('/:citizen_id', async (req, res) => {
  const citizen_id = req.params.citizen_id;
  const citizenData = req.body;

  // Check if the new account_id is unique (in case it's being updated)
  if (citizenData.account_id) {
    const existingAccount = await Citizen.findOne({
      account_id: citizenData.account_id,
      citizen_id: { $ne: citizen_id } // Ensures it's not the same citizen
    });
    if (existingAccount) {
      return res.status(400).json({ message: 'Duplicate account_id (Ethereum Account)' });
    }
  }

  try {
    const updatedCitizen = await updateCitizen(citizen_id, citizenData);
    if (updatedCitizen) {
      res.status(200).json(updatedCitizen);
    } else {
      res.status(404).json({ message: 'Citizen not found' });
    }
  } catch (err) {
    handleErrorResponse(res, err, 'Error updating citizen');
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
    handleErrorResponse(res, err, 'Error deleting citizen');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { citizen_cnic, citizen_password } = req.body;
  try {
    const citizen = await Citizen.findOne({ citizen_cnic });
    if (citizen && citizen.citizen_password === citizen_password) {
      res.status(200).json({ 
        message: 'Login successful', 
        citizen_id: citizen.citizen_id // Include citizen_id in the response
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' });
  }
});


// Sign Up
router.post('/signup', async (req, res) => {
  const citizenData = req.body;

  // Check for duplicates before proceeding
  const existingCitizen = await Citizen.findOne({
    $or: [
      { citizen_cnic: citizenData.citizen_cnic },
      { citizen_username: citizenData.citizen_username }
    ]
  });

  if (existingCitizen) {
    return res.status(400).json({ message: 'Citizen with this CNIC or username already exists' });
  }

  try {
    const newCitizen = await createCitizen(citizenData);
    res.status(201).json(newCitizen);
  } catch (err) {
    handleErrorResponse(res, err, 'Error signing up');
  }
});

module.exports = router;
