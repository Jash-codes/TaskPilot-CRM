import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import clientReducer from '../features/clients/clientSlice';
import projectReducer from '../features/projects/projectSlice'; 
import invoiceReducer from '../features/invoices/invoiceSlice';// 1. Import

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer,
    projects: projectReducer,
    invoices: invoiceReducer, // 2. Add project reducer
  },
});