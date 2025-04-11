const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, default: null },
  weight: { type: Number, default: null },
  higherEducation: { type: String, default: null }, 
  height: { type: String, default: null },
}, 
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
