const express = require("express");
const userRoutes = require("./Router/userRouter");
const transactionRouter = require("./Router/transactionRouter")
const mongoose = require("mongoose");
const cors=require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['POST', 'GET', 'PUT', 'DELETE'], 
}));
app.use(express.json()); 

app.use(userRoutes);
app.use(transactionRouter);
mongoose
  .connect("mongodb://localhost:27017/Expense_Tracker_App")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(8080, () => {
      console.log("Server running on port 8080");
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB", err));
