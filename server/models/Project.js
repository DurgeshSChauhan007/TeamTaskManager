const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: String,

    description: String,

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        role: {
          type: String,
          enum: ["Admin", "Member"],
          default: "Member",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Project",
  projectSchema
);