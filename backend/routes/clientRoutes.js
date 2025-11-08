const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const {
  getClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient,
  exportClients, // <-- IMPORTED
  importClients, // <-- IMPORTED
} = require('../controllers/clientController');
const { protect } = require('../middleware/authMiddleware');

// Configure Multer for temp storage
const upload = multer({ dest: 'uploads/' });

// This line applies the 'protect' middleware to ALL routes in this file
router.use(protect);

// Routes for /api/clients
router.route('/').get(getClients).post(createClient);

// --- NEW ROUTES ---
router.route('/export').get(exportClients);
router.route('/import').post(upload.single('file'), importClients);
// 'file' is the name of the form field we'll use on the frontend

// Routes for /api/clients/:id
router
  .route('/:id')
  .get(getClientById)
  .put(updateClient)
  .delete(deleteClient);

module.exports = router;