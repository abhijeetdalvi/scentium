const aboutRouter = require("express").Router();

const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

aboutRouter.get("/about", isLoggedIn, (req, res) => {
  res.render("/views/about");
});

module.exports = aboutRouter;
