const asyncHandler = require('express-async-handler');
const Client = require('../models/clientModel');
const fs = require('fs');
const csvParser = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');

// @desc    Get all clients for the logged-in user
// @route   GET /api/clients
// @access  Private
const getClients = asyncHandler(async (req, res) => {
  // We can get req.user.id because our 'protect' middleware adds the user to the request
  const clients = await Client.find({ user: req.user._id });
  res.json(clients);
});

// @desc    Create a new client
// @route   POST /api/clients
// @access  Private
const createClient = asyncHandler(async (req, res) => {
  const { name, email, phone, company, notes } = req.body;

  if (!name || !email) {
    res.status(400);
    throw new Error('Please provide name and email');
  }

  const client = new Client({
    user: req.user._id, // Link the client to the logged-in user
    name,
    email,
    phone,
    company,
    notes,
  });

  const createdClient = await client.save();
  res.status(201).json(createdClient);
});

// @desc    Get a single client by ID
// @route   GET /api/clients/:id
// @access  Private
const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (client) {
    // Check if the client belongs to the logged-in user
    if (client.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to view this client');
    }
    res.json(client);
  } else {
    res.status(404);
    throw new Error('Client not found');
  }
});

// @desc    Update a client
// @route   PUT /api/clients/:id
// @access  Private
const updateClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (client) {
    // Check if client belongs to the logged-in user
    if (client.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this client');
    }

    // Update the fields
    client.name = req.body.name || client.name;
    client.email = req.body.email || client.email;
    client.phone = req.body.phone || client.phone;
    client.company = req.body.company || client.company;
    client.notes = req.body.notes || client.notes;

    const updatedClient = await client.save();
    res.json(updatedClient);
  } else {
    res.status(404);
    throw new Error('Client not found');
  }
});

// @desc    Delete a client
// @route   DELETE /api/clients/:id
// @access  Private
const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (client) {
    // Check if client belongs to the logged-in user
    if (client.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this client');
    }

    await client.deleteOne(); // Use deleteOne()
    res.json({ message: 'Client removed' });
  } else {
    res.status(404);
    throw new Error('Client not found');
  }
});

// --- NEW FUNCTIONS ---

// @desc    Export clients to CSV
// @route   GET /api/clients/export
// @access  Private
const exportClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({ user: req.user._id }).lean(); // .lean() is faster
  const filePath = `uploads/clients-${req.user._id}.csv`;

  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: 'name', title: 'Name' },
      { id: 'email', title: 'Email' },
      { id: 'phone', title: 'Phone' },
      { id: 'company', title: 'Company' },
      { id: 'notes', title: 'Notes' },
    ],
  });

  await csvWriter.writeRecords(clients);

  res.download(filePath, 'clients.csv', (err) => {
    if (err) {
      console.error(err);
    }
    // Clean up the temp file after download
    fs.unlinkSync(filePath);
  });
});

// @desc    Import clients from CSV
// @route   POST /api/clients/import
// @access  Private
const importClients = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  const results = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      // Clean up the uploaded file
      fs.unlinkSync(filePath);

      // Map results to Client model, adding the logged-in user's ID
      const newClients = results.map((client) => ({
        ...client,
        user: req.user._id,
      }));

      try {
        const insertedClients = await Client.insertMany(newClients, { ordered: false });
        res.status(201).json({
          message: `${insertedClients.length} clients imported successfully`,
          count: insertedClients.length,
        });
      } catch (error) {
        res.status(400).json({
          message: `Error importing clients. ${error.writeErrors?.length || 0} duplicates found.`,
          error: error.message,
        });
      }
    });
});


module.exports = {
  getClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient,
  exportClients, // <-- ADDED
  importClients, // <-- ADDED
};