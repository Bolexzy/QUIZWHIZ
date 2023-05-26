const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
