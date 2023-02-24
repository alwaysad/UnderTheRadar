const router = require("express").Router();
const Comment = require("../models/Comments");
const Business = require("../models/Business");
const User = require("../models/User");
const { getComments, makeComment, deleteComment, editComment, likeComment, dislikeComment } = require("../controller/commentController");

//get all comments
router.get("/getcomments", getComments);

//make comment
router.post("/makecomment", makeComment);

//delete comment delete from all places(user and business)
router.delete("/delete/:id", deleteComment);
//edit comment
router.put("/edit/:id",editComment );

//like comment
router.put("/like/:id", likeComment );

//dislike comment
router.put("/dislike/:id", dislikeComment );

module.exports = router;
