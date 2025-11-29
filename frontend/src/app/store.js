import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import projectReducer from '../features/projects/projectSlice'; // <-- Import
import clientReducer from '../features/clients/clientSlice';   // <-- Import

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer, // <-- Add
    clients: clientReducer,   // <-- Add
  },
});