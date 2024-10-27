/** @format */

// routes/issuedIds.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");

const { issueId, fetchIssuedId } = require("../controllers/issuedId");

// Route to get issued ID count by admin and date
router.get("/retrieve-issuedId", authMiddleware, fetchIssuedId);

// POST request to issue an ID
router.patch("/issued-id", authMiddleware, issueId);

module.exports = router;
