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

const start = async () => {
  try {
    //delete
    await deleteDB();
    await postsBulkCreate();
    //post find and array creation
    const posts = await Post.find({});
    const postIdArr = posts.map((element) => element._id);
    // adding posts id to user posts array
    users.forEach((element) => {
      element.posts.push(postIdArr[0]);
    });
    await userBulkCreate(users);
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
