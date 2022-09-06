const authRouter = require("express").Router();
const aValueStoredInHakunaMatataJs = { name: "timon" };

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const FragranceModel = require("../models/Fragrance.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

authRouter.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

authRouter.post("/signup", isLoggedOut, (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Please provide your first name.",
      ...req.body,
    });
  }

  if (!lastName) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Please provide your last name.",
      ...req.body,
    });
  }

  if (!email) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Please provide your valid email.",
      ...req.body,
    });
  }
  if (!email.includes("@")) {
    return res.status(400).render("auth/signup", {
      emailError: "This is not a valid email",
      ...req.body,
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).render("auth/signup", {
      passwordError: "Your password doesn't match",
      ...req.body,
    });
  }

  if (!password) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Please create eight character password",
      ...req.body,
    });
  }

  if (!confirmPassword) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Confirm passsword must match with the password",
      ...req.body,
    });
  }

  if (password.length < 8) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 8 characters long.",
      ...req.body,
    });
  }

  //   ! This use case is using a regular expression to control for special characters and min length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).render("signup", {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }
  */
  console.log("abhijeet");
  // Search the database for a user with the email submitted in the form
  User.findOne({ email }).then((possibleUser) => {
    // If the user is found, send the message username is taken
    if (possibleUser) {
      return res
        .status(400)
        .render("auth/signup", { errorMessage: "Email already exists." });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });
      })
      .then((createdUser) => {
        //.log("user created:", createdUser);
        // Bind the user to the session object
        req.session.user = createdUser._id;
        //req.session.userRole = createdUser.userRole;
        res.redirect(`/user/${createdUser._id}`);
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res
            .status(400)
            .render("auth/signup", { errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).render("auth/signup", {
            errorMessage:
              "It seems that you already have an account with us. Sign in with your password.",
          });
        }
        return res
          .status(500)
          .render("auth/signup", { errorMessage: error.message });
      });
  });
});

authRouter.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

authRouter.post("/login", isLoggedOut, (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).render("auth/login", {
      errorMessage: "Please provide your valid email.",
    });
  }

  if (!email.includes("@")) {
    return res.status(400).render("auth/login", {
      emailError: "This is not a valid email",
      ...req.body,
    });
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res.status(400).render("auth/login", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  if (!password) {
    return res.status(400).render("auth/login", {
      errorMessage: "Please create eight character password",
      ...req.body,
    });
  }

  // Search the database for a user with the email submitted in the form
  User.findOne({ email })
    .then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        return res.status(400).render("auth/login", {
          errorMessage: "Wrong credentials.",
        });
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).render("auth/login", {
            errorMessage: "Wrong credentials.",
          });
        }
        //req.session.user = user;
        req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
        res.redirect(`/user/${user._id}`);
        //return res.redirect("/");
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

authRouter.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("auth/logout", { errorMessage: err.message });
    }
    res.redirect("/");
  });
});

module.exports = authRouter;
