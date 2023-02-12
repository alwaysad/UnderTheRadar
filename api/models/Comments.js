const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: "Business",
    },
    like:{
        type:Number,
        default:0,
        min:0,
    },
    dislike:{
        type:Number,
        default:0,
        min:0,
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        default:null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
