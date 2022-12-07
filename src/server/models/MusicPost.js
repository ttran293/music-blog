const mongoose = require('mongoose')

const MusicPostSchema = new mongoose.Schema({
  posturl: { type: String, require: true },
  caption: { type: String, require: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  date: { type: String },
  tag: { type: String },
});

module.exports = mongoose.model("Musicposts", MusicPostSchema);
