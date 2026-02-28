const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const MessageUser = require("../Database/messageUser");
const { authMiddleware } = require("../middleware/authMiddleware");


router.post("/message-user/:profileId", authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    const { profileId } = req.params;

    if (!message) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid profileId" });
    }

    if (!req.user || !req.user._id || !req.user.email) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized" });
    }

    const NewmessageUser = new MessageUser({
      user: req.user._id,
      email: req.user.email,
      profileId,
      message,
    });

    await NewmessageUser.save();
    res
      .status(200)
      .json({ success: true, message: "Message Sent to User Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


router.get("/message-user/:profileId", async (req, res) => {
  try {
    const { profileId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid profileId" });
    }

    const userMessages = await MessageUser.find({ profileId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, userMessages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;