require("dotenv").config();
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const MusicPost = require("../models/MusicPost");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const moment = require('moment');

const createPost = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid inputs passed, please check your data.", 422)
      );
    }
  
    const createdMusicPost = new MusicPost({
      posturl: req.body.posturl,
      caption: req.body.caption,
      creator: req.userData.userId,
      date: moment().format(),
    });
    
    let user;
    try {
      user = await User.findById(req.userData.userId);
    } catch (err) {
      const error = new HttpError(
        "Creating place failed, please try again.",
        500
      );
      return next(error);
    }

    if (!user) {
      const error = new HttpError("Could not find user for provided id.", 404);
      return next(error);
    }


    try {
        await createdMusicPost.save();
        user.posts.push(createdMusicPost);
        await user.save();
        return res.json({
            status: "201",
            message: "Success.",
        });
    } catch (error) {
        return res.json({
          status: "500",
          message: "Could not store data.",
        });
    }
};

const getPosts = async (req, res, next) => {
    try {
        const posts = await MusicPost.find()
          .populate("creator", "-password")
          .exec();

        console.log(posts);
        return res.json(posts);
    } 
    catch (error) {
        return res.json({
            message: "Could not retrieve data.",
        });
    }
};

const getPostsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userPosts;
  try {
    userPosts = await User.findById(userId)
      .select("-password -email")
      .populate("posts");
  }
  catch(err){
      const error = new HttpError(
        "Fetching places failed, please try again later.",
        500
      );
      return next(error);
  }
  if (!userPosts) {
    return next(
      new HttpError("Could not find or user not exists.", 404)
    );
  }

  res.json(userPosts)
};

const getPostById = async (req, res, next) => {
    const mpostid = req.params.pid;

    let PostWithID;
    try {
        PostWithID = await MusicPost.findById(mpostid).populate(
          "creator",
          "-password -email",
        );
    } catch (err) {
        const error = new HttpError(
        "Fetching places failed, please try again later",
        500
        );  
        return next(error);
    }

    if (!PostWithID) {
      const error = new HttpError(
        "Could not find a place for the provided id.",
        404
      );
      return next(error);
    }

    res.json(PostWithID);
};

const deletePostById = async (req, res, next) => {
    const mpostid = req.params.pid;
      
    let post;

    try {
      post = await MusicPost.findById(mpostid).populate("creator","-password");
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not delete post.",
        500
      );
      return next(error);
    }

    if (!post) {
      const error = new HttpError("Could not find post for this id.", 404);
      return next(error);
    }

    if (post.creator.id !== req.userData.userId) {
      const error = new HttpError(
        "You are not allowed to delete this place.",
        401
      );
      return next(error);
    }

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await post.remove({ session: sess });
      post.creator.posts.pull(post);
      await post.creator.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not delete place.",
        500
      );
      return next(error);
    }


    res.status(200).json({ message: "Deleted PostWithID.", status:"200" });
};


exports.createPost = createPost;
exports.getPosts = getPosts;
exports.getPostsByUserId = getPostsByUserId;
exports.getPostById = getPostById;
exports.deletePostById = deletePostById;
