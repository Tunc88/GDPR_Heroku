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

  assignedTactics: {
    type: [String] //[mongoose.Schema.Types.ObjectId]
  },

  assignedDevelopers: {
    type: [String] /*[mongoose.Schema.Types.ObjectId]*/
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Project = mongoose.model("projects", ProjectSchema);
