const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();
const verifyToken = (req, res,next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "You are not authenticated" });
  }
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) {
      res.status(404).json({ message: "Token is not valid" });
    }
    req.userId= payload.id;
    next();
  });
};

module.exports = verifyToken;
