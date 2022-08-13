const mongoose = require("mongoose");
const crypto = require("crypto");

// user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      // required: true,
      trim: true,
    },
    // Phone:{
    //    type: String,
    //    // required: true,
    // },
    email: {
      type: String,
      required: true,
      // unique: true,
      // lowercase: true,
    },
    password: {
      type: String,
      required: true,
      // minLength: 6
    },
    // country:{
    //    type: String,
    //    // required: true,
    // },
    // address:{
    //    type: String,
    //    // required: true,
    // },
    // State:{
    //    type: String,
    //    // required: true,
    // },
    // city:{
    //    type: String,
    //    // required: true,
    // },
    // zipCode:{
    //    type: String,
    //    // required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
