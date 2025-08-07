const express = require('express');
const requestRouter = express.Router();
//const User = require("./models/user");
const userAuth  = require("../middlewares/auth");


// Send Connection Request API
requestRouter.post("/sendConnection", userAuth, async (req, res) => {
  const { toUserId } = req.body;
  const fromUserId = req.user._id;

  if (!toUserId || toUserId === fromUserId.toString())
    return res.status(400).send("Invalid recipient");

  try {
    const toUser = await User.findById(toUserId);
    if (!toUser) return res.status(404).send("User not found");

    const alreadySent = toUser.connectionRequests.some(
      (req) => req.from.toString() === fromUserId.toString()
    );
    if (alreadySent) return res.status(400).send("Already sent");

    toUser.connectionRequests.push({ from: fromUserId });
    await toUser.save();

    res.send("Request sent");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

module.exports = requestRouter;