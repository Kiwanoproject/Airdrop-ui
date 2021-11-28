const mongoose = require("mongoose");
const MailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});
const Mail = mongoose.model("Mail", MailSchema);

module.exports = Mail;
