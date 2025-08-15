const validator = require("validator");

function validsignupdata(req) {
  const { emailId, password } = req.body;

  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email address");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Weak password");
  }
};
const validateEditProfileData =(req) => {
  const allowEditProfileData = ["name" , "location","age"];

  const isallowed = Object.keys(req.body).every((field) =>
    allowEditProfileData.includes(field)
  );
  return isallowed;
};


module.exports = { validsignupdata,
validateEditProfileData
};
