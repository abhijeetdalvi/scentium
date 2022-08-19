// const topRouter = require("express").Router();

// const mongoose = require("mongoose");

// const isLoggedOut = require("../middleware/isLoggedOut");
// const isLoggedIn = require("../middleware/isLoggedIn");
// const FragranceModel = require("../models/Fragrance.model");
// const UserModel = require("../models/User.model");

// topRouter.get("/custom-top", (req, res) => {
//   res.render("wizard/custom-top");
// });

// topRouter.post("/custom-top", (req, res) => {
//   const { sensual, confident, sexy, comforting, peaceful } = req.body;

//   const topString = "sensual";

//   FragranceModel.create({
//     top: topString,
//   }).then((createdTop) => {
//     UserModel.findByIdAndUpdate(
//       req.session.userId,
//       {
//         $push: { customFragranceOrdered: createdTop._id },
//       },
//       {
//         new: true,
//       }
//     )
//       .then((updatedUser) => {
//         console.log("updatedUser:", updatedUser);
//         res.render("wizard/custom-ready", { createdTop });
//       })
//       .catch((err) => {
//         console.log("error while creating the top err");
//         res.redirect("wizard/custom-top");
//       });
//   });
// });

// module.exports = topRouter;
