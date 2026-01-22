const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

// GET /auth/sign-up
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up");
});

module.exports = router;
