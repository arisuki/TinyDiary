const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const comment = require('./comment')
// require once I have comments working!

const entrySchema = new Schema(
  {
    image: {
        data: Buffer,
        contentType: String
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
    userName: String,
    userAvatar: String,

    description: {
      type: String,
      required: false,
    },
    date: {
        type: Date,
        default: new Date()
    }

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
