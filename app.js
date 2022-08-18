// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "scentium";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const contactRouter = require("./routes/contact.routes");
app.use("/contact", contactRouter);

const baseRouter = require("./routes/Base.routes");
app.use("/wizard", baseRouter);

const topRouter = require("./routes/top.routes");
app.use("/wizard", topRouter);

const aboutRouter = require("./routes/about.routes");
app.use("/views", aboutRouter);

const userRouter = require("./routes/user.routes");
app.use("/user", userRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
