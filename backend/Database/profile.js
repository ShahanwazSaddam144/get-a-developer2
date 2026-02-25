const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],   
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    projects: {
      type: [String],   
      required: true,
    },

    portfolio: {
      type: String,
      required: true,
    },

    avator: {
      type: String,   
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);