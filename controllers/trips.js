const express = require("express")
const Trip = require("../models/trip")
const isSignedIn = require("../middleware/isSignedIn")

const router = express.Router()



module.exports = router;