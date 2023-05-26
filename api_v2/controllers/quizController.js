const Quiz = require('../models/question')

exports.getAllQuiz = (req, res) => {
	Quiz.find()
		.then(result => {
			return res.status(200).json({ result })
		})
		.catch(error => res.status(500).json({ message: error.message }))
}

exports.getQuizByUser = (req, res) => {
	Quiz.find({ created_by: req.params.created_by })
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
	Quiz.findOneAndUpdate({ id: req.params.id }, req.body.question_body)
		.then(result => {
			return res.status(200).json(result)
		})
		.catch(error => res.status(500).json({ message: error.message }))
}

exports.deleteQuiz = (req, res) => {
	Quiz.findOneAndDelete({ id: req.params.id })
		.then(result => {
			return res.status(200).json(result)
		})
		.catch(error => res.status(500).json({ message: error.message }))
}
