const { AuthenticationError } = require("apollo-server-express");

const { User, Post, Comment } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId)
          .populate("posts")
          .populate("friends");
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
    username: async (_, { username }) => {
      try {
        const find = User.findOne({ username: username });
        return find;
      } catch (err) {
        throw new Error(err);
      }
    },
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("you need to be logged in!");
    },

    //find all posts
    posts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    //find one post
    post: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId).populate("comments");
        if (!post) {
          throw new Error("Post not found");
        }
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
    //find all comments
    comments: async () => {
      try {
        const comments = await Comment.find();
        return "comments";
      } catch (err) {
        throw new Error(err);
      }
    },
    //find one comment
    comment: async (_, { commentId }) => {
      try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
          throw new Error("Comment not found");
        }
        return comment;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    addUser: async (
      _,
      { username, fullName, email, password, DevLvl, github }
    ) => {
      // add user logic
      const user = await User.create({
        username,
        fullName,
        email,
        password,
        DevLvl,
        github,
      });
      const token = signToken(user);

      return { token, user };
    },
    editUser: async (
      _,
      { userId, username, fullName, DevLvl, bio, github, profilePhoto },
      context
    ) => {
      // check if user is authorized to edit this user

      if (!userId) {
        throw new Error("User not found");
      } else {
        const user = await User.findByIdAndUpdate(
          { _id: userId },
          {
            username: username,
            fullName: fullName,
            DevLvl: DevLvl,
            bio: bio,
            github: github,
            profilePhoto: profilePhoto,
          },

          {
            new: true,
          }
        );
        return user;
      }

      // if (!context.user) {
      //   throw new AuthenticationError("Not authorized to edit this user");
      // }
      // edit user logic
    },
    deleteUser: async (_, { userId }, context) => {
      // check if user is authorized to delete this user
      // delete user logic
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    login: async (_, { email, password }) => {
      // login logic
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(user);
      return { token, user };
    },
    addPost: async (_, { postTitle, postText, username, image }, context) => {
      // check if user is authorized to create this post
      // create post logic
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("Not authorized");
      }
      const newPost = await Post.create({
        postTitle,
        postText,
        username,
        image,
      });
      console.log("resolver", newPost);
      user.posts.push(newPost._id);
      user.save();
      return newPost;
    },
    editPost: async (_, { postTitle, postText, username, image, likes }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("Not authorized!");
      }
      const editedPost = await Post.findOneAndUpdate(
        { title: postTitle },
        { $set: { text: postText, image: image, likes: likes } },
        { new: true }
      );
      if (!editedPost) {
        throw new Error("Error editing post!");
      }
      return editedPost;
    },

    deletePost: async (_, { postId }, context) => {
      try {
        // check if user is authorized to delete this post
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error("Post not found");
        }
        await post.remove();
        return true;
      } catch (err) {
        throw new Error(err);
      }
    },
    addComment: async (_, { postId, text, username }, context) => {
      // check if user is authorized to create this comment
      // create comment logic
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("Not authorized");
      }

      const addedComment = await Post.findOneAndUpdate(
        { _id: postId },
        {
          $addToSet: {
            comments: { text, commentBy: username },
          },
        },
        { new: true }
      );
      if (!addedComment) {
        throw new Error("Error posting comment !");
      }
      return addedComment;
    },
    deleteComment: async (_, { commentId }, context) => {
      try {
        // check if user is authorized to delete this comment
        const comment = await Comment.findById(commentId);
        if (!comment) {
          throw new Error("Comment not found");
        }
        await comment.remove();
        return true;
      } catch (err) {
        throw new Error(err);
      }
    },
    addFollower: async (_, { userId, followingId, followingUsername }) => {
      const newFollower = await User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            friends: {
              friendId: followingId,
              friendUsername: followingUsername,
            },
          },
        },
        { new: true }
      );
      if (!followingId) {
        throw new Error("No user with that ID to add");
      }
      return newFollower;
    },
  },
};
module.exports = resolvers;
