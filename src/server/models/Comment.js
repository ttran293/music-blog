const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const CommentSchema = new mongoose.Schema({
  commenter: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  content: { type: String, required: true },
  posts: { type: mongoose.Types.ObjectId, required: true, ref: "Musicposts" },
});


module.exports = mongoose.model("Comment", CommentSchema);
