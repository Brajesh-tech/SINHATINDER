
const mongoose = require("mongoose");
const connectDB = async () => {
	await mongoose.connect(
		"mongodb+srv://brajeshsinhassm37:OF99waYTcUmxcGK9@cluster0.nxkvuwl.mongodb.net/SINHATINDER");
};

module.exports = connectDB;
