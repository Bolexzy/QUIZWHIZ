const Result = require('../models/result')

exports.get_all_results = (req, res) => {
	Result.find()
		.then(result => {
			return res.status(200).json({ result })
		})
		.catch(error => res.status(500).json({ message: error.message }))
}

exports.get_all_user_results = (req, res) => {
	Result.find({ user_id: req.params.user_id })
		.then(result => {
			return res.status(200).json(result)
		})
		.catch(error => res.status(500).json({ message: error.message }))
}

exports.get_all_for_quiz = (req, res) => {
	Result.find({ test_id: req.params.test_id })
		.then(result => {
			return res.status(200).json(result)
		})
		.catch(error => res.status(500).json({ message: error.message }))
}


exports.post_results = (req, res) => {

	const result = new Result(req.body)
	result.save()
		.then(result => {
			res.status(200).json(result)
		})
		.catch(error => {
			res.status(500).json({ error: error.message })
		});
}
