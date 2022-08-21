const processRouter = require("express").Router();

const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

processRouter.get("/", isLoggedOut, (req, res) => {
  res.render("process");
});

module.exports = processRouter;
