const express = require("express");
const User = require("../models/User");
const helper = require("../helper")
const router = express.Router();

// POST /profile
// Update profile info (age, weight) using email
router.post("/", async (req, res) => {
  try {
      const { userId, email } = await helper.authenticate(req)
    const { name, higherEducation, height, age, weight } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields if provided
    if (age !== undefined) user.age = age;
    if (weight !== undefined) user.weight = weight;
    if (higherEducation !== undefined) user.higherEducation = higherEducation;
    if (height !== undefined) user.height = height;
    if (name !== undefined) user.name = name;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
