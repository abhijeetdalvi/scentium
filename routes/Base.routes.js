const baseRouter = require("express").Router();
const { isValidObjectId } = require("mongoose");

const mongoose = require("mongoose");

//const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const FragranceModel = require("../models/Fragrance.model");
const UserModel = require("../models/User.model");

baseRouter.get("/custom-base", isLoggedIn, (req, res) => {
  res.render("wizard/custom-base");
});

baseRouter.post("/custom-base", isLoggedIn, (req, res) => {
  const { quantity } = req.body;

  const baseString = "floral";
  const topString = "sensual";

  FragranceModel.create({
    base: baseString,
    top: topString,
    quantity,
  }).then((createdBaseAndTop) => {
    console.log(req.session.user);
    UserModel.findByIdAndUpdate(
      req.session.user,
      {
        $push: { customFragranceOrdered: createdBaseAndTop._id },
      },
      {
        new: true,
      }
    )
      .then((updatedUser) => {
        console.log("updatedUser:", updatedUser);
        const { _id, customFragranceOrdered } = updatedUser;
        res.render("wizard/custom-ready", { _id, customFragranceOrdered });
      })
      .catch((err) => {
        console.log("error while creating the base and top", err);
        res.redirect("wizard/custom-base");
      });
  });
});

baseRouter.get("/:orderId", (req, res) => {
  const { orderId } = req.params;

  FragranceModel.findById(orderId).then((fragrance) => {
    res.render("fragrance/order", { fragrance });
  });
});

baseRouter.get("/fragrance/:orderId/cancel", isLoggedIn, async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);
  const isValidOrderId = isValidObjectId(orderId);

  if (!isValidOrderId) {
    return res.status(404).redirect(`/user/${req.session.user}`);
  }

  //const { userId } = req.session.user;

  const possibleUser = await UserModel.findOne({
    _id: req.session.user,
    $in: { customFragranceOrdered: orderId },
  });

  if (!possibleUser) {
    return res.status(400).redirect(`/user/${req.session.user}`);
  }

  await UserModel.findByIdAndUpdate(req.session.user, {
    $pull: { customFragranceOrdered: orderId },
  });

  await FragranceModel.findByIdAndDelete(orderId, {
    _id: isValidOrderId,
  })
    .then((success) => {
      console.log("Order cancelled:", success.orderId);
    })
    .catch((error) => {
      console.error("order did not cancel");
    });

  res.redirect(`/user/${req.session.user}`);
});

module.exports = baseRouter;
