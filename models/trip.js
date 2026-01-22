const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["wishlist", "planned", "visited"],
      default: "wishlist",
    },
    priority: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },
    budget: {
      type: Number,
      min: 0,
    },
    travelMonth: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Trip", tripSchema);
