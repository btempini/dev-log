//mutations
import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $fullName: String!
    $email: String!
    $password: String!
    $devLvl: String!
    $github: String!
  ) {
    addUser(
      username: $username
      fullName: $fullName
      email: $email
      password: $password
      DevLvl: $devLvl
      github: $github
    ) {
      token
      user {
        _id
        fullName
      }
    }
  }
`;
export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
      DevLvl
      fullName
      username
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        username
        fullName
        email
        password
        # posts {
        #   _id
        #   commentCount
        #   username
        #   postedAt
        #   postTitle
        #   image
        #   likes
        #   postText
        # }
        friends {
          friendId
          _id
          friendUsername
        }
        bio
        DevLvl
        github
      }
      token
    }
  }
`;
export const ADD_POST = gql`
  mutation addPost(
    $postTitle: String!
    $postText: String!
    $username: String!
    $image: String
  ) {
    addPost(
      postTitle: $postTitle
      postText: $postText
      username: $username
      image: $image
    ) {
      _id
      image
      likes
      postText
      postedAt
      username
      commentCount
      postTitle
    }
  }
`;
export const EDIT_POST = gql`
  mutation Mutation(
    $username: String!
    $likes: Int
    $postTitle: String
    $image: String
    $postText: String
  ) {
    editPost(
      username: $username
      likes: $likes
      postTitle: $postTitle
      image: $image
      postText: $postText
    ) {
      _id
      commentCount
      image
      likes
      postText
      postTitle
      postedAt
      userProfileId
      username
    }
  }
`;
export const DELETE_POST = gql`
  mutation Mutation($postId: ID!) {
    deletePost(postId: $postId) {
      commentCount
    }
  }
`;
export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $text: String!, $username: String!) {
    addComment(postId: $postId, text: $text, username: $username) {
      _id
      postTitle
      postText
      image
      postedAt
      username
      likes
      comments {
        _id
        text
        commentBy
        createdAt
      }
      commentCount
      userProfileId
    }
  }
`;
export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      commentId
      CommentText
      username
      likes
      postedAt
    }
  }
`;

export const ADD_FOLLOWER = gql`
  mutation Mutation(
    $userId: ID!
    $followingId: ID!
    $followingUsername: String!
  ) {
    addFollower(
      userId: $userId
      followingId: $followingId
      followingUsername: $followingUsername
    ) {
      _id
    }
  }
`;
export const EDIT_USER = gql`
  mutation Mutation(
    $userId: ID!
    $username: String
    $fullName: String
    $bio: String
    $devLvl: String
    $github: String
    $profilePhoto: String
  ) {
    editUser(
      userId: $userId
      username: $username
      fullName: $fullName
      bio: $bio
      DevLvl: $devLvl
      github: $github
      profilePhoto: $profilePhoto
    ) {
      _id
      username
      github
      fullName
      email
    }
  }
`;
