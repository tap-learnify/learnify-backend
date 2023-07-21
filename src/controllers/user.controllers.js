const userServices = require('../services/user.services');

const signup = async (req, res) => {
  const data = await userServices.signup(req.body);
  res.status(data.statusCode).json(data)
};

const login = async (req, res) => {
  const data = await userServices.login(req.body);
  res.status(data.statusCode).json(data)
};

module.exports = { signup, login };