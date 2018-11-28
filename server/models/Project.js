const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProjectSchema = new Schema({
  projectNumber: {
    type: Number,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  assignedConcerns: [
    {
      Concern: Number
    }
  ]
});

module.exports = Project = mongoose.model("projects", ProjectSchema);
