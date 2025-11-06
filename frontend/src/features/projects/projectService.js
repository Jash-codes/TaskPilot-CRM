import axios from 'axios';

const API_URL = 'http://localhost:5001/api/projects/';

// Get the user's token from localStorage
const getToken = (getState) => {
  const { auth } = getState();
  if (auth && auth.user) {
    return auth.user.token;
  }
  return null;
};

// Create new project
const createProject = async (projectData, thunkAPI) => {
  // ... (existing code, no changes) ...
  const token = getToken(thunkAPI.getState);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, projectData, config);
  return response.data;
};

// Get user projects
const getProjects = async (thunkAPI) => {
  // ... (existing code, no changes) ...
  const token = getToken(thunkAPI.getState);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// --- NEW FUNCTIONS ---

// Get single project
const getProjectById = async (projectId, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + projectId, config);
  return response.data;
};

// Add a task
const addTask = async ({ projectId, taskData }, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + projectId + '/tasks', taskData, config);
  return response.data;
};

// Update a task
const updateTask = async ({ projectId, taskId, taskData }, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + projectId + '/tasks/' + taskId, taskData, config);
  return response.data;
};

// Delete a task
const deleteTask = async ({ projectId, taskId }, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + projectId + '/tasks/' + taskId, config);
  return response.data; // This will just be { message: 'Task removed' }
};


const projectService = {
  createProject,
  getProjects,
  getProjectById, // Add new
  addTask,        // Add new
  updateTask,     // Add new
  deleteTask,     // Add new
};

export default projectService;