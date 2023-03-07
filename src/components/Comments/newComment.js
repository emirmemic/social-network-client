import React, { useState } from "react";
import axios from "axios";
import Button from "../Button/Button";

const NewComment = (props) => {
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API + "/api/comments/createComment",
        {
          comment,
          post: props.postID,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      props.getComments();
      setComment("");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="new-comment-wrapper">
      <input
        type="text"
        value={comment}
        onChange={(event) => {
          setComment(event.target.value);
        }}
      />
      <Button onClick={handleComment}>Comment</Button>
    </div>
  );
};

export default NewComment;
