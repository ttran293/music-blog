require("dotenv").config();
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const HttpError = require("../models/http-error");
const User = require("../models/User");



const signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid inputs passed, please check your data.", 422)
      );
    }

    const { name, email, password } = req.body;
    console.log(req.body);
    let existingUser;
        try {
          existingUser = await User.findOne({ name: name });
        } catch (err) {
        const error = new HttpError(
            "Signing up failed, please try again later.",
            500
        );
        return next(error);
    }

    if (existingUser) {
      const error = new HttpError(
        "Username already exists, please use choose a different username instead.",
        422
      );
      return res.json({ error: error.toString(), status: '422'});
    }

    let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 12);
        } catch (err) {
        const error = new HttpError(
            "Could not create user, please try again.",
            500
        );
        return next(error);
    }

    const createdUser = new User({
      name,
      email,
      password: hashedPassword,
      posts: [],
      information: "",
      datejoin: moment().format(),
    });
    
    try {
      await createdUser.save();
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        "Signing up failed, please try again later.",
        500
      );
      return next(error);
    }


    let token;
    try {
      token = jwt.sign(
        { userId: createdUser.id},
        process.env.jwtkey,
        { expiresIn: "1h" }
      );
    } catch (err) {
      const error = new HttpError(
        "Signing up failed, please try again later.",
        500
      );
      return next(error);
    }


    res.status(201).json({
      userId: createdUser.id,
      name: createdUser.name,
      token: token,
      status: "201",
    });
};

const logIn = async (req, res, next) => {
    const { name, password } = req.body;

    
    let existingUser;

    try {
        existingUser = await User.findOne({ name: name });
    } catch (err) {
        const error = new HttpError(
        "Logging in failed, please try again later.",
        500
        );
        return next(error);
    }

    if (!existingUser) {
        const error = new HttpError(
        "Invalid credentials, could not log you in here.",
        403
        );
        return next(error);
    }
    
    let isValidPassword = false;
        try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
        } catch (err) {
        const error = new HttpError(
            "Could not log you in, please check your credentials and try again.",
            500
        );
        return next(error);
        }

    if (!isValidPassword) {
        const error = new HttpError(
            "Wrong password, Invalid credentials, could not log you in .",
            403
        );
        return next(error);
    }

    let token;
    try {
      token = jwt.sign(
        {
          userId: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
        },
        process.env.jwtkey,
        { expiresIn: "1h" }
      );
     
    } catch (err) {
      const error = new HttpError(
        "Logging in failed, please try again later.",
        500
      );
      return next(error);
    }

    res.json({
      userId: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
      token: token,
    });
  

};




module.exports.signUp = signUp;
module.exports.logIn = logIn;

