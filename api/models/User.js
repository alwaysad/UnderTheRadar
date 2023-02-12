const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email:{
      type:String,
      required:true
    },
    password: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required:true
    },
    followings: [{
      type:Schema.Types.ObjectId,
      ref:"User",
    }],
    followers:[ {
      type: Schema.Types.ObjectId,
      ref:"User",
    }],
    comments:[{
      type:Schema.Types.ObjectId,
      ref:'Comments'
    }]
  },
  { timestamps: true }
); //giving an information about when its updated or created

module.exports = mongoose.model("User", UserSchema);
