const express = require("express");
const Transaction = require("../Model/transactionModel");

const router = express.Router();

// Add transaction
router.post("/api/user/saveTransaction", async (req, res) => {
  console.log(req.body);
  
  try {
    const { type, amount, category, date, description, transactionId } = req.body;
    const newTransaction = new Transaction({ type, amount, category, date, description, transactionId });
    await newTransaction.save();
    res.status(201).json({ message: "Transaction added", transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: "Failed to add transaction", error });
  }
});

// Get all transactions for a user
router.get("/api/transactions/:phone", async (req, res) => {
  try {
    const { phone } = req.params;
    const transactions = await Transaction.find({ transactionId: phone });
    console.log(transactions);
    
    res.status(200).json(transactions || []);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions", error });
  }
});

module.exports = router;
