const express = require("express");
const Participant = require("../models/participant");
const oneParticipant = require("../public/js/firstairdrop");
const router = express.Router();

// ROUTES

router.get("/", async (req, res) => {
  const title = "The Kiwano Project - Airdrops";
  const description =
    "The Kiwano project official airdrop page. The kiwano airdrop program is live.";
  const wallet = req.query;
  const ref = await Participant.findOne(wallet).lean();
  if (ref == null) {
    const referre = "1";
    const refNum = "";
    const refLink = "";
    const balance = 0;
    res.render("airdrop", {
      refNum,
      referre,
      refLink,
      balance,
      description,
      title,
    });
  } else {
    const refNum = await Participant.find({ referre: ref.referral }).lean();
    if (Object.entries(wallet).length === 0) {
      const referre = "1";
      const refNum = "";
      const refLink = "";
      const balance = 0;
      res.render("airdrop", {
        refNum,
        referre,
        refLink,
        balance,
        title,
        description,
      });
    } else {
      const detail = await Participant.findOne(wallet).lean();
      const referre = detail.referral;
      const refLink = detail.referral;
      const balance = detail.balance;
      res.render("airdrop", {
        detail,
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
  // const checkMailPast = await oneParticipant.find(
  //   (email) => req.body.email == email.email
  // );
  // const checkWalletPast = await oneParticipant.find(
  //   (wallet) => req.body.wallet == wallet.wallet
  // );
  // const checkTwitterPast = await oneParticipant.find(
  //   (twitter) => twitter == req.body.twitter
  // );
  // const checkTelegramPast = await oneParticipant.find(
  //   (telegram) => req.body.telegram == telegram.telegram
  // );

  // if (
  //   checkMailPast != null ||
  //   checkWalletPast != null ||
  //   checkTwitterPast != null ||
  //   checkTelegramPast != null
  // ) {
  //   req.flash("success_msg", "You Participated In The Previous Airdrop!");
  //   res.redirect("/airdrop");
  // } else {
    const checkMail = await Participant.findOne({
      email: req.body.email,
    }).lean();
    const checkWallet = await Participant.findOne({
      wallet: req.body.wallet,
    }).lean();
    const checkTwitter = await Participant.findOne({
      twitter: req.body.twitter,
    }).lean();
    const checkTelegram = await Participant.findOne({
      telegram: req.body.telegram,
    }).lean();
    if (
      checkMail != null ||
      checkWallet != null ||
      checkTwitter != null ||
      checkTelegram != null
    ) {
      req.flash("success_msg", "You Already Participated!");
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
          req.flash("success_msg", "Details Submitted Successfully!");
          res.redirect("/airdrop");
        })
        .catch((err) => {
          res.redirect("/airdrop");
        });
    }
  // }
});

router.get("/:referral", async (req, res) => {
  const title = "The Kiwano Project - Airdrops";
  const description =
    "The Kiwano project official airdrop page. The kiwano airdrop program is live.";
  const wallet = req.query;
  const ref = await Participant.find(wallet).lean();
  const refNum = await Participant.find({ referre: ref.referral }).lean();
  const detail = await Participant.findOne(req.params).lean();
  if (detail !== null) {
    const referre = detail.referral;
    const refLink = "";
    const balance = 0;
    res.render("airdrop", {
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
});

module.exports = router;
