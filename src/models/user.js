const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  age: Number,
  gender: String,
  location: String,
  bio: String,
});

module.exports = mongoose.model("User", userSchema);
