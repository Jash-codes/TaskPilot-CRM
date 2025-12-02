const express = require('express');
const router = express.Router();
const { registerUser, authUser, updateUserProfile } = require('../controllers/userController');

// --- THIS LINE WAS MISSING ---
const { protect } = require('../middleware/authMiddleware'); 

router.post('/', registerUser);
router.post('/login', authUser);

// Now 'protect' is defined and this will work
router.route('/profile').put(protect, updateUserProfile);

module.exports = router;