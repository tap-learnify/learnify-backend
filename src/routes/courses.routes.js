const express = require("express");
const router = express.Router();
const courseControllers = require("../controllers/courses.controllers");
const authMiddleware = require("../middlewares/auth.middlewares");

router.get("/", courseControllers.getAllCourses);
router.get("/search", courseControllers.searchCourses);
router.post("/:courseId/rate", authMiddleware, courseControllers.rateCourse);

module.exports = router;
