import axios from 'axios';

const API_URL = 'http://localhost:5001/api/clients/';

const getToken = (getState) => {
  const { auth } = getState();
  return auth.user?.token;
};

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

const clientService = {
  getClients,
};

export default clientService;