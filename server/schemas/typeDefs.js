const { AuthenticationError } = require("apollo-server-express");
const {} = require("../models");
const { signToken } = require("../utils/auth");
const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User{
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
    }
    type Post{
        _id: ID!
        postTitle: String!
        postText: String!
        image: String
        postedAt: String
        username: String!
        likes: Int
        comments:[Comment]
        commentCount: Int
    }
    type Comment{
        commentId: ID!
        CommentText: String!
        username: String!
        likes: Int
        postedAt: String
    }

    type Auth{
        token: ID!
        user: User
    }

    type Query{
        users: [User]!
        user(userId: ID! ): Profile
        me: Profile
        posts: [Post]
        post(postId: ID!):Post
        comments:[Comment]
        comment(commentId: ID!): Comment
    }

    type: Mutation{
        addUser(username: String!, fullName: String!, email: String!, password: String! DevLvl: String!): Auth
        deleteUser(userId: ID!): User
        login(email: String!, password: String!): Auth
        addPost(postTitle: String!, postText: String!, username: String! ): Post
        deletePost(postId: ID!): Post
        addComment(CommentText: String!, username: String!): Comment
        deleteComment(commentId: ID!): Comment
    }

`;

module.exports = typeDefs;
