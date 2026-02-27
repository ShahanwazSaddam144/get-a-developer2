const mongoose = require("mongoose");

const profileStatusSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
      unique: true, 
    },
    email: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      enum: ["Available", "Not Available"],
      default: "Available",
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("ProfileStatus", profileStatusSchema);