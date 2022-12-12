const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String },
  information: { type: String },
  datejoin: { type: String },
  password: { type: String, required: true, minlength: 6 },
  posts: [{ type: mongoose.Types.ObjectId, ref: "Musicposts" }],
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  // likes: [{ type: mongoose.Types.ObjectId, ref: "Like" }],
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);
