// server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const projectRoutes = require('./routes/projectRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes'); // Import user routes

// Load environment variables from .env file
dotenv.config();

// Connect to database
connectDB();

// Initialize the app
const app = express();

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing of JSON in request body

// A simple test route
app.get('/', (req, res) => {
  res.send('Freelancer CRM Backend is running...');
});

// Mount the routes
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes); 
app.use('/api/projects', projectRoutes);
app.use('/api/invoices', invoiceRoutes);// All routes in userRoutes will be prefixed with /api/users

// Get the port from environment variables, with a default
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`.yellow.bold
  );
});