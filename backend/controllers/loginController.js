/** @format */

const transporter = require("../config/emailConfig"); // Ensure this is configured correctly
const User = require("../models/AccountModels"); // Import your updated user model


// Function to generate a random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

// Controller for user login and sending OTP
exports.loginAndSendOtp = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Check if the password matches (modify this as per your logic)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate OTP and set expiration time (e.g., 5 minutes)
    const otpCode = generateOTP();
    const otpExpiration = Date.now() + 5 * 60 * 1000; // 5 minutes from now

    // Update the user with OTP information using findByIdAndUpdate
    await User.findByIdAndUpdate(
      user._id, // Use the user ID to update
      {
        otpCode,
        otpExpiresAt: otpExpiration,
        otpIsUsed: false, // Reset usage status on login
      },
      { new: true } // Option to return the updated document
    );

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otpCode}. It will expire in 5 minutes.`,
    };

    // Await the sending of the email
    await transporter.sendMail(mailOptions);

    // Respond with success message
    res.status(200).json({
      message: "Login successful. OTP sent to your email.",
      userId: user._id,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login." });
  }
};
