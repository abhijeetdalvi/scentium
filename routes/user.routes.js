const { Router } = require("express");
const { isValidObjectId } = require("mongoose");
const { populate } = require("../models/Fragrance.model");
const UserModel = require("../models/User.model");
const FragranceModel = require("../models/Fragrance.model");
const isLoggedIn = require("../middleware/isLoggedIn");

const userRouter = Router();

userRouter.get("/:userId", (req, res) => {
  const isValidId = isValidObjectId(req.params.userId);

  if (!isValidId) {
    return res.redirect("/");
  }

  UserModel.findById(req.params.userId)
    .populate("customFragranceOrdered")
    .then((possibleUser) => {
      if (!possibleUser) {
        return res.redirect("/");
      }
      console.log("possibleUser:", possibleUser.customFragranceOrdered);
      res.render("user/myaccount", {
        user: possibleUser,
        userId: req.params.userId,
      });
    })
    .catch((err) => {
      console.log("err:", err);
      res.status(500).redirect("/");
    });
});

module.exports = userRouter;
