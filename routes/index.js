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
  const title = "The Kiwano Project - Fostering Crypto Usability";
  const description ="The Kiwano project is a project centred around a learning platform that aims to foster the adoption of cryptocurrencies and blockchain technology.";
  res.render("home", {details, title, description});
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
  const title = "The Kiwano Project - Branding";
  const description ="Download the Kiwano project's official logos and mockup kit.";
  res.render("branding", {title, description});
});
router.get("/buy", (req, res) => {
  const title = "The Kiwano Project - Buy Kiwano Tokens Here";
  const description ="You can now buy kiwano(wano) tokens via our official website. Buy now!";
  res.render("buy", {title, description});
});
router.get("/token", (req, res) => {
  const title = "The Kiwano Project - Tokenomics";
  const description ="The Kiwano project is a project centred around a learning platform that aims to foster the adoption of cryptocurrencies and blockchain technology.";
  res.render("token", {title, description});
});
module.exports = router;
