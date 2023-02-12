const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = require("../models/Comments");
const Business = require("../models/Business");
const User = require("../models/User");

//get all comments
router.get('/getcomments',async(req,res)=>{
  try {
    const comments=await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
   res.status(500).json(error);
  }
})

//make comment
router.post("/makecomment", async (req, res) => {
  try {
    const business = await Business.findById(req.body.businessId);
    const user = await User.findById(req.body.userId);
    const comments=business.comments.length;
    const newComment = new Comment({
      text: req.body.text,
      user: req.body.userId,
      business: req.body.businessId,
      rating:req.body.rating
    });
    //addıng comment also adds comment to busıness and user
    const comment = await newComment.save();
    const newRating=(req.body.rating+business.rating)/comments;
    await business.updateOne({ $push: { comments: comment._id }, $set: {rating: newRating}});

   
    await user.updateOne({ $push: { comments: comment._id } });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete comment delete from all places(user and business)
router.delete("/delete/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const business = comment.business;
    const user = comment.user;

    await Comment.findByIdAndDelete(req.params.id);
    await Business.findByIdAndUpdate(business, {
      $pull: { comments: req.params.id },
    });
    await User.findByIdAndUpdate(user, { $pull: { comments: req.params.id } });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
//edit comment
router.put("/edit/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, {
      text: req.body.text,
      rating:req.body.rating
    });
    res.status(200).json('updated succesfully');
  } catch (error) {
    res.status(500).json(error);
  }
});

//like comment
router.put('/like/:id',async(req,res)=>{
  try {
    const comment=await Comment.findById(req.params.id);
    await comment.updateOne({$inc:{like:1}});
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }

})
router.put('/dislike/:id',async(req,res)=>{
  try {
    const comment=await Comment.findById(req.params.id);
    await comment.updateOne({$inc:{like:-1}});
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }

})

module.exports = router;
