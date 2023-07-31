const responses = require("../utils/response");

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

module.exports = { getAllCourses };
