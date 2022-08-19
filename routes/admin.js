const adminRouter = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

adminRouter.get("/add-product", (req, res, next) => {
  res.render("add-product", { name: "Abhijeet" });
});

adminRouter.post("add/-product", (req, res, next) => {
  console.log("product saved");
  console.log(req.body);
  res.send("Save Successfully");
});

module.exports = adminRouter;
