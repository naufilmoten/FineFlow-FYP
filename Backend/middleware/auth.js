// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; // Use the secret from your environment variables

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.sendStatus(403); // Forbidden if no token is provided
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    
    req.user = user; // Attach the user information to the request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateJWT;
