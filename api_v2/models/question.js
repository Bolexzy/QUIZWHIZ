const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	id: {
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
	title: {
		type: String,
		required: true
	},
	created_by: {
		type: String,
		required: true
	},
	time_of_quiz: {
		type: Date,
		required: true
	},
	alloted_time_mins: {
		type: Number,
		required: true
	},
	questions: {
		type: [questionSchema],
		required: true
	}
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
