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

const rateCourse = async (courseId, newRating) => {
  try {
    // Validate the rating value to be between 1 and 5
    if (newRating < 1 || newRating > 5) {
      return { statusCode: 400, error: "Rating must be between 1 and 5." };
    }

    // Find the course by courseId
    const course = await Course.findById(courseId);

    if (!course) {
      return { statusCode: 404, error: "Course not found." };
    }

    // Update the course's rating
    const currentRating = course.rating;
    course.rating = (currentRating + parseFloat(newRating)) / 2;

    // Round the updated rating to one decimal place
    course.rating = Math.round(course.rating * 10) / 10;

    // Save the updated course
    await course.save();

    return { statusCode: 200, message: "Course rating updated successfully." };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, error: "Internal server error." };
  }
};

module.exports = { getAllCourses, searchCourse, rateCourse };
