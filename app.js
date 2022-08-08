const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const ipfilter = require("express-ipfilter").IpFilter
const flash = require("connect-flash");
const Recaptcha = require('express-recaptcha').RecaptchaV3
const Participant = require("./models/participant");
const dotenv = require("dotenv").config();
const ips = ["42.0.30.210"];
const recaptcha = new Recaptcha(process.env.SITE_KEY, process.env.SECRET_KEY);
// DATABASE 

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection failed. Error: ", err);
  });

// VIEWS ENGINE
app.set("view engine", "ejs");
app.use(compression());
app.use(express.static(path.join(__dirname, "/public")));
app.use(expressEjsLayout);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(ipfilter(ips));


// SESSION
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
// FLASH MESSAGES
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
// ROUTES
app.use("/", require("./routes/airdrop"));
app.get("*", (req, res) => {
  res.redirect("/");
});

// SERVER
app.listen(process.env.PORT || 3000, () => {
  console.log("App Started");
});
