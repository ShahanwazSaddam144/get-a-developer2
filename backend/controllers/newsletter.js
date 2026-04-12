const express = require("express");
const router = express.Router();
const Newsletter = require("../Database/newsletter");
const sendNewsletterEmail = require("../utils/newsletter");

router.post("/newsletter", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Email already subscribed" });
    }

    const newLetter = new Newsletter({ email });
    await newLetter.save();

    await sendNewsletterEmail(email);

    res
      .status(200)
      .json({ success: true, message: "Subscribed Successfully 🎉" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;