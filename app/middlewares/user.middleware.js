const db = require("../models");
const User = db.user;
const config = require("../config/user.config")
const jwt = require("jsonwebtoken")
const checkIfUserAlreadyExists = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(404).json({ message: `User with same email already exists.` });
  } else {
    next();
  }
};

const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.user = decoded;
    next();
  });
};
module.exports = {
  checkIfUserAlreadyExists,
  verifyToken,
};
