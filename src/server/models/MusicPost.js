const mongoose = require('mongoose')

const MusicPostSchema = new mongoose.Schema({
  posturl: { type: String, require: true },
  caption: { type: String, require: true },
  url: { type: String },
  date: { type: String },
  tag: { type: String },
  approved: { type: Boolean },
  //   like: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Like",
  //     },
  //   ],
  //   comments: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Comment",
  //     },
  //   ],
});

module.exports = mongoose.model("musicposts", MusicPostSchema);
