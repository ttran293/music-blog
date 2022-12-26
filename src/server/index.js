require("dotenv").config();
const express = require("express");
const os = require("os");
var axios = require("axios");
var qs = require("qs");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const musicposts = require("../server/routes/musicposts-routes");
const users = require("../server/routes/users-routes");

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join("build", "index.html"));
  });
}

app.use("/post", musicposts);
app.use("/", users);


const uri =
  "mongodb+srv://" +
  process.env.dbuser +
  ":" +
  process.env.dbpw +
  "@cluster0.1wmqh.mongodb.net/music_blog_content?retryWrites=true&w=majority";


mongoose
  .connect(uri)
  .then(() => {
    app.listen(process.env.PORT||8080);
  })
  .catch((err) => {
    console.log(err);
  });


