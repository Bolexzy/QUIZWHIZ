const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	user_id: {
		type: String,
		unique: true,
	},
	user_name: {
		type: String
	},
	profile_url: {
		type: String
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
	isVerified: {
		type: Boolean,
		default: false
	},
	verificationToken: {
		type: String,
		default: () => Math.random().toString(36).slice(2)
	}
})

const User = mongoose.model('User', userSchema);
module.exports = User;
