const mongoose = require('mongoose')

const MusicPostSchema = new mongoose.Schema({
  posturl: { type: String, require: true },
  caption: { type: String },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  date: { type: String },
  tag: { type: String },
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: mongoose.Types.ObjectId, ref: "Like" }],
});

module.exports = mongoose.model("Musicposts", MusicPostSchema);
