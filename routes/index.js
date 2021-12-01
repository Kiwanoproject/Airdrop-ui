const express = require("express");
const router = express.Router();
const Mail = require("../models/mail");

// ROUTES
router.get("/", (req, res) => {
  res.render("home");
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

module.exports = router;
