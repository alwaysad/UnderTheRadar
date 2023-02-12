const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = require("../models/Comments");
const Business = require("../models/Business");
const User = require("../models/User");

//make comment
router.post("/comment", async (req, res) => {
  try {
    const business = await Business.findById(req.body.businessId);
    const user = await User.findById(req.body.userId);
    const newComment = new Comment({
      text: req.body.text,
      user: req.body.userId,
      business: req.body.businessId,
    });
    //addıng comment also adds comment to busıness and user
    const comment = await newComment.save();
    await business.updateOne({ $push: { comments: comment._id } });
    await user.updateOne({ $push: { comments: comment._id } });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete comment delete from all places(user and business)
router.delete("/delete/:id", async (req, res) => {
  try {

    const comment=await Comment.findById(req.params.id);
    const business=comment.business;
    const user=comment.user;
    
    
    await Comment.findByIdAndDelete(req.params.id);
    await Business.findByIdAndUpdate(business,{$pull:{comments:req.params.id}})
    await User.findByIdAndUpdate(user,{$pull:{comments:req.params.id}})
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
