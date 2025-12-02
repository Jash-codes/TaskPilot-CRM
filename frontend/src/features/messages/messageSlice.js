import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import messageService from './messageService';

const initialState = {
  messages: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get Messages
export const getMessages = createAsyncThunk(
  'messages/getAll',
  async (clientId, thunkAPI) => {
    try {
      return await messageService.getMessages(clientId, thunkAPI);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

// Send Message
export const sendMessage = createAsyncThunk(
  'messages/send',
  async (messageData, thunkAPI) => {
    try {
      return await messageService.sendMessage(messageData, thunkAPI);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    resetMessages: (state) => initialState, // Clear chat when switching
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => { state.isLoading = true; })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload); // Add new msg to UI immediately
      });
  },
});

export const { resetMessages } = messageSlice.actions;
export default messageSlice.reducer;