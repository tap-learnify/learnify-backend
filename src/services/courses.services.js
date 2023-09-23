const responses = require("../utils/response");
const Course = require("../models/courses.models");

const getAllCourses = async () => {
  try {
    const companies = await Course.find();
    return responses.buildSuccessResponse(
      "Successfully fetched all courses",
      200,
      companies
    );
  } catch (error) {
    return responses.buildFailureResponse("Failed to fetch courses", 500);
  }
};

const searchCourse = async (query) => {
  try {
    const keyword = query.keyword
      ? {
          $or: [{ title: { $regex: query.keyword, $options: "i" } }],
        }
      : {};

    const foundCourse = await Course.find(keyword);
    return responses.buildSuccessResponse("Course Fetched", 200, foundCourse);
  } catch (error) {
    console.log(error);
    return responses.buildFailureResponse("Failed to fetch course", 500);
  }
};

const rateCourse = async (payload) => {
  try {
    const { courseId, studentId, rating } = payload;

    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return responses.buildFailureResponse("Course not found", 404);
    }

    // Check if the student has already rated this course
    const alreadyRated = course.ratings.find((rating) =>
      rating.student.equals(studentId)
    );

    if (alreadyRated) {
      return responses.buildFailureResponse(
        "You have already rated this course",
        400
      );
    }

    // Validate that the rating is between 1 and 5
    if (rating < 1 || rating > 5) {
      return responses.buildFailureResponse(
        "Rating must be between 1 and 5",
        400
      );
    }

    // Add the student's rating to the course
    course.ratings.push({ student: studentId, value: rating });

    // Calculate and update the average rating for the course
    const totalRatings = course.ratings.reduce(
      (sum, rating) => sum + rating.value,
      0
    );
    course.rating = totalRatings / course.ratings.length;

    await course.save();

    return responses.buildSuccessResponse(
      "Course rated Successfully",
      200,
      course
    );
  } catch (error) {
    console.error(error);
    return responses.buildFailureResponse("Internal Server Error", 500);
  }
};

module.exports = { getAllCourses, searchCourse, rateCourse };
