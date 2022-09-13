const User = require("../models/user");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { json } = require("express");
const user = require("../models/user");
require("dotenv").config();

// signup
exports.signup = (req, res) => {
  const {
    email,
    password,
    firstName,
    todos
  } = req.body;
  const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const countryCodeRegex = /^(\+?\d{1,3}|\d{1,4})$/;
  const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  User.findOne({ email: email }).exec((err, user) => {
     
    // Validations
    if (
      !email ||
      !password ||
      !firstName
    ) {
      return res.json({ msg: "not all fields have been entered" });
    }
    //mobile number validation
    // if(!mobileRegex.test(mobile)){
    //    return res.status(400).json({msg: "Invalid Mobile Number"})
    // }
    if(user){
       return res.status(400).json({error: "User already exists!!"});
    }
    //password validation
    if(password.length < 6 ) {
       return res.status(400).json({msg: "password should contain atleast 6 characters"})
    }
    if(!passRegex.test(password)){
       return res.status(400).json({msg: "weak password, should have one capital and a special character ex : @,#,!,$,%,^,&,*"})
    }
    if(password !== passCheck){
       return res.status(400).json({msg: "password and confirm password not matched!"})
    }

    // const token = jwt.sign({email, password}, process.env.JWT_ACC_ACTIVATE, {expiresIn: '30m'})
    const newUser = new User({
      email,
      password,
      firstName,
      todos
      // Phone,
      // address,
      // country,
      // State,
      // city,
      // zipCode,
    });
    newUser.save((err, success) => {
      if (err) {
        console.log("Error in signup while activating account", err);
        return res.status(400), json({ error: "error activating account" });
      } else {
        return res.json({
          email: email,
          id:success._id
        });
      }
    });
    // bcrypt.genSalt(10, (err, salt) => {
    //    bcrypt.hash(newUser.password, salt, (err, hash) => {
    //       console.log('11122',newUser.password, salt)
    //       if (err) {
    //          console.log(err)
    //          throw err;
    //       }
    //       newUser.password= hash;
    //       newUser.save((err, success) => {
    //          if (err) {
    //             console.log("Error in signup while activating account", err);
    //             return res.status(400), json({error: "error activating account"})
    //          }
    //          res.json({
    //             message: "Signup Success Now you can login into your account"
    //          })
    //       })
    //    })
    // })
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "User does not exists, Signup first",
      });
    }
    // comparing encrypted password
   //  if (password !== user.password) {
   //    return res.status(400).json({
   //      error: "Email or Password does not matched",
   //    });
   //  }

     const token = jwt.sign({ _id: user._id }, process.env.JWT_SIGNIN_KEY, {
       expiresIn: "28d",
     });

    const { _id, firstName, email } = user;

    res.json({
      token,
      user: { _id, firstName, email },
    });
  });
};

exports.logOutUser = async(req, res) =>{
  // const {tokan, userId} = req.body
  try {
    const { userId } = req.params;
    const ress = jwt.verify(userId, process.env.JWT_SIGNIN_KEY)
    const resps = await User.findOne({ _id: ress._id });
    if (resps) {
      res.json({
        msg: "Loggout successfully",
      });
    }
  } catch (e) {
    res.json({
      error: e,
    });
  }
}
