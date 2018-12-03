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
  assignedConcerns: [
    {
      Concern: {
        type: [mongoose.Schema.Types.ObjectId]
      }
    }
  ]
});

module.exports = Concern = mongoose.model("strategies", StrategySchema);
