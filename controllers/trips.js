const express = require("express");
const Trip = require("../models/trip");
const isSignedIn = require("../middleware/isSignedIn");

const router = express.Router();

// Index - GET /trips
router.get("/", isSignedIn, async (req, res) => {
  try {
    const trips = await Trip.find({ owner: req.session.user._id });

    res.render("trips/index", { trips });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
