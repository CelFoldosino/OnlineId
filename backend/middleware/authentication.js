/** @format */

const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
 
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, token: token };

    next();
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ message: "Token is not valid", error: error.message });
  }
};
