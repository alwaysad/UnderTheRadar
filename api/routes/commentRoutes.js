const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = require("../models/Comments");
const Business = require("../models/Business");
const User = require("../models/User");

//get all comments
router.get("/getcomments", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});

//make comment
router.post("/makecomment", async (req, res) => {
  try {
    const business = await Business.findById(req.body.businessId);
    const user = await User.findById(req.body.userId);
    const comments = business.comments.length;
    const newComment = new Comment({
      text: req.body.text,
      user: req.body.userId,
      business: req.body.businessId,
      rating: req.body.rating,
    });
    //addıng comment also adds comment to busıness and user and updating the business new rating
    const comment = await newComment.save();
    const rating = parseFloat(req.body.rating);
    const newRating = (rating + business.rating * comments) / (comments + 1);
    await business.updateOne({
      $push: { comments: comment._id },
      $set: { rating: newRating },
    });

    await user.updateOne({ $push: { comments: comment._id } });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete comment delete from all places(user and business)
router.delete("/delete/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id); //finding comment and after finding business and user with that
    const business = comment.business;
    const user = await User.findById(comment.user);
    const comments = user.comments; //inside of the user comments we are checking if request parameter include or not if doesnt exist we cant delete
    const exist = Array.isArray(comments)
      ? comments.includes(req.params.id)
      : false;
    if (user._id.toString() === req.body.userId) {
      if (exist) {
        await Comment.findByIdAndDelete(req.params.id);
        await Business.findByIdAndUpdate(business, {
          $pull: { comments: req.params.id },
        });
        await User.findByIdAndUpdate(user, {
          $pull: { comments: req.params.id },
        });
        res.status(200).json("Comment deleted");
      } else {
        res.status(404).json("Comment doesnt exist");
      }
    } else {
      res
        .status(404)
        .json({ message: "You can not delete other person comment" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//edit comment
router.put("/edit/:id", async (req, res) => {
  try {
    //try to find user related with that comment
    const comment = await Comment.findById(req.params.id);
    const user = await User.findById(comment.user);
    const comments = user.comments;
    if (user._id.toString() === req.body.userId) {
      const exist = Array.isArray(comments)
        ? comments.includes(req.params.id)
        : false;
      if (exist) {
        await comment.updateOne({
          text: req.body.text,
          rating: req.body.rating,
        });
        res.status(200).json("updated succesfully");
      } else {
        res.status(404).json('Comment doesnt exist');
      }
    } else {
      res.status(404).json({ message: "You can edit only your account"});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//like comment
router.put("/like/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    const liked = user.likedComments;
    const result = Array.isArray(liked)
      ? !liked.includes(req.params.id)
      : false;
    if (result) {
      await comment.updateOne({ $inc: { like: 1 } });
      await user.updateOne({ $push: { likedComments: req.params.id } });
      res.status(200).json("liked the comment");
    } else {
      res.status(404).json("You already liked this comment");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//dislike comment
router.put("/dislike/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    const liked = user.likedComments;
    const result = Array.isArray(liked) ? liked.includes(req.params.id) : false;
    if (result) {
      await user.updateOne({ $pull: { likedComments: req.params.id } });
      await comment.updateOne({ $inc: { like: -1 } });
      res.status(200).json("dislike the comment");
    } else {
      res.status(404).json("You dont have like in this comment");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;