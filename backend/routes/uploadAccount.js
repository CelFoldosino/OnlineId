/** @format */

// routes/userRoutes.js
const express = require("express");
const multer = require("multer");
const { uploadUsers } = require("../controllers/uploadAccount");

const router = express.Router();

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route for uploading users via Excel file
router.post("/upload", upload.single("file"), uploadUsers);

module.exports = router;
