const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const { verifyToken } = require('../middleware/jwtMiddleware')

router.post('/post_results', resultController.post_results);
router.get('get_user_results/:user_id', resultController.get_all_user_results);
router.get('/get_all_results', resultController.get_all_results);
router.get('/get_all_results_quiz/:test_id', resultController.get_all_for_quiz);

module.exports = router;
