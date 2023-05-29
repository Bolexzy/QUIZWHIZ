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
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	}

})

// Before saving a document
userSchema.pre('save', function (next) {
	const doc = this;

	// Set the createdAt field if not already set
	if (!doc.createdAt) {
		doc.createdAt = Date.now();
	}
	next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;
