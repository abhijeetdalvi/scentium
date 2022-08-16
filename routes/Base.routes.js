const baseRouter = require("express").Router();

const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

baseRouter.get("/custom-base", (req, res) => {
  res.render("wizard/custom-base");
});

baseRouter.post("/custom-base", (req, res) => {
  const { flora, gourmand, oriental, fresh, woodsy } = req.body;
});

module.exports = baseRouter;
