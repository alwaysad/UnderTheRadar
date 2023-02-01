const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
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
    followings: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
); //giving an information about when its updated or created

module.exports = mongoose.model("User", UserSchema);
