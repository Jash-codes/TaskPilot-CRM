import axios from 'axios';

const API_URL = 'http://localhost:5001/api/clients/';

const getToken = (getState) => {
  const { auth } = getState();
  return auth.user?.token;
};

// Get user clients
const getClients = async (thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Create new client (ADDED THIS)
const createClient = async (clientData, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, clientData, config);
  return response.data;
};

const clientService = {
  getClients,
  createClient, // <-- Export it
};

export default clientService;