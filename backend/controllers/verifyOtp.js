/** @format */

// Controller for verifying OTP
const User = require("../models/AccountModels"); // Import your updated user model
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyOtp = async (req, res) => {
  const { userId, otpCode } = req.body;

  if (!userId || !otpCode) {
    return res
      .status(400)
      .json({ message: "User ID and OTP code are required." });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Check if the OTP is correct and not expired
    const currentTime = Date.now();

    if (user.otpIsUsed) {
      return res
        .status(400)
        .json({ message: "This OTP has already been used." });
    }

    if (user.otpCode !== otpCode) {
      return res.status(400).json({ message: "Invalid OTP code." });
    }

    if (currentTime > user.otpExpiresAt) {
      return res.status(400).json({ message: "OTP code has expired." });
    }

    // If everything is valid, mark OTP as used
    await User.findByIdAndUpdate(
      userId,
      {
        otpIsUsed: true,
      },
      { new: true }
    );

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h", // Token valid for 1 hour
    });

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Cookie cannot be accessed via JavaScript
      secure: true, // Cookie is only sent over HTTPS
      sameSite: "None", // Helps prevent CSRF attacks
    });

    // Respond with success message
    res.status(200).json({ message: "OTP verified successfully.", token });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res
      .status(500)
      .json({ message: "An error occurred during OTP verification." });
  }
};
