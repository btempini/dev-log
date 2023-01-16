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
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (err) {
        throw new Error(err);
      }
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
        const post = await Post.findById(postId);
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
        return comments;
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
    addUser: async (_, { username, fullName, email, password, DevLvl }) => {
      // add user logic
      const user = await User.create({
        username,
        fullName,
        email,
        password,
        DevLvl,
      });
      const token = signToken(user);

      return { token, user };
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

      if (!profile) {
        throw new AuthenticationError("No user found with this email!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(user);
      return { token, user };
    },
    addPost: async (_, { postTitle, postText, username }, context) => {
      // check if user is authorized to create this post
      // create post logic
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("Not authorized");
      }
      const newPost = await Post.create({ postTitle, postText, username });
      return newPost;
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
    addComment: async (_, { CommentText, username }, context) => {
      // check if user is authorized to create this comment
      // create comment logic
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("Not authorized");
      }
      const newComment = await Comment.create({ CommentText, username });
      const post = await Post.findById(postId);
      post.comments.push(newComment);
      await post.save();
      return newComment;
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
  },
};

module.exports = resolvers;
