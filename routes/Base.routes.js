const baseRouter = require("express").Router();

const mongoose = require("mongoose");

//const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const FragranceModel = require("../models/Fragrance.model");
const UserModel = require("../models/User.model");

baseRouter.get("/custom-base", isLoggedIn, (req, res) => {
  res.render("wizard/custom-base");
});

baseRouter.post("/custom-base", isLoggedIn, (req, res) => {
  // const {
  //   floral,
  //   gourmand
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

//

baseRouter.get("/:orderId", (req, res) => {
  const { orderId } = req.params;

  FragranceModel.findById(orderId).then((fragrance) => {
    res.render("fragrance/order", { fragrance });
  });
});

baseRouter.get("/:orderId/request", isLoggedIn, (req, res) => {
  const isValidOrderId = isValidObjectId(req.params.orderId);

  if (!isValidOrderId) {
    return res.status(404).redirect("/fragrance/order");
  }

  FragranceModel.findById(req.params.orderId).then((possibleOrder) => {
    if (!possibleOrder) {
      return res.status(400).redirect("fragrance/order");
    }
  });
});

baseRouter.get("/:orderId/cancel", isLoggedIn, async (req, res) => {
  const { orderId } = req.params;
  const isValidOrderId = isValidObjectId(orderId);

  if (!isValidOrderId) {
    return res.status(404).redirect("/fragrance/order");
  }

  const { userId } = req.session;

  const possibleUser = await UserModel.findOne({
    _id: userId,
    $in: { customFragranceOrdered: orderId },
  });

  if (!possibleUser) {
    return res.status(400).redirect("/fragrance/order");
  }

  await UserModel.findByIdAndUpdate(userId, {
    $pull: { customFragranceOrdered: orderId },
  });
});

module.exports = baseRouter;
