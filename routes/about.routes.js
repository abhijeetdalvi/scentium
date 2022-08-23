const aboutRouter = require("express").Router();

const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

aboutRouter.get("/", (req, res) => {
  res.render("about");
});

module.exports = aboutRouter;
