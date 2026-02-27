const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Auth = require("./controllers/auth");
const Profile = require("./controllers/profile");
const Comment = require("./controllers/comments");
const profileStatus = require("./controllers/profilestatus");
const Port = process.env.PORT || 5000;
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

// Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "To many requests, please try again",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

//Routes
app.use("/api/auth", Auth, limiter);
app.use("/api", Profile, limiter);
app.use("/api", Comment, limiter);
app.use("/api", profileStatus, limiter);

// Mongoose connect
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("✅✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌❌ Error connecting MongoDB:", err);
    process.exit(1);
  });

// Server connect
app.listen(Port,(err)=>{
    if(err){
        console.error("❌❌ Error Connecting Server");
    }else{
        console.log(`✅✅ Server Running at http://localhost:${Port}`);
    }
});
