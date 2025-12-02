const express = require('express');
const router = express.Router();
const { getMessages, sendMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/').post(sendMessage);
router.route('/:clientId').get(getMessages);

module.exports = router;