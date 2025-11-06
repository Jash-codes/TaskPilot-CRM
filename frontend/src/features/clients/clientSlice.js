import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientService from './clientService';

const initialState = {
  clients: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new client
export const createClient = createAsyncThunk(
  'clients/create',
  async (clientData, thunkAPI) => {
    try {
      return await clientService.createClient(clientData, thunkAPI);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user clients
export const getClients = createAsyncThunk(
  'clients/getAll',
  async (_, thunkAPI) => {
    try {
      return await clientService.getClients(thunkAPI);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create Client
      .addCase(createClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients.push(action.payload); // Add new client to state
      })
      .addCase(createClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Clients
      .addCase(getClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients = action.payload; // Set all clients
      })
      .addCase(getClients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = clientSlice.actions;
export default clientSlice.reducer;