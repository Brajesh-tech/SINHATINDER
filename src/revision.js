const validator = require("validator");

function validatesignupdata(req){
	const {emailId , password} = req.body ;

	if(!validator.isEmail(emailId)){
		throw new error ("email is wrong");
	}
	if(!validator.isStrongPassword(password)){
		throw new error ("password is wrong");
	}

}
module.export = { validsignupdata };