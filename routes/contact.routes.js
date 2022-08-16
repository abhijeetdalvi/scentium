const contactRouter = require("express").Router();

const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

contactRouter.get("/contact", isLoggedOut, isLoggedIn, (req, res) => {
  res.render("/views/contact");
});

contactRouter.post("/contact", isLoggedOut, (req, res) => {
  const { email, enquiry } = req.body;
});

module.exports = contactRouter;
