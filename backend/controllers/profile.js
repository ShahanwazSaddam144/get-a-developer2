const express = require("express");
const router = express.Router();
const Profile = require("../Database/profile");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, skills, desc, category, projects, portfolio, avator, price, phone } =
      req.body;

    if (
      !name ||
      !skills ||
      !desc ||
      !category ||
      !projects ||
      !portfolio ||
      !avator ||
      !price ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingProfile = await Profile.findOne({ user: req.user._id });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists",
      });
    }

    const newProfile = new Profile({
      user: req.user._id,
      email: req.user.email,
      name,
      skills,
      desc,
      category,
      projects,
      portfolio,
      avator,
      price,
      phone
    });

    await newProfile.save();

    res.status(201).json({
      success: true,
      message: "Profile Created Successfully",
      profile: newProfile,
    });
  } catch (err) {
    console.error("Profile Creation Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.get("/my-profile", authMiddleware, async (req, res) => {
  try {
    const myProfile = await Profile.findOne({ user: req.user._id });
    if (!myProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not Found" });
    }
    res.status(200).json({ success: true, profile: myProfile });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.put("/my-profile", authMiddleware, async (req, res) => {
  try {
    const { name, email, skills, desc, category, projects, portfolio, avator, price, phone } =
      req.body;

    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    if (
      !name ||
      !email ||
      !skills ||
      !desc ||
      !category ||
      !projects ||
      !portfolio ||
      !avator ||
      !price ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    profile.name = name;
    profile.email = email;
    profile.skills = skills;
    profile.desc = desc;
    profile.category = category;
    profile.projects = projects;
    profile.portfolio = portfolio;
    profile.avator = avator;
    profile.price = price;
    profile.phone = phone;

    await profile.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.delete("/my-profile-delete", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    await Profile.deleteOne({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (err) {
    console.error("Delete Profile Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.get("/user-profile", async(req,res)=>{
  try{
    const userProfiles = await Profile.find();
    res.status(200).json({success: true, message: "Profile fetch successfully", data: userProfiles});
  } catch(err){
    res.status(500).json({success: true, message: "Failed to Fetch Profiles"});
  }
});

router.get("/profile/:id", async(req,res)=>{
  try{
    const profile = await Profile.findById(req.params.id);
    if(!profile){
      return res.status(404).json({success: false, message: "Profile not found"});
    }
    res.status(200).json({success: true, message: "Profile fetch successfully", profile: profile});
  } catch(err){
    console.error("Fetch Profile Error:", err);
    res.status(500).json({success: false, message: "Failed to Fetch Profile"});
  }
});

module.exports = router;