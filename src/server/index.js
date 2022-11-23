require("dotenv").config();
const express = require("express");
const os = require("os");
var axios = require("axios");
var qs = require("qs");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors({
  origin: true
}));

app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);