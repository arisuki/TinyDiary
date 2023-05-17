const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const commentSchema = require('./comment')

const entrySchema = new Schema(
  {
    image: {
        type: String,
        required: true,       
    },
 
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //get rid of these 2
    userName: String,
    userAvatar: String,

    description: {
      type: String,
      required: false,
    },
    date: {
        type: Date,
        default: new Date()
    },
    // comments: [commentSchema]

    // image: {
    //   type: String,
    //   required: false,
    // },
    // palette: [paletteSchema],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Entry", entrySchema)
