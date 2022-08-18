const baseRouter = require("express").Router();

const mongoose = require("mongoose");

//const isLoggedOut = require("../middleware/isLoggedOut");
//const isLoggedIn = require("../middleware/isLoggedIn");
const FragranceModel = require("../models/Fragrance.model");
const UserModel = require("../models/User.model");

baseRouter.get("/custom-base", (req, res) => {
  res.render("wizard/custom-base");
});

baseRouter.post("/custom-base", (req, res) => {
  const { flora, gourmand, oriental, fresh, woodsy } = req.body;

  const baseString = "floral";

  FragranceModel.create({
    base: baseString,
  }).then((createdBase) => {
    UserModel.findByIdAndUpdate(
      req.session.userId,
      {
        $push: { customFragranceOrdered: createdBase._id },
      },
      {
        new: true,
      }
    )
      .then((updatedUser) => {
        console.log("updatedUser:", updatedUser);
        res.render("wizard/custom-top", { createdBase });
      })
      .catch((err) => {
        console.log("error while creating the base", err);
        res.redirect("wizard/custom-base");
      });
  });
});

module.exports = baseRouter;
