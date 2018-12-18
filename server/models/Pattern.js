const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PatternSchema = new Schema({
  name: {
    type: String,
    required: true
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
  knownUses: {
    type: String
  },

  assignedStrategies: [
    {
      type: Schema.Types.ObjectId,
      ref: "strategies", //[mongoose.Schema.Types.ObjectId]
      assignedTactics: [
        {
          type: Schema.Types.ObjectId,
          ref: "strategies.assignedTactics" //[mongoose.Schema.Types.ObjectId]
        }
      ]
    }
  ]
});

module.exports = Pattern = mongoose.model("patterns", PatternSchema);
