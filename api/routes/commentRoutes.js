const router = require("express").Router();
const Comment = require("../models/Comments");
const Business = require("../models/Business");
const User = require("../models/User");
const verifyToken = require("../middleware/jwt");
const { getComments, makeComment, deleteComment, editComment, likeComment, dislikeComment, getUserComments } = require("../controller/commentController");

//get all comments
router.get("/getcomments/:id", getComments);
router.get("/getUsercomments/:id", getUserComments);
//make comment
router.post("/makecomment",verifyToken,makeComment);

//delete comment delete from all places(user and business)
router.delete("/delete/:id",verifyToken, deleteComment);
//edit comment
router.put("/edit/:id",verifyToken,editComment );

//like comment
router.put("/like/:id",verifyToken,likeComment );

//dislike comment
router.put("/dislike/:id", verifyToken,dislikeComment );

module.exports = router;
