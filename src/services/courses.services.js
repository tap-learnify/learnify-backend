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

module.exports = { getAllCourses, searchCourse };
