import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import invoiceService from './invoiceService';

const initialState = {
  invoices: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getInvoices = createAsyncThunk('invoices/getAll', async (_, thunkAPI) => {
  try { return await invoiceService.getInvoices(thunkAPI); }
  catch (error) { return thunkAPI.rejectWithValue(error.toString()); }
});

export const createInvoice = createAsyncThunk('invoices/create', async (data, thunkAPI) => {
  try { return await invoiceService.createInvoice(data, thunkAPI); }
  catch (error) { return thunkAPI.rejectWithValue(error.toString()); }
});

export const updateInvoice = createAsyncThunk('invoices/update', async (data, thunkAPI) => {
  try { return await invoiceService.updateInvoice(data, thunkAPI); }
  catch (error) { return thunkAPI.rejectWithValue(error.toString()); }
});

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInvoices.pending, (state) => { state.isLoading = true; })
      .addCase(getInvoices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.invoices = action.payload;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.invoices.push(action.payload);
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        const index = state.invoices.findIndex(i => i._id === action.payload._id);
        if (index !== -1) state.invoices[index] = action.payload;
      });
  },
});

export const { reset } = invoiceSlice.actions;
export default invoiceSlice.reducer;