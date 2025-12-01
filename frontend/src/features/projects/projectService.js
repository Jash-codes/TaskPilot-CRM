import axios from 'axios';

const API_URL = 'http://localhost:5001/api/projects/';

const getToken = (getState) => {
  const { auth } = getState();
  return auth.user?.token;
};

// --- PROJECTS ---

const getProjects = async (thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const createProject = async (projectData, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, projectData, config);
  return response.data;
};

const getProject = async (projectId, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL + projectId, config);
  return response.data;
};

// --- THIS WAS MISSING ---
const updateProjectStatus = async (projectId, status, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(API_URL + projectId, { status }, config);
  return response.data;
};

// --- TASKS ---

const addTask = async (projectId, taskData, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL + projectId + '/tasks', taskData, config);
  return response.data;
};

const updateTask = async (projectId, taskId, taskData, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(API_URL + projectId + '/tasks/' + taskId, taskData, config);
  return response.data;
};

const deleteTask = async (projectId, taskId, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(API_URL + projectId + '/tasks/' + taskId, config);
  return response.data;
};

const projectService = {
  getProjects,
  createProject,
  getProject,
  updateProjectStatus, // <-- Now this is defined above
  addTask,
  updateTask,
  deleteTask,
};

export default projectService;