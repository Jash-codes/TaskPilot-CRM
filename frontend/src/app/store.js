import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import projectReducer from '../features/projects/projectSlice'; 
import clientReducer from '../features/clients/clientSlice';  
import invoiceReducer from '../features/invoices/invoiceSlice'; 
import messageReducer from '../features/messages/messageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer, 
    clients: clientReducer, 
    invoices: invoiceReducer, 
    messages: messageReducer,
  },
});