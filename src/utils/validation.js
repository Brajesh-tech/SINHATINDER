const validator = require("validator");

function validsignupdata(req) {
  const { emailId, password } = req.body;

  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email address");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Weak password");
  }
}

module.exports = { validsignupdata };
