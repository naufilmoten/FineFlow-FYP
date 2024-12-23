// const express = require('express');
// const router = express.Router();
// const Warden = require('../model/warden');

// // Service Functions (Business Logic)
// const getAllWardens = async () => {
//   return await Warden.find({});
// };

// const getWardenById = async (warden_id) => {
//   return await Warden.findOne({ warden_id });
// };

// const createWarden = async (wardenData) => {
//   const newWarden = new Warden(wardenData);
//   return await newWarden.save();
// };

// const updateWarden = async (warden_id, wardenData) => {
//   return await Warden.findOneAndUpdate(
//     { warden_id },
//     wardenData,
//     { new: true }
//   );
// };

// const deleteWarden = async (warden_id) => {
//   return await Warden.findOneAndDelete({ warden_id });
// };

// // Helper function to send error responses
// const handleErrorResponse = (res, err, defaultMessage) => {
//   console.error(err); // Log the error for debugging
//   res.status(500).json({ message: defaultMessage, error: err.message });
// };

// // Controller Functions (Handle Requests and Responses)
// // Get All Wardens
// router.get('/', async (req, res) => {
//   try {
//     const wardens = await getAllWardens();
//     res.status(200).json(wardens);
//   } catch (err) {
//     handleErrorResponse(res, err, 'Error fetching wardens');
//   }
// });

// // Get Warden by ID
// router.get('/:warden_id', async (req, res) => {
//   const warden_id = req.params.warden_id;
//   try {
//     const warden = await getWardenById(warden_id);
//     if (warden) {
//       res.status(200).json(warden);
//     } else {
//       res.status(404).json({ message: 'Warden not found' });
//     }
//   } catch (err) {
//     handleErrorResponse(res, err, 'Error fetching warden');
//   }
// });

// // Post (Create) New Warden
// router.post('/', async (req, res) => {
//   const wardenData = req.body;
//   try {
//     const newWarden = await createWarden(wardenData);
//     res.status(201).json(newWarden);
//   } catch (err) {
//     handleErrorResponse(res, err, 'Error creating warden');
//   }
// });

// // Update Warden by ID
// router.put('/:warden_id', async (req, res) => {
//   const warden_id = req.params.warden_id;
//   const wardenData = req.body;
//   try {
//     const updatedWarden = await updateWarden(warden_id, wardenData);
//     if (updatedWarden) {
//       res.status(200).json(updatedWarden);
//     } else {
//       res.status(404).json({ message: 'Warden not found' });
//     }
//   } catch (err) {
//     handleErrorResponse(res, err, 'Error updating warden');
//   }
// });

// // Delete Warden by ID
// router.delete('/:warden_id', async (req, res) => {
//   const warden_id = req.params.warden_id;
//   try {
//     const deletedWarden = await deleteWarden(warden_id);
//     if (deletedWarden) {
//       res.status(200).json({ message: 'Warden deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'Warden not found' });
//     }
//   } catch (err) {
//     handleErrorResponse(res, err, 'Error deleting warden');
//   }
// });

// // // Login
// // router.post('/login', async (req, res) => {
// //   const { warden_cnic, warden_password } = req.body;
// //   try {
// //     const warden = await Warden.findOne({ warden_cnic });
// //     if (warden && warden.warden_password === warden_password) {
// //       res.status(200).json({ message: 'Login successful' });
// //     } else {
// //       res.status(401).json({ message: 'Invalid credentials' });
// //     }
// //   } catch (err) {
// //     handleErrorResponse(res, err, 'Error logging in');
// //   }
// // });


// router.post('/login', async (req, res) => {
//   const { warden_cnic, warden_password } = req.body;
//   try {
//     const warden = await Warden.findOne({ warden_cnic });
//     if (warden && warden.warden_password === warden_password) {
//       res.status(200).json({ message: 'Login successful' });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: 'Error logging in' });
//   }
// });


// module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../middleware/auth');
const Warden = require('../model/warden');

// Login Route - Public
router.post('/login', async (req, res) => {
  const { warden_cnic, warden_password } = req.body;

  try {
    const warden = await Warden.findOne({ warden_cnic });

    if (warden && warden.warden_password === warden_password) {
      const token = jwt.sign({ id: warden.warden_id, role: 'warden' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({
        message: 'Login successful',
        warden_id: warden.warden_id,
        token,
      });
    } else {
      return res.status(403).json({ message: 'Invalid CNIC or password' });
    }
  } catch (err) {
    handleErrorResponse(res, err, 'Error logging in');
  }
});

// Use the authenticateJWT middleware to protect these routes
router.use(authenticateJWT);

// Get All Wardens
router.get('/', async (req, res) => {
  try {
    const wardens = await getAllWardens();
    res.status(200).json(wardens);
  } catch (err) {
    handleErrorResponse(res, err, 'Error fetching wardens');
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
    handleErrorResponse(res, err, 'Error fetching warden');
  }
});

// Create New Warden
router.post('/', async (req, res) => {
  const wardenData = req.body;

  try {
    const existingWarden = await Warden.findOne({
      $or: [
        { warden_cnic: wardenData.warden_cnic },
        { warden_username: wardenData.warden_username }
      ]
    });

    if (existingWarden) {
      return res.status(400).json({ message: 'Duplicate warden_cnic or warden_username' });
    }

    const newWarden = await createWarden(wardenData);
    res.status(201).json(newWarden);
  } catch (err) {
    handleErrorResponse(res, err, 'Error creating warden');
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
    handleErrorResponse(res, err, 'Error updating warden');
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
    handleErrorResponse(res, err, 'Error deleting warden');
  }
});

// Service Functions
const getAllWardens = async () => {
  return await Warden.find({});
};

const getWardenById = async (warden_id) => {
  return await Warden.findOne({ warden_id });
};

const createWarden = async (wardenData) => {
  const newWarden = new Warden(wardenData);
  newWarden.warden_id = newWarden._id; 
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

const handleErrorResponse = (res, err, defaultMessage) => {
  console.error(err);
  res.status(500).json({ message: defaultMessage, error: err.message });
};

module.exports = router;
