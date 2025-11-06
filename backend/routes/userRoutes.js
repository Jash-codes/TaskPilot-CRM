// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/userController');

// This route is for registering a new user
router.post('/', registerUser);

// This route is for logging in
router.post('/login', authUser);

module.exports = router;