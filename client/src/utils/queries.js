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
      profilePhoto
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

export const QUERY_SINGLE_USER = gql`
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
      profilePhoto
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

export const QUERY_SINGLE_USER_NAME = gql`
  query singleProfile($username: String!) {
    user(username: $username) {
      DevLvl
      _id
      bio
      email
      fullName
      github
      password
      username
      profilePhoto
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
export const QUERY_POSTS = gql`
  query allPosts {
    posts {
      _id
      commentCount
      image
      postText
      postTitle
      postedAt
      username

      likes
      comments {
        CommentText
        commentId
        likes
        postedAt
        username
      }
    }
  }
`;
export const QUERY_SINGLE_POST = `
query post($postId: ID!) {
    post(postId: $postId) {
      _id
      postText
      postTitle
      image
      postedAt
      username
      commentCount
      likes
      comments {
        CommentText
        commentId
        likes
        postedAt
        username
      }
    }
  }
`;
export const QUERY_COMMENTS = `
query comments {
    comments {
      CommentText
      commentId
      likes
      postedAt
      username
    }
  }
  `;
export const QUERY_SINGLE_COMMENT = `
query comment($commentId: ID!) {
    comment(commentId: $commentId) {
      commentId
      CommentText
      username
      likes
      postedAt
    }
  }
`;
