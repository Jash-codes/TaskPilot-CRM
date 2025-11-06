// routes/clientRoutes.js

const express = require('express');
const router = express.Router();
const {
  getClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient,
} = require('../controllers/clientController');
const { protect } = require('../middleware/authMiddleware');

// This line applies the 'protect' middleware to ALL routes in this file
router.use(protect);

// Routes for /api/clients
router.route('/').get(getClients).post(createClient);

// Routes for /api/clients/:id
router
  .route('/:id')
  .get(getClientById)
  .put(updateClient)
  .delete(deleteClient);

module.exports = router;