const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
	test_id: {
		type: String
	},
	user_id: {
		type: String
	},
	user_name: {
		type: String
	},
	profile_url: {
		type: String
	},
	date_taken: {
		type: Number
	},
	total_questions: {
		type: Number
	},
	right_answers: {
		type: Number
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
resultSchema.pre('save', () => {
	const doc = this;

	// Set the createdAt field if not already set
	if (!doc.createdAt) {
		doc.createdAt = Date.now();
	}
	next();
})

// Before updating a document
resultSchema.pre('findOneAndUpdate', () => {
	const doc = this._update;

	// Set the updatedAt field
	doc.updatedAt = Date.now();
	next();
})
const Result = mongoose.model('Result', resultSchema)
module.exports = Result;
