const { Router } = require("express");
const { isValidObjectId } = require("mongoose");
const UserModel = require("../models/User.model");

const userRouter = Router();

userRouter.get("/:userId", (req, res) => {
  const isValidId = isValidObjectId(req.params.userId);

  if (!isValidId) {
    return res.redirect("/");
  }

  UserModel.findById(req.params.userId)
    .then((possibleUser) => {
      if (!possibleUser) {
        return res.redirect("/");
      }
      console.log("possibleUser:", possibleUser);
      res.render("/user", {
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