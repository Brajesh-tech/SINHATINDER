const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validsignupdata } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser);

// Signup route
app.post("/signup", async (req, res) => {
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

// Login route
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {

      //create jwt tokens

      // Add the tokens to cookies and send the respond back to users
      res.cookie("token" , "jhgdfashfgsghfsfhsjh");
      res.send("Login successful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", async (req , res) => {
const cookies  = req.cookies;
console.log(cookies);
res.send("reading cookie");
});

// Get user by email
app.get("/user", async (req, res) => {
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

// Start server
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
