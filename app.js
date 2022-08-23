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

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const contactRouter = require("./routes/contact.routes");
app.use("/contact", contactRouter);

const baseRouter = require("./routes/Base.routes");
app.use("/wizard", baseRouter);

// const topRouter = require("./routes/top.routes");
// app.use("/wizard", topRouter);

const readyRouter = require("./routes/ready.routes");
app.use("/wizard", readyRouter);

const aboutRouter = require("./routes/about.routes");
app.use("/about", aboutRouter);

const processRouter = require("./routes/process.routes");
app.use("/process", processRouter);

const userRouter = require("./routes/user.routes");
app.use("/user", userRouter);

// const adminRouter = require("./routes/admin.routes");
// app.use("/admin", adminRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
