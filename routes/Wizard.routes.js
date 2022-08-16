const wizardRouter = require("express").Router();

const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

wizardRouter.get("/type", isLoggedIn, (req, res) => {
  res.render("wizard/type");
});

wizardRouter.post("/type", isLoggedIn, (req, res) => {
  const { myself, gift } = req.body;
});



module.exports = wizardRouter;
