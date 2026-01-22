const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

// GET /auth/sign-up
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up");
});

// POST /auth/sign-up
router.post("/sign-up", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({ username, password });

    // store user object in session
    req.session.user = {
      _id: user._id,
      username: user.username,
    };

    res.redirect("/trips");
  } catch (error) {
    console.log(error);
    res.redirect("/sign-up");
  }
});

module.exports = router;
