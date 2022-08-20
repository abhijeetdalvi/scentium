const adminRouter = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Product = require("../models/Product.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

adminRouter.get("/add-product", (req, res, next) => {
  res.render("admin/add-product");
});

adminRouter.post("/add-product", (req, res, next) => {
  console.log("product saved");
  //console.log(req.body);

  const title = req.body.title;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;

  const prod = new Product(title, price, imageURL, description);
  prod.save();

  console.log(Product.findAll());

  res.send("Save Successfully");
});

module.exports = adminRouter;
