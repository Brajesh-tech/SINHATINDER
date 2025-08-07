const express = require('express') ;
const authRouter = express.Router();
const { validsignupdata } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  try {
	// Validate input data
	validsignupdata(req);

	// Destructure from request body
	const { name, age, gender, location, bio, emailId, password } = req.body;

	// Encrypt password
	const passwordHash = await bcrypt.hash(password, 10);

	// Create new user
	const user = new User({
	  name,
	  age,
	  gender,
	  location,
	  bio,
	  emailId,
	  password: passwordHash,
	});

	// Save to DB
	await user.save();
	res.send("User added successfully");
  } catch (err) {
	res.status(400).send("ERROR: " + err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
	const { emailId, password } = req.body;

	const user = await User.findOne({ emailId: emailId });
	if (!user) {
	  throw new Error("Invalid credentials");
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
	  throw new Error("Invalid credentials");
	}

	// Create JWT token
	const token = jwt.sign({ _id: user._id }, "Sinha@1234", {
	  expiresIn: "1h", // optional
	});

	console.log("JWT Token:", token);

	// Set token as cookie
	res.cookie("token", token, {
	  httpOnly: true,
	  // secure: true, // uncomment if using HTTPS
	  // sameSite: "strict", // uncomment to prevent CSRF
	});

	res.send("Login successful!!!");
  } catch (err) {
	res.status(400).send("ERROR: " + err.message);
  }
});
module.exports = authRouter;