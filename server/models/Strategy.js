const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StrategySchema = new Schema({
  name: {
    type: String
    //required: true
  },
  description: {
    type: String
    // required: true
  },
  assignedTactics: [
    {
      type: Schema.Types.ObjectId,
      ref: "tactics" //[mongoose.Schema.Types.ObjectId]
    }
  ],
  assignedTactics: [
    {
      id: {
        type: String
      },
      name: {
        type: String
      },
      description: {
        type: String
      }
    }
  ]
});

module.exports = Strategy = mongoose.model("strategies", StrategySchema);
