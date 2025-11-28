import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // No user logged in initially
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    // We will add login/logout logic later in Day 1
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;