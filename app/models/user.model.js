const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    purchasedCourse: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    }],
  })
);

module.exports = User;
