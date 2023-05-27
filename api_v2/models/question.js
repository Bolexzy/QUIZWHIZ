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
	}
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
