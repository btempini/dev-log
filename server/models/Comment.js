const { timeStamp } = require("console");
const { Schema, model, default: mongoose, mongo } = require("mongoose");

const commentSchema = new Schema(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    CommentText: {
      type: String,
      required: true,
      maxlength: 500,
      minlength: 1,
    },
    username: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    postedAt: {
      type: Date,
      default: Date.now,
      get: (timeStamp) => new Date(timeStamp).toDateString(),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

module.exports = commentSchema;
