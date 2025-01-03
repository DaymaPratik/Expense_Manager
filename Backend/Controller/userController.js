const bcrypt = require("bcryptjs");
const userModel = require("../Model/userModel");

const registerUserFunction = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the user to the database
    const newUser = new userModel({ name, email, phone, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ status: true, message: "Registration successful" });
  } catch (error) {
    console.log("UNABLE TO REGISTER BACKEND", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};
const handleLoginFunction = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ status: false, message: "Email and password are required" });
      }
  
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ status: false, message: "User not found" });
      }
  
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ status: false, message: "Invalid credentials" });
      }
  
      res.status(200).json({ status: true, message: "Login successful", user });
    } catch (error) {
      console.log("UNABLE TO LOGIN BACKEND", error);
      res.status(500).json({ status: false, message: "Server error" });
    }
  };
  


  const userControllerObj={
    registerUserFunction,
   handleLoginFunction
  }
  module.exports=userControllerObj;



