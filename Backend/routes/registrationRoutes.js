// const express = require('express');
// const router = express.Router();
// const Registration = require('../model/registration');

// // Service Functions (Business Logic)
// const getAllRegistrations = async () => {
//   return await Registration.find({});
// };

// const getRegistrationById = async (registration_id) => {
//   return await Registration.findOne({ registration_id });
// };

// const createRegistration = async (registrationData) => {
//   const newRegistration = new Registration(registrationData);
//   return await newRegistration.save();
// };

// const updateRegistration = async (registration_id, registrationData) => {
//   return await Registration.findOneAndUpdate(
//     { registration_id },
//     registrationData,
//     { new: true }
//   );
// };

// const deleteRegistration = async (registration_id) => {
//   return await Registration.findOneAndDelete({ registration_id });
// };

// // Controller Functions (Handle Requests and Responses)
// // Get All Registrations
// router.get('/', async (req, res) => {
//   try {
//     const registrations = await getAllRegistrations();
//     res.status(200).json(registrations);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching registrations', error: err });
//   }
// });

// // Get Registration by ID
// router.get('/:registration_id', async (req, res) => {
//   const registration_id = req.params.registration_id;
//   try {
//     const registration = await getRegistrationById(registration_id);
//     if (registration) {
//       res.status(200).json(registration);
//     } else {
//       res.status(404).json({ message: 'Registration not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching registration', error: err });
//   }
// });

// // Post (Create) New Registration
// router.post('/', async (req, res) => {
//   const registrationData = req.body;
//   try {
//     const newRegistration = await createRegistration(registrationData);
//     res.status(201).json(newRegistration);
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating registration', error: err });
//   }
// });

// // Update Registration by ID
// router.put('/:registration_id', async (req, res) => {
//   const registration_id = req.params.registration_id;
//   const registrationData = req.body;
//   try {
//     const updatedRegistration = await updateRegistration(registration_id, registrationData);
//     if (updatedRegistration) {
//       res.status(200).json(updatedRegistration);
//     } else {
//       res.status(404).json({ message: 'Registration not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating registration', error: err });
//   }
// });

// // Delete Registration by ID
// router.delete('/:registration_id', async (req, res) => {
//   const registration_id = req.params.registration_id;
//   try {
//     const deletedRegistration = await deleteRegistration(registration_id);
//     if (deletedRegistration) {
//       res.status(200).json({ message: 'Registration deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'Registration not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting registration', error: err });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const Registration = require('../model/registration');
const authenticateJWT = require('../middleware/auth'); // Ensure this middleware is implemented

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
// Protect all routes with JWT authentication
router.use(authenticateJWT);

// Get All Registrations - Public Access
router.get('/', async (req, res) => {
  try {
    const registrations = await getAllRegistrations();
    res.status(200).json(registrations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching registrations', error: err });
  }
});

// Get Registration by ID - Authenticated Route
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

// Post (Create) New Registration - Authenticated and Role-based Authorization
router.post('/', async (req, res) => {
  const registrationData = req.body;

  // You can add role-based authorization checks here
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden: Admins only' });
  }

  try {
    const newRegistration = await createRegistration(registrationData);
    res.status(201).json(newRegistration);
  } catch (err) {
    res.status(500).json({ message: 'Error creating registration', error: err });
  }
});

// Update Registration by ID - Authenticated and Role-based Authorization
router.put('/:registration_id', async (req, res) => {
  const registration_id = req.params.registration_id;
  const registrationData = req.body;

  // Check for admin role
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden: Admins only' });
  }

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

// Delete Registration by ID - Authenticated and Role-based Authorization
router.delete('/:registration_id', async (req, res) => {
  const registration_id = req.params.registration_id;

  // Check for admin role
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden: Admins only' });
  }

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

module.exports = router;
