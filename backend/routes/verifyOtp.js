/** @format */

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { verifyOtp } = require("../controllers/verifyOtp");

// Define the route for retrieving all user accounts
router.post("/verify-otp", authMiddleware, verifyOtp);

module.exports = router;
