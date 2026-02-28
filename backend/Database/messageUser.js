const mongoose = require("mongoose");

const messageuserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: { type: String, required: true },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    message: {type: String, required: true},
  },
  { timestamps: true },
);

module.exports = mongoose.model("MessageUser", messageuserSchema);
