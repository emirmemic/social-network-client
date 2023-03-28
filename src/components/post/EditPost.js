import React, { useState } from "react";
import axios from "axios";

const EditPost = ({ post, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleUpdatePost = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/posts/updatePost/${post._id}`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onUpdate(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-post-form">
      <form onSubmit={handleUpdatePost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={handleContentChange}
        />
        <button type="submit">Update Post</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPost;
