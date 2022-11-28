require("dotenv").config();
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const MusicPost = require("./models/MusicPost");

const uri =
    "mongodb+srv://" +
    process.env.dbuser +
    ":" +
    process.env.dbpw +
    "@cluster0.1wmqh.mongodb.net/music_blog_content?retryWrites=true&w=majority";


mongoose.connect(uri).then(() => {
    console.log('Connected')
}).catch(() => {
    console.log('Connection failed!')
});

const createPost = async (req, res, next) => {
    const createdMusicPost = new MusicPost({
      posturl: req.body.posturl,
      caption: req.body.caption,
    });

    try {
        const result = await createdMusicPost.save();
        res.json(result);
        console.log(result);
    } catch (error) {
        return res.json({
            message: "Could not store data.",
        });
    }
};

const getPosts = async (req, res, next) => {
    try {
        const posts = await MusicPost.find().exec();
        res.json(posts);
        console.log("Getting data");
        // console.log(posts);
    } 
    catch (error) {
        return res.json({
            message: "Could not retrieve data.",
        });
    }
};

const getPostById = async (req, res, next) => {
    const mpostid = req.params.pid;

    let PostWithID;
    try {
        PostWithID = await MusicPost.findById(mpostid);
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

    res.json({ musicpost: PostWithID.toObject({ getters: true }) });
};

const deletePostById = async (req, res, next) => {
    const mpostid = req.params.pid;
    console.log(mpostid);
    let PostWithID;
    try {
      PostWithID = await MusicPost.findById(mpostid);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not delete place.",
        500
      );
      return next(error);
    }

    if (!PostWithID) {
      const error = new HttpError("Could not find MusicPost for this id.", 404);
      return next(error);
    }

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await PostWithID.remove({ session: sess });
    //   place.creator.places.pull(place);
    //   await place.creator.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not delete place.",
        500
      );
      return next(error);
    }

    res.status(200).json({ message: "Deleted PostWithID." });
};


module.exports.createPost = createPost;
module.exports.getPosts = getPosts;
module.exports.getPostById = getPostById;
module.exports.deletePostById = deletePostById;
