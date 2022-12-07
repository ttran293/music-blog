const express = require('express');
const { check } = require('express-validator');

const musicpostsControllers = require("../controllers/musicposts-controller");

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get("/", musicpostsControllers.getPosts);


router.use(checkAuth);

router.post("/", musicpostsControllers.createPost);


module.exports = router;
