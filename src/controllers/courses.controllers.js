const courseServices = require("../services/courses.services");

const getAllCourses = async (req, res) => {
  const data = await courseServices.getAllCourses();
  res.status(data.statusCode).json(data);
};

const searchCourses = async (req, res) => {
  const data = await courseServices.searchCourse(req.query);
  res.status(data.statusCode).json(data);
};

module.exports = { getAllCourses, searchCourses };
