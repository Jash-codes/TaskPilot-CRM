import axios from 'axios';

const API_URL = 'http://localhost:5001/api/clients/';

// Get the user's token from localStorage
// We need to send this with every protected request
const getToken = (getState) => {
  const { auth } = getState();
  if (auth && auth.user) {
    return auth.user.token;
  }
  return null;
};

// Create new client
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

// (We will add update and delete later)

const clientService = {
  createClient,
  getClients,
};

export default clientService;