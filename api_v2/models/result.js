const mongoose = require('mongoose')

const resultSchema  = new mongoose.Schema({
	test_id : {
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
	}
})

const Result = mongoose.model('Result', resultSchema)
module.exports = Result;
