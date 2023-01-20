const db = require("../config/connection");
const { User, Post } = require("../models/");
const { post } = require("../models/Comment");
const { posts } = require("./postSeeds");
const { users } = require("./userSeeds");

const postsBulkCreate = async () => {
  const response = await Post.insertMany(posts);
};

const userBulkCreate = async () => {
  const response = await User.insertMany(users);
};
// userBulkCreate();
const deleteDB = async () => {
  const postResponse = await Post.deleteMany({});
  const userResponse = await User.deleteMany({});
  console.log(postResponse, userResponse);
};

// const postIdArr = posts.map((element) => element._id);
// // adding posts id to user posts array
// users.forEach((element, index) => {
//   element.posts.push(postIdArr[index]);
// });

const start = async () => {
  try {
    //delete
    await deleteDB();
    await userBulkCreate(users);
    await postsBulkCreate();
    const userMongoData = await User.find({});
    //post find and array creation
    const posts = await Post.find({});
    userMongoData.forEach((element, index) => {
      const currentUser = element.username;
      const nextPost = posts[index]._id;
      User.findOneAndUpdate({ username: currentUser }, { posts: nextPost });
    });
    const response = await User.find({}).populate("posts");
    console.log(response);
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

start();

// in order to add the posts to the user model
// we need to break down the array
// get post from the db with id
//insert post into user post array
// insert Users into DB
