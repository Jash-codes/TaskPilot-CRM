import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientService from './clientService';
import { toast } from 'react-toastify'; // Import toast

const initialState = {
  clients: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new client
export const createClient = createAsyncThunk(
  // ... (existing code, no changes) ...
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
  // ... (existing code, no changes) ...
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

// --- NEW THUNKS ---

// Export clients
export const exportClients = createAsyncThunk(
  'clients/export',
  async (_, thunkAPI) => {
    try {
      const data = await clientService.exportClients(thunkAPI);
      // Create a link to trigger the download
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'clients.csv'); // File name
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up
      toast.success('Clients exported successfully!');
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

// Import clients
export const importClients = createAsyncThunk(
  'clients/import',
  async (formData, thunkAPI) => {
    try {
      const response = await clientService.importClients(formData, thunkAPI);
      thunkAPI.dispatch(getClients()); // Refresh the client list
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message); // Show error toast
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
      // ... (existing createClient cases) ...
      .addCase(createClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients.push(action.payload);
      })
      .addCase(createClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // ... (existing getClients cases) ...
      .addCase(getClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients = action.payload;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // --- NEW CASES (for loading spinners) ---
      .addCase(exportClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(exportClients.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(exportClients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(importClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importClients.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(importClients.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { reset } = clientSlice.actions;
export default clientSlice.reducer;