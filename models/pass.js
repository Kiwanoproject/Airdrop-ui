const mongoose = require("mongoose");
const shortid = require("shortid");
const PassSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  wallet: {
    type: String,
    required: true,
  },
  twitter: {
    type: String,
    required: true,
  },
  telegram: {
    type: String,
    required: true,
  },
  referre: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 10,
  },
  referral: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Pass = mongoose.model("Pass", PassSchema);

module.exports = Pass;
