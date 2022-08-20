const baseRouter = require("express").Router();

const mongoose = require("mongoose");

//const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const FragranceModel = require("../models/Fragrance.model");
const UserModel = require("../models/User.model");

baseRouter.get("/custom-base", isLoggedIn, (req, res) => {
  res.render("wizard/custom-base");
});

baseRouter.post("/custom-base", (req, res) => {
  // const {
  //   floral,
  //   gourmand,
  //   oriental,
  //   fresh,
  //   woodsy,
  //   sensual,
  //   confident,
  //   sexy,
  //   comforting,
  //   peaceful,
  // } = req.body;

  const baseString = "floral";
  const topString = "sensual";

  FragranceModel.create({
    base: baseString,
    top: topString,
  }).then((createdBaseAndTop) => {
    UserModel.findByIdAndUpdate(
      req.session.userId,
      {
        $push: { customFragranceOrdered: createdBaseAndTop._id },
      },
      {
        new: true,
      }
    )
      .then((updatedUser) => {
        console.log("updatedUser:", updatedUser);
        res.render("wizard/custom-ready", { createdBaseAndTop });
      })
      .catch((err) => {
        console.log("error while creating the base and top", err);
        res.redirect("wizard/custom-base");
      });
  });
});

module.exports = baseRouter;
