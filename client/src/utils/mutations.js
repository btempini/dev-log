//mutations
import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $fullName: String!
    $email: String!
    $password: String!
    $devLvl: String!
  ) {
    addUser(
      username: $username
      fullName: $fullName
      email: $email
      password: $password
      DevLvl: $devLvl
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
        posts {
          _id
          commentCount
          username
          postedAt
          postTitle
          image
          likes
          postText
        }
        friends {
          DevLvl
          _id
          username
          fullName
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
  ) {
    addPost(postTitle: $postTitle, postText: $postText, username: $username) {
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
export const DELETE_POST = gql`
  mutation Mutation($postId: ID!) {
    deletePost(postId: $postId) {
      _id
      postText
      postTitle
    }
  }
`;
export const ADD_COMMENT = gql`
  mutation addComment($commentText: String!, $username: String!) {
    addComment(CommentText: $commentText, username: $username) {
      commentId
      CommentText
      username
      likes
      postedAt
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
export const EDIT_USER = gql`

`
