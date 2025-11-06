// models/projectModel.js

const mongoose = require('mongoose');

// This is a "sub-document" schema. It's not a model,
// but a structure we can reuse inside the projectSchema.
const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const projectSchema = mongoose.Schema(
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
    title: {
      type: String,
      required: true,
    },
    scope: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
      default: 0,
    },
    deadline: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
      default: 'Pending', // e.g., "Pending", "In Progress", "Completed"
    },
    tasks: [taskSchema], // An array of tasks
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;