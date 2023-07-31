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
    const keyword = query.search
      ? {
          $or: [{ title: { $regex: query.search, $options: "i" } }],
          course: query.course,
        }
      : {};

    const foundCourse = await Course.find(keyword);
    return responses.buildSuccessResponse("Course Fetched", 200, foundCourse);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllCourses, searchCourse };
