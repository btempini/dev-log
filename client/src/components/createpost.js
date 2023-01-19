import React from "react";
import "./styles/createpost.css";

const CreatePost = () => {
  return (
    <div className="createPostPage">
      <div className="createPostContainer">
        <div className="topCreate">
          <input className="postInput" placeholder="postTitle" />
          <div className="divider"></div>
          <input type="file" name="file" id="file" className="inputfile" />
          <label className="postInput" for="file">
            Choose a file
          </label>
        </div>
        <textarea className="createBody" defaultValue={"..."} />
        <button className="submitButton">Submit</button>
      </div>
    </div>
  );
};

export default CreatePost;
