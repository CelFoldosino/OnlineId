/** @format */
const User = require("../models/AccountModels"); // Import your updated user model

exports.logout = async (req, res) => {
  try {
    // Assuming you have a way to access the user session or user data
    const userId = req.user.id; // Example of getting the user ID from the request
    // Clear OTP-related fields in your user database
    const data = await User.findByIdAndUpdate(
      userId,
      {
        otpCode: "",
        otpIsUsed: false,
        otpExpiresAt: null,
      },
      { new: true }
    );

    // Clear the cookie
    res.cookie("token", "", {
      httpOnly: true, // Ensure this matches the original cookie attributes
      secure: true, // Use secure cookies if in production
      sameSite: "Strict", // Use sameSite attribute if it was used originally
      expires: new Date(0), // Set expiry date to the past
      path: "/", // Ensure this matches the path used when setting the cookie
    });

    res.status(200).json({
      data,
      message: "Succefully logout",
    });
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).send("Error clearing OTP data");
  }
};
