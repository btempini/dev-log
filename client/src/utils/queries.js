//queries
import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query alluser {
    users {
      _id
      username
      fullName
      email
      password
      posts {
        _id
        postTitle
        postText
        image
        postedAt
        username
        likes
        comments {
          commentId
          CommentText
          username
          likes
          postedAt
        }
        commentCount
      }
      friends {
        _id
        username
        fullName
        bio
        DevLvl
        github
      }
      bio
      DevLvl
      github
    }
  }
`;

export const QUERY_SINGLE_USER = `
query singleProfile($userId: ID!) {
    user(userId: $userId) {
      DevLvl
      _id
      bio
      email
      fullName
      github
      password
      username
      posts {
        _id
        commentCount
        comments {
          commentId
          CommentText
          likes
          postedAt
          username
        }
        image
        likes
        postText
        postTitle
        postedAt
        username
      }
      friends {
        DevLvl
        _id
        bio
        email
        fullName
        github
        username
      }
    }
  }
`;
export const QUERY_ME = gql`
  query me {
    me {
      DevLvl
      _id
      bio
      email
      fullName
      github
      password
      username
      posts {
        _id
        commentCount
        comments {
          commentId
          CommentText
          likes
          postedAt
          username
        }
        image
        likes
        postText
        postTitle
        postedAt
        username
      }
      friends {
        DevLvl
        _id
        bio
        email
        fullName
        github
        username
      }
    }
  }
`;
