const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Assuming user ID is in the 'sub' property of the decoded token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Assign the 'sub' property to req.user
    req.user = { id: decoded.sub };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token is not valid" });
  }
};
