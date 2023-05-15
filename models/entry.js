const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const comment = require('./comment')
// require once I have comments working!

const entrySchema = new Schema(
  {
    date: Date,
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: false,
    },

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
