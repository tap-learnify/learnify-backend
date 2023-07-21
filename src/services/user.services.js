const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

async function signup(payload) {
  try {
    const { firstName, lastName, email, password } = payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        message: "User already exists",
        statusCode: 400,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h", // Adjust the expiration time as needed
      }
    );
    return {
      message: "User created successfully",
      statusCode: 201,
      data: { token },
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Server error",
      statusCode: 500,
    };
  }
}

async function login(payload) {
  try {
    const { email, password } = payload;

    const user = await User.findOne({ email });
    if (!user) {
      return {
        message: "User not found",
        statusCode: 404,
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return {
        message: "Invalid credentials",
        statusCode: 401,
      };
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h", // Adjust the expiration time as needed
    });
    return {
      message: "Login successful",
      statusCode: 200,
      data: { token },
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Server error",
      statusCode: 500,
    };
  }
}

module.exports = { signup, login };
