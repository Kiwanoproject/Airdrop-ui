const express = require("express");
const Participant = require("../models/participant");
const router = express.Router();
const mailgun = require("mailgun-js");

// ROUTES

router.get("/", async (req, res) => {
  const title = "The Kiwano Project - Airdrops";
  const description ="The Kiwano project official airdrop page. The kiwano airdrop program is live.";
  const details = await Participant.find({});
  const wallet = req.query;
  const ref = await Participant.findOne(wallet);
  if (ref == null) {
    const referre = "1";
    const refNum = "";
    const refLink = "";
    const balance = 0;
    res.render("airdrop", { details, refNum, referre, refLink, balance, description, title});
  } else {
    const refNum = await Participant.find({ referre: ref.referral });
    if (Object.entries(wallet).length === 0) {
      const referre = "1";
      const refNum = "";
      const refLink = "";
      const balance = 0;
      res.render("airdrop", { details, refNum, referre, refLink, balance, title, description });
    } else {
      const detail = await Participant.findOne(wallet);
      console.log(wallet);
      const referre = detail.referral;
      const refLink = detail.referral;
      const balance = 10;
      res.render("airdrop", {
        detail,
        details,
        refNum,
        referre,
        refLink,
        balance,
        title,
        description,
      });
    }
  }
});
router.post("/", async (req, res) => {
  const checkMail = await Participant.findOne({ email: req.body.email });
  const checkWallet = await Participant.findOne({ wallet: req.body.wallet });
  const checkTwitter = await Participant.findOne({ twitter: req.body.twitter });
  const checkTelegram = await Participant.findOne({ telegram: req.body.telegram });
      if (checkMail != null || checkWallet != null || checkTwitter != null || checkTelegram != null ) {
        req.flash('success_msg','You Already Participated!');
        res.redirect("/airdrop");
      } else {
        const participant = new Participant({
          email: req.body.email,
          wallet: req.body.wallet,
          twitter: req.body.twitter,
          telegram: req.body.telegram,
          referre: req.body.referre,
        })
          .save()
          .then(() => {
            console.log(req.body);
            req.flash("success_msg", "Details Submitted Successfully!");
            res.redirect("/airdrop");
          });
      };
    
    });


router.get("/:referral", async (req, res) => {
  const title = "The Kiwano Project - Airdrops";
  const description ="The Kiwano project official airdrop page. The kiwano airdrop program is live.";
  const wallet = req.query;
  const ref = await Participant.find(wallet);
  const refNum = await Participant.find({ referre: ref.referral });
  console.log(wallet.ref);
  const detail = await Participant.findOne(req.params);
  if (detail !== null) {
    const details = await Participant.find({});
    const referre = detail.referral;
    const refLink = "";
    const balance = 0;
    res.render("airdrop", {
      details,
      detail,
      refNum,
      referre,
      refLink,
      balance,
      title,
      description,
    });
  } else {
    res.redirect("/airdrop");
  }
  console.log(detail);
});

module.exports = router;
