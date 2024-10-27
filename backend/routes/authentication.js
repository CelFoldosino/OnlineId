/** @format */

const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");

// Example of a protected route
router.get("/auth", authentication, (req, res) => {
  res.status(200).json({
    message: "successfully authenticated",
    data: {
      userId: req.user.id,
      token: req.user.token,
    },
  });
});

module.exports = router;
