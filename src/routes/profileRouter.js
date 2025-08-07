const express = require('express');
const profileRouter = express.Router();
//const User = require("./models/user");
const jwt = require("jsonwebtoken");
const  userAuth  = require("../middlewares/auth");

profileRouter.get("/profile",userAuth, async (req, res) => {
  try {
	const cookies = req.cookies;
	const { token } = cookies;

	if (!token) {
	  return res.status(401).send("Unauthorized: No token found");
	}

	const decodedMessage = jwt.verify(token, "Sinha@1234");
	const { _id } = decodedMessage;

	console.log("Logged In user is: " + _id);
	res.send("Reading cookie - user authenticated");
  } catch (err) {
	res.status(401).send("Unauthorized: Invalid or expired token");
  }
});

module.exports = profileRouter;