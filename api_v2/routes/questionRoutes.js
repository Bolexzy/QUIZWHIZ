const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/quizController');

router.get('/find_all_quiz', questionsController.getAllQuiz)
router.post('/create_quiz', questionsController.createQuiz);
router.put('/update_quiz/:id', questionsController.updateQuiz);
router.get('/find_user_quiz/:user_id', questionsController.getQuizByUser);
router.delete('/delete_quiz/:id', questionsController.deleteQuiz)
router.get('/get_one_quiz/:test_id', questionsController.get_one_quiz)


module.exports = router;
