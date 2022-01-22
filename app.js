const express = require("express");
const app = express();
const compression = require('compression');
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const Mail = require("./models/mail");
const Participant = require("./models/participant");

// DATABASE
mongoose
  .connect("mongodb+srv://kiwano-project:kiwano360@kiwano-project.ybcdw.mongodb.net/kiwano-project?retryWrites=true&w=majority")
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
app.use((req,res,next)=> {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error  = req.flash('error');
next();
});
// ROUTES
app.use("/", require("./routes/index"));
app.get("*", (req, res) => {
  res.redirect("/");
});
app.use("/airdrop", require("./routes/airdrop"));

// SERVER
app.listen(process.env.PORT, () => {
  console.log("App Started");
});

