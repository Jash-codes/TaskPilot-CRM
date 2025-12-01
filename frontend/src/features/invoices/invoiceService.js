import axios from 'axios';

const API_URL = 'http://localhost:5001/api/invoices/';

const getToken = (getState) => {
  const { auth } = getState();
  return auth.user?.token;
};

// Get all invoices
const getInvoices = async (thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Create new invoice
const createInvoice = async (invoiceData, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, invoiceData, config);
  return response.data;
};

// Mark as Paid (Update Status)
const updateInvoice = async ({ id, status }, thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(API_URL + id, { status }, config);
  return response.data;
};

const invoiceService = {
  getInvoices,
  createInvoice,
  updateInvoice,
};

export default invoiceService;