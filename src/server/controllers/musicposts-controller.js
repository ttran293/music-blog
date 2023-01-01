require("dotenv").config();
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const MusicPost = require("../models/MusicPost");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
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
          .populate({
            path: "comments",
            model: "Comment",
            populate: { path: "byUser", select: "name", model: "User" },
          })
          .populate({
            path: "likes",
            model: "Like",
            populate: { path: "byUser", select: "name", model: "User" },
          })
          .sort({ _id: -1 })
          .exec();

        console.log(posts);
        return res.json(posts);
    } 
    catch (error) {
        console.log(error)
        return res.json({
            message: "Could not retrieve data.",
        });
    }
};

const getPostsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId).select("name information datejoin");
  } catch (err) {
    const error = new HttpError("Something went wrong with users.", 500);
    return next(error);
  }


  try {
    const posts = await MusicPost.find({ creator: userId })
      .populate("creator", "-password")
      .populate({
        path: "comments",
        model: "Comment",
        populate: { path: "byUser", select: "name", model: "User" },
      })
      .populate({
        path: "likes",
        model: "Like",
        populate: { path: "byUser", select: "name", model: "User" },
      })
      .sort({ _id: -1 })
      .exec();

    console.log(posts);
    console.log(user);
    return res.json({ posts: posts, user: user });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Could not retrieve data.",
    });
  }
  
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
    post = await MusicPost.findById(mpostid).populate(
      "creator comments likes",
      "-password"
    );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete post.",
      500
    );
    return next(error);
  }
  console.log(post);
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

  if (!post) {
    const error = new HttpError("Could not find post for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await post.remove({ session: sess });

    post.creator.posts.pull(post);
    await post.creator.save({ session: sess });

    post.creator.likes.pull(post);
    await post.creator.save({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  // try {
  //   await Like.deleteMany({ toPost: mpostid });
  // } catch (err) {
  //   const error = new HttpError(
  //     "Something went wrong, could not delete likes.",
  //     500
  //   );
  //   return next(error);
  // }

  // try {
  //   await Comment.deleteMany({ toPost: mpostid });
  // } catch (err) {
  //   const error = new HttpError(
  //     "Something went wrong, could not delete likes.",
  //     500
  //   );
  //   return next(error);
  // }

  res.status(200).json({ message: "Deleted PostWithID.", status: "200" });
};

const addComment = async (req, res, next) => {
  const postID = req.params.pid;
  const userID = req.userData.userId;


  const theComment = new Comment({
    byUser: userID,
    content: req.body.content,
    date: moment().format(),
    onPost: postID,
  });




  let post;
  try {
    post = await MusicPost.findById(postID);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong music posts.",
      500
    );
    return next(error);
  }

  if (!post) {
    const error = new HttpError("Could not find post for this id.", 404);
    return next(error);
  }

  let commenter;
  try {
    commenter = await User.findById(userID);
  } catch (err) {
    const error = new HttpError("Something went wrong with users.", 500);
    return next(error);
  }

  if (!commenter) {
    const error = new HttpError("Could not find user id.", 404);
    return next(error);
  }

  let result;
  try {
  
    result = await theComment.save();

    commenter.comments.push(theComment);
    await commenter.save();

    post.comments.push(theComment);
    await post.save();

  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong.",
      500
    );
    return next(error);
  }




   res.status(200).json({
     message: "Comment added.",
     status: "200",
     resultCommentID: result.id,
   });
};

const deleteCommentById = async (req, res, next) => {
  const postID = req.body.postID;
  const commentID = req.params.cid;
  const userID = req.userData.userId;
  console.log(postID);
  console.log(commentID);
  console.log(userID);  
  let commentTBD;
  try {
    commentTBD = await Comment.findById(commentID).populate(
      "byUser onPost",
      "-password"
    );
  } catch (err) {
    const error = new HttpError("Something went wrong here 1.", 500);
    return next(error);
  }

  if (!commentTBD) {
    const error = new HttpError("Could not find like with given id.", 404);
    return next(error);
  }

  console.log(commentTBD);
  // console.log(userID);
  if (commentTBD.byUser.id !== userID) {
    const error = new HttpError(
      "You are not allowed to unlike this like.",
      401
    );
    return next(error);
  }

  try {
    await commentTBD.remove();

    commentTBD.byUser.comments.pull(commentTBD);
    await commentTBD.byUser.save();

    commentTBD.onPost.comments.pull(commentTBD);
    await commentTBD.onPost.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Something went wrong, could not unlike.", 500);
    return next(error);
  }

  res.status(200).json({ message: "Comments deleted.", status: "200" });

};

const addLike = async (req, res, next) => {
  const postID = req.params.pid;
  const userID = req.userData.userId;
  

  Like.findOne({ byUser: userID, toPost: postID }, async function (err, ifLikeFound) {
    if (err) {
      console.log(err);
    } else {
      if(ifLikeFound){
        return res.status(200).json({ message: "Already Liked.", status: "500" });
      } 
      else{
        const theLike = new Like({
          byUser: userID,
          toPost: postID,
        });
        let user;
        try {
          user = await User.findById(userID);
        } catch (err) {
          const error = new HttpError("Something went wrong user.", 500);
          return next(error);
        }
        if (!user) {
          const error = new HttpError("Could not find user for this id.", 404);
          return next(error);
        }
        let post;
        try {
          post = await MusicPost.findById(postID);
        } catch (err) {
          const error = new HttpError("Something went wrong music posts.", 500);
          return next(error);
        }
        if (!post) {
          const error = new HttpError("Could not find post for this id.", 404);
          return next(error);
        }
        let result;
        try {
          result = await theLike.save();
          user.likes.push(theLike);
          await user.save();
          post.likes.push(theLike);
          await post.save();
        } catch (err) {
          console.log(err);
          const error = new HttpError("Something went wrong.", 500);
          return next(error);
        }
        // console.log(result.id);
        res
          .status(200)
          .json({
            message: "Like added.",
            status: "200",
            resultLikeID: result.id,
          });
      }
    }
  });

 
};

const deleteLikeById = async (req, res, next) => {
  //console.log("here")
  // console.log(req.userData.userId);
  // console.log(req.params.lid);
  // console.log(req.body.postID);
  // const commentID = req.params.cid;
  // const userID = req.userData.userId;

  const postID = req.body.postID;
  const likeID = req.params.lid;
  const userID = req.userData.userId;

  let likeTBD;
  try {
    likeTBD = await Like.findById(likeID).populate("byUser toPost", "-password");
  } catch (err) {
    const error = new HttpError("Something went wrong here 1.", 500);
    return next(error);
  }

  if (!likeTBD) {
    const error = new HttpError("Could not find like with given id.", 404);
    return next(error);
  }

  console.log(likeTBD);
  // console.log(userID);
  if (likeTBD.byUser.id !== userID) {
    const error = new HttpError(
      "You are not allowed to unlike this like.",
      401
    );
    return next(error);
  }

  try {
    await likeTBD.remove();

    likeTBD.byUser.likes.pull(likeTBD);
    await likeTBD.byUser.save();

    likeTBD.toPost.likes.pull(likeTBD);
    await likeTBD.toPost.save();

  } catch (err) {
    console.log(err)
    const error = new HttpError("Something went wrong, could not unlike.", 500);
    return next(error);
  }

  res.status(200).json({ message: "Like deleted.", status: "200" });
};

const changeBio = async (req, res, next) => {
  const userID = req.userData.userId;

  let user;
  try {
    user = await User.findById(userID);
  } catch (err) {
    const error = new HttpError("Something went wrong with users.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user id.", 404);
    return next(error);
  }

  if (req.params.uid !== req.userData.userId) {
    const error = new HttpError("You are not allowed to edit this bio.", 401);
    return next(error);
  }
  user.information = req.body.content;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update user.",
      500
    );
    return next(error);
  }
  res
    .status(200)
    .json({ message: "Bio edited.", status: "200", bio: req.body.content });
};

exports.createPost = createPost;
exports.getPosts = getPosts;
exports.getPostsByUserId = getPostsByUserId;
exports.getPostById = getPostById;
exports.deletePostById = deletePostById;
exports.addComment = addComment;
exports.deleteCommentById = deleteCommentById;
exports.addLike = addLike;
exports.deleteLikeById = deleteLikeById;
exports.changeBio = changeBio;
