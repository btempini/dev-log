const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");
const { gql } = require("apollo-server-express");

try {
  const typeDefs = gql`
    type User {
      _id: ID
      username: String!
      fullName: String!
      email: String!
      password: String!
      posts: [Post]
      friends: [User]
      bio: String
      DevLvl: String!
      github: String
      profilePhoto: String
    }
    type Post {
      _id: ID!
      postTitle: String!
      postText: String!
      image: String
      postedAt: String
      username: String!
      likes: Int
      comments: [Comment]
      commentCount: Int
      userProfileId: String
    }
    type Comment {
      _id: ID!
      text: String!
      commentBy: String!

      createdAt: String
    }

    type Auth {
      token: ID!
      user: User
    }

    type Query {
      users: [User]!
      username(username: String!): User
      user(userId: ID!): User
      me: User
      posts: [Post]
      post(postId: ID!): Post
      comments: [Comment]
      comment(commentId: ID!): Comment
    }

    type Mutation {
      addUser(
        username: String!
        fullName: String!
        email: String!
        password: String!
        DevLvl: String!
        github: String!
      ): Auth
      editUser(
        userId: ID!
        username: String
        fullName: String
        bio: String
        DevLvl: String
        github: String
        profilePhoto: String
      ): User
      deleteUser(userId: ID!): User
      login(email: String!, password: String!): Auth
      addPost(
        postTitle: String!
        postText: String!
        username: String!
        image: String
      ): Post
      editPost(
        postTitle: String
        postText: String
        username: String!
        image: String
        likes: Int
      ): Post
      deletePost(postId: ID!): Post
      addComment(postId: ID!, text: String!, username: String!): Post
      deleteComment(commentId: ID!): Comment
    }
  `;
  module.exports = typeDefs;
} catch (error) {
  console.log(error);
}
