import axios from 'axios';

const API_URL = 'http://localhost:5001/api/messages/';

const getToken = (getState) => {
  const { auth } = getState();
  return auth.user?.token;
};

// Get messages for a specific client
const getMessages = async (clientId, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL + clientId, config);
  return response.data;
};

// Send a message
const sendMessage = async (messageData, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, messageData, config);
  return response.data;
};

const messageService = {
  getMessages,
  sendMessage,
};

export default messageService;