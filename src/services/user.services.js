const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");
const response = require("../utils/response");
const Pin = require("../utils/generateRandomPin");
const mailUtil = require("../utils/email");

const signup = async (payload) => {
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
      password: hashedPassword, // Store the hashed password
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h", // Token is valid for 1 hour
      }
    );
    return response.buildSuccessResponse("User created successfully", 201, {
      token,
    });
  } catch (error) {
    console.error(error);
    return response.buildFailureResponse("Server Error", 500);
  }
};

const login = async (payload) => {
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
      expiresIn: "1h", // Token is valid for 1 hour
    });
    return response.buildSuccessResponse("Login Successful", 200, { token });
  } catch (error) {
    console.error(error);
    return {
      message: "Server error",
      statusCode: 500,
    };
  }
};

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
    <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff;">
      <div style="background-color: #1E2127; margin-bottom: 30px; padding: 15px;">
        <p style="color: #F7FFF2; text-align: center;"><strong>.learnify</strong></p>
      </div>
      <h2 style="color: #007bff;">Reset Password</h2>
      <p>Hello ${foundUser.firstName},</p>
      <p>You've requested to reset the password linked with your Learnify account.</p>
      <p>To confirm your request, please use the 6-digit code below:</p>
      <div style="max-width: 400px; margin: 0 auto; padding: 15px; background-color: #007bff; color: #fff; text-align: center; font-size: 19px;">
        Your Reset Pin: <strong>${resetPin}</strong>
      </div>
      <p>The reset pin will be valid for a limited time only. Please do not share this code with anyone. <strong>Don’t recognize this activity?</strong> Please ignore this email or contact <a href="/">customer support</a>.</p>
      <p><em>This is an automated message, please do not reply.</em></p>
      <p style="margin-top: 30px; text-align: center; font-size: small;">© 2023 Learnify, All Rights Reserved.</p>
      <hr style="color: #007bff; border: 1.5px solid #007bff; margin: 20px 0;">
      <p style="color: #007bff; text-align: center;"><strong>Stay Connected!</strong></p>
    </div>
    </body>`;

    await mailUtil.sendEmail(
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

const resetPassword = async (payload) => {
  const { email, resetPin, newPassword } = payload;

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser || foundUser.resetPin !== resetPin) {
      return response.buildFailureResponse("Invalid reset PIN", 400);
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    // Update the user's password and resetPin
    foundUser.password = hashedNewPassword;
    foundUser.resetPin = undefined;
    await foundUser.save();

    return response.buildSuccessResponse("Password reset successful", 200);
  } catch (error) {
    console.error(error);
    return response.buildFailureResponse("Internal Server Error", 500);
  }
};

module.exports = { signup, login, forgotPassword, resetPassword };
