const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StrategySchema = new Schema({
  name: {
    type: String,
    required
  },
  description: {
    type: String,
    required
  },
  assignedTactics: [
    {
      tactic: {
        type: [mongoose.Schema.Types.ObjectId]
      }
    }
  ]
});

module.exports = Strategy = mongoose.model("strategies", StrategySchema);
