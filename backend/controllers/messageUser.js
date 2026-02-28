const express = require("express");
const router = express.Router();
const MessageUser = require("../Database/messageUser");
const {authMiddleware} = require("../middleware/authMiddleware");

router.post("/message-user/:profileId", authMiddleware, async(req,res)=>{
    try{
        const {message} = req.body;
        const {profileId} = req.params;

        if(!message){
            res.status(400).json({success: false, message: "Please fill all fields"});
        }

        const NewmessageUser = new MessageUser({
            user: req.user._id,
            email: req.user.email,
            profileId,
            message,
            });
        await NewmessageUser.save();
        res.status(200).json({success: true, message: "Message Send to User Successfully"}); 
    } catch(err){
        res.status(500).json({success: false, message: "Server Error"});
    }
});

router.get("/user-messages/:profileId", async(req,res)=>{
    try{
        const {profileId} = req.params;

        const userMessages = await MessageUser.find({profileId})
        .sort({ createdAt: -1});

        res.status(200).json({success: true, userMessages});
    } catch(err){
        res.status(500).json({success: false, message: "Server Error"});
    }
});

module.exports = router;