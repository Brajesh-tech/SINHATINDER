const express = require('express');
const app = express();


app.use(
  "/user",
   (req , res , next) => {
    console.log("1 is run successfully");
   res.send("Route handlers!");
   next();
   },
   (req ,res) => {

     console.log("2 is run successfully");
     res.send(" 2 Route handlers!");

   }
  );

app.listen(7777, () => {
  console.log("server run successfully");
});
