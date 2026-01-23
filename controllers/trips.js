const express = require("express");
const router = express.Router();

const User = require("../models/user");
const isSignedIn = require("../middleware/isSignedIn");

// Routes

// // Index - GET /trips
router.get("/", isSignedIn, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    res.render("trips/index.ejs", {
      trips: currentUser.trips,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// New - GET /trips/new
router.get("/new", isSignedIn, (req, res) => {
  res.render("trips/new");
});

module.exports = router;
