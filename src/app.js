const express = require("express");
const connectDB = require("./config/database");
const app = express();


const cookieParser = require("cookie-parser");



// Middleware
app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");

app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);
// Signup route


// Login route


// Profile route


// Get user by email
app.get("/user",  async (req, res) => {
  const userEmail = req.query.emailId; // Example: /user?emailId=xyz@example.com
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// Start server after DB connects
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
