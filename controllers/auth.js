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
    const user = await User.create({ username, password: hashedPassword });

    // store user object in session
    req.session.user = {
      _id: user._id,
      username: user.username,
    };
    req.session.userId = user._id;

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/auth/sign-up");
  }
});

// GET /auth/sign-in
router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in");
});

// POST /auth/sign-in
router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !user.password) {
      return res.redirect("/auth/sign-in");
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res.redirect("/auth/sign-in");
    }

    req.session.user = {
      _id: user._id,
      username: user.username,
    };
    req.session.userId = user._id;

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/auth/sign-in");
  }
});

// POST /auth/sign-out
router.post("/sign-out", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
