const { timeStamp } = require("console");
const { Schema, model } = require("mongoose");
const commentSchema = require("./Comment");
const User = require("./User");

const postSchema = new Schema(
  {
    postTitle: {
      type: String,
      required: true,
      maxlength: 100,
    },
    postText: {
      type: String,
      required: true,
      maxlength: 600,
      minlength: 1,
    },
    image: {
      type: String,
    },
    postedAt: {
      type: Date,
      default: Date.now,
      get: (timeStamp) => new Date(timeStamp).toDateString(),
    },
    username: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

postSchema.virtual("userProfileId").get(async function () {
  const user = await User.findOne({ username: this.username });
  return user._id;
});

const Post = model("Post", postSchema);

module.exports = Post;
