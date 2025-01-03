const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String },
  date: { type: Date, default: Date.now },
  description: { type: String },
  transactionId: { type: String }
});

module.exports = mongoose.model("Transaction", transactionSchema);
