const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const Client = require('../models/clientModel');

// @desc    Get messages for a specific client
// @route   GET /api/messages/:clientId
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    user: req.user._id,
    client: req.params.clientId,
  }).sort({ createdAt: 1 }); // Oldest first (like a chat log)

  res.json(messages);
});

// @desc    Send a message to a client
// @route   POST /api/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { clientId, text, sender } = req.body;

  if (!clientId || !text) {
    res.status(400);
    throw new Error('Please add a client ID and text');
  }

  // Check if client belongs to user
  const client = await Client.findById(clientId);
  if (!client || client.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Client not found or not authorized');
  }

  const message = await Message.create({
    user: req.user._id,
    client: clientId,
    text,
    sender: sender || 'user', // Default to user sending
  });

  res.status(201).json(message);
});

module.exports = {
  getMessages,
  sendMessage,
};