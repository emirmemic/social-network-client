import React from "react";
import User from "../User/User";

const Comments = (props) => {
  return (
    <div className="comments-wrapper">
      {props.comments &&
        props.comments.map((comment, i) => (
          <div className="comments" key={comment._id + "-" + i}>
            <User user={comment.author} />
            <p>{comment.content}</p>
          </div>
        ))}
    </div>
  );
};

export default Comments;
