const express = require ("express");
const app = express();

app.get("/getuserData" , (req , res) => {

  throw new error("ahfdga");
  res.send("user data send")
});

app.use("/" , (err ,req , res,next)=> {

  if(err){
    res.status(500).send("something went wrong");
  }
});

app.listen(7777 ,()=> {
  console.log("successfullurun");
});