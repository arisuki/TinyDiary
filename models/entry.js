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

    description: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Entry", entrySchema);
