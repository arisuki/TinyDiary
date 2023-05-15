const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const comment = require('./comment')
// require once I have comments working!

const entrySchema = new Schema(
  {
 
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    description: {
      type: String,
      required: false,
    },
    date: Date,

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
