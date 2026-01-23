require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const morgan = require("morgan");

const authController = require("./controllers/auth");
const tripsController = require("./controllers/trips");

const app = express();
const PORT = process.env.PORT || 3000;

// DB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongo connection error", err);
});

// View Engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(morgan("dev"));

// Sessions (stored in MongoDB)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  }),
);

// Make session user available in all EJS views
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Error message handling
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  req.session.message = null;
  next();
});

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/auth", authController);
app.use("/trips", tripsController);

app.listen(PORT, () =>
  console.log(`Looking for the perfect getaway on Port ${PORT}`),
);
