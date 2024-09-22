const express = require('express');
const router = express.Router();
const Warden = require('../model/warden');

// Service Functions (Business Logic)
const getAllWardens = async () => {
  return await Warden.find({});
};

const getWardenById = async (warden_id) => {
  return await Warden.findOne({ warden_id });
};

const createWarden = async (wardenData) => {
  const newWarden = new Warden(wardenData);
  return await newWarden.save();
};

const updateWarden = async (warden_id, wardenData) => {
  return await Warden.findOneAndUpdate(
    { warden_id },
    wardenData,
    { new: true }
  );
};

const deleteWarden = async (warden_id) => {
  return await Warden.findOneAndDelete({ warden_id });
};

// Controller Functions (Handle Requests and Responses)
// Get All Wardens
router.get('/', async (req, res) => {
  try {
    const wardens = await getAllWardens();
    res.status(200).json(wardens);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching wardens', error: err });
  }
});

// Get Warden by ID
router.get('/:warden_id', async (req, res) => {
  const warden_id = req.params.warden_id;
  try {
    const warden = await getWardenById(warden_id);
    if (warden) {
      res.status(200).json(warden);
    } else {
      res.status(404).json({ message: 'Warden not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching warden', error: err });
  }
});

// Post (Create) New Warden
router.post('/', async (req, res) => {
  const wardenData = req.body;
  try {
    const newWarden = await createWarden(wardenData);
    res.status(201).json(newWarden);
  } catch (err) {
    res.status(500).json({ message: 'Error creating warden', error: err });
  }
});

// Update Warden by ID
router.put('/:warden_id', async (req, res) => {
  const warden_id = req.params.warden_id;
  const wardenData = req.body;
  try {
    const updatedWarden = await updateWarden(warden_id, wardenData);
    if (updatedWarden) {
      res.status(200).json(updatedWarden);
    } else {
      res.status(404).json({ message: 'Warden not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating warden', error: err });
  }
});

// Delete Warden by ID
router.delete('/:warden_id', async (req, res) => {
  const warden_id = req.params.warden_id;
  try {
    const deletedWarden = await deleteWarden(warden_id);
    if (deletedWarden) {
      res.status(200).json({ message: 'Warden deleted successfully' });
    } else {
      res.status(404).json({ message: 'Warden not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting warden', error: err });
  }
});

module.exports = router;
