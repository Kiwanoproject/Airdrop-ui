const express = require("express");
const router = express.Router();
const Mail = require("../models/mail");

// ROUTES
router.get("/", (req, res) => {
  res.render("home");
});
router.post("/", (req, res) => {
  const mail = new Mail({ email: req.body.email })
    .save()
    .then(() => {
      console.log(req.body);
    })
    .catch((err) => {
      console.log("Failed to submit user email address. Error: ", err);
    });
  res.redirect("/");
});

module.exports = router;
