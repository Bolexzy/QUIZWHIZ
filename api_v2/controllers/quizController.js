const Quiz = require('../models/question')

const winston = require('winston');
const logger = winston.createLogger({
	level: 'info',
	transports: [new winston.transports.Console()]
});

exports.getAllQuiz = (req, res) => {
	Quiz.find()
		.then(result => {
			return res.status(200).json(result)
		})
		.catch(error => res.status(500).json({ message: error.message }))
}

exports.getQuizByUser = (req, res) => {
	Quiz.find({ user_id: req.params.user_id })
		.then(result => {
			return res.status(200).json(result)
		})
		.catch(error => res.status(500).json({ message: error.message }))
}

exports.createQuiz = (req, res) => {

	const quiz = new Quiz(req.body)
	quiz.save()
		.then(result => {
			res.status(200).json(result)
		})
		.catch(error => {
			res.status(500).json({ error: error.message })
		});
}

exports.updateQuiz = (req, res) => {
	Quiz.findOneAndUpdate({ test_id: req.params.id }, { ...req.body, updatedAt: Date.now() })
		.then(result => {
			return res.status(200).json(result)
		})
		.catch(error => res.status(500).json({ message: error.message }))
}

exports.get_one_quiz = (req, res) => {
	Quiz.find({ test_id: req.params.test_id })
		.then(result => {
			return res.status(200).json(result)
		})
		.catch(error => {
			res.status(500).json({ message: error.message })
		})
}

exports.deleteQuiz = (req, res) => {
	Quiz.findOneAndDelete({ test_id: req.params.id })
		.then(result => {
			return res.status(200).json(result)
		})
		.catch(error => res.status(500).json({ message: error.message }))
}
