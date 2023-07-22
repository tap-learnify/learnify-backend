const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");
const response = require("../utils/response");
const Pin = require("../utils/generateRandomPin");
const email = require("../utils/email");

async function signup(payload) {
  try {
    const { firstName, lastName, email, password } = payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.buildFailureResponse("User already exists", 400);
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
    return response.buildSuccessResponse("User created successfully", 201, {token});
  } catch (error) {
    console.error(error);
    return response.buildFailureResponse("Server Error", 500);
  }
}

async function login(payload) {
  try {
    const { email, password } = payload;

    const user = await User.findOne({ email });
    if (!user) {
      return response.buildFailureResponse("User not found", 400);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return response.buildFailureResponse("Invalid Password", 403);
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h", // Adjust the expiration time as needed
    });
    return response.buildSuccessResponse("Login Successful", 200, {token});
  } catch (error) {
    console.error(error);
    return {
      message: "Server error",
      statusCode: 500,
    };
  }
}

const forgotPassword = async (payload) => {
  try {
    // Find the user by email
    const foundUser = await User.findOne({ email: payload.email });
    if (!foundUser) {
      return response.buildFailureResponse("Email not found", 404);
    }

    const resetPin = Pin.generateRandomPin();
    foundUser.resetPin = resetPin;
    await foundUser.save();

    const emailSubject = "Forgot Password - Reset Pin";
    const emailText = `You recently requested to reset your password.`;
    const emailHtml = `
      // ... (email template) ...
    `;

    await email.sendEmail(
      foundUser.email,
      emailSubject,
      emailText,
      emailHtml
    );

    return response.buildSuccessResponse("Password reset email sent", 200);
  } catch (error) {
    console.error(error);
    return response.buildFailureResponse("Server Error", 500);
  }
};


module.exports = { signup, login, forgotPassword };
