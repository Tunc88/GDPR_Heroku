const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ConcernSchema = new Schema({
  concernNumber: {
    type: String,
    required: true
  },
  concernName: {
    type: String,
    required: true
  },
  concernDescription: {
    type: String,
    required: true
  }
});

module.exports = Concern = mongoose.model("concerns", ConcernSchema);
