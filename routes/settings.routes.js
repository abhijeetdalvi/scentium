const { Router } = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");

const {
  Types: { ObjectId },
} = require("mongoose");

const settingsRouter = Router();
const { z } = require("zod");
const bcrypting = require("..");

async function checkUserexists(req, res, next) {
  const user = await UserModel.findById(req.session.userId);

  if (!user) {
    return res.redirect("/");
  }
}
