const asyncHandler = require('express-async-handler');
const Invoice = require('../models/invoiceModel');
const Project = require('../models/projectModel'); // To validate project

// @desc    Get all invoices for the logged-in user
// @route   GET /api/invoices
// @access  Private
const getInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find({ user: req.user._id })
    .populate('client', 'name')
    .populate('project', 'title');
  res.json(invoices);
});

// @desc    Create a new invoice
// @route   POST /api/invoices
// @access  Private
const createInvoice = asyncHandler(async (req, res) => {
  const {
    clientId,
    projectId,
    invoiceNumber,
    dueDate,
    items,
    totalAmount,
  } = req.body;

  if (!clientId || !projectId || !invoiceNumber || !dueDate || !items || !totalAmount) {
    res.status(400);
    throw new Error('Please provide all required invoice fields');
  }

  // Check if the project exists and belongs to the user
  const project = await Project.findById(projectId);
  if (!project || project.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Project not found or user not authorized');
  }

  const invoice = new Invoice({
    user: req.user._id,
    client: clientId,
    project: projectId,
    invoiceNumber,
    dueDate,
    items,
    totalAmount,
    status: 'Pending', // Default status on creation
  });

  const createdInvoice = await invoice.save();
  res.status(201).json(createdInvoice);
});

// @desc    Get a single invoice by ID
// @route   GET /api/invoices/:id
// @access  Private
const getInvoiceById = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)
    .populate('client', 'name email')
    .populate('project', 'title');

  if (invoice) {
    // Check if the invoice belongs to the logged-in user
    if (invoice.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to view this invoice');
    }
    res.json(invoice);
  } else {
    res.status(404);
    throw new Error('Invoice not found');
  }
});

// @desc    Update an invoice (e.g., mark as paid)
// @route   PUT /api/invoices/:id
// @access  Private
const updateInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);

  if (invoice) {
    // Check if invoice belongs to the logged-in user
    if (invoice.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this invoice');
    }

    // Only allow updating the status for now
    invoice.status = req.body.status || invoice.status;

    const updatedInvoice = await invoice.save();
    res.json(updatedInvoice);
  } else {
    res.status(404);
    throw new Error('Invoice not found');
  }
});

// @desc    Delete an invoice
// @route   DELETE /api/invoices/:id
// @access  Private
const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);

  if (invoice) {
    // Check if invoice belongs to the logged-in user
    if (invoice.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this invoice');
    }

    await invoice.deleteOne();
    res.json({ message: 'Invoice removed' });
  } else {
    res.status(404);
    throw new Error('Invoice not found');
  }
});

module.exports = {
  getInvoices,
  createInvoice,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};