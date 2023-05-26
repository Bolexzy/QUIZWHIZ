const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/quizController');

router.post('/create_quiz', questionsController.createQuiz);
router.post('/update_quiz/:id', questionsController.updateQuiz);
router.get('/find_user_quiz/:created_by', questionsController.getQuizByUser);
router.get('/find_all_quiz', questionsController.getAllQuiz)
router.post('/delete_quiz/:id', questionsController.deleteQuiz)

module.exports = router;
