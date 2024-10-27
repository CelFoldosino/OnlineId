const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");

const { sendEmail } = require('../controllers/EmailController'); 


router.post('/send-email', authMiddleware, sendEmail);

module.exports = router;
