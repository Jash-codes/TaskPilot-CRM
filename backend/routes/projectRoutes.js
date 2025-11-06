// routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  addTask,
  updateTask,
  deleteTask,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// This applies the 'protect' middleware to ALL routes in this file
router.use(protect);

// Routes for /api/projects
router.route('/').get(getProjects).post(createProject);

// Routes for /api/projects/:id
router
  .route('/:id')
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

// Routes for tasks
router.route('/:id/tasks').post(addTask);
router.route('/:id/tasks/:taskId').put(updateTask).delete(deleteTask);

module.exports = router;