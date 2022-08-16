const contactRouter = require("express").Router();

const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

contactRouter.get("/", (req, res) => {
  res.render("contact");
});

contactRouter.post("/", (req, res) => {
  const { email, enquiry } = req.body;
});

module.exports = contactRouter;
