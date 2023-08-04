const courseServices = require("../services/courses.services");

const getAllCourses = async (req, res) => {
  try {
    const data = await courseServices.getAllCourses();
    res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchCourses = async (req, res) => {
  try {
    const data = await courseServices.searchCourse(req.query);
    res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllCourses, searchCourses };
