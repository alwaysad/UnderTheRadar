const router=require('express').Router();
const Business = require('../models/Business');
const User=require('../models/User');

//register
router.post('/register',async(req,res)=>{
    try {
    const user=new User({
        username:req.body.username,
        password:req.body.password,
        age:req.body.age,
        email:req.body.email,
        birthDate:req.body.birthDate
    })
    const newUser=await user.save();
    res.status(200).json(newUser);
    
} catch (error) {
    res.status(500).json(error)
    
}
})

router.post('/register/business',async(req,res)=>{
    try {

        const newBusiness=new Business({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            location:req.body.location,
            description:req.body.description,

        })

        const newly=await newBusiness.save();
        res.status(200).json(newly);
        
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/login',async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        if(req.body.password===user.password){
            res.status(200).json('succesfully login')

        }else{
            res.status(500).json('Password is wrong')
            console.log(req.body.username);
            console.log(user.username);
        }
        
    } catch (error) {
        res.status(500).json(error);
        
    }
})

module.exports=router;
//login