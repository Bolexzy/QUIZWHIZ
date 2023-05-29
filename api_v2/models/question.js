const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	question: {
		type: String,
		required: true
	},
	options: {
		type: Map,
		of: String,
		required: true
	},
	answer: {
		type: [String],
		required: true
	}
});

const quizSchema = new mongoose.Schema({
	test_id: {
		type: String
	},
	user_id: {
		type: String,
	},
	description: {
		type: String
	},
	title: {
		type: String,
	},
	quiz_start_time: {
		type: Number,
	},
	quiz_end_time: {
		type: Number
	},
	alloted_time_mins: {
		type: Number,
	},
	questions: {
		type: [questionSchema],
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
schema.pre('save', function (next) {
	const doc = this;

	// Set the createdAt field if not already set
	if (!doc.createdAt) {
		doc.createdAt = Date.now();
	}
	next();
})

// Before updating a document
schema.pre('findOneAndUpdate', function (next) {
	const doc = this._update;

	// Set the updatedAt field
	doc.updatedAt = Date.now();
	next();
})

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
