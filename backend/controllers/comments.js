const express = require("express");
const router = express.Router();
const Comments = require("../Database/comments");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/comments/:profileId", authMiddleware, async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const { profileId } = req.params;

    if (!comment || !rating) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const newComment = new Comments({
      user: req.user._id,
      email: req.user.email,
      profileId,
      comment,
      rating,
    });

    await newComment.save();

    res.status(200).json({
      success: true,
      message: "Comment was saved",
      comment: newComment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.get("/comments/:profileId", async (req, res) => {
  try {
    const { profileId } = req.params;

    const comments = await Comments.find({ profileId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
