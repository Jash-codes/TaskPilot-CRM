const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Client',
    },
    text: {
      type: String,
      required: true,
    },
    // 'user' means you sent it, 'client' means they sent it
    sender: {
      type: String,
      required: true,
      enum: ['user', 'client'], 
      default: 'user',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;