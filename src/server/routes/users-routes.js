const express = require('express');
const { check } = require('express-validator');
const checkAuth = require("../middleware/check-auth");
const usersController = require('../controllers/users-controller');

const router = express.Router();

router.post(
  '/signup',
  usersController.signUp
);

router.post("/login", usersController.logIn);

router.use(checkAuth);

router.post("/user/bio/:uid", usersController.changeBio);

module.exports = router;
