const topRouter = require("express").Router();

const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

baseRouter.get("/custom-top", (req, res) => {
  res.render("wizard/custom-top");
});

baseRouter.post("/custom-top", (req, res) => {
  const { sensual, confident, sexy, comforting, peaceful } = req.body;
});

module.exports = topRouter;
