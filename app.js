const express = require("express");
const app = express();
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
app.use(express.static(path.join(__dirname, "/public")));
app.use(expressEjsLayout);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SESSION
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
// ROUTES
app.use("/", require("./routes/index"));
app.use("/airdrop", require("./routes/airdrop"));

// SERVER
app.listen("80", () => {
  console.log("App Started On Port 80");
});
