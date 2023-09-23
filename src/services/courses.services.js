const responses = require("../utils/response");
const Course = require("../models/courses.models");

async function getAllCourses() {
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
}

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

async function rateCourse(payload) {
  try {
    const { courseId, studentId, rating } = payload;

    const course = await Course.findById(courseId);
    if (!course) {
      return { success: false, message: "Course not found." };
    }

    // Check if the student has already rated this course
    const alreadyRated = course.rating.find((rating) =>
      rating.student.equals(studentId)
    );
    if (alreadyRated) {
      return { success: false, message: "You have already rated this course." };
    }

    // Add the student's rating to the course
    course.rating.push({ student: studentId, value: rating });

    // Calculate and update the average rating for the course
    const totalRating = course.rating.reduce(
      (sum, rating) => sum + rating.value,
      0
    );
    course.rating = totalRating / course.rating.length;

    await course.save();

    return { success: true, message: "Course rated successfully.", course };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error." };
  }
}

module.exports = { getAllCourses, searchCourse, rateCourse };
