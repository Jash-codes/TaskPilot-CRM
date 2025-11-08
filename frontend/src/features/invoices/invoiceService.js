import axios from 'axios';

const API_URL = 'http://localhost:5001/api/invoices/';

// Get the user's token from localStorage
const getToken = (getState) => {
  const { auth } = getState();
  if (auth && auth.user) {
    return auth.user.token;
  }
  return null;
};

// Create new invoice
const createInvoice = async (invoiceData, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, invoiceData, config);
  return response.data;
};

// Get user invoices
const getInvoices = async (thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update invoice (e.g., mark as paid)
const updateInvoice = async ({ id, status }, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + id, { status }, config);
  return response.data;
};

const invoiceService = {
  createInvoice,
  getInvoices,
  updateInvoice,
  // We'll add getById and delete later if needed
};

export default invoiceService;