const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true      // remove unnecessary space
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      // max: 10000
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
