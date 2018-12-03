const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PatternSchema = new Schema({
  patternNumber: {
    type: String,
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
  name: {
    type: String
  },
  context: {
    type: String,
    required: true
  },
  summary: {
    type: String
  },
  problem: {
    type: String,
    required: true
  },
  forcesConcerns: {
    type: String
  },
  solution: {
    type: String,
    required: true
  },
  structure: {
    type: String
  },
  implementation: {
    type: String
  },
  consequences: {
    type: String,
    required: true
  },
  liabilities: {
    type: String
  },
  examples: {
    type: String,
    required: true
  },
  relatedPatterns: {
    type: String
  },
  sources: {
    type: String
  },
  knownUser: {
    type: String
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
