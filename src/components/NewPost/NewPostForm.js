import React, { useState } from "react";
import axios from "axios";
import Button from "../Button/Button";

const NewPostForm = (props) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const post = { author, title, content };
    console.log("Post to be created:", post);
    try {
      let token = localStorage.getItem("token");
      const response = await axios.post(
        process.env.REACT_APP_API + "/api/posts/create",
        post,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      setContent("");
      props.updatePosts();
    } catch (error) {
      console.log("Error creating post:", error);
    }
  };

  return (
    <form className="create-post-wrapper">
      <div className="input-field">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="input-field">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          rows={5}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <Button onClick={handleSubmit}>Create Post</Button>
    </form>
  );
};

export default NewPostForm;
