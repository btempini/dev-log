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
      maxlength: 1500,
      minlength: 1,
    },
    image: {
      type: String,
      default:
        "https://images-ext-2.discordapp.net/external/fx3oXBp9xtYEuCvBQ0dzqzQuX68Zzwz904Lk5og63Ew/%3Fixlib%3Drb-4.0.3%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1738%26q%3D80/https/images.unsplash.com/photo-1515879218367-8466d910aaa4?width=761&height=508",
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
    comments: [
      {
        commentText: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 280,
        },
        commentBy: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (timeStamp) => new Date(timeStamp).toDateString(),
        },
      },
    ],
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
