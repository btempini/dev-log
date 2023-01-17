import React from "react";

const CreatePost = () => {
    return(
    <div>
        <div>
          <input placeholder="postTitle" />
          <div>Date</div>
          <input type="file" />
          <button>Upload Image</button>
        </div>
        <textarea defaultValue={"..."} />
        <button>Submit</button>
      </div>
    )
};

export default CreatePost;