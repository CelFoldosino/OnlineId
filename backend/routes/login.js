/** @format */

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { loginAndSendOtp } = require("../controllers/loginController");

// Define the route for retrieving all user accounts
router.post("/login", authMiddleware, loginAndSendOtp);

module.exports = router;
