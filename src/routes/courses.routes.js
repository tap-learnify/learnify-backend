const express = require("express");
const router = express.Router();
const courseControllers = require("../controllers/courses.controllers");

router.get("/", courseControllers.getAllCourses);
router.get("/search", courseControllers.searchCourses);

module.exports = router;
