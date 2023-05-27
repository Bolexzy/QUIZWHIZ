const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/verify/:token', usersController.verify);
router.get('/logout', usersController.logout)
router.post('/reset_password', usersController.password_reset)

module.exports = router;
