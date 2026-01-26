const express = require("express");
const router = express.Router();

const User = require("../models/user");
const isSignedIn = require("../middleware/isSignedIn");

// Routes

// // Index - GET /trips
router.get("/", isSignedIn, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    res.render("trips/index", {
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

// Create - POST /trips
router.post("/", isSignedIn, async (req, res) => {
  const { destination } = req.body;

  try {
    if (!destination || !destination.trim()) {
      throw new Error("Please provide a valid destination.");
    }

    const currentUser = await User.findById(req.session.user._id);

    const tripData = {
      ...req.body,
      owner: currentUser._id,
    };

    currentUser.trips.push(tripData);
    await currentUser.save();

    res.redirect("/trips");
  } catch (error) {
    console.log(error);
    req.session.message = error.message;

    req.session.save(() => {
      res.redirect("/trips/new");
    });
  }
});

// Show - GET /trips/:tripId
router.get("/:tripId", isSignedIn, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const trip = currentUser.trips.id(req.params.tripId);

    if (!trip) return res.redirect("/trips");

    res.render("trips/show", {
      trip,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Edit GET /trips/:tripId/edit
router.get("/:tripId/edit", isSignedIn, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const trip = currentUser.trips.id(req.params.tripId);

    if (!trip) return res.redirect("/trips");

    res.render("trips/edit", {
      trip,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Update - PUT /trips/:tripId
router.put("/:tripId", isSignedIn, async (req, res) => {
  const {
    destination,
    country,
    city,
    status,
    priority,
    budget,
    travelMonth,
    imageUrl,
    notes,
  } = req.body;

  try {
    if (!destination || !destination.trim()) {
      throw new Error("Please provide a valid destination.");
    }

    const currentUser = await User.findById(req.session.user._id);
    const trip = currentUser.trips.id(req.params.tripId);

    if (!trip) return res.redirect("/trips");

    trip.set({
      destination: destination.trim(),
      country,
      city,
      status,
      priority,
      budget,
      travelMonth,
      imageUrl,
      notes,
    });

    await currentUser.save();

    res.redirect(`/trips/${trip._id}`);
  } catch (error) {
    console.log(error);
    req.session.message = error.message;

    req.session.save(() => {
      res.redirect(`/trips/${req.params.tripId}/edit`);
    });
  }
});

// Delete - DELETE /trips/:tripId
router.delete("/:tripId", isSignedIn, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    const trip = currentUser.trips.id(req.params.tripId);
    if (!trip) return res.redirect("/trips");

    trip.deleteOne();
    await currentUser.save();

    res.redirect("/trips");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
