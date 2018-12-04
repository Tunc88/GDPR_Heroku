const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  finished: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  },

  assignedtactics: [
    {
      tactic: {
        type: [mongoose.Schema.Types.ObjectId]
      }
    }
  ],
  assignedDevelopers: [
    {
      Developer: {
        type: [mongoose.Schema.Types.ObjectId]
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Project = mongoose.model("projects", ProjectSchema);
