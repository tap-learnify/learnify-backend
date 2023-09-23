const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, required: true }, // e.g., Beginner, Intermediate, Advanced
  rating: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the user who rated the course
      value: { type: Number, required: true }, // Rating value
    },
  ], // Course rating (an array of objects with student and value fields)
  author: {
    authorName: { type: String, required: true },
    authorBio: { type: String, required: true },
    authorImage: { type: String, required: true },
  }, // Author or instructor of the course
  outline: { type: String, required: true }, // Course outline (syllabus) as a string
  description: { type: String, required: true }, // Course description
  thumbnail_url: { type: String, required: true }, // URL to the course thumbnail image
  path: { type: String, required: true }, // e.g., Programming, Design, Mathematics, etc.
  subject: { type: String, required: true }, // e.g., Frontend, Backend, Design, etc.
  heroText: { type: String, required: true }, // Hero text for the course landing page
  about: { type: String, required: true }, // About the course
  skillsYouWillLearn: [{ type: String, required: true }], // Skills learners will acquire (as an array of strings)
  successStories: [
    {
      studentName: { type: String, required: true },
      story: { type: String, required: true },
    },
  ], // Success stories (an array of objects with studentName and story fields)
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
