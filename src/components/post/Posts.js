import React, { useEffect, useState } from "react";
import NewComment from "../Comments/newComment";
import Comments from "../Comments/comments";
import axios from "axios";

const Post = (props) => {
  const [comments, setComments] = useState([]);
    const getComments = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_API + "/api/comments/getComments/" + props._id,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log(response.data);
            setComments(response.data);
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getComments();
    },[])
  return (
    <div className="post-wrapper">
      <div key={props._id}>
        <h2>{props.author && props.author.username && props.author.username}</h2>
        <h2>{props.title}</h2>
        <p>{props.content}</p>
      </div>
      <NewComment getComments={getComments} postID={props._id}/>
      <Comments comments={comments} postID={props._id}/>
      <div></div>
    </div>
  );
};

export default Post;
