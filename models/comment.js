const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: String,
    userAvatar: String,
    entry: {
        type: Schema.Types.ObjectId,
        ref: "Entry",
    },
  }, {
    timestamps: true
  });
  
  module.exports=mongoose.model("Comment", commentSchema)