const express = require("express");
const User = require("../models/user");
const isSignedIn = require("../middleware/isSignedIn");

const router = express.Router();

// // Index - GET /trips
// router.get("/", isSignedIn, async (req, res) => {
//   try {
//     const trips = await Trip.find({ owner: req.session.user._id });

//     res.render("trips/index", { trips });
//   } catch (error) {
//     console.log(error);
//     res.redirect("/");
//   }
// });

// // New - GET /trips/new
// router.get("/new", isSignedIn, (req, res) => {
//   res.render("trips/new");
// });

module.exports = router;
