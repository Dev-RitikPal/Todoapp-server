const User = require("../models/user");
const { json } = require("express");
const user = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.getUserData = (req, res) => {
  const { authid: tokan } = req.headers;
  try {
    const response = jwt.verify(tokan, process.env.JWT_SIGNIN_KEY);
    User.findOne({ _id: response._id }).exec((err, user) => {
      if (user.email) {
        return res.json({
          name: user.firstName,
          email: user.email,
        });
      } else {
        return res.json({
          error: "User not found",
        });
      }
    });
  } catch (error) {
    return res.json({
      err: error,
    });
  }
};
