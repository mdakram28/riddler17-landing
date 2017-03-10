var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	mail : {
		type : String,
		unique: true
	},
	createdAt : Date
});

module.exports = mongoose.model('User',userSchema);
