const express = require("express");
const router = express.Router();
const Mail = require("../models/mail");
const Participant = require("../models/participant");

// ROUTES
router.get("/", async(req, res) => {
  const details = await Participant.find({});
  res.render("home", {details});
});
router.post("/", async(req, res) => {
  const checkMail = await Mail.findOne({ email: req.body.email });
  if (checkMail != null) {
    req.flash('success_msg','You joined Already!');
    res.redirect("/");
  } else {
    const mail = new Mail({ email: req.body.email })
    .save()
    .then(() => {
      console.log(req.body);
    })
    .catch((err) => {
      console.log("Failed to submit user email address. Error: ", err);
    });
    req.flash('success_msg','You Joined Successfully!');
  res.redirect("/");
  };
});
router.get("/branding", (req, res) => {
  res.render("branding");
});
module.exports = router;
