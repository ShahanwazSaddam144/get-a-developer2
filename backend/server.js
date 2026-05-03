const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Auth = require("./controllers/auth");
const Profile = require("./controllers/profile");
const Comment = require("./controllers/comments");
const profileStatus = require("./controllers/profilestatus");
const messageUser = require("./controllers/messageUser");
const NewsLetter = require("./controllers/newsletter");
const app = express();
dotenv.config();
app.use(express.json());

app.use(cors({
  origin: [
    "https://get-a-developer.buttnetworks.com"
  ],
  credentials: true
}));

const Port = process.env.PORT;

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


//Routes
app.use("/api/auth", Auth, limiter);
app.use("/api", Profile, limiter);
app.use("/api", Comment, limiter);
app.use("/api", profileStatus, limiter);
app.use("/api", messageUser, limiter);
app.use("/api", NewsLetter, limiter);

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
