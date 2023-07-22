const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/auth.middlewares');

router.post('/signup', userControllers.signup);
router.post('/login', userControllers.login);
router.post('/forgot-password', userControllers.forgotPassword);
router.post('/reset-password', userControllers.resetPassword);

module.exports = router;