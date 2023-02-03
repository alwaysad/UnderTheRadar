const { response } = require("express");

const User = require("../models/User.js");
const router = require("express").Router();


//follow user
router.put("/follow/:id",async(req,res)=>{
    try {
        const followedUser= await User.findById(req.params.id)
        const currentUser=await User.findById(req.body.id);
       
        const followers=followedUser.followers;

        const result=Array.isArray(followers)?!followers.includes(req.body.id):false;

        if(result){
            await followedUser.updateOne({$push:{followers:req.body.id}});
            await currentUser.updateOne({$push:{followings:req.params.id}})
            res.status(200).json('Started to follow');
        }else{
            res.status(404).json("You already following this person");
        }


    } catch (error) {
        res.status(500).json(error);
        
    }
})
//unfollow the user

router.put("/unfollow/:id",async(req,res)=>{
    try {
        const unfollowedUser= await User.findById(req.params.id)
        const currentUser=await User.findById(req.body.id);
       
        const followers=unfollowedUser.followers;

        const result=Array.isArray(followers)?followers.includes(req.body.id):false;

        if(result){
            await unfollowedUser.updateOne({$pull:{followers:req.body.id}});
            await currentUser.updateOne({$pull:{followings:req.params.id}})
            res.status(200).json('Unfollowed');
        }else{
            res.status(404).json("You are not following this person");
        }


    } catch (error) {
        res.status(500).json(error);
        
    }
})
//making a comment
router.post("/comment/:id",async(req,res)=>{
     try {
        
     } catch (error) {
        
     }
});


module.exports=router;