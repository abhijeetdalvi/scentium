const { Router } = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");

const {
  Types: { ObjectId },
} = require("mongoose");

const settingsRouter = Router();

const { z } = require("zod");

async function checkUserexists(req, res, next) {
  const user = await UserModel.findById(req.session.user);

  if (!user) {
    return res.redirect("/");
  }

  req.session.user = user;
  req.abhijeet = user;
  //console.log(user);

  next();
}

settingsRouter.use(isLoggedIn);
settingsRouter.use(checkUserexists);

settingsRouter.get("/profile", async (req, res) => {
  res.render("settings/profile", {
    user: req.user,
  });
  //console.log("wassup");
});

const updateUserSchema = z.object({
  firstName: z.string().min(4),
  lastName: z.string().min(4),
  email: z.string().email(),
});

//console.log("updateschema");

settingsRouter.post("/profile", async (req, res) => {
  const { firstName = "", lastName = "", email = "" } = req.body;

  console.log(req.body);

  if (firstName.length < 4) {
    return res.status(400).render("settings/profile", {
      firstNameError: "Minmum length of 4 characters",
      ...req.body,
    });
  }

  if (lastName.length < 4) {
    return res.status(400).render("settings/profile", {
      lastNameError: "Minmum length of 4 characters",
      ...req.body,
    });
  }

  if (!email.includes("@")) {
    return res.status(400).render("settings/profile", {
      emailError: "It's not a valid email",
      ...req.body,
    });
  }

  const singleUser = await UserModel.findOne({
    $or: [{ email }],
    _id: { $ne: ObjectId(req.abhijeet._id) },
  });

  console.log("HERE: ", req.session);

  if (!singleUser) {
    await UserModel.findByIdAndUpdate(req.abhijeet._id, {
      firstName,
      lastName,
      email,
    });
    return res.redirect(`/user/${req.abhijeet._id}`);
  }

  UserModel.find({
    _id: {
      $nin: [ObjectId(req.abhijeet._id)],
      $or: [{ email }],
    },
  });

  res.status(400).render("settings/profile", {
    errorMessage: "This email already exists",
  });
});

// ****** To update the password ******//

settingsRouter.get("/profile", async (req, res) => {
  res.render("settings/profile", { user: req.abhijeet });
});

settingsRouter.post("/profile", async (req, res) => {
  const { abhijeet: user } = req;

  const {
    currentPassword = "",
    newPassword = "",
    confirmPassword = "",
  } = req.body;

  if (
    !currentPassword ||
    newPassword.length < 8 ||
    confirmPassword.length < 8 ||
    newPassword !== confirmPassword
  ) {
    //
    return res.status(400).render("settings/profile", {
      user,
      errorMessage: "Fill every input correctly",
    });
  }

  if (currentPassword === newPassword) {
    return res.status(400).render("settings/profile", {
      user,
      errorMessage: "Please write a new password",
    });
  }

  const isSamePassword = bcrypt.compareSync(currentPassword, user.password);

  if (!isSamePassword) {
    return res.status(400).render("settings/profile", {
      user,
      errorMessage: "That is not your password",
    });
  }

  const hashedPassword = bcrypting(newPassword);

  await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword });

  res.redirect("/");
});

module.exports = settingsRouter;
