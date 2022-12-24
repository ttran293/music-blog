const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const LikeSchema = new mongoose.Schema({
  byUser: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  toPost: { type: mongoose.Types.ObjectId, ref: "Musicposts" },
  toComment: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
});


module.exports = mongoose.model("Like", LikeSchema);
