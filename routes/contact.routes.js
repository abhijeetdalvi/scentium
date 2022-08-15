const contactRouter = require("express").Router();

const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

contactRouter.get("/contact", isLoggedOut, (req, res) => {
  res.render("/contact");
});

contactRouter.post("/contact", isLoggedOut, (req, res) => {
  const { myself, gift } = req.body;
});

module.exports = contactRouter;
