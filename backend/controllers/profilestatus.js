const express = require("express");
const router = express.Router();
const ProfileStatus = require("../Database/profilestatus");
const { authMiddleware } = require("../middleware/authMiddleware");


router.post("/profilestatus", authMiddleware, async (req, res) => {
  try {
    const { availability } = req.body;

    if (!availability) {
      return res
        .status(400)
        .json({ success: false, message: "Availability is required" });
    }

    const existing = await ProfileStatus.findOne({ user: req.user._id });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Profile status already exists. Use PUT to update.",
      });
    }

    const profileStatus = new ProfileStatus({
      user: req.user._id,
      email: req.user.email,
      availability,
    });

    await profileStatus.save();

    res.status(201).json({
      success: true,
      message: "Profile status created successfully",
      status: profileStatus,
    });
  } catch (err) {
    console.error("POST Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.get("/profilestatus", authMiddleware, async (req, res) => {
  try {
    const status = await ProfileStatus.findOne({ user: req.user._id });

    if (!status) {
      return res.status(404).json({
        success: false,
        message: "Profile status not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile status fetched successfully",
      status,
    });
  } catch (err) {
    console.error("GET Profile Status Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.put("/profilestatus", authMiddleware, async (req, res) => {
  try {
    const { availability } = req.body;

    if (!availability) {
      return res
        .status(400)
        .json({ success: false, message: "Availability is required" });
    }

    const updatedStatus = await ProfileStatus.findOneAndUpdate(
      { user: req.user._id }, 
      { availability, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedStatus) {
      return res.status(404).json({
        success: false,
        message: "Profile status not found. Create first.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      status: updatedStatus,
    });
  } catch (err) {
    console.error("PUT Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.get("/profilestatus/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const status = await ProfileStatus.findOne({ user: id });

    if (!status) {
      return res.status(404).json({
        success: false,
        message: "Profile status not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile status fetched successfully",
      status,
    });
  } catch (err) {
    console.error("GET Profile Status Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


module.exports = router;