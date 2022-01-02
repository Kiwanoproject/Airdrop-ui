const express = require("express");
const router = express.Router();
const Mail = require("../models/mail");
const Participant = require("../models/participant");
const mailgun = require("mailgun-js");
const DOMAIN = "kiwanoproject.com";
const mg = mailgun({apiKey: "96961a488864e2ea7b7b2bbc298dbb1c-cac494aa-b9909a05", domain: DOMAIN});



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
    const data = {
      from: "Kiwano Project <no-reply@kiwanoproject.com>",
      to: req.body.email,
      subject: "Kiwano Newsletter Subscription",
      template: "email-list"
    };
    mg.messages().send(data, function (error, body) {
      console.log(body);
    });
  res.redirect("/");
  };
});
router.get("/branding", (req, res) => {
  res.render("branding");
});
module.exports = router;
