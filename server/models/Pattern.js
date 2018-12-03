const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PatternSchema = new Schema({
  patternNumber: {
    type: Number,
    required: true
  },
  patternName: {
    type: String,
    required: true
  },
  patternDescription: {
    type: String,
    required: true
  },
  assignedConcerns: [
    {
      Concern: {
        type: [mongoose.Schema.Types.ObjectId]
      }
    }
  ]
});

module.exports = Pattern = mongoose.model("patterns", PatternSchema);
