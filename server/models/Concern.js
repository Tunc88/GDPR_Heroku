const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ConcernSchema = new Schema({
  name: {
    type: String
    //required
  },
  description: {
    type: String
    //required
  }
});

module.exports = Concern = mongoose.model("concerns", ConcernSchema);
