// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for the token in the 'Authorization' header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (it's in the format "Bearer TOKEN")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user from the token's ID and attach it to the request
      // We exclude the password from the user object
      req.user = await User.findById(decoded.id).select('-password');

      // Move on to the next function (the actual controller)
      next();
    } catch (error) {
      console.error(error);
      res.status(401); // 401: Unauthorized
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };