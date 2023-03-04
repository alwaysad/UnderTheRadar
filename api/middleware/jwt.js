const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();
const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token); 
  if (!token) {
    return res.status(401).json({ message: "You are not authenticated brother" });
  }
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) {
      return res.status(404).json({ message: "Token is not valid" });
    }
    req.userId = payload.id;
    next();
  });
};

module.exports = verifyToken;
