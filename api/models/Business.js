const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const BusinessSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
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
    images:{
        type:Array,
        default:[]
    },
    level:{
        type:Number,
        enum:[1,2,3]
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    rating:{
        type:Number,
        default:null
    }
})

module.exports=mongoose.model('Business',BusinessSchema);