const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const CommentSchema = new mongoose.Schema({
  commenter: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  description: { type: String, required: true },
  posts: { type: mongoose.Types.ObjectId, required: true, ref: "Musicposts" },
  // likes: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
});


module.exports = mongoose.model("Comment", CommentSchema);
