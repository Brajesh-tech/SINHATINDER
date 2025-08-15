const express = require('express');
const requestRouter = express.Router();
//const User = require("./models/user");
const userAuth  = require("../middlewares/auth");
const ConnectionRequestModel = require('../models/connectionRequest');
const User = require("../models/user");
//const ConnectionRequestModel = require('../models/connectionRequest');


// Send Connection Request API
requestRouter.post("/send/:status/:toUserId", 
  userAuth,
  async(req , res) => {
 try{
  const fromUserId =req.user._id;
  const toUserId = req.params.toUserId;
  const status = req.params.status;

  const allowedStatus = ["ignored" , "interested"];
  if(!allowedStatus.includes(status)) {
    return res
    .status(400)
    .json({message: "Invalid status type: " + status});
  }
  

  const toUser = await User.findById(toUserId);
  if(!toUser){
    return res.status(400).json({message : "user not found"});
  }

  const existingConnectionRequest = await ConnectionRequestModel.findOne({
    $or: [
      {fromUserId, toUserId},
      {fromUserId: toUserId, toUserId: fromUserId},
    ],
  });
  if(existingConnectionRequest){
    return res
    .status(400)
    .send({message: "Connection Request Already Exist!!" });
  }

const connectionRequest = new ConnectionRequestModel({
  fromUserId ,
   toUserId , 
   status,
});

const data = await connectionRequest.save();
res.json({
  message: "connection request successfully",
  data,
});

 }catch(err) {
  res.status(400).send("ERROR :" + err.message);

 }
  
// res.send(user.name + "sent the connection request!");
  }
);
requestRouter.post("/request/review/:status/:requestId" , userAuth , async  (req , res) => {
  try{
    const loggedInuser = req.user;
    const {status , requestId} = req.params;
    const allowedStatus = ["accepted" , "rejected"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message: "Status not found"});
    }
    const connectionRequest = await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInuser._id,
      status: "interested",
    });

    if(!connectionRequest){
      return res
      .status(400)
      .json({message: "connection request not found"});
    }
     connectionRequest.status = status;
     const data = await  connectionRequest.save();
     res.json({message: "Connection request" + status , data})

  }catch (err) {
    res.status(400).json("ERROR: " + err.message);
  }
});

module.exports = requestRouter;