import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientService from './clientService';

const initialState = {
  clients: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getClients = createAsyncThunk(
  'clients/getAll',
  async (_, thunkAPI) => {
    try {
      return await clientService.getClients(thunkAPI);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
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
      });
  },
});

export const { reset } = clientSlice.actions;
export default clientSlice.reducer;