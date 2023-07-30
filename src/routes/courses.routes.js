const express = require('express');
const router = express.Router();
const coursesControllers = require('../controllers/courses.controllers');

router.get('/', coursesControllers.getAllCourses);
router.get('/search', coursesControllers.searchCourses);

module.exports = router;