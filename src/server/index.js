require("dotenv").config();
const express = require("express");
const os = require("os");
var axios = require("axios");
var qs = require("qs");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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

app.use("/post", musicposts);
app.use("/", users);

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
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


