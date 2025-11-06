// controllers/projectController.js

const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');
const Client = require('../models/clientModel'); // We'll need this to validate client exists

// @desc    Get all projects for the logged-in user
// @route   GET /api/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  // Find all projects belonging to the logged-in user
  const projects = await Project.find({ user: req.user._id }).populate(
    'client',
    'name'
  ); // Populate client's name
  res.json(projects);
});

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { title, scope, budget, deadline, status, clientId } = req.body;

  if (!title || !scope || !clientId) {
    res.status(400);
    throw new Error('Please provide title, scope, and client ID');
  }

  // Check if the client exists and belongs to the user
  const client = await Client.findById(clientId);
  if (!client || client.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Client not found or user not authorized');
  }

  const project = new Project({
    user: req.user._id,
    client: clientId,
    title,
    scope,
    budget,
    deadline,
    status,
    tasks: [], // Start with an empty task list
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
});

// @desc    Get a single project by ID
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate(
    'client',
    'name email'
  ); // Get more client details

  if (project) {
    // Check if the project belongs to the logged-in user
    if (project.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to view this project');
    }
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    // Check if project belongs to the logged-in user
    if (project.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this project');
    }

    // Update the fields
    project.title = req.body.title || project.title;
    project.scope = req.body.scope || project.scope;
    project.budget = req.body.budget || project.budget;
    project.deadline = req.body.deadline || project.deadline;
    project.status = req.body.status || project.status;

    // We don't update tasks here, we'll use a separate endpoint for that
    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    // Check if project belongs to the logged-in user
    if (project.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this project');
    }

    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// --- Task Management ---

// @desc    Add a task to a project
// @route   POST /api/projects/:id/tasks
// @access  Private
const addTask = asyncHandler(async (req, res) => {
  const { name, dueDate } = req.body;
  const project = await Project.findById(req.params.id);

  if (project && project.user.toString() === req.user._id.toString()) {
    const task = {
      name,
      dueDate,
      isCompleted: false,
    };
    project.tasks.push(task);
    await project.save();
    res.status(201).json(project.tasks[project.tasks.length - 1]); // Return the new task
  } else {
    res.status(404);
    throw new Error('Project not found or user not authorized');
  }
});

// @desc    Update a task (e.g., mark as complete)
// @route   PUT /api/projects/:id/tasks/:taskId
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project && project.user.toString() === req.user._id.toString()) {
    const task = project.tasks.id(req.params.taskId);
    if (task) {
      task.name = req.body.name || task.name;
      task.dueDate = req.body.dueDate || task.dueDate;
      task.isCompleted = req.body.isCompleted ?? task.isCompleted; // Allow setting to false
      await project.save();
      res.json(task);
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  } else {
    res.status(404);
    throw new Error('Project not found or user not authorized');
  }
});

// @desc    Delete a task
// @route   DELETE /api/projects/:id/tasks/:taskId
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project && project.user.toString() === req.user._id.toString()) {
    const task = project.tasks.id(req.params.taskId);
    if (task) {
      task.deleteOne(); // Mongoose subdocument deletion
      await project.save();
      res.json({ message: 'Task removed' });
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  } else {
    res.status(404);
    throw new Error('Project not found or user not authorized');
  }
});

module.exports = {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  addTask,
  updateTask,
  deleteTask,
};