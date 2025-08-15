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
//for making db fast
userSchema.index({name: 1});

module.exports = mongoose.model("User", userSchema);
