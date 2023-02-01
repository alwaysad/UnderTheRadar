const mongoose=require('mongoose');


const BusinessSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
       type:String,
       required:true
    },
    comments:{
        type:Array,
        default:[]
    },
    
    images:{
        type:Array,
        default:[]
    },
    level:{
        type:Number,
        enum:[1,2,3]
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    }

    
})

module.exports=mongoose.model('Business',BusinessSchema);