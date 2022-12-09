const express = require('express');
const { check } = require('express-validator');

const musicpostsControllers = require("../controllers/musicposts-controller");

const checkAuth = require('../middleware/check-auth');
const { route } = require('./users-routes');

const router = express.Router();

router.get("/", musicpostsControllers.getPosts);

router.get("/user/:uid", musicpostsControllers.getPostsByUserId);

router.get("/:pid", musicpostsControllers.getPostById);

router.use(checkAuth);

router.post("/", musicpostsControllers.createPost);

router.post("/delete/:pid", musicpostsControllers.deletePostById);

module.exports = router;
