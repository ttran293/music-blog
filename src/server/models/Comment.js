const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const CommentSchema = new mongoose.Schema({
  byUser: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  content: { type: String, required: true },
  date: { type: String },
  onPost: { type: mongoose.Types.ObjectId, required: true, ref: "Musicposts" },
  likes: [{ type: mongoose.Types.ObjectId, ref: "Like" }],
});


module.exports = mongoose.model("Comment", CommentSchema);
