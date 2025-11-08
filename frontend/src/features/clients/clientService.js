import axios from 'axios';

const API_URL = 'http://localhost:5001/api/clients/';

// Get the user's token from localStorage
const getToken = (getState) => {
  const { auth } = getState();
  if (auth && auth.user) {
    return auth.user.token;
  }
  return null;
};

// Create new client
const createClient = async (clientData, thunkAPI) => {
  // ... (existing code, no changes) ...
  const token = getToken(thunkAPI.getState);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, clientData, config);
  return response.data;
};

// Get user clients
const getClients = async (thunkAPI) => {
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

// Export clients as CSV
const exportClients = async (thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: 'blob', // This is important for file downloads
  };
  const response = await axios.get(API_URL + 'export', config);
  return response.data; // This will be the file blob
};

// Import clients from CSV
const importClients = async (formData, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // Important for file uploads
    },
  };
  const response = await axios.post(API_URL + 'import', formData, config);
  return response.data;
};


const clientService = {
  createClient,
  getClients,
  exportClients, // <-- ADDED
  importClients, // <-- ADDED
};

export default clientService;