const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: String,

    description: String,

    dueDate: Date,

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
    },

    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);