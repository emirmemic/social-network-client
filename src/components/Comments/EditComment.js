import React, { useState } from "react";
import axios from "axios";

const EditComment = ({ comment, updateComments, onUpdate, onCancel }) => {
  const [content, setContent] = useState(comment.content);
  console.log("comment");
  console.log(comment);
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleUpdateComment = async (event) => {
    event.preventDefault();
    if (comment.author._id !== localStorage.getItem("user")) {
      console.log("Not your comment");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/comments/updateComment/${comment._id}`,
        {
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      onUpdate(response.data);
      updateComments && (await updateComments());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="edit-comment-form">
      <form onSubmit={handleUpdateComment}>
        <textarea
          placeholder="Content"
          value={content}
          onChange={handleContentChange}
        />

        <button type="submit">Update Comment</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditComment;
