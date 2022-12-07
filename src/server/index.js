require("dotenv").config();
const express = require("express");
const os = require("os");
var axios = require("axios");
var qs = require("qs");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const musicposts = require("./controllers/musicposts-controller");
// const users = require("./controllers/users-controller");

const musicposts = require("../server/routes/musicposts-routes");
const users = require("../server/routes/users-routes");


// app.use(cors({
//   origin: true
// }));

// app.use(express.static("dist"));
// app.use(express.json());
// app.use(express.urlencoded({
//   extended: false
// }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/post", musicposts);
app.use("/", users);


// app.post("/post", musicposts.createPost);
// app.get("/post", musicposts.getPosts);
// app.get("/post/:pid", musicposts.getPostById);
// app.post("/post/:pid", musicposts.deletePostById);

// app.post("/signup", users.signUp);
// app.post("/login", users.logIn);


const uri =
  "mongodb+srv://" +
  process.env.dbuser +
  ":" +
  process.env.dbpw +
  "@cluster0.1wmqh.mongodb.net/music_blog_content?retryWrites=true&w=majority";


mongoose
  .connect(uri)
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });



// app.listen(process.env.PORT || 8080, () =>
//   console.log(`Listening on port ${process.env.PORT || 8080}!`)
// );