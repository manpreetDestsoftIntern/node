const express = require("express");
const User = require("../models/User");
const helper  = require("../helper");

const router = express.Router();

// DELETE /users/:email
// Delete a user by email
router.delete("/delete", async (req, res) => {
// router.delete("/delete/:email", async (req, res) => {
    try {
      const { userId, email } = await helper.authenticate(req)
     
      const deletedUser = await User.findOneAndDelete({ email });
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

// GET /users/:email
// Get a single user by email
router.get("/", async (req, res) => {
    try {
      const { userId, email } = await helper.authenticate(req)
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error("Fetch user error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

// GET /users/:email
// Get a all users
router.get("/", async (req, res) => {
  try {

    const user = await User.find({});

    if (!user.length) {
      return res.status(404).json({ message: "DB does not contains any user" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Fetch user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
